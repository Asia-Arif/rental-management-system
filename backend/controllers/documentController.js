const Document = require("../models/Document");
const Property = require("../models/Property");
const https = require("https");

const cloudinaryConfig = require("../config/cloudinary");

const cloudinary =
    cloudinaryConfig.cloudinary ||
    cloudinaryConfig;

const ALLOWED_DOCUMENT_TYPES = [
    "Rental Agreement",
    "Property Rules & Regulations",
];

// ============================================
// FORMAT FILE SIZE
// ============================================
const formatFileSize = (bytes) => {
    if (!bytes || bytes <= 0) {
        return "";
    }

    const kb = bytes / 1024;

    if (kb < 1024) {
        return `${kb.toFixed(0)} KB`;
    }

    const mb = kb / 1024;

    return `${mb.toFixed(2)} MB`;
};

// ============================================
// FORMAT DOCUMENT FOR FRONTEND
// ============================================
const formatDocument = (document) => {
    return {
        _id: document._id,
        name: document.name,
        type: document.type,

        // Cloudinary URL
        url: document.fileUrl,
        fileUrl: document.fileUrl,

        size: document.fileSize || "N/A",

        date: document.uploadedAt
            ? new Date(
                  document.uploadedAt
              ).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              })
            : "N/A",

        uploadedAt: document.uploadedAt,
    };
};

// ============================================
// CHECK DOCUMENT ACCESS
// ============================================
const checkDocumentAccess = async (
    document,
    user
) => {
    if (!document || !user) {
        return false;
    }

    // Owner can access own documents
    if (
        document.owner.toString() ===
        user.id.toString()
    ) {
        return true;
    }

    // Tenant can access documents of
    // the owner of tenant's linked property
    if (user.role === "tenant") {
        const property =
            await Property.findOne({
                tenant: user.id,
                owner: document.owner,
            }).select("_id");

        if (property) {
            return true;
        }
    }

    return false;
};

// ============================================
// GET OWNER DOCUMENTS
// ============================================
const getOwnerDocuments = async (
    req,
    res
) => {
    try {
        const documents =
            await Document.find({
                owner: req.user.id,
            }).sort({
                createdAt: -1,
            });

        res.status(200).json({
            success: true,
            documents:
                documents.map(
                    formatDocument
                ),
        });
    } catch (error) {
        console.error(
            "Get owner documents error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to fetch documents.",
        });
    }
};

// ============================================
// OWNER - UPLOAD DOCUMENT
// ============================================
const uploadDocument = async (
    req,
    res
) => {
    try {
        const {
            type,
            fileName,
            fileData,
            fileType,
        } = req.body;

        // ========================================
        // VALIDATION
        // ========================================
        if (
            !type ||
            !fileName ||
            !fileData
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Document type and PDF file are required.",
            });
        }

        if (
            !ALLOWED_DOCUMENT_TYPES.includes(
                type
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid document type.",
            });
        }

        if (
            fileType &&
            fileType !== "application/pdf"
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Only PDF files are allowed.",
            });
        }

        if (
            !fileName
                .toLowerCase()
                .endsWith(".pdf")
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Please upload a PDF file.",
            });
        }

        // ========================================
        // CHECK BASE64 DATA
        // ========================================
        const base64Part =
            fileData.includes(",")
                ? fileData.split(",")[1]
                : fileData;

        if (!base64Part) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid PDF file data.",
            });
        }

        // ========================================
        // CALCULATE FILE SIZE
        // ========================================
        const fileSizeBytes =
            Math.floor(
                (base64Part.length * 3) / 4
            );

        // Maximum 7 MB
        if (
            fileSizeBytes >
            7 * 1024 * 1024
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "PDF size must be less than 7 MB.",
            });
        }

        // ========================================
        // FIND EXISTING DOCUMENT
        // ========================================
        const existingDocument =
            await Document.findOne({
                owner: req.user.id,
                type,
            });

        // ========================================
        // CLOUDINARY PUBLIC ID
        // ========================================
        const cleanType =
            type
                .toLowerCase()
                .replace(
                    /[^a-z0-9]+/g,
                    "-"
                );

        const publicId =
            `owner-${req.user.id}-${cleanType}`;

        // ========================================
        // UPLOAD TO CLOUDINARY
        // ========================================
        const uploadResult =
            await cloudinary.uploader.upload(
                fileData,
                {
                    // PDF upload
                    resource_type: "image",

                    folder:
                        "rental-management/documents",

                    public_id:
                        publicId,

                    format: "pdf",

                    overwrite: true,

                    invalidate: true,
                }
            );

        let document;

        // ========================================
        // UPDATE EXISTING DOCUMENT
        // ========================================
        if (existingDocument) {
            existingDocument.name = type;

            existingDocument.fileUrl =
                uploadResult.secure_url;

            existingDocument.fileSize =
                formatFileSize(
                    fileSizeBytes
                );

            existingDocument.cloudinaryPublicId =
                uploadResult.public_id;

            existingDocument.uploadedAt =
                new Date();

            document =
                await existingDocument.save();
        }

        // ========================================
        // CREATE NEW DOCUMENT
        // ========================================
        else {
            document =
                await Document.create({
                    name: type,

                    type,

                    owner:
                        req.user.id,

                    fileUrl:
                        uploadResult.secure_url,

                    cloudinaryPublicId:
                        uploadResult.public_id,

                    fileSize:
                        formatFileSize(
                            fileSizeBytes
                        ),

                    uploadedAt:
                        new Date(),
                });
        }

        res.status(201).json({
            success: true,

            message:
                `${type} uploaded successfully.`,

            document:
                formatDocument(
                    document
                ),
        });
    } catch (error) {
        console.error(
            "Upload document error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to upload document.",
        });
    }
};

// ============================================
// TENANT - GET DOCUMENTS
// ============================================
const getTenantDocuments =
    async (req, res) => {
        try {
            // Find tenant's linked property
            const property =
                await Property.findOne({
                    tenant: req.user.id,
                }).select(
                    "_id name address city owner"
                );

            // No linked property
            if (!property) {
                return res.status(200).json({
                    success: true,
                    documents: [],
                    property: null,
                    message:
                        "No property is linked with your account.",
                });
            }

            // Find documents uploaded by
            // the owner of linked property
            const documents =
                await Document.find({
                    owner:
                        property.owner,

                    type: {
                        $in:
                            ALLOWED_DOCUMENT_TYPES,
                    },
                }).sort({
                    createdAt: -1,
                });

            res.status(200).json({
                success: true,

                property,

                documents:
                    documents.map(
                        formatDocument
                    ),
            });
        } catch (error) {
            console.error(
                "Get tenant documents error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Failed to fetch tenant documents.",
            });
        }
    };

// ============================================
// GET CLOUDINARY PDF BUFFER
// ============================================
const getPdfBuffer = (fileUrl) => {
    return new Promise(
        (resolve, reject) => {
            https.get(
                fileUrl,
                (response) => {
                    const chunks = [];

                    response.on(
                        "data",
                        (chunk) => {
                            chunks.push(
                                chunk
                            );
                        }
                    );

                    response.on(
                        "end",
                        () => {
                            if (
                                response.statusCode >=
                                    200 &&
                                response.statusCode <
                                    300
                            ) {
                                resolve(
                                    Buffer.concat(
                                        chunks
                                    )
                                );
                            } else {
                                reject(
                                    new Error(
                                        `Cloudinary returned status ${response.statusCode}`
                                    )
                                );
                            }
                        }
                    );

                    response.on(
                        "error",
                        reject
                    );
                }
            ).on("error", reject);
        }
    );
};

// ============================================
// VIEW DOCUMENT
// ============================================
const viewDocument = async (
    req,
    res
) => {
    try {
        const document =
            await Document.findById(
                req.params.id
            );

        if (!document) {
            return res.status(404).json({
                success: false,
                message:
                    "Document not found.",
            });
        }

        // Check access
        const hasAccess =
            await checkDocumentAccess(
                document,
                req.user
            );

        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not allowed to view this document.",
            });
        }

        // Get PDF from Cloudinary
        const pdfBuffer =
            await getPdfBuffer(
                document.fileUrl
            );

        // Return PDF to browser
        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `inline; filename="${document.name}.pdf"`
        );

        res.setHeader(
            "Content-Length",
            pdfBuffer.length
        );

        res.send(pdfBuffer);
    } catch (error) {
        console.error(
            "View document error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to open document.",
        });
    }
};

// ============================================
// DOWNLOAD DOCUMENT
// ============================================
const downloadDocument =
    async (req, res) => {
        try {
            const document =
                await Document.findById(
                    req.params.id
                );

            if (!document) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Document not found.",
                    });
            }

            // Check access
            const hasAccess =
                await checkDocumentAccess(
                    document,
                    req.user
                );

            if (!hasAccess) {
                return res
                    .status(403)
                    .json({
                        success: false,
                        message:
                            "You are not allowed to download this document.",
                    });
            }

            // Get PDF from Cloudinary
            const pdfBuffer =
                await getPdfBuffer(
                    document.fileUrl
                );

            // Force browser download
            res.setHeader(
                "Content-Type",
                "application/pdf"
            );

            res.setHeader(
                "Content-Disposition",
                `attachment; filename="${document.name}.pdf"`
            );

            res.setHeader(
                "Content-Length",
                pdfBuffer.length
            );

            res.send(pdfBuffer);
        } catch (error) {
            console.error(
                "Download document error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Failed to download document.",
            });
        }
    };

module.exports = {
    getOwnerDocuments,
    uploadDocument,
    getTenantDocuments,
    viewDocument,
    downloadDocument,
};