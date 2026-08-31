const express = require("express");
const router = express.Router();

const {
    getOwnerDocuments,
} = require("../controllers/documentController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getOwnerDocuments);

module.exports = router;