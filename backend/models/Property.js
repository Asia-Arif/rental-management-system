const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        propertyType: {
            type: String,
            enum: ["House", "Apartment", "Room", "Shop", "Other"],
            required: true,
        },

        rent: {
            type: Number,
            required: true,
        },

        bedrooms: {
            type: Number,
            default: 0,
        },

        bathrooms: {
            type: Number,
            default: 0,
        },

        description: {
            type: String,
            trim: true,
        },

        status: {
            type: String,
            enum: ["Available", "Occupied"],
            default: "Available",
        },

        tenant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        tenantEmail: {
            type: String,
            default: null,
        },

        inviteCode: {
            type: String,
            default: null,
        },

        // ==========================================
        // Rent Due Date
        // ==========================================
        rentDueDate: {
            type: Date,
            default: null,
        },

        // ==========================================
        // Rent Reminder Tracking
        // ==========================================
        lastRentReminderDate: {
            type: Date,
            default: null,
        },

        lastRentReminderType: {
            type: String,
            enum: ["BeforeDue", "Overdue", null],
            default: null,
        },

        // ==========================================
        // Tenant Leave Request
        // ==========================================
        leaveRequest: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected", null],
            default: null,
        },

        leaveRequestDate: {
            type: Date,
            default: null,
        },

        // ==========================================
        // Scheduled Vacate Notice
        // ==========================================
        vacateDate: {
            type: Date,
            default: null,
        },

        vacateNoticeSent: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Property", propertySchema);