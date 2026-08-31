const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            enum: ["Payment", "Maintenance", "Reminder", "General"],
            default: "General",
        },

        read: {
            type: Boolean,
            default: false,
        },

        relatedProperty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            default: null,
        },

        relatedPayment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            default: null,
        },

        relatedMaintenance: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Maintenance",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Notification", notificationSchema);