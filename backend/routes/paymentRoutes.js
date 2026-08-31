const express = require("express");

const {
    createPayment,
    getOwnerPayments,
    getPaymentById,
} = require("../controllers/paymentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// Create Payment
router.post(
    "/",
    authMiddleware,
    roleMiddleware("owner"),
    createPayment
);


// Get Owner Payments
router.get(
    "/",
    authMiddleware,
    roleMiddleware("owner"),
    getOwnerPayments
);


// Get Single Payment
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("owner"),
    getPaymentById
);


module.exports = router;