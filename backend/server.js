const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const documentRoutes = require("./routes/documentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/dashboard", dashboardRoutes);


// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Rental Management API is running",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});