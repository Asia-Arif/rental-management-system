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
                "Property Rules & Regulations",
            ],
            required: true,
        },

        // Common document belongs to owner
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Cloudinary URL
        fileUrl: {
            type: String,
            required: true,
        },

        // Cloudinary public ID
        cloudinaryPublicId: {
            type: String,
            default: "",
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

// One document of each type for each owner
documentSchema.index(
    {
        owner: 1,
        type: 1,
    },
    {
        unique: true,
    }
);

module.exports = mongoose.model(
    "Document",
    documentSchema
);