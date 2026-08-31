const Property = require("../models/Property");

// Add Property
const addProperty = async (req, res) => {
    try {
        const {
            name,
            address,
            city,
            propertyType,
            rent,
            bedrooms,
            bathrooms,
            description,
        } = req.body;

        if (!name || !address || !city || !propertyType || !rent) {
            return res.status(400).json({
                message: "Please provide all required fields",
            });
        }

        const property = await Property.create({
            owner: req.user.id,
            name,
            address,
            city,
            propertyType,
            rent,
            bedrooms,
            bathrooms,
            description,
        });

        res.status(201).json({
            message: "Property added successfully",
            property,
        });
    } catch (error) {
        console.error("Add property error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

// Get Owner Properties
const getOwnerProperties = async (req, res) => {
    try {
        const properties = await Property.find({
            owner: req.user.id,
        }).populate("tenant", "name email");

        res.status(200).json({
            properties,
        });
    } catch (error) {
        console.error("Get properties error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

// Get Single Property
const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findOne({
            _id: req.params.id,
            owner: req.user.id,
        }).populate("tenant", "name email");

        if (!property) {
            return res.status(404).json({
                message: "Property not found",
            });
        }

        res.status(200).json({
            property,
        });
    } catch (error) {
        console.error("Get property error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

// Update Property
const updateProperty = async (req, res) => {
    try {
        const property = await Property.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.user.id,
            },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!property) {
            return res.status(404).json({
                message: "Property not found",
            });
        }

        res.status(200).json({
            message: "Property updated successfully",
            property,
        });
    } catch (error) {
        console.error("Update property error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

// Delete Property
const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id,
        });

        if (!property) {
            return res.status(404).json({
                message: "Property not found",
            });
        }

        res.status(200).json({
            message: "Property deleted successfully",
        });
    } catch (error) {
        console.error("Delete property error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = {
    addProperty,
    getOwnerProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
};