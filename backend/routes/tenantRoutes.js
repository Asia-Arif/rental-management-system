const express = require("express");

const {
    getOwnerTenants,
    inviteTenant,
} = require("../controllers/tenantController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Get owner's tenants
router.get(
    "/",
    authMiddleware,
    roleMiddleware("owner"),
    getOwnerTenants
);

// Invite tenant
router.post(
    "/invite",
    authMiddleware,
    roleMiddleware("owner"),
    inviteTenant
);

module.exports = router;