const express = require("express");

const {
    getOwnerTenants,
    inviteTenant,
    acceptInvite,
    getMyProperty,
    requestLeaveProperty,
    acceptLeaveRequest,
    rejectLeaveRequest,
    sendVacateNotice,
} = require("../controllers/tenantController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// ==========================================
// Get Owner's Tenants
// ==========================================
router.get(
    "/",
    authMiddleware,
    roleMiddleware("owner"),
    getOwnerTenants
);

// ==========================================
// Invite Tenant
// ==========================================
router.post(
    "/invite",
    authMiddleware,
    roleMiddleware("owner"),
    inviteTenant
);

// ==========================================
// Accept Property Invite
// ==========================================
router.post(
    "/accept-invite",
    authMiddleware,
    roleMiddleware("tenant"),
    acceptInvite
);

// ==========================================
// Get Logged-in Tenant's Property
// ==========================================
router.get(
    "/my-property",
    authMiddleware,
    roleMiddleware("tenant"),
    getMyProperty
);

// ==========================================
// Tenant Leave Property Request
// ==========================================
router.post(
    "/leave-request",
    authMiddleware,
    roleMiddleware("tenant"),
    requestLeaveProperty
);

// ==========================================
// Owner Accept Leave Request
// ==========================================
router.put(
    "/leave-request/:propertyId/accept",
    authMiddleware,
    roleMiddleware("owner"),
    acceptLeaveRequest
);

// ==========================================
// Owner Reject Leave Request
// ==========================================
router.put(
    "/leave-request/:propertyId/reject",
    authMiddleware,
    roleMiddleware("owner"),
    rejectLeaveRequest
);

// ==========================================
// Owner Send Scheduled Vacate Notice
// ==========================================
router.post(
    "/vacate-notice",
    authMiddleware,
    roleMiddleware("owner"),
    sendVacateNotice
);

module.exports = router;