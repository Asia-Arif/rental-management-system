const express = require("express");

const {
    getOwnerDashboard,
} = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Owner Dashboard
router.get(
    "/owner",
    authMiddleware,
    roleMiddleware("owner"),
    getOwnerDashboard
);

module.exports = router;