const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            enum: [
                "Rental Agreement",
                "Property Document",
                "Rent Receipt",
            ],
            required: true,
        },

        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true,
        },

        tenant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        fileUrl: {
            type: String,
            required: true,
        },

        fileSize: {
            type: String,
            default: "",
        },

        uploadedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Document", documentSchema);