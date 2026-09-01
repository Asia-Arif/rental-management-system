const express = require("express");
const router = express.Router();

const {
    submitPaymentProof,
    getTenantPayments,
    getTenantProperty,
    getOwnerPayments,
    approvePayment,
    rejectPayment,
} = require("../controllers/paymentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Tenant
router.post(
    "/submit",
    authMiddleware,
    roleMiddleware("tenant"),
    submitPaymentProof
);

router.get(
    "/tenant",
    authMiddleware,
    roleMiddleware("tenant"),
    getTenantPayments
);

router.get(
    "/tenant/property",
    authMiddleware,
    roleMiddleware("tenant"),
    getTenantProperty
);

// Owner
router.get(
    "/",
    authMiddleware,
    roleMiddleware("owner"),
    getOwnerPayments
);

router.put(
    "/:paymentId/approve",
    authMiddleware,
    roleMiddleware("owner"),
    approvePayment
);

router.put(
    "/:paymentId/reject",
    authMiddleware,
    roleMiddleware("owner"),
    rejectPayment
);

module.exports = router;