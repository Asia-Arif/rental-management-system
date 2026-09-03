const Property = require("../models/Property");
const User = require("../models/User");
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
                rent: property.rent,

                dueDate: property.rentDueDate
                    ? property.rentDueDate.toISOString().split("T")[0]
                    : "Not set",

                status:
                    property.status === "Occupied"
                        ? "Active"
                        : "Inactive",
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

        // ------------------------------------------
        // Validate required fields
        // ------------------------------------------
        if (!email || !propertyId) {
            return res.status(400).json({
                message: "Tenant email and property are required",
            });
        }

        const tenantEmail = email.trim().toLowerCase();

        // ------------------------------------------
        // Find property belonging to owner
        // ------------------------------------------
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

        // ------------------------------------------
        // Check property already occupied
        // ------------------------------------------
        if (property.tenant) {
            return res.status(400).json({
                message: "This property already has a tenant",
            });
        }

        // ------------------------------------------
        // Check Brevo configuration
        // ------------------------------------------
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

        // ------------------------------------------
        // Generate 6-digit invite code
        // ------------------------------------------
        const inviteCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        console.log("==========================================");
        console.log("Generated Invite Code:", inviteCode);
        console.log("Property ID:", property._id);
        console.log("Tenant Email:", tenantEmail);
        console.log("==========================================");

        // ------------------------------------------
        // Create Brevo client
        // ------------------------------------------
        const brevo = new BrevoClient({
            apiKey: process.env.BREVO_API_KEY,
        });

        // ------------------------------------------
        // Send email
        // ------------------------------------------
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

        // ------------------------------------------
        // SAVE INVITE CODE IN DATABASE
        // ------------------------------------------
        property.tenantEmail = tenantEmail;
        property.inviteCode = inviteCode;

        // Due date will be created when tenant joins
        property.rentDueDate = null;

        const savedProperty = await property.save();

        console.log("==========================================");
        console.log("Invite saved successfully!");
        console.log("Saved Property ID:", savedProperty._id);
        console.log("Saved Invite Code:", savedProperty.inviteCode);
        console.log("Saved Tenant Email:", savedProperty.tenantEmail);
        console.log("==========================================");

        // ------------------------------------------
        // Success response
        // ------------------------------------------
        return res.status(200).json({
            message:
                "Invite sent successfully! Please ask the tenant to check their email.",

            inviteCode: savedProperty.inviteCode,
        });
    } catch (error) {
        console.error(
            "=========================================="
        );

        console.error(
            "Invite tenant / Brevo email error"
        );

        console.error(
            "Error message:",
            error?.message || error
        );

        console.error(
            "Error status:",
            error?.statusCode || "No status code"
        );

        console.error(
            "Error body:",
            error?.body || "No error body"
        );

        console.error(
            "=========================================="
        );

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
        console.log("Tenant entered invite code:", cleanInviteCode);
        console.log("Tenant ID:", req.user.id);
        console.log("==========================================");

        // ------------------------------------------
        // Find property using invite code
        // ------------------------------------------
        const property = await Property.findOne({
            inviteCode: cleanInviteCode,
        });

        if (!property) {
            console.log(
                "No property found for invite code:",
                cleanInviteCode
            );

            return res.status(404).json({
                message: "Invalid invite code",
            });
        }

        // ------------------------------------------
        // Check if property already has tenant
        // ------------------------------------------
        if (property.tenant) {
            return res.status(400).json({
                message: "This property already has a tenant",
            });
        }

        // ------------------------------------------
        // Find logged-in tenant
        // ------------------------------------------
        const tenant = await User.findById(req.user.id);

        if (!tenant) {
            return res.status(404).json({
                message: "Tenant account not found",
            });
        }

        // ------------------------------------------
        // Check tenant email
        // ------------------------------------------
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
        // Tenant joins today.
        // Example:
        // Join: 03 September
        // Due: 03 October
        //
        // If next month does not have the same date:
        // Join: 31 January
        // Due: 28 February (or 29 in leap year)
        // ==========================================

        const joinedDate = new Date();

        const joinedYear = joinedDate.getFullYear();
        const joinedMonth = joinedDate.getMonth();
        const joinedDay = joinedDate.getDate();

        // First day of next month
        const nextMonthFirstDay = new Date(
            joinedYear,
            joinedMonth + 1,
            1
        );

        const nextMonthYear =
            nextMonthFirstDay.getFullYear();

        const nextMonth =
            nextMonthFirstDay.getMonth();

        // Get last day of next month
        const lastDayOfNextMonth = new Date(
            nextMonthYear,
            nextMonth + 1,
            0
        ).getDate();

        // Make sure date exists in next month
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

        // Clear invite data after successful joining
        property.inviteCode = null;
        property.tenantEmail = null;

        await property.save();

        console.log("==========================================");
        console.log("Property joined successfully!");
        console.log("Property ID:", property._id);
        console.log("Tenant ID:", tenant._id);
        console.log(
            "Tenant Joined Date:",
            joinedDate
        );
        console.log(
            "First Rent Due Date:",
            dueDate
        );
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
        console.error(
            "Accept invite error:",
            error
        );

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
        console.error(
            "Get my property error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to fetch your property",
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
};