const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        tenant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        dueDate: {
            type: Date,
            required: true,
        },

        paidDate: {
            type: Date,
            default: null,
        },

        status: {
            type: String,
            enum: ["Paid", "Pending", "Overdue"],
            default: "Pending",
        },

        receipt: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Payment", paymentSchema);