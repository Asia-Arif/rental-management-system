const Document = require("../models/Document");

const getOwnerDocuments = async (req, res) => {
    try {
        const documents = await Document.find({
            owner: req.user.id,
        })
            .populate("property", "name")
            .populate("tenant", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            documents,
        });
    } catch (error) {
        console.error("Get documents error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch documents",
        });
    }
};

module.exports = {
    getOwnerDocuments,
};