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
                dueDate: "Not set",
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

        // Check required fields
        if (!email || !propertyId) {
            return res.status(400).json({
                message: "Tenant email and property are required",
            });
        }

        const tenantEmail = email.trim().toLowerCase();

        // Find property belonging to current owner
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

        // Check if property already has a tenant
        if (property.tenant) {
            return res.status(400).json({
                message: "This property already has a tenant",
            });
        }

        // Generate 6-digit invite code
        const inviteCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // Save tenant email and invite code
        property.tenantEmail = tenantEmail;
        property.inviteCode = inviteCode;

        await property.save();

        // Check Brevo API configuration
        if (!process.env.BREVO_API_KEY) {
            console.error("BREVO_API_KEY is missing in .env");

            return res.status(500).json({
                message: "Brevo API key is not configured",
            });
        }

        if (!process.env.BREVO_SENDER_EMAIL) {
            console.error(
                "BREVO_SENDER_EMAIL is missing in .env"
            );

            return res.status(500).json({
                message: "Brevo sender email is not configured",
            });
        }

        // Create Brevo client
        const brevo = new BrevoClient({
            apiKey: process.env.BREVO_API_KEY,
        });

        // Send email using Brevo API
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

                subject:
                    "RentEase - Property Invitation",

                textContent: `Hello,

You have been invited to join a property on RentEase.

Your invite code is: ${inviteCode}

Please enter this code in the RentEase Tenant Portal to link yourself to the property.

This code is for this property only.

Thank you,
RentEase`,
            });

        console.log(
            "Brevo email sent successfully:",
            result
        );

        res.status(200).json({
            message: "Invite sent successfully!",
        });
    } catch (error) {
        console.error("Invite tenant error:");
        console.error("Error message:", error.message);

        if (error.body) {
            console.error(
                "Brevo error body:",
                error.body
            );
        }

        if (error.statusCode) {
            console.error(
                "Brevo status code:",
                error.statusCode
            );
        }

        res.status(500).json({
            message: "Failed to send tenant invite",
        });
    }
};

// ==========================================
// Accept Property Invite
// ==========================================
const acceptInvite = async (req, res) => {
    try {
        const { inviteCode } = req.body;

        // Check invite code
        if (!inviteCode) {
            return res.status(400).json({
                message: "Invite code is required",
            });
        }

        // Find property using invite code
        const property = await Property.findOne({
            inviteCode: inviteCode.trim(),
        });

        if (!property) {
            return res.status(404).json({
                message: "Invalid invite code",
            });
        }

        // Check if property already has a tenant
        if (property.tenant) {
            return res.status(400).json({
                message: "This property already has a tenant",
            });
        }

        // Find logged-in tenant
        const tenant = await User.findById(req.user.id);

        if (!tenant) {
            return res.status(404).json({
                message: "Tenant account not found",
            });
        }

        // Check that invite was sent to
        // logged-in tenant's email
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

        // Link tenant with property
        property.tenant = tenant._id;
        property.status = "Occupied";

        // Clear invite information
        property.inviteCode = null;
        property.tenantEmail = null;

        await property.save();

        res.status(200).json({
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
            },
        });
    } catch (error) {
        console.error("Accept invite error:", error);

        res.status(500).json({
            message: "Failed to join property",
        });
    }
};

// ==========================================
// Get Logged-in Tenant's Property
// ==========================================
const getMyProperty = async (req, res) => {
    try {
        // Find property linked with logged-in tenant
        const property = await Property.findOne({
            tenant: req.user.id,
        }).populate(
            "owner",
            "name email phone"
        );

        // No property found
        if (!property) {
            return res.status(404).json({
                message:
                    "You are not currently linked to any property",
            });
        }

        res.status(200).json({
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

        res.status(500).json({
            message:
                "Failed to fetch your property",
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