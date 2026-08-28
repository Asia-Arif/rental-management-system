import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaChartBar,
    FaHome,
    FaPlus,
    FaUsers,
    FaMoneyBillWave,
    FaTools,
    FaBell,
    FaFileAlt,
    FaEnvelope,
    FaClock,
    FaSearch,
    FaCheck,
} from "react-icons/fa";

const Notifications = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Rent Payment Received",
            message: "Ali Khan has paid Rs. 35,000 rent for Green Villa.",
            type: "Payment",
            date: "05 Aug 2026",
            time: "10:30 AM",
            read: false,
        },
        {
            id: 2,
            title: "Rent Payment Overdue",
            message: "Hamza Malik's rent payment for Sunrise Apartment is overdue.",
            type: "Payment",
            date: "04 Aug 2026",
            time: "09:15 AM",
            read: false,
        },
        {
            id: 3,
            title: "New Maintenance Request",
            message: "Usman Ali reported a broken bathroom tap at Model Town House.",
            type: "Maintenance",
            date: "03 Aug 2026",
            time: "02:45 PM",
            read: true,
        },
        {
            id: 4,
            title: "Maintenance Request Completed",
            message: "Door lock replacement at Sunrise Apartment has been completed.",
            type: "Maintenance",
            date: "02 Aug 2026",
            time: "04:20 PM",
            read: true,
        },
        {
            id: 5,
            title: "Rent Due Soon",
            message: "Sara Ahmed's rent for City Apartment is due soon.",
            type: "Reminder",
            date: "01 Aug 2026",
            time: "08:00 AM",
            read: false,
        },
    ]);

    const filteredNotifications = notifications.filter((notification) => {
        const matchesSearch =
            notification.title.toLowerCase().includes(search.toLowerCase()) ||
            notification.message.toLowerCase().includes(search.toLowerCase());

        const matchesType =
            typeFilter === "All" || notification.type === typeFilter;

        return matchesSearch && matchesType;
    });

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    const paymentNotifications = notifications.filter(
        (notification) => notification.type === "Payment"
    ).length;

    const maintenanceNotifications = notifications.filter(
        (notification) => notification.type === "Maintenance"
    ).length;

    const markAsRead = (id) => {
        setNotifications((currentNotifications) =>
            currentNotifications.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications((currentNotifications) =>
            currentNotifications.map((notification) => ({
                ...notification,
                read: true,
            }))
        );
    };

    const getIcon = (type) => {
        if (type === "Payment") {
            return <FaMoneyBillWave />;
        }

        if (type === "Maintenance") {
            return <FaTools />;
        }

        return <FaClock />;
    };

    const getIconBackground = (type) => {
        if (type === "Payment") {
            return "bg-green-100";
        }

        if (type === "Maintenance") {
            return "bg-blue-100";
        }

        return "bg-yellow-100";
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white">

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
                        Owner Menu
                    </p>

                    <div className="space-y-2">

                        <button
                            onClick={() => navigate("/owner/dashboard")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FaChartBar />
                            <span>Dashboard</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/properties")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FaHome />
                            <span>Properties</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/add-property")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FaPlus />
                            <span>Add Property</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/tenants")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FaUsers />
                            <span>Tenants</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/payments")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FaMoneyBillWave />
                            <span>Rent Payments</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/maintenance")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FaTools />
                            <span>Maintenance</span>
                        </button>

                        {/* Active Notifications */}
                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            <FaBell />
                            <span>Notifications</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/documents")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FaFileAlt />
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
                                Stay updated with your property activities
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() => navigate("/owner/notifications")}
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
                            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Mark All as Read
                        </button>

                    </div>

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
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
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

                            {filteredNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`flex flex-col gap-4 border-b border-slate-100 px-6 py-5 transition last:border-0 md:flex-row md:items-center ${!notification.read
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
                                        {getIcon(notification.type)}
                                    </div>

                                    {/* Notification Details */}
                                    <div className="flex-1">

                                        <div className="flex flex-wrap items-center gap-2">

                                            <h3 className="text-sm font-semibold text-slate-800">
                                                {notification.title}
                                            </h3>

                                            {!notification.read && (
                                                <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-700">
                                                    NEW
                                                </span>
                                            )}

                                        </div>

                                        <p className="mt-1 text-sm text-slate-600">
                                            {notification.message}
                                        </p>

                                        <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                                            <span>
                                                {notification.date}
                                            </span>

                                            <span>
                                                •
                                            </span>

                                            <span>
                                                {notification.time}
                                            </span>

                                            <span>
                                                •
                                            </span>

                                            <span>
                                                {notification.type}
                                            </span>
                                        </div>

                                    </div>

                                    {/* Action */}
                                    <div className="shrink-0">

                                        {!notification.read ? (
                                            <button
                                                onClick={() => markAsRead(notification.id)}
                                                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
                                            >
                                                Mark as Read
                                            </button>
                                        ) : (
                                            <span className="text-xs font-medium text-green-600">
                                                <FaCheck className="mr-1 inline" /> Read
                                            </span>
                                        )}

                                    </div>

                                </div>
                            ))}

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
                                    Try changing your search or filter.
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