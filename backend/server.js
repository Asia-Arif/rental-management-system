require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const documentRoutes = require("./routes/documentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const {
    startRentReminderService,
} = require("./services/rentReminderService");

const app = express();

// =====================================================
// MIDDLEWARE
// =====================================================
app.use(cors());

app.use(
    express.json({
        limit: "10mb",
    })
);

// =====================================================
// MONGODB
// =====================================================
connectDB();

// =====================================================
// ROUTES
// =====================================================
app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/properties",
    propertyRoutes
);

app.use(
    "/api/payments",
    paymentRoutes
);

app.use(
    "/api/tenants",
    tenantRoutes
);

app.use(
    "/api/maintenance",
    maintenanceRoutes
);

app.use(
    "/api/notifications",
    notificationRoutes
);

app.use(
    "/api/documents",
    documentRoutes
);

app.use(
    "/api/dashboard",
    dashboardRoutes
);

// =====================================================
// TEST ROUTE
// =====================================================
app.get("/", (req, res) => {
    res.json({
        message:
            "Rental Management API is running",
    });
});

// =====================================================
// PORT
// =====================================================
const PORT =
    process.env.PORT || 5000;

// =====================================================
// START SERVER
// =====================================================
app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );

    // Start rent reminder cron job
    startRentReminderService();
});