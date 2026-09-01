const express = require("express");

const {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get logged-in user's notifications
router.get("/", authMiddleware, getNotifications);

// Mark all notifications as read
router.put("/read-all", authMiddleware, markAllAsRead);

// Mark single notification as read
router.put("/:id/read", authMiddleware, markAsRead);

// Delete single notification
router.delete("/:id", authMiddleware, deleteNotification);

module.exports = router;