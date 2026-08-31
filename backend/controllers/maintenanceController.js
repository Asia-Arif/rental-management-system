const Maintenance = require("../models/Maintenance");


// Get Owner Maintenance Requests
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


// Update Maintenance Status
const updateMaintenanceStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["Pending", "In Progress", "Completed"].includes(status)) {
            return res.status(400).json({
                message: "Invalid maintenance status",
            });
        }

        const maintenance = await Maintenance.findOne({
            _id: req.params.id,
            owner: req.user.id,
        });

        if (!maintenance) {
            return res.status(404).json({
                message: "Maintenance request not found",
            });
        }

        maintenance.status = status;

        if (status === "Completed") {
            maintenance.completedAt = new Date();
        } else {
            maintenance.completedAt = null;
        }

        await maintenance.save();

        const updatedMaintenance = await Maintenance.findById(
            maintenance._id
        )
            .populate("tenant", "name email")
            .populate("property", "name address city");

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


// Get Single Maintenance Request
const getMaintenanceById = async (req, res) => {
    try {
        const request = await Maintenance.findOne({
            _id: req.params.id,
            owner: req.user.id,
        })
            .populate("tenant", "name email")
            .populate("property", "name address city");

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


module.exports = {
    getOwnerMaintenance,
    updateMaintenanceStatus,
    getMaintenanceById,
};