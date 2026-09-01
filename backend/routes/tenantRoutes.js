const express = require("express");

const {
    getOwnerTenants,
    inviteTenant,
    acceptInvite,
    getMyProperty,
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

module.exports = router;