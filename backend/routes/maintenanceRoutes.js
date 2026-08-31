const express = require("express");

const {
    getOwnerMaintenance,
    updateMaintenanceStatus,
    getMaintenanceById,
} = require("../controllers/maintenanceController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// Get Owner Maintenance Requests
router.get(
    "/",
    authMiddleware,
    roleMiddleware("owner"),
    getOwnerMaintenance
);


// Update Maintenance Status
router.put(
    "/:id/status",
    authMiddleware,
    roleMiddleware("owner"),
    updateMaintenanceStatus
);


// Get Single Maintenance Request
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("owner"),
    getMaintenanceById
);


module.exports = router;