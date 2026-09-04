const Payment = require("../models/Payment");
const Property = require("../models/Property");
const Notification = require("../models/Notification");
const cloudinary = require("../config/cloudinary");

// =====================================================
// SUBMIT PAYMENT PROOF - TENANT
// =====================================================
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
                message:
                    "Please provide all payment details",
            });
        }

        const property =
            await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({
                message: "Property not found",
            });
        }

        if (
            !property.tenant ||
            property.tenant.toString() !==
                req.user.id
        ) {
            return res.status(403).json({
                message:
                    "You are not linked with this property",
            });
        }

        let cloudinaryResult;

        try {
            cloudinaryResult =
                await cloudinary.uploader.upload(
                    screenshot,
                    {
                        folder:
                            "rentease/payment-proofs",
                        resource_type: "image",
                    }
                );
        } catch (uploadError) {
            console.error(
                "Cloudinary upload error:",
                uploadError
            );

            return res.status(500).json({
                message:
                    "Failed to upload payment screenshot",
                error: uploadError.message,
            });
        }

        // ------------------------------------------
        // Create payment
        // ------------------------------------------
        const payment =
            await Payment.create({
                tenant: req.user.id,
                owner: property.owner,
                property: property._id,
                amount,
                paymentMethod,
                paymentDate,
                screenshot:
                    cloudinaryResult.secure_url,
                status: "Pending",
            });

        // ------------------------------------------
        // Notify owner about new payment
        // ------------------------------------------
        await Notification.create({
            user: property.owner,

            title: "New Rent Payment Submitted",

            message: `Your tenant has submitted a rent payment of Rs. ${amount} for "${property.name}". Please review the payment proof.`,

            type: "Payment",

            read: false,

            relatedProperty: property._id,

            relatedPayment: payment._id,
        });

        res.status(201).json({
            message:
                "Payment proof submitted successfully",
            payment,
        });
    } catch (error) {
        console.error(
            "Submit payment error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to submit payment proof",
            error: error.message,
        });
    }
};

// =====================================================
// GET TENANT PAYMENTS
// =====================================================
const getTenantPayments = async (req, res) => {
    try {
        const payments =
            await Payment.find({
                tenant: req.user.id,
            })
                .populate(
                    "property",
                    "name address city rent"
                )
                .populate(
                    "owner",
                    "name email"
                )
                .sort({
                    createdAt: -1,
                });

        res.status(200).json({
            payments,
        });
    } catch (error) {
        console.error(
            "Get tenant payments error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to get tenant payments",
            error: error.message,
        });
    }
};

// =====================================================
// GET TENANT LINKED PROPERTY
// =====================================================
const getTenantProperty = async (req, res) => {
    try {
        const property =
            await Property.findOne({
                tenant: req.user.id,
            }).populate(
                "owner",
                "name email"
            );

        if (!property) {
            return res.status(404).json({
                message:
                    "You are not linked with any property yet.",
            });
        }

        res.status(200).json({
            property,
        });
    } catch (error) {
        console.error(
            "Get tenant property error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to get tenant property",
            error: error.message,
        });
    }
};

// =====================================================
// GET OWNER PAYMENTS
// =====================================================
const getOwnerPayments = async (req, res) => {
    try {
        const payments =
            await Payment.find({
                owner: req.user.id,
            })
                .populate(
                    "tenant",
                    "name email"
                )
                .populate(
                    "property",
                    "name address city rent"
                )
                .sort({
                    createdAt: -1,
                });

        res.status(200).json({
            payments,
        });
    } catch (error) {
        console.error(
            "Get owner payments error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to get owner payments",
            error: error.message,
        });
    }
};

// =====================================================
// GET NEXT MONTH DUE DATE
// =====================================================
const getNextMonthDueDate = (currentDueDate) => {
    const currentDate =
        new Date(currentDueDate);

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();

    const day =
        currentDate.getDate();

    // First day of next month
    const nextMonthFirstDay =
        new Date(
            year,
            month + 1,
            1
        );

    const nextYear =
        nextMonthFirstDay.getFullYear();

    const nextMonth =
        nextMonthFirstDay.getMonth();

    // Last day of next month
    const lastDayOfNextMonth =
        new Date(
            nextYear,
            nextMonth + 1,
            0
        ).getDate();

    // Prevent dates like 31 Feb from overflowing
    const validDay = Math.min(
        day,
        lastDayOfNextMonth
    );

    return new Date(
        nextYear,
        nextMonth,
        validDay
    );
};

// =====================================================
// APPROVE PAYMENT - OWNER
// =====================================================
const approvePayment = async (req, res) => {
    try {
        const { paymentId } =
            req.params;

        const payment =
            await Payment.findById(
                paymentId
            );

        if (!payment) {
            return res.status(404).json({
                message:
                    "Payment not found",
            });
        }

        if (
            payment.owner.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                message:
                    "You are not authorized to approve this payment",
            });
        }

        // ------------------------------------------
        // Approve payment
        // ------------------------------------------
        payment.status = "Approved";
        payment.rejectionReason = "";

        await payment.save();

        // ------------------------------------------
        // Get property
        // ------------------------------------------
        const property =
            await Property.findById(
                payment.property
            );

        if (property) {
            // --------------------------------------
            // Move due date to next month
            // --------------------------------------
            if (property.rentDueDate) {
                property.rentDueDate =
                    getNextMonthDueDate(
                        property.rentDueDate
                    );
            } else {
                // Fallback if due date is missing
                const today =
                    new Date();

                property.rentDueDate =
                    new Date(
                        today.getFullYear(),
                        today.getMonth() + 1,
                        today.getDate()
                    );
            }

            // --------------------------------------
            // Reset reminder tracking
            // --------------------------------------
            property.lastRentReminderDate =
                null;

            property.lastRentReminderType =
                null;

            await property.save();
        }

        // ------------------------------------------
        // Notify tenant about approved payment
        // ------------------------------------------
        await Notification.create({
            user: payment.tenant,

            title: "Payment Approved",

            message: `Your rent payment of Rs. ${payment.amount} for "${property ? property.name : "your property"}" has been approved by the owner.`,

            type: "Payment",

            read: false,

            relatedProperty:
                payment.property,

            relatedPayment:
                payment._id,
        });

        res.status(200).json({
            message:
                "Payment approved successfully",
            payment,
        });
    } catch (error) {
        console.error(
            "Approve payment error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to approve payment",
            error: error.message,
        });
    }
};

// =====================================================
// REJECT PAYMENT - OWNER
// =====================================================
const rejectPayment = async (req, res) => {
    try {
        const { paymentId } =
            req.params;

        const {
            rejectionReason,
        } = req.body;

        const payment =
            await Payment.findById(
                paymentId
            );

        if (!payment) {
            return res.status(404).json({
                message:
                    "Payment not found",
            });
        }

        if (
            payment.owner.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                message:
                    "You are not authorized to reject this payment",
            });
        }

        const reason =
            rejectionReason ||
            "Payment proof was rejected";

        payment.status = "Rejected";

        payment.rejectionReason =
            reason;

        await payment.save();

        const property =
            await Property.findById(
                payment.property
            );

        // ------------------------------------------
        // Notify tenant about rejected payment
        // ------------------------------------------
        await Notification.create({
            user: payment.tenant,

            title: "Payment Rejected",

            message: `Your rent payment of Rs. ${
                payment.amount
            } for ${
                property
                    ? property.name
                    : "your property"
            } was rejected. Reason: ${reason}`,

            type: "Payment",

            read: false,

            relatedProperty:
                payment.property,

            relatedPayment:
                payment._id,
        });

        res.status(200).json({
            message:
                "Payment rejected successfully",
            payment,
        });
    } catch (error) {
        console.error(
            "Reject payment error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to reject payment",
            error: error.message,
        });
    }
};

// =====================================================
// EXPORT
// =====================================================
module.exports = {
    submitPaymentProof,
    getTenantPayments,
    getTenantProperty,
    getOwnerPayments,
    approvePayment,
    rejectPayment,
};