const Maintenance = require("../models/Maintenance");
const Property = require("../models/Property");
const Notification = require("../models/Notification");
const User = require("../models/User");


// =====================================================
// TENANT - CREATE MAINTENANCE REQUEST
// =====================================================

const createTenantMaintenance = async (req, res) => {
    try {
        const { issue, description, priority } = req.body;

        // Validate required fields
        if (!issue || !description) {
            return res.status(400).json({
                message: "Issue and description are required",
            });
        }

        // Find tenant's occupied property
        const property = await Property.findOne({
            tenant: req.user.id,
            status: "Occupied",
        });

        if (!property) {
            return res.status(404).json({
                message: "You are not currently connected to any property",
            });
        }

        // Create maintenance request
        const maintenance = await Maintenance.create({
            owner: property.owner,
            tenant: req.user.id,
            property: property._id,
            issue,
            description,
            priority: priority || "Medium",
            status: "Pending",
        });

        // Get tenant information
        const tenant = await User.findById(req.user.id);

        // Create notification for property owner
        await Notification.create({
            user: property.owner,
            title: "New Maintenance Request",
            message: `${tenant?.name || "A tenant"} submitted a maintenance request for ${property.name}: ${issue}`,
            type: "Maintenance",
            read: false,
            relatedProperty: property._id,
            relatedMaintenance: maintenance._id,
        });

        // Return populated request
        const createdRequest = await Maintenance.findById(
            maintenance._id
        )
            .populate("tenant", "name email")
            .populate("property", "name address city")
            .populate("owner", "name email");

        res.status(201).json({
            message: "Maintenance request submitted successfully",
            request: createdRequest,
        });
    } catch (error) {
        console.error("Create tenant maintenance error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};


// =====================================================
// TENANT - GET OWN MAINTENANCE REQUESTS
// =====================================================

const getTenantMaintenance = async (req, res) => {
    try {
        const requests = await Maintenance.find({
            tenant: req.user.id,
        })
            .populate("property", "name address city")
            .populate("owner", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            requests,
        });
    } catch (error) {
        console.error("Get tenant maintenance error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};


// =====================================================
// OWNER - GET MAINTENANCE REQUESTS
// =====================================================

const getOwnerMaintenance = async (req, res) => {
    try {
        const requests = await Maintenance.find({
            owner: req.user.id,
        })
            .populate("tenant", "name email")
            .populate("property", "name address city")
            .sort({ createdAt: -1 });

        res.status(200).json({
            requests,
        });
    } catch (error) {
        console.error("Get owner maintenance error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};


// =====================================================
// OWNER - UPDATE MAINTENANCE STATUS
// =====================================================

const updateMaintenanceStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Validate status
        if (!["Pending", "In Progress", "Completed"].includes(status)) {
            return res.status(400).json({
                message: "Invalid maintenance status",
            });
        }

        // Find maintenance request belonging to owner
        const maintenance = await Maintenance.findOne({
            _id: req.params.id,
            owner: req.user.id,
        });

        if (!maintenance) {
            return res.status(404).json({
                message: "Maintenance request not found",
            });
        }

        // Update status
        maintenance.status = status;

        // Set completed date
        if (status === "Completed") {
            maintenance.completedAt = new Date();
        } else {
            maintenance.completedAt = null;
        }

        await maintenance.save();

        // Get property information
        const property = await Property.findById(
            maintenance.property
        );

        // =====================================================
        // CREATE NOTIFICATION FOR TENANT
        // =====================================================

        if (maintenance.tenant) {
            let notificationTitle = "Maintenance Request Updated";
            let notificationMessage = "";

            if (status === "In Progress") {
                notificationMessage =
                    `Your maintenance request "${maintenance.issue}" for ${property?.name || "your property"} is now in progress.`;
            }

            if (status === "Completed") {
                notificationMessage =
                    `Your maintenance request "${maintenance.issue}" for ${property?.name || "your property"} has been completed.`;
            }

            if (status === "Pending") {
                notificationMessage =
                    `Your maintenance request "${maintenance.issue}" for ${property?.name || "your property"} is pending.`;
            }

            await Notification.create({
                user: maintenance.tenant,
                title: notificationTitle,
                message: notificationMessage,
                type: "Maintenance",
                read: false,
                relatedProperty: maintenance.property,
                relatedMaintenance: maintenance._id,
            });
        }

        // Get updated maintenance request
        const updatedMaintenance = await Maintenance.findById(
            maintenance._id
        )
            .populate("tenant", "name email")
            .populate("property", "name address city")
            .populate("owner", "name email");

        res.status(200).json({
            message: "Maintenance status updated successfully",
            request: updatedMaintenance,
        });
    } catch (error) {
        console.error("Update maintenance status error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};


// =====================================================
// OWNER - GET SINGLE MAINTENANCE REQUEST
// =====================================================

const getMaintenanceById = async (req, res) => {
    try {
        const request = await Maintenance.findOne({
            _id: req.params.id,
            owner: req.user.id,
        })
            .populate("tenant", "name email")
            .populate("property", "name address city")
            .populate("owner", "name email");

        if (!request) {
            return res.status(404).json({
                message: "Maintenance request not found",
            });
        }

        res.status(200).json({
            request,
        });
    } catch (error) {
        console.error("Get maintenance error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};


// =====================================================
// EXPORT CONTROLLERS
// =====================================================

module.exports = {
    createTenantMaintenance,
    getTenantMaintenance,
    getOwnerMaintenance,
    updateMaintenanceStatus,
    getMaintenanceById,
};