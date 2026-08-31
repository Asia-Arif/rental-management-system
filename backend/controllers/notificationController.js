const Notification = require("../models/Notification");

// Get notifications for logged-in user
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            user: req.user.id,
        })
            .populate("relatedProperty", "name city")
            .populate("relatedPayment")
            .populate("relatedMaintenance")
            .sort({ createdAt: -1 });

        res.status(200).json({
            notifications,
        });
    } catch (error) {
        console.error("Get notifications error:", error);

        res.status(500).json({
            message: "Failed to fetch notifications",
        });
    }
};


// Mark single notification as read
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id,
            },
            {
                read: true,
            },
            {
                new: true,
            }
        );

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found",
            });
        }

        res.status(200).json({
            message: "Notification marked as read",
            notification,
        });
    } catch (error) {
        console.error("Mark notification as read error:", error);

        res.status(500).json({
            message: "Failed to mark notification as read",
        });
    }
};


// Mark all notifications as read
const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            {
                user: req.user.id,
                read: false,
            },
            {
                read: true,
            }
        );

        res.status(200).json({
            message: "All notifications marked as read",
        });
    } catch (error) {
        console.error("Mark all notifications as read error:", error);

        res.status(500).json({
            message: "Failed to mark all notifications as read",
        });
    }
};


module.exports = {
    getNotifications,
    markAsRead,
    markAllAsRead,
};