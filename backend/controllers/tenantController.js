const Property = require("../models/Property");
const nodemailer = require("nodemailer");

// Get Owner's Tenants
const getOwnerTenants = async (req, res) => {
    try {
        const properties = await Property.find({
            owner: req.user.id,
            tenant: { $ne: null },
        }).populate("tenant", "name email phone");

        const tenants = properties.map((property) => ({
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

// Invite Tenant
const inviteTenant = async (req, res) => {
    try {
        const { email, propertyId } = req.body;

        // Check required fields
        if (!email || !propertyId) {
            return res.status(400).json({
                message: "Tenant email and property are required",
            });
        }

        // Find property belonging to current owner
        const property = await Property.findOne({
            _id: propertyId,
            owner: req.user.id,
        });

        if (!property) {
            return res.status(404).json({
                message: "Property not found or you do not own this property",
            });
        }

        // Check if property is already occupied
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
        property.tenantEmail = email.trim().toLowerCase();
        property.inviteCode = inviteCode;

        await property.save();

        // Create email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email.trim().toLowerCase(),
            subject: "RentEase - Property Invitation",
            text: `You have been invited to join a property on RentEase.

Your invite code is: ${inviteCode}

Please enter this code in the RentEase Tenant Portal to link yourself to the property.

This code is for this property only.`,
        });

        res.status(200).json({
            message: "Invite sent successfully!",
        });
    } catch (error) {
        console.error("Invite tenant error:", error);

        res.status(500).json({
            message: "Failed to send tenant invite",
        });
    }
};

module.exports = {
    getOwnerTenants,
    inviteTenant,
};