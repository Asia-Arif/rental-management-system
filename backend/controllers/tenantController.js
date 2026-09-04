const Property = require("../models/Property");
const User = require("../models/User");
const Notification = require("../models/Notification");
const { BrevoClient } = require("@getbrevo/brevo");

// ==========================================
// Get Owner's Tenants
// ==========================================
const getOwnerTenants = async (req, res) => {
    try {
        const properties = await Property.find({
            owner: req.user.id,
            tenant: { $ne: null },
        }).populate("tenant", "name email phone");

        const tenants = properties
            .filter((property) => property.tenant)
            .map((property) => ({
                id: property.tenant._id,
                name: property.tenant.name,
                email: property.tenant.email,
                phone: property.tenant.phone || "Not provided",
                property: property.name,
                propertyId: property._id,
                rent: property.rent,

                dueDate: property.rentDueDate
                    ? property.rentDueDate.toISOString().split("T")[0]
                    : "Not set",

                status:
                    property.status === "Occupied"
                        ? "Active"
                        : "Inactive",

                leaveRequest: property.leaveRequest || null,
                leaveRequestDate: property.leaveRequestDate
                    ? property.leaveRequestDate
                        .toISOString()
                        .split("T")[0]
                    : null,

                vacateDate: property.vacateDate
                    ? property.vacateDate
                        .toISOString()
                        .split("T")[0]
                    : null,
            }));

        res.status(200).json({
            tenants,
        });
    } catch (error) {
        console.error("Get owner tenants error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

// ==========================================
// Invite Tenant
// ==========================================
const inviteTenant = async (req, res) => {
    try {
        const { email, propertyId } = req.body;

        if (!email || !propertyId) {
            return res.status(400).json({
                message: "Tenant email and property are required",
            });
        }

        const tenantEmail = email.trim().toLowerCase();

        const property = await Property.findOne({
            _id: propertyId,
            owner: req.user.id,
        });

        if (!property) {
            return res.status(404).json({
                message:
                    "Property not found or you do not own this property",
            });
        }

        if (property.tenant) {
            return res.status(400).json({
                message: "This property already has a tenant",
            });
        }

        if (!process.env.BREVO_API_KEY) {
            console.error("BREVO_API_KEY is missing in .env");

            return res.status(500).json({
                message:
                    "Brevo API key is not configured. Please check backend .env file.",
            });
        }

        if (!process.env.BREVO_SENDER_EMAIL) {
            console.error("BREVO_SENDER_EMAIL is missing in .env");

            return res.status(500).json({
                message:
                    "Brevo sender email is not configured. Please check backend .env file.",
            });
        }

        const inviteCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        console.log("==========================================");
        console.log("Generated Invite Code:", inviteCode);
        console.log("Property ID:", property._id);
        console.log("Tenant Email:", tenantEmail);
        console.log("==========================================");

        const brevo = new BrevoClient({
            apiKey: process.env.BREVO_API_KEY,
        });

        const result =
            await brevo.transactionalEmails.sendTransacEmail({
                sender: {
                    name:
                        process.env.BREVO_SENDER_NAME ||
                        "RentEase",

                    email:
                        process.env.BREVO_SENDER_EMAIL,
                },

                to: [
                    {
                        email: tenantEmail,
                    },
                ],

                subject: "RentEase - Property Invitation",

                textContent: `Hello,

You have been invited to join a property on RentEase.

Your invite code is: ${inviteCode}

Please enter this code in the RentEase Tenant Portal to link yourself to the property.

This code is valid for this property only.

Thank you,
RentEase`,
            });

        console.log("Brevo email sent successfully.");
        console.log(
            "Brevo message ID:",
            result?.messageId || "No message ID returned"
        );

        property.tenantEmail = tenantEmail;
        property.inviteCode = inviteCode;

        property.rentDueDate = null;

        // Reset old leave/vacate information
        property.leaveRequest = null;
        property.leaveRequestDate = null;
        property.vacateDate = null;
        property.vacateNoticeSent = false;

        const savedProperty = await property.save();

        console.log("==========================================");
        console.log("Invite saved successfully!");
        console.log("Saved Property ID:", savedProperty._id);
        console.log("Saved Invite Code:", savedProperty.inviteCode);
        console.log("Saved Tenant Email:", savedProperty.tenantEmail);
        console.log("==========================================");

        return res.status(200).json({
            message:
                "Invite sent successfully! Please ask the tenant to check their email.",

            inviteCode: savedProperty.inviteCode,
        });
    } catch (error) {
        console.error("==========================================");
        console.error("Invite tenant / Brevo email error");
        console.error("Error message:", error?.message || error);
        console.error(
            "Error status:",
            error?.statusCode || "No status code"
        );
        console.error(
            "Error body:",
            error?.body || "No error body"
        );
        console.error("==========================================");

        return res.status(500).json({
            message:
                error?.body?.message ||
                error?.message ||
                "Failed to send tenant invite. Please check Brevo configuration.",
        });
    }
};

// ==========================================
// Accept Property Invite
// ==========================================
const acceptInvite = async (req, res) => {
    try {
        const { inviteCode } = req.body;

        if (!inviteCode) {
            return res.status(400).json({
                message: "Invite code is required",
            });
        }

        const cleanInviteCode = inviteCode.trim();

        console.log("==========================================");
        console.log(
            "Tenant entered invite code:",
            cleanInviteCode
        );
        console.log("Tenant ID:", req.user.id);
        console.log("==========================================");

        const property = await Property.findOne({
            inviteCode: cleanInviteCode,
        });

        if (!property) {
            return res.status(404).json({
                message: "Invalid invite code",
            });
        }

        if (property.tenant) {
            return res.status(400).json({
                message: "This property already has a tenant",
            });
        }

        const tenant = await User.findById(req.user.id);

        if (!tenant) {
            return res.status(404).json({
                message: "Tenant account not found",
            });
        }

        if (
            !property.tenantEmail ||
            tenant.email.toLowerCase() !==
                property.tenantEmail.toLowerCase()
        ) {
            return res.status(403).json({
                message:
                    "This invite code was not sent to your email address",
            });
        }

        // ==========================================
        // CALCULATE FIRST RENT DUE DATE
        // ==========================================
        const joinedDate = new Date();

        const joinedYear = joinedDate.getFullYear();
        const joinedMonth = joinedDate.getMonth();
        const joinedDay = joinedDate.getDate();

        const nextMonthFirstDay = new Date(
            joinedYear,
            joinedMonth + 1,
            1
        );

        const nextMonthYear =
            nextMonthFirstDay.getFullYear();

        const nextMonth =
            nextMonthFirstDay.getMonth();

        const lastDayOfNextMonth = new Date(
            nextMonthYear,
            nextMonth + 1,
            0
        ).getDate();

        const validDueDay = Math.min(
            joinedDay,
            lastDayOfNextMonth
        );

        const dueDate = new Date(
            nextMonthYear,
            nextMonth,
            validDueDay
        );

        // ==========================================
        // LINK TENANT WITH PROPERTY
        // ==========================================
        property.tenant = tenant._id;
        property.status = "Occupied";
        property.rentDueDate = dueDate;

        // Reset reminder tracking
        property.lastRentReminderDate = null;
        property.lastRentReminderType = null;

        // Reset leave/vacate information
        property.leaveRequest = null;
        property.leaveRequestDate = null;
        property.vacateDate = null;
        property.vacateNoticeSent = false;

        // Clear invite data
        property.inviteCode = null;
        property.tenantEmail = null;

        await property.save();

        console.log("==========================================");
        console.log("Property joined successfully!");
        console.log("Property ID:", property._id);
        console.log("Tenant ID:", tenant._id);
        console.log("Tenant Joined Date:", joinedDate);
        console.log("First Rent Due Date:", dueDate);
        console.log("==========================================");

        return res.status(200).json({
            message: "Property joined successfully!",

            property: {
                id: property._id,
                name: property.name,
                address: property.address,
                city: property.city,
                propertyType: property.propertyType,
                rent: property.rent,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                status: property.status,

                dueDate: property.rentDueDate
                    ? property.rentDueDate
                        .toISOString()
                        .split("T")[0]
                    : null,
            },
        });
    } catch (error) {
        console.error("Accept invite error:", error);

        return res.status(500).json({
            message: "Failed to join property",
            error: error.message,
        });
    }
};

// ==========================================
// Get Logged-in Tenant's Property
// ==========================================
const getMyProperty = async (req, res) => {
    try {
        const property = await Property.findOne({
            tenant: req.user.id,
        }).populate(
            "owner",
            "name email phone"
        );

        if (!property) {
            return res.status(404).json({
                message:
                    "You are not currently linked to any property",
            });
        }

        return res.status(200).json({
            property: {
                id: property._id,
                name: property.name,
                address: property.address,
                city: property.city,
                propertyType: property.propertyType,
                rent: property.rent,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                description: property.description,
                status: property.status,

                dueDate: property.rentDueDate
                    ? property.rentDueDate
                        .toISOString()
                        .split("T")[0]
                    : null,

                owner: property.owner
                    ? {
                        id: property.owner._id,
                        name: property.owner.name,
                        email: property.owner.email,
                        phone:
                            property.owner.phone ||
                            "Not provided",
                    }
                    : null,
            },
        });
    } catch (error) {
        console.error("Get my property error:", error);

        return res.status(500).json({
            message: "Failed to fetch your property",
            error: error.message,
        });
    }
};

// ==========================================
// Tenant Leave Property Request
// ==========================================
const requestLeaveProperty = async (req, res) => {
    try {
        const property = await Property.findOne({
            tenant: req.user.id,
        }).populate("owner", "name email");

        if (!property) {
            return res.status(404).json({
                message:
                    "You are not currently linked to any property",
            });
        }

        if (property.leaveRequest === "Pending") {
            return res.status(400).json({
                message:
                    "Your leave property request is already pending",
            });
        }

        // Create leave request
        property.leaveRequest = "Pending";
        property.leaveRequestDate = new Date();

        await property.save();

        // Notify owner
        await Notification.create({
            user: property.owner._id,
            title: "Tenant Leave Request",
            message: `Your tenant has requested to leave the property "${property.name}". Please review the request.`,
            type: "General",
            relatedProperty: property._id,
        });

        return res.status(200).json({
            message:
                "Leave property request sent to the owner successfully.",
        });
    } catch (error) {
        console.error(
            "Request leave property error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to send leave property request",
            error: error.message,
        });
    }
};

// ==========================================
// Owner Accept Tenant Leave Request
// ==========================================
const acceptLeaveRequest = async (req, res) => {
    try {
        const { propertyId } = req.params;

        const property = await Property.findOne({
            _id: propertyId,
            owner: req.user.id,
        });

        if (!property) {
            return res.status(404).json({
                message:
                    "Property not found or you do not own this property",
            });
        }

        if (property.leaveRequest !== "Pending") {
            return res.status(400).json({
                message:
                    "There is no pending leave request for this property",
            });
        }

        const oldTenantId = property.tenant;

        // Make property vacant
        property.tenant = null;
        property.tenantEmail = null;
        property.inviteCode = null;
        property.status = "Available";

        property.rentDueDate = null;

        // Reset rent reminder tracking
        property.lastRentReminderDate = null;
        property.lastRentReminderType = null;

        // Clear leave request
        property.leaveRequest = "Accepted";
        property.leaveRequestDate = new Date();

        // Clear scheduled vacate notice
        property.vacateDate = null;
        property.vacateNoticeSent = false;

        await property.save();

        // Notify old tenant
        if (oldTenantId) {
            await Notification.create({
                user: oldTenantId,
                title: "Leave Request Accepted",
                message: `Your request to leave "${property.name}" has been accepted. Your access to the property has been removed.`,
                type: "General",
                relatedProperty: property._id,
            });
        }

        return res.status(200).json({
            message:
                "Leave request accepted. The tenant has been removed and the property is now available.",
        });
    } catch (error) {
        console.error(
            "Accept leave request error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to accept leave request",
            error: error.message,
        });
    }
};

// ==========================================
// Owner Reject Tenant Leave Request
// ==========================================
const rejectLeaveRequest = async (req, res) => {
    try {
        const { propertyId } = req.params;

        const property = await Property.findOne({
            _id: propertyId,
            owner: req.user.id,
        });

        if (!property) {
            return res.status(404).json({
                message:
                    "Property not found or you do not own this property",
            });
        }

        if (property.leaveRequest !== "Pending") {
            return res.status(400).json({
                message:
                    "There is no pending leave request for this property",
            });
        }

        const tenantId = property.tenant;

        // Tenant stays in property
        property.leaveRequest = "Rejected";
        property.leaveRequestDate = new Date();

        await property.save();

        // Notify tenant
        if (tenantId) {
            await Notification.create({
                user: tenantId,
                title: "Leave Request Rejected",
                message: `Your request to leave "${property.name}" has been rejected. You will remain linked to this property.`,
                type: "General",
                relatedProperty: property._id,
            });
        }

        return res.status(200).json({
            message:
                "Leave request rejected. The tenant will remain in the property.",
        });
    } catch (error) {
        console.error(
            "Reject leave request error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to reject leave request",
            error: error.message,
        });
    }
};

// ==========================================
// Owner Send Scheduled Vacate Notice
// ==========================================
const sendVacateNotice = async (req, res) => {
    try {
        const { propertyId, vacateDate } = req.body;

        if (!propertyId || !vacateDate) {
            return res.status(400).json({
                message:
                    "Property and vacate date are required",
            });
        }

        const property = await Property.findOne({
            _id: propertyId,
            owner: req.user.id,
        }).populate("tenant", "name email");

        if (!property) {
            return res.status(404).json({
                message:
                    "Property not found or you do not own this property",
            });
        }

        if (!property.tenant) {
            return res.status(400).json({
                message:
                    "This property does not currently have a tenant",
            });
        }

        const selectedVacateDate = new Date(vacateDate);

        if (Number.isNaN(selectedVacateDate.getTime())) {
            return res.status(400).json({
                message: "Invalid vacate date",
            });
        }

        // Get today without time
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        selectedVacateDate.setHours(0, 0, 0, 0);

        if (selectedVacateDate < today) {
            return res.status(400).json({
                message:
                    "Vacate date cannot be in the past",
            });
        }

        // Save scheduled vacate date
        property.vacateDate = selectedVacateDate;
        property.vacateNoticeSent = true;

        await property.save();

        // Notify tenant
        await Notification.create({
            user: property.tenant._id,
            title: "Property Vacate Notice",
            message: `You are required to vacate the property "${property.name}" on ${selectedVacateDate.toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }
            )}. Your property access will end on this date.`,
            type: "General",
            relatedProperty: property._id,
        });

        // Optional email notification
        if (
            property.tenant.email &&
            process.env.BREVO_API_KEY &&
            process.env.BREVO_SENDER_EMAIL
        ) {
            try {
                const brevo = new BrevoClient({
                    apiKey: process.env.BREVO_API_KEY,
                });

                await brevo.transactionalEmails.sendTransacEmail({
                    sender: {
                        name:
                            process.env.BREVO_SENDER_NAME ||
                            "RentEase",

                        email:
                            process.env.BREVO_SENDER_EMAIL,
                    },

                    to: [
                        {
                            email: property.tenant.email,
                            name:
                                property.tenant.name ||
                                "Tenant",
                        },
                    ],

                    subject:
                        "RentEase - Property Vacate Notice",

                    textContent: `Hello ${
                        property.tenant.name || "Tenant"
                    },

You are required to vacate the property "${
                        property.name
                    }" on ${selectedVacateDate.toLocaleDateString(
                        "en-GB",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }
                    )}.

Your property access will end on this date.

Thank you,
RentEase`,
                });

                console.log(
                    "Vacate notice email sent successfully."
                );
            } catch (emailError) {
                console.error(
                    "Vacate notice email error:",
                    emailError.message
                );
            }
        }

        return res.status(200).json({
            message:
                "Vacate notice sent successfully to the tenant.",
            vacateDate: selectedVacateDate
                .toISOString()
                .split("T")[0],
        });
    } catch (error) {
        console.error(
            "Send vacate notice error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to send vacate notice",
            error: error.message,
        });
    }
};

// ==========================================
// Export Controllers
// ==========================================
module.exports = {
    getOwnerTenants,
    inviteTenant,
    acceptInvite,
    getMyProperty,
    requestLeaveProperty,
    acceptLeaveRequest,
    rejectLeaveRequest,
    sendVacateNotice,
};