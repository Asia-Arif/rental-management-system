const express = require("express");

const router = express.Router();

const {
    getOwnerDocuments,
    uploadDocument,
    getTenantDocuments,
    viewDocument,
    downloadDocument,
} = require("../controllers/documentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// ============================================
// OWNER
// ============================================

// Get owner's 2 common documents
router.get(
    "/",
    authMiddleware,
    roleMiddleware("owner"),
    getOwnerDocuments
);

// Upload / replace document
router.post(
    "/upload",
    authMiddleware,
    roleMiddleware("owner"),
    uploadDocument
);

// ============================================
// TENANT
// ============================================

// Get documents of tenant's linked
// property owner
router.get(
    "/tenant",
    authMiddleware,
    roleMiddleware("tenant"),
    getTenantDocuments
);

// ============================================
// VIEW DOCUMENT
// ============================================
router.get(
    "/view/:id",
    authMiddleware,
    viewDocument
);

// ============================================
// DOWNLOAD DOCUMENT
// ============================================
router.get(
    "/download/:id",
    authMiddleware,
    downloadDocument
);

module.exports = router;