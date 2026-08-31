const express = require("express");

const {
    addProperty,
    getOwnerProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
} = require("../controllers/propertyController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Add property
router.post(
    "/",
    authMiddleware,
    roleMiddleware("owner"),
    addProperty
);

// Get owner's properties
router.get(
    "/",
    authMiddleware,
    roleMiddleware("owner"),
    getOwnerProperties
);

// Get single property
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("owner"),
    getPropertyById
);

// Update property
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("owner"),
    updateProperty
);

// Delete property
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("owner"),
    deleteProperty
);

module.exports = router;