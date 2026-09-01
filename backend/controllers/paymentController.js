const Payment = require("../models/Payment");
const Property = require("../models/Property");
const cloudinary = require("../config/cloudinary");

// Submit Payment Proof - Tenant
const submitPaymentProof = async (req, res) => {
    try {
        const {
            propertyId,
            amount,
            paymentMethod,
            paymentDate,
            screenshot,
        } = req.body;

        if (
            !propertyId ||
            !amount ||
            !paymentMethod ||
            !paymentDate ||
            !screenshot
        ) {
            return res.status(400).json({
                message: "Please provide all payment details",
            });
        }

        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({
                message: "Property not found",
            });
        }

        if (
            !property.tenant ||
            property.tenant.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "You are not linked with this property",
            });
        }

        let cloudinaryResult;

        try {
            cloudinaryResult = await cloudinary.uploader.upload(
                screenshot,
                {
                    folder: "rentease/payment-proofs",
                    resource_type: "image",
                }
            );
        } catch (uploadError) {
            console.error("Cloudinary upload error:", uploadError);

            return res.status(500).json({
                message: "Failed to upload payment screenshot",
                error: uploadError.message,
            });
        }

        const payment = await Payment.create({
            tenant: req.user.id,
            owner: property.owner,
            property: property._id,
            amount,
            paymentMethod,
            paymentDate,
            screenshot: cloudinaryResult.secure_url,
            status: "Pending",
        });

        res.status(201).json({
            message: "Payment proof submitted successfully",
            payment,
        });
    } catch (error) {
        console.error("Submit payment error:", error);

        res.status(500).json({
            message: "Failed to submit payment proof",
            error: error.message,
        });
    }
};


// Get Tenant Payments
const getTenantPayments = async (req, res) => {
    try {
        const payments = await Payment.find({
            tenant: req.user.id,
        })
            .populate("property", "name address city rent")
            .populate("owner", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            payments,
        });
    } catch (error) {
        console.error("Get tenant payments error:", error);

        res.status(500).json({
            message: "Failed to get tenant payments",
            error: error.message,
        });
    }
};


// Get Tenant Linked Property
const getTenantProperty = async (req, res) => {
    try {
        const property = await Property.findOne({
            tenant: req.user.id,
        }).populate("owner", "name email");

        if (!property) {
            return res.status(404).json({
                message: "You are not linked with any property yet.",
            });
        }

        res.status(200).json({
            property,
        });
    } catch (error) {
        console.error("Get tenant property error:", error);

        res.status(500).json({
            message: "Failed to get tenant property",
            error: error.message,
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
            .sort({ createdAt: -1 });

        res.status(200).json({
            payments,
        });
    } catch (error) {
        console.error("Get owner payments error:", error);

        res.status(500).json({
            message: "Failed to get owner payments",
            error: error.message,
        });
    }
};


// Approve Payment - Owner
const approvePayment = async (req, res) => {
    try {
        const { paymentId } = req.params;

        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found",
            });
        }

        if (payment.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to approve this payment",
            });
        }

        payment.status = "Approved";
        payment.rejectionReason = "";

        await payment.save();

        res.status(200).json({
            message: "Payment approved successfully",
            payment,
        });
    } catch (error) {
        console.error("Approve payment error:", error);

        res.status(500).json({
            message: "Failed to approve payment",
            error: error.message,
        });
    }
};


// Reject Payment - Owner
const rejectPayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { rejectionReason } = req.body;

        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found",
            });
        }

        if (payment.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to reject this payment",
            });
        }

        payment.status = "Rejected";
        payment.rejectionReason =
            rejectionReason || "Payment proof was rejected";

        await payment.save();

        res.status(200).json({
            message: "Payment rejected successfully",
            payment,
        });
    } catch (error) {
        console.error("Reject payment error:", error);

        res.status(500).json({
            message: "Failed to reject payment",
            error: error.message,
        });
    }
};


module.exports = {
    submitPaymentProof,
    getTenantPayments,
    getTenantProperty,
    getOwnerPayments,
    approvePayment,
    rejectPayment,
};