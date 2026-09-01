const express = require("express");

const {
    createTenantMaintenance,
    getTenantMaintenance,
    getOwnerMaintenance,
    updateMaintenanceStatus,
    getMaintenanceById,
} = require("../controllers/maintenanceController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// =====================================================
// TENANT ROUTES
// =====================================================

// Create maintenance request
router.post(
    "/",
    authMiddleware,
    roleMiddleware("tenant"),
    createTenantMaintenance
);


// Get tenant's own maintenance requests
router.get(
    "/tenant",
    authMiddleware,
    roleMiddleware("tenant"),
    getTenantMaintenance
);


// =====================================================
// OWNER ROUTES
// =====================================================

// Get owner maintenance requests
router.get(
    "/",
    authMiddleware,
    roleMiddleware("owner"),
    getOwnerMaintenance
);


// Update maintenance status
router.put(
    "/:id/status",
    authMiddleware,
    roleMiddleware("owner"),
    updateMaintenanceStatus
);


// Get single maintenance request
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("owner"),
    getMaintenanceById
);


module.exports = router;