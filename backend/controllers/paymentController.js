const Payment = require("../models/Payment");

// Create Payment
const createPayment = async (req, res) => {
    try {
        const { tenant, property, amount, dueDate } = req.body;

        // Check required fields
        if (!tenant || !property || !amount || !dueDate) {
            return res.status(400).json({
                message: "Tenant, property, amount and due date are required",
            });
        }

        // Create payment
        const payment = await Payment.create({
            owner: req.user.id,
            tenant,
            property,
            amount,
            dueDate,
            status: "Paid",
            paidDate: new Date(),
        });

        // Return created payment
        const populatedPayment = await Payment.findById(payment._id)
            .populate("tenant", "name email")
            .populate("property", "name address city rent");

        res.status(201).json({
            message: "Payment created successfully",
            payment: populatedPayment,
        });
    } catch (error) {
        console.error("Create payment error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};


// Get Owner Payments
const getOwnerPayments = async (req, res) => {
    try {
        const payments = await Payment.find({
            owner: req.user.id,
        })
            .populate("tenant", "name email")
            .populate("property", "name address city rent")
            .sort({ dueDate: -1 });

        res.status(200).json({
            payments,
        });
    } catch (error) {
        console.error("Get owner payments error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};


// Get Single Payment
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findOne({
            _id: req.params.id,
            owner: req.user.id,
        })
            .populate("tenant", "name email")
            .populate("property", "name address city rent");

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found",
            });
        }

        res.status(200).json({
            payment,
        });
    } catch (error) {
        console.error("Get payment error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};


module.exports = {
    createPayment,
    getOwnerPayments,
    getPaymentById,
};