const Property = require("../models/Property");
const Payment = require("../models/Payment");
const Maintenance = require("../models/Maintenance");

const getOwnerDashboard = async (req, res) => {
    try {
        const ownerId = req.user.id;

        // Current month start and next month start
        const now = new Date();

        const startOfMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        );

        const startOfNextMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        );

        // -----------------------------------
        // PROPERTIES
        // -----------------------------------

        const properties = await Property.find({
            owner: ownerId,
        })
            .populate("tenant", "name email")
            .sort({ createdAt: -1 });

        const totalProperties = properties.length;

        const occupiedProperties = properties.filter(
            (property) => property.status === "Occupied"
        ).length;

        // -----------------------------------
        // TENANTS
        // -----------------------------------

        const tenantIds = properties
            .filter((property) => property.tenant)
            .map((property) => property.tenant._id.toString());

        const totalTenants = [...new Set(tenantIds)].length;

        // -----------------------------------
        // RENT COLLECTED THIS MONTH
        // -----------------------------------

        const monthlyPaidPayments = await Payment.find({
            owner: ownerId,
            status: "Paid",
            paidDate: {
                $gte: startOfMonth,
                $lt: startOfNextMonth,
            },
        });

        const rentCollected = monthlyPaidPayments.reduce(
            (total, payment) => total + payment.amount,
            0
        );

        // -----------------------------------
        // PENDING RENT
        // -----------------------------------

        const pendingPayments = await Payment.find({
            owner: ownerId,
            status: "Pending",
        });

        const pendingRent = pendingPayments.reduce(
            (total, payment) => total + payment.amount,
            0
        );

        // -----------------------------------
        // RECENT PAYMENTS
        // -----------------------------------

        const recentPayments = await Payment.find({
            owner: ownerId,
        })
            .populate("tenant", "name email")
            .populate("property", "name city")
            .sort({ createdAt: -1 })
            .limit(5);

        // -----------------------------------
        // MAINTENANCE REQUESTS
        // -----------------------------------

        const maintenanceRequests = await Maintenance.find({
            owner: ownerId,
            status: {
                $ne: "Completed",
            },
        })
            .populate("property", "name")
            .populate("tenant", "name")
            .sort({ createdAt: -1 })
            .limit(5);

        // -----------------------------------
        // SEND RESPONSE
        // -----------------------------------

        res.status(200).json({
            statistics: {
                totalProperties,
                occupiedProperties,
                totalTenants,
                rentCollected,
                pendingRent,
            },

            recentPayments,

            maintenanceRequests,

            properties,
        });
    } catch (error) {
        console.error("Owner dashboard error:", error);

        res.status(500).json({
            message: "Failed to load owner dashboard",
        });
    }
};

module.exports = {
    getOwnerDashboard,
};