import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    BarChart3,
    Home,
    House,
    Wallet,
    Wrench,
    Bell,
    FileText,
    CheckCircle,
    Trash2,
    Check,
} from "lucide-react";

const Notifications = () => {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [markingId, setMarkingId] = useState(null);
    const [markingAll, setMarkingAll] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

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
                    error.message || "Failed to fetch notifications"
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
            setMarkingId(id);

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

            setNotifications((previousNotifications) =>
                previousNotifications.map((notification) =>
                    notification._id === id
                        ? {
                              ...notification,
                              read: true,
                          }
                        : notification
                )
            );
        } catch (error) {
            console.error(
                "Mark notification as read error:",
                error
            );

            alert(
                error.message ||
                    "Failed to mark notification as read"
            );
        } finally {
            setMarkingId(null);
        }
    };


    // Mark all notifications as read
    const markAllAsRead = async () => {
        try {
            setMarkingAll(true);

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

            setNotifications((previousNotifications) =>
                previousNotifications.map((notification) => ({
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
        } finally {
            setMarkingAll(false);
        }
    };


    // Delete notification permanently from database
    const deleteNotification = async (id) => {
        try {
            setDeletingId(id);

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `http://localhost:5000/api/notifications/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete notification"
                );
            }

            // Remove notification from UI after successful database deletion
            setNotifications((previousNotifications) =>
                previousNotifications.filter(
                    (notification) => notification._id !== id
                )
            );
        } catch (error) {
            console.error(
                "Delete notification error:",
                error
            );

            alert(
                error.message ||
                    "Failed to delete notification"
            );
        } finally {
            setDeletingId(null);
        }
    };


    // Unread count
    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;


    // Notification icon
    const getIcon = (type) => {
        if (type === "Payment") {
            return <Wallet size={22} />;
        }

        if (type === "Maintenance") {
            return <Wrench size={22} />;
        }

        if (type === "Reminder") {
            return <CheckCircle size={22} />;
        }

        return <Bell size={22} />;
    };


    // Notification icon background
    const getIconBackground = (type) => {
        if (type === "Payment") {
            return "bg-green-100";
        }

        if (type === "Maintenance") {
            return "bg-blue-100";
        }

        if (type === "Reminder") {
            return "bg-yellow-100";
        }

        return "bg-slate-100";
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

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white shadow-xl">

                {/* Logo */}
                <div className="flex h-20 items-center border-b border-slate-700 px-6">
                    <div>
                        <h1 className="text-xl font-bold">
                            RentEase
                        </h1>

                        <p className="text-xs text-slate-400">
                            Property Management
                        </p>
                    </div>
                </div>


                {/* Navigation */}
                <nav className="px-4 py-6">

                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Tenant Menu
                    </p>

                    <div className="space-y-2">

                        {/* Dashboard */}
                        <button
                            onClick={() =>
                                navigate("/tenant/dashboard")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <BarChart3 size={20} />
                            <span>Dashboard</span>
                        </button>


                        {/* Join Property */}
                        <button
                            onClick={() =>
                                navigate("/tenant/join-property")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Home size={20} />
                            <span>Join Property</span>
                        </button>


                        {/* My Property */}
                        <button
                            onClick={() =>
                                navigate("/tenant/my-property")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <House size={20} />
                            <span>My Property</span>
                        </button>


                        {/* Rent Payment */}
                        <button
                            onClick={() =>
                                navigate("/tenant/rent-payment")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Wallet size={20} />
                            <span>Rent Payment</span>
                        </button>


                        {/* Maintenance */}
                        <button
                            onClick={() =>
                                navigate("/tenant/maintenance")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Wrench size={20} />
                            <span>Maintenance</span>
                        </button>


                        {/* Active Notifications */}
                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            <Bell size={20} />
                            <span>Notifications</span>

                            {unreadCount > 0 && (
                                <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                                    {unreadCount}
                                </span>
                            )}
                        </button>


                        {/* Documents */}
                        <button
                            onClick={() =>
                                navigate("/tenant/documents")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FileText size={20} />
                            <span>Documents</span>
                        </button>

                    </div>
                </nav>
            </aside>


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
                                Stay updated with your rental activities
                            </p>
                        </div>


                        <div className="flex items-center gap-4">

                            {/* Notification Icon */}
                            <div className="relative rounded-full p-2 text-slate-600">
                                <Bell size={20} />

                                {unreadCount > 0 && (
                                    <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                                )}
                            </div>


                            {/* Profile */}
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                T
                            </div>


                            {/* Logout */}
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
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">
                                Your Notifications
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                You have {unreadCount} unread notification
                                {unreadCount !== 1 ? "s" : ""}.
                            </p>
                        </div>


                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                disabled={markingAll}
                                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span className="inline-flex items-center gap-2">

                                    <Check size={16} />

                                    {markingAll
                                        ? "Updating..."
                                        : "Mark All as Read"}

                                </span>
                            </button>
                        )}

                    </div>


                    {/* Loading */}
                    {loading && (
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
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


                    {/* Notification List */}
                    {!loading && !error && (
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                            <div className="border-b border-slate-200 px-6 py-5">

                                <h2 className="font-semibold text-slate-800">
                                    Recent Notifications
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    Important updates about your property and payments.
                                </p>

                            </div>


                            {notifications.length > 0 ? (
                                <div className="divide-y divide-slate-100">

                                    {notifications.map(
                                        (notification) => (
                                            <div
                                                key={notification._id}
                                                className={`p-6 transition hover:bg-slate-50 ${
                                                    !notification.read
                                                        ? "bg-blue-50/40"
                                                        : "bg-white"
                                                }`}
                                            >

                                                <div className="flex gap-4">

                                                    {/* Icon */}
                                                    <div
                                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${getIconBackground(
                                                            notification.type
                                                        )}`}
                                                    >
                                                        {getIcon(
                                                            notification.type
                                                        )}
                                                    </div>


                                                    {/* Content */}
                                                    <div className="min-w-0 flex-1">

                                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                                                            <div>

                                                                <div className="flex items-center gap-2">

                                                                    <h3
                                                                        className={`font-semibold ${
                                                                            notification.read
                                                                                ? "text-slate-700"
                                                                                : "text-slate-900"
                                                                        }`}
                                                                    >
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


                                                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                                                    {
                                                                        notification.message
                                                                    }
                                                                </p>

                                                            </div>


                                                            {/* Date */}
                                                            <div className="shrink-0 text-left sm:text-right">

                                                                <p className="text-xs font-medium text-slate-500">
                                                                    {formatDate(
                                                                        notification.createdAt
                                                                    )}
                                                                </p>

                                                                <p className="mt-1 text-xs text-slate-400">
                                                                    {formatTime(
                                                                        notification.createdAt
                                                                    )}
                                                                </p>

                                                            </div>

                                                        </div>


                                                        {/* Actions */}
                                                        <div className="mt-4 flex flex-wrap gap-3">

                                                            {/* Mark as Read */}
                                                            {!notification.read && (
                                                                <button
                                                                    disabled={
                                                                        markingId ===
                                                                        notification._id
                                                                    }
                                                                    onClick={() =>
                                                                        markAsRead(
                                                                            notification._id
                                                                        )
                                                                    }
                                                                    className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                                >
                                                                    <span className="inline-flex items-center gap-2">

                                                                        <Check size={14} />

                                                                        {markingId ===
                                                                        notification._id
                                                                            ? "Updating..."
                                                                            : "Mark as Read"}

                                                                    </span>
                                                                </button>
                                                            )}


                                                            {/* Delete */}
                                                            <button
                                                                disabled={
                                                                    deletingId ===
                                                                    notification._id
                                                                }
                                                                onClick={() =>
                                                                    deleteNotification(
                                                                        notification._id
                                                                    )
                                                                }
                                                                className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                            >
                                                                <span className="inline-flex items-center gap-2">

                                                                    <Trash2 size={14} />

                                                                    {deletingId ===
                                                                    notification._id
                                                                        ? "Deleting..."
                                                                        : "Delete"}

                                                                </span>
                                                            </button>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>
                            ) : (

                                /* Empty State */
                                <div className="p-16 text-center">

                                    <div className="flex justify-center">
                                        <Bell size={60} />
                                    </div>

                                    <h3 className="mt-5 text-lg font-semibold text-slate-800">
                                        No notifications
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-500">
                                        You're all caught up! New notifications will
                                        appear here.
                                    </p>

                                </div>

                            )}

                        </div>
                    )}

                </main>
            </div>
        </div>
    );
};

export default Notifications;