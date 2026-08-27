import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Rent Payment Reminder",
            message:
                "Your monthly rent of Rs. 35,000 is due in 3 days.",
            date: "27 Aug 2026",
            time: "10:30 AM",
            type: "Rent",
            read: false,
        },
        {
            id: 2,
            title: "Maintenance Request Updated",
            message:
                "Your water leakage maintenance request is now in progress.",
            date: "25 Aug 2026",
            time: "02:15 PM",
            type: "Maintenance",
            read: false,
        },
        {
            id: 3,
            title: "Payment Received",
            message:
                "Your rent payment of Rs. 35,000 has been successfully recorded.",
            date: "01 Aug 2026",
            time: "11:20 AM",
            type: "Payment",
            read: true,
        },
        {
            id: 4,
            title: "New Document Available",
            message:
                "A new rental document has been uploaded to your account.",
            date: "28 Jul 2026",
            time: "04:45 PM",
            type: "Document",
            read: true,
        },
    ]);

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((notification) => ({
                ...notification,
                read: true,
            }))
        );
    };

    const deleteNotification = (id) => {
        setNotifications((prev) =>
            prev.filter((notification) => notification.id !== id)
        );
    };

    const getIcon = (type) => {
        if (type === "Rent") return "💰";
        if (type === "Maintenance") return "🔧";
        if (type === "Payment") return "✅";
        if (type === "Document") return "📄";

        return "🔔";
    };

    const getIconBackground = (type) => {
        if (type === "Rent") return "bg-yellow-100";
        if (type === "Maintenance") return "bg-blue-100";
        if (type === "Payment") return "bg-green-100";
        if (type === "Document") return "bg-purple-100";

        return "bg-slate-100";
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

                        <button
                            onClick={() => navigate("/tenant/dashboard")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            📊
                            <span>Dashboard</span>
                        </button>

                        <button
                            onClick={() => navigate("/tenant/join-property")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            🏠
                            <span>Join Property</span>
                        </button>

                        <button
                            onClick={() => navigate("/tenant/my-property")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            🏡
                            <span>My Property</span>
                        </button>

                        <button
                            onClick={() => navigate("/tenant/rent-payment")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            💰
                            <span>Rent Payment</span>
                        </button>

                        <button
                            onClick={() => navigate("/tenant/maintenance")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            🔧
                            <span>Maintenance</span>
                        </button>

                        {/* Active Notifications */}
                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            🔔
                            <span>Notifications</span>

                            {unreadCount > 0 && (
                                <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => navigate("/tenant/documents")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            📄
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
                                🔔

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
                                onClick={() => navigate("/login")}
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
                                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                            >
                                ✓ Mark All as Read
                            </button>
                        )}

                    </div>

                    {/* Notification List */}
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

                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-6 transition hover:bg-slate-50 ${!notification.read
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
                                                {getIcon(notification.type)}
                                            </div>

                                            {/* Content */}
                                            <div className="min-w-0 flex-1">

                                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                                                    <div>

                                                        <div className="flex items-center gap-2">

                                                            <h3
                                                                className={`font-semibold ${notification.read
                                                                        ? "text-slate-700"
                                                                        : "text-slate-900"
                                                                    }`}
                                                            >
                                                                {notification.title}
                                                            </h3>

                                                            {!notification.read && (
                                                                <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-700">
                                                                    NEW
                                                                </span>
                                                            )}

                                                        </div>

                                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                                            {notification.message}
                                                        </p>

                                                    </div>

                                                    {/* Date */}
                                                    <div className="shrink-0 text-left sm:text-right">

                                                        <p className="text-xs font-medium text-slate-500">
                                                            {notification.date}
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-400">
                                                            {notification.time}
                                                        </p>

                                                    </div>

                                                </div>

                                                {/* Actions */}
                                                <div className="mt-4 flex flex-wrap gap-3">

                                                    {!notification.read && (
                                                        <button
                                                            onClick={() =>
                                                                markAsRead(notification.id)
                                                            }
                                                            className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
                                                        >
                                                            ✓ Mark as Read
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() =>
                                                            deleteNotification(notification.id)
                                                        }
                                                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                                                    >
                                                        🗑 Delete
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                ))}

                            </div>
                        ) : (
                            /* Empty State */
                            <div className="p-16 text-center">

                                <div className="text-6xl">
                                    🔔
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

                </main>
            </div>
        </div>
    );
};

export default Notifications;