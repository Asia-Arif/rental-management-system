import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiHome,
    FiDollarSign,
    FiTool,
    FiBell,
    FiFileText,
    FiCheckCircle,
    FiCalendar,
    FiSmile,
} from "react-icons/fi";

import Sidebar from "../../components/Sidebar";

const TenantDashboard = () => {
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [payments, setPayments] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [maintenanceRequests, setMaintenanceRequests] = useState([]);

    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    // =====================================================
    // FETCH TENANT DASHBOARD DATA
    // =====================================================
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setError("");

                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                // =================================================
                // 1. GET TENANT PROPERTY
                // =================================================
                try {
                    const propertyResponse = await fetch(
                        `${API_URL}/tenants/my-property`,
                        {
                            method: "GET",
                            headers,
                        }
                    );

                    const propertyData =
                        await propertyResponse.json();

                    if (
                        propertyResponse.status === 401 ||
                        propertyResponse.status === 403
                    ) {
                        throw new Error(
                            propertyData.message ||
                                "You are not authorized to access this page."
                        );
                    }

                    if (propertyResponse.ok) {
                        setProperty(
                            propertyData.property || null
                        );
                    } else {
                        setProperty(null);
                    }
                } catch (propertyError) {
                    console.error(
                        "Property fetch error:",
                        propertyError
                    );

                    setProperty(null);

                    if (
                        propertyError.message ===
                        "Access denied"
                    ) {
                        setError(
                            "You are not authorized to access tenant property data."
                        );
                    }
                }

                // =================================================
                // 2. GET TENANT PAYMENTS
                // =================================================
                try {
                    const paymentsResponse = await fetch(
                        `${API_URL}/payments/tenant`,
                        {
                            method: "GET",
                            headers,
                        }
                    );

                    const paymentsData =
                        await paymentsResponse.json();

                    if (paymentsResponse.ok) {
                        setPayments(
                            paymentsData.payments || []
                        );
                    } else {
                        console.error(
                            "Payments error:",
                            paymentsData.message
                        );

                        setPayments([]);
                    }
                } catch (paymentsError) {
                    console.error(
                        "Payments fetch error:",
                        paymentsError
                    );

                    setPayments([]);
                }

                // =================================================
                // 3. GET TENANT NOTIFICATIONS
                // =================================================
                try {
                    const notificationsResponse =
                        await fetch(
                            `${API_URL}/notifications`,
                            {
                                method: "GET",
                                headers,
                            }
                        );

                    const notificationsData =
                        await notificationsResponse.json();

                    if (notificationsResponse.ok) {
                        setNotifications(
                            notificationsData.notifications ||
                                []
                        );
                    } else {
                        console.error(
                            "Notifications error:",
                            notificationsData.message
                        );

                        setNotifications([]);
                    }
                } catch (notificationsError) {
                    console.error(
                        "Notifications fetch error:",
                        notificationsError
                    );

                    setNotifications([]);
                }

                // =================================================
                // 4. GET TENANT MAINTENANCE
                // =================================================
                try {
                    const maintenanceResponse =
                        await fetch(
                            `${API_URL}/maintenance/tenant`,
                            {
                                method: "GET",
                                headers,
                            }
                        );

                    const maintenanceData =
                        await maintenanceResponse.json();

                    if (maintenanceResponse.ok) {
                        setMaintenanceRequests(
                            maintenanceData.requests || []
                        );
                    } else {
                        console.error(
                            "Maintenance error:",
                            maintenanceData.message
                        );

                        setMaintenanceRequests([]);
                    }
                } catch (maintenanceError) {
                    console.error(
                        "Maintenance fetch error:",
                        maintenanceError
                    );

                    setMaintenanceRequests([]);
                }
            } catch (error) {
                console.error(
                    "Tenant dashboard error:",
                    error
                );

                setError(
                    error.message ||
                        "Something went wrong while loading dashboard data."
                );
            }
        };

        fetchDashboardData();
    }, [navigate]);

    // =====================================================
    // CURRENT DATE
    // =====================================================
    const today = new Date();

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // =====================================================
    // CURRENT MONTH PAYMENTS
    // =====================================================
    const currentMonthPayments = payments.filter(
        (payment) => {
            if (!payment.paymentDate) {
                return false;
            }

            const paymentDate = new Date(
                payment.paymentDate
            );

            return (
                paymentDate.getMonth() ===
                    currentMonth &&
                paymentDate.getFullYear() ===
                    currentYear
            );
        }
    );

    // =====================================================
    // CURRENT MONTH PAYMENT STATUS
    // =====================================================
    const approvedCurrentMonthPayment =
        currentMonthPayments.find(
            (payment) =>
                payment.status === "Approved"
        );

    const pendingCurrentMonthPayment =
        currentMonthPayments.find(
            (payment) =>
                payment.status === "Pending"
        );

    const rejectedCurrentMonthPayment =
        currentMonthPayments.find(
            (payment) =>
                payment.status === "Rejected"
        );

    let rentStatus = "Payment Due";

    if (approvedCurrentMonthPayment) {
        rentStatus = "Paid";
    } else if (pendingCurrentMonthPayment) {
        rentStatus = "Pending";
    } else if (rejectedCurrentMonthPayment) {
        rentStatus = "Rejected";
    }

    // =====================================================
    // RENT STATUS COLOR
    // =====================================================
    const getRentStatusColor = () => {
        if (rentStatus === "Paid") {
            return "text-green-600";
        }

        if (rentStatus === "Pending") {
            return "text-yellow-600";
        }

        if (rentStatus === "Rejected") {
            return "text-red-600";
        }

        return "text-orange-600";
    };

    // =====================================================
    // RENT STATUS ICON BACKGROUND
    // =====================================================
    const getRentStatusIconBackground = () => {
        if (rentStatus === "Paid") {
            return "bg-green-100";
        }

        if (rentStatus === "Pending") {
            return "bg-yellow-100";
        }

        if (rentStatus === "Rejected") {
            return "bg-red-100";
        }

        return "bg-orange-100";
    };

    // =====================================================
    // NEXT DUE DATE
    // =====================================================
    const calculateNextDueDate = () => {
        if (!property?.dueDate) {
            return null;
        }

        const originalDueDate = new Date(
            property.dueDate
        );

        if (
            Number.isNaN(
                originalDueDate.getTime()
            )
        ) {
            return null;
        }

        const dueDay =
            originalDueDate.getDate();

        let nextDueDate = new Date(
            currentYear,
            currentMonth,
            dueDay
        );

        if (nextDueDate < today) {
            nextDueDate = new Date(
                currentYear,
                currentMonth + 1,
                dueDay
            );
        }

        return nextDueDate;
    };

    const nextDueDate =
        calculateNextDueDate();

    // =====================================================
    // FORMAT DATE
    // =====================================================
    const formatDate = (date) => {
        if (!date) {
            return "Not set";
        }

        const formattedDate =
            new Date(date);

        if (
            Number.isNaN(
                formattedDate.getTime()
            )
        ) {
            return "Not set";
        }

        return formattedDate.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // =====================================================
    // PROPERTY DATA
    // =====================================================
    const monthlyRent =
        property?.rent || 0;

    const propertyName =
        property?.name ||
        "No Property Linked";

    const propertyAddress = property
        ? `${property.address || ""}${
              property.city
                  ? `, ${property.city}`
                  : ""
          }`
        : "No property linked";

    const propertyStatus =
        property?.status === "Occupied"
            ? "Active Rental"
            : property?.status ||
              "Not linked";

    const bedrooms = Number(
        property?.bedrooms || 0
    );

    // =====================================================
    // UNREAD NOTIFICATIONS
    // =====================================================
    const unreadNotifications =
        notifications.filter(
            (notification) =>
                notification.read === false
        ).length;

    // =====================================================
    // ACTIVE MAINTENANCE REQUESTS
    // =====================================================
    const activeMaintenanceRequests =
        maintenanceRequests.filter(
            (request) =>
                request.status ===
                    "Pending" ||
                request.status ===
                    "In Progress"
        ).length;

    // =====================================================
    // LOGOUT
    // =====================================================
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    // =====================================================
    // MAIN UI
    // =====================================================
    return (
        <div className="min-h-screen bg-slate-50">

            {/* COMMON SIDEBAR */}
            <Sidebar role="tenant" />

            {/* Main Content */}
            <div className="ml-64">

                {/* Navbar */}
                <header className="fixed left-64 right-0 top-0 z-40 h-20 border-b border-slate-200 bg-white">

                    <div className="flex h-full items-center justify-between px-8">

                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">
                                Tenant Dashboard
                            </h2>

                            <p className="text-sm text-slate-500">
                                Welcome back! Manage your rental from here.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            {/* Notification */}
                            <button
                                onClick={() =>
                                    navigate(
                                        "/tenant/notifications"
                                    )
                                }
                                className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                            >
                                <FiBell />

                                {unreadNotifications >
                                    0 && (
                                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                                        {
                                            unreadNotifications
                                        }
                                    </span>
                                )}
                            </button>

                            {/* Profile */}
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                T
                            </div>

                            {/* Logout */}
                            <button
                                onClick={
                                    handleLogout
                                }
                                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                            >
                                Logout
                            </button>

                        </div>

                    </div>
                </header>

                {/* Page Content */}
                <main className="px-8 pb-10 pt-28">

                    {/* Error */}
                    {error && (
                        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5">
                            <p className="text-sm font-medium text-red-700">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Welcome Section */}
                    <div className="mb-8">

                        <h1 className="text-2xl font-bold text-slate-800">
                            Welcome, Tenant{" "}
                            <FiSmile className="inline" />
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Here is an overview of your rental property and payments.
                        </p>

                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                        {/* Monthly Rent */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Monthly Rent
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-blue-600">
                                        Rs.{" "}
                                        {Number(
                                            monthlyRent
                                        ).toLocaleString()}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Current monthly rent
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                    <FiDollarSign />
                                </div>

                            </div>

                        </div>

                        {/* Payment Status */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Rent Status
                                    </p>

                                    <h2
                                        className={`mt-2 text-2xl font-bold ${getRentStatusColor()}`}
                                    >
                                        {rentStatus}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Current month
                                    </p>
                                </div>

                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${getRentStatusIconBackground()}`}
                                >
                                    <FiCheckCircle />
                                </div>

                            </div>

                        </div>

                        {/* Next Due Date */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Next Due Date
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-orange-600">
                                        {formatDate(
                                            nextDueDate
                                        )}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Upcoming rent
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl">
                                    <FiCalendar />
                                </div>

                            </div>

                        </div>

                        {/* Property */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        My Property
                                    </p>

                                    <h2 className="mt-2 text-lg font-bold text-slate-800">
                                        {propertyName}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Your current rental
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                                    <FiHome />
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Main Sections */}
                    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

                        {/* Property Card */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

                            <div className="flex items-center justify-between">

                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">
                                        My Rental Property
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Current property details
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/tenant/my-property"
                                        )
                                    }
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    View Property
                                </button>

                            </div>

                            <div className="mt-6 rounded-xl bg-slate-50 p-5">

                                <div className="flex items-start gap-4">

                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                        <FiHome />
                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-slate-800">
                                            {propertyName}
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {propertyAddress}
                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-2">

                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                {propertyStatus}
                                            </span>

                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                                {bedrooms}{" "}
                                                {bedrooms ===
                                                1
                                                    ? "Bedroom"
                                                    : "Bedrooms"}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Quick Actions */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <h2 className="text-lg font-semibold text-slate-800">
                                Quick Actions
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Common tenant actions
                            </p>

                            <div className="mt-5 space-y-3">

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/tenant/rent-payment"
                                        )
                                    }
                                    className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <FiDollarSign />

                                        <span>
                                            Pay Rent
                                        </span>
                                    </div>

                                    {rentStatus ===
                                        "Pending" && (
                                        <span className="text-xs text-yellow-600">
                                            Pending
                                        </span>
                                    )}

                                </button>

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/tenant/maintenance"
                                        )
                                    }
                                    className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <FiTool />

                                        <span>
                                            Request Maintenance
                                        </span>
                                    </div>

                                    {activeMaintenanceRequests >
                                        0 && (
                                        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                                            {
                                                activeMaintenanceRequests
                                            }
                                        </span>
                                    )}

                                </button>

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/tenant/documents"
                                        )
                                    }
                                    className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    <FiFileText />

                                    <span>
                                        View Documents
                                    </span>
                                </button>

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/tenant/notifications"
                                        )
                                    }
                                    className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <FiBell />

                                        <span>
                                            View Notifications
                                        </span>
                                    </div>

                                    {unreadNotifications >
                                        0 && (
                                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                                            {
                                                unreadNotifications
                                            }
                                        </span>
                                    )}

                                </button>

                            </div>

                        </div>

                    </div>

                    {/* Rent Reminder */}
                    <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-6">

                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                            <div className="flex items-start gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                    <FiBell />
                                </div>

                                <div>

                                    <h3 className="font-semibold text-slate-800">
                                        Upcoming Rent Reminder
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-600">
                                        {property
                                            ? `Your next rent payment of Rs. ${Number(
                                                  monthlyRent
                                              ).toLocaleString()} is due on ${formatDate(
                                                  nextDueDate
                                              )}.`
                                            : "You are not currently linked to a rental property."}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        You will receive a reminder before the due date.
                                    </p>

                                </div>

                            </div>

                            <button
                                onClick={() =>
                                    navigate(
                                        "/tenant/rent-payment"
                                    )
                                }
                                disabled={!property}
                                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Pay Rent
                            </button>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
};

export default TenantDashboard;