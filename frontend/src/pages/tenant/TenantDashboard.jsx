import { useNavigate } from "react-router-dom";
import {
    FiGrid,
    FiHome,
    FiDollarSign,
    FiTool,
    FiBell,
    FiFileText,
    FiCheckCircle,
    FiCalendar,
    FiSmile,
} from "react-icons/fi";

const TenantDashboard = () => {
    const navigate = useNavigate();

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
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            <FiGrid />
                            <span>Dashboard</span>
                        </button>

                        {/* Join Property */}
                        <button
                            onClick={() => navigate("/tenant/join-property")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiHome />
                            <span>Join Property</span>
                        </button>

                        {/* My Property */}
                        <button
                            onClick={() => navigate("/tenant/my-property")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiHome />
                            <span>My Property</span>
                        </button>

                        {/* Rent Payment */}
                        <button
                            onClick={() => navigate("/tenant/rent-payment")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiDollarSign />
                            <span>Rent Payment</span>
                        </button>

                        {/* Maintenance */}
                        <button
                            onClick={() => navigate("/tenant/maintenance")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiTool />
                            <span>Maintenance</span>
                        </button>

                        {/* Notifications */}
                        <button
                            onClick={() => navigate("/tenant/notifications")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiBell />
                            <span>Notifications</span>
                        </button>

                        {/* Documents */}
                        <button
                            onClick={() => navigate("/tenant/documents")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiFileText />
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
                                Tenant Dashboard
                            </h2>

                            <p className="text-sm text-slate-500">
                                Welcome back! Manage your rental from here.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            {/* Notification */}
                            <button
                                onClick={() => navigate("/tenant/notifications")}
                                className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                            >
                                <FiBell />

                                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                            </button>

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

                    {/* Welcome Section */}
                    <div className="mb-8">

                        <h1 className="text-2xl font-bold text-slate-800">
                            Welcome, Tenant <FiSmile className="inline" />
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
                                        Rs. 35,000
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

                                    <h2 className="mt-2 text-2xl font-bold text-green-600">
                                        Paid
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Current month
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
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
                                        01 Sep 2026
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
                                        Green Villa
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
                                    onClick={() => navigate("/tenant/my-property")}
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
                                            Green Villa
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Street 12, Model Town, Lahore
                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-2">

                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                Active Rental
                                            </span>

                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                                2 Bedrooms
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
                                    onClick={() => navigate("/tenant/rent-payment")}
                                    className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    <FiDollarSign />
                                    <span>Pay Rent</span>
                                </button>

                                <button
                                    onClick={() => navigate("/tenant/maintenance")}
                                    className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    <FiTool />
                                    <span>Request Maintenance</span>
                                </button>

                                <button
                                    onClick={() => navigate("/tenant/documents")}
                                    className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    <FiFileText />
                                    <span>View Documents</span>
                                </button>

                                <button
                                    onClick={() => navigate("/tenant/notifications")}
                                    className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    <FiBell />
                                    <span>View Notifications</span>
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
                                        Your next rent payment of Rs. 35,000 is due on
                                        01 Sep 2026.
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        You will receive a reminder before the due date.
                                    </p>

                                </div>

                            </div>

                            <button
                                onClick={() => navigate("/tenant/rent-payment")}
                                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
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