import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaMoneyBillWave,
    FaTools,
    FaBell,
    FaEnvelope,
    FaClock,
    FaSearch,
    FaCheck,
} from "react-icons/fa";

import Sidebar from "../../components/Sidebar";

const Notifications = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    // Get notifications from backend
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await fetch(
                    "http://localhost:5000/api/notifications",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch notifications"
                    );
                }

                setNotifications(data.notifications || []);
            } catch (error) {
                console.error("Fetch notifications error:", error);

                setError(
                    error.message || "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [navigate]);


    // Mark single notification as read
    const markAsRead = async (id) => {
        try {
            setUpdatingId(id);

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `http://localhost:5000/api/notifications/${id}/read`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to mark notification as read"
                );
            }

            setNotifications((currentNotifications) =>
                currentNotifications.map((notification) =>
                    notification._id === id
                        ? {
                            ...notification,
                            read: true,
                        }
                        : notification
                )
            );
        } catch (error) {
            console.error("Mark notification as read error:", error);

            alert(
                error.message || "Failed to mark notification as read"
            );
        } finally {
            setUpdatingId(null);
        }
    };


    // Mark all notifications as read
    const markAllAsRead = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                "http://localhost:5000/api/notifications/read-all",
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to mark all notifications as read"
                );
            }

            setNotifications((currentNotifications) =>
                currentNotifications.map((notification) => ({
                    ...notification,
                    read: true,
                }))
            );
        } catch (error) {
            console.error(
                "Mark all notifications as read error:",
                error
            );

            alert(
                error.message ||
                "Failed to mark all notifications as read"
            );
        }
    };


    // Search + Filter
    const filteredNotifications = notifications.filter(
        (notification) => {
            const title =
                notification.title?.toLowerCase() || "";

            const message =
                notification.message?.toLowerCase() || "";

            const searchValue =
                search.toLowerCase();

            const matchesSearch =
                title.includes(searchValue) ||
                message.includes(searchValue);

            const matchesType =
                typeFilter === "All" ||
                notification.type === typeFilter;

            return matchesSearch && matchesType;
        }
    );


    // Statistics
    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    const paymentNotifications = notifications.filter(
        (notification) =>
            notification.type === "Payment"
    ).length;

    const maintenanceNotifications = notifications.filter(
        (notification) =>
            notification.type === "Maintenance"
    ).length;


    // Notification icon
    const getIcon = (type) => {
        if (type === "Payment") {
            return <FaMoneyBillWave />;
        }

        if (type === "Maintenance") {
            return <FaTools />;
        }

        return <FaClock />;
    };


    // Notification icon background
    const getIconBackground = (type) => {
        if (type === "Payment") {
            return "bg-green-100";
        }

        if (type === "Maintenance") {
            return "bg-blue-100";
        }

        return "bg-yellow-100";
    };


    // Format date
    const formatDate = (date) => {
        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };


    // Format time
    const formatTime = (date) => {
        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleTimeString(
            "en-US",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };


    return (
        <div className="min-h-screen bg-slate-50">

            {/* Common Sidebar */}
            <Sidebar role="owner" />


            {/* Main Content */}
            <div className="ml-64">

                {/* Navbar */}
                <header className="fixed left-64 right-0 top-0 z-40 h-20 border-b border-slate-200 bg-white">

                    <div className="flex h-full items-center justify-between px-8">

                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">
                                Notifications
                            </h2>

                            <p className="text-sm text-slate-500">
                                Stay updated with your property activities
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() =>
                                    navigate("/owner/notifications")
                                }
                                className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                            >
                                <FaBell />

                                {unreadCount > 0 && (
                                    <span className="absolute right-1 top-1 flex h-2.5 w-2.5 rounded-full bg-red-500" />
                                )}
                            </button>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                A
                            </div>

                            <button
                                onClick={() =>
                                    navigate("/login")
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

                    {/* Heading */}
                    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">
                                Notification Center
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                View important updates about your properties and tenants.
                            </p>
                        </div>

                        <button
                            onClick={markAllAsRead}
                            disabled={
                                notifications.length === 0 ||
                                unreadCount === 0
                            }
                            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Mark All as Read
                        </button>

                    </div>


                    {/* Loading */}
                    {loading && (
                        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                            <p className="text-sm text-slate-500">
                                Loading notifications...
                            </p>
                        </div>
                    )}


                    {/* Error */}
                    {!loading && error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
                            {error}
                        </div>
                    )}


                    {!loading && !error && (
                        <>

                            {/* Statistics */}
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                                {/* Total */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Total Notifications
                                            </p>

                                            <h2 className="mt-2 text-3xl font-bold text-slate-800">
                                                {notifications.length}
                                            </h2>

                                            <p className="mt-1 text-xs text-slate-500">
                                                All notifications
                                            </p>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                            <FaBell />
                                        </div>

                                    </div>

                                </div>


                                {/* Unread */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Unread
                                            </p>

                                            <h2 className="mt-2 text-3xl font-bold text-red-600">
                                                {unreadCount}
                                            </h2>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Need your attention
                                            </p>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-2xl">
                                            <FaEnvelope />
                                        </div>

                                    </div>

                                </div>


                                {/* Payments */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Payment Alerts
                                            </p>

                                            <h2 className="mt-2 text-3xl font-bold text-green-600">
                                                {paymentNotifications}
                                            </h2>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Rent related updates
                                            </p>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                            <FaMoneyBillWave />
                                        </div>

                                    </div>

                                </div>


                                {/* Maintenance */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Maintenance Alerts
                                            </p>

                                            <h2 className="mt-2 text-3xl font-bold text-blue-600">
                                                {maintenanceNotifications}
                                            </h2>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Maintenance updates
                                            </p>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                            <FaTools />
                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* Search + Filter */}
                            <div className="mt-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row">

                                <input
                                    type="text"
                                    placeholder="Search notifications..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                <select
                                    value={typeFilter}
                                    onChange={(e) =>
                                        setTypeFilter(e.target.value)
                                    }
                                    className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                                >
                                    <option value="All">
                                        All Notifications
                                    </option>

                                    <option value="Payment">
                                        Payment
                                    </option>

                                    <option value="Maintenance">
                                        Maintenance
                                    </option>

                                    <option value="Reminder">
                                        Reminder
                                    </option>

                                    <option value="General">
                                        General
                                    </option>

                                </select>

                            </div>


                            {/* Notifications List */}
                            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                                <div className="border-b border-slate-200 px-6 py-5">

                                    <h2 className="font-semibold text-slate-800">
                                        Recent Notifications
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Important updates and alerts for your properties.
                                    </p>

                                </div>


                                <div>

                                    {filteredNotifications.map(
                                        (notification) => (
                                            <div
                                                key={notification._id}
                                                className={`flex flex-col gap-4 border-b border-slate-100 px-6 py-5 transition last:border-0 md:flex-row md:items-center ${
                                                    !notification.read
                                                        ? "bg-blue-50/40"
                                                        : "bg-white"
                                                }`}
                                            >

                                                {/* Icon */}
                                                <div
                                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${getIconBackground(
                                                        notification.type
                                                    )}`}
                                                >
                                                    {getIcon(
                                                        notification.type
                                                    )}
                                                </div>


                                                {/* Notification Details */}
                                                <div className="flex-1">

                                                    <div className="flex flex-wrap items-center gap-2">

                                                        <h3 className="text-sm font-semibold text-slate-800">
                                                            {
                                                                notification.title
                                                            }
                                                        </h3>

                                                        {!notification.read && (
                                                            <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-700">
                                                                NEW
                                                            </span>
                                                        )}

                                                    </div>


                                                    <p className="mt-1 text-sm text-slate-600">
                                                        {
                                                            notification.message
                                                        }
                                                    </p>


                                                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">

                                                        <span>
                                                            {formatDate(
                                                                notification.createdAt
                                                            )}
                                                        </span>

                                                        <span>
                                                            •
                                                        </span>

                                                        <span>
                                                            {formatTime(
                                                                notification.createdAt
                                                            )}
                                                        </span>

                                                        <span>
                                                            •
                                                        </span>

                                                        <span>
                                                            {
                                                                notification.type
                                                            }
                                                        </span>

                                                    </div>

                                                </div>


                                                {/* Action */}
                                                <div className="shrink-0">

                                                    {!notification.read ? (
                                                        <button
                                                            disabled={
                                                                updatingId ===
                                                                notification._id
                                                            }
                                                            onClick={() =>
                                                                markAsRead(
                                                                    notification._id
                                                                )
                                                            }
                                                            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            {updatingId ===
                                                                notification._id
                                                                ? "Updating..."
                                                                : "Mark as Read"}
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs font-medium text-green-600">
                                                            <FaCheck className="mr-1 inline" />
                                                            Read
                                                        </span>
                                                    )}

                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>


                                {/* Empty State */}
                                {filteredNotifications.length === 0 && (
                                    <div className="p-12 text-center">

                                        <div className="text-5xl">
                                            <FaSearch className="mx-auto" />
                                        </div>

                                        <h3 className="mt-4 font-semibold text-slate-800">
                                            No notifications found
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {notifications.length === 0
                                                ? "No notifications are available yet."
                                                : "Try changing your search or filter."}
                                        </p>

                                    </div>
                                )}

                            </div>

                        </>
                    )}

                </main>
            </div>
        </div>
    );
};

export default Notifications;