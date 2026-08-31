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
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Property", propertySchema);