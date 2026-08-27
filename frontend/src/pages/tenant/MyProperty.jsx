import { useNavigate } from "react-router-dom";

const MyProperty = () => {
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

                        {/* Active My Property */}
                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
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

                        <button
                            onClick={() => navigate("/tenant/notifications")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            🔔
                            <span>Notifications</span>
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
                                My Property
                            </h2>

                            <p className="text-sm text-slate-500">
                                View your rental property details
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() => navigate("/tenant/notifications")}
                                className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                            >
                                🔔

                                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                            </button>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                T
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
                    <div className="mb-8">

                        <h1 className="text-2xl font-bold text-slate-800">
                            My Rental Property
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Details about your current rental property and tenancy.
                        </p>

                    </div>

                    {/* Property Header */}
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                        {/* Property Banner */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-8 text-white">

                            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                                <div className="flex items-center gap-5">

                                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-4xl">
                                        🏡
                                    </div>

                                    <div>

                                        <h2 className="text-2xl font-bold">
                                            Green Villa
                                        </h2>

                                        <p className="mt-1 text-sm text-blue-100">
                                            Street 12, Model Town, Lahore
                                        </p>

                                        <span className="mt-3 inline-block rounded-full bg-green-400/20 px-3 py-1 text-xs font-medium text-green-100">
                                            Active Rental
                                        </span>

                                    </div>

                                </div>

                                <div className="text-left md:text-right">

                                    <p className="text-sm text-blue-100">
                                        Monthly Rent
                                    </p>

                                    <p className="mt-1 text-2xl font-bold">
                                        Rs. 35,000
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Property Information */}
                        <div className="p-8">

                            <h2 className="text-lg font-semibold text-slate-800">
                                Property Information
                            </h2>

                            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                                <div className="rounded-lg bg-slate-50 p-5">
                                    <p className="text-xs text-slate-400">
                                        Property Type
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-slate-700">
                                        House
                                    </p>
                                </div>

                                <div className="rounded-lg bg-slate-50 p-5">
                                    <p className="text-xs text-slate-400">
                                        Bedrooms
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-slate-700">
                                        2 Bedrooms
                                    </p>
                                </div>

                                <div className="rounded-lg bg-slate-50 p-5">
                                    <p className="text-xs text-slate-400">
                                        Bathrooms
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-slate-700">
                                        2 Bathrooms
                                    </p>
                                </div>

                                <div className="rounded-lg bg-slate-50 p-5">
                                    <p className="text-xs text-slate-400">
                                        Property Code
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-blue-600">
                                        RE-45821
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Details Grid */}
                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

                        {/* Owner Information */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                                    👤
                                </div>

                                <div>
                                    <h2 className="font-semibold text-slate-800">
                                        Property Owner
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Your landlord information
                                    </p>
                                </div>

                            </div>

                            <div className="mt-6 space-y-4">

                                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                    <span className="text-sm text-slate-500">
                                        Name
                                    </span>

                                    <span className="text-sm font-medium text-slate-700">
                                        Ahmed Khan
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                    <span className="text-sm text-slate-500">
                                        Email
                                    </span>

                                    <span className="text-sm font-medium text-slate-700">
                                        ahmed@example.com
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">
                                        Phone
                                    </span>

                                    <span className="text-sm font-medium text-slate-700">
                                        +92 300 1234567
                                    </span>
                                </div>

                            </div>

                        </div>

                        {/* Tenancy Information */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
                                    📋
                                </div>

                                <div>
                                    <h2 className="font-semibold text-slate-800">
                                        Tenancy Information
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Your rental agreement details
                                    </p>
                                </div>

                            </div>

                            <div className="mt-6 space-y-4">

                                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                    <span className="text-sm text-slate-500">
                                        Start Date
                                    </span>

                                    <span className="text-sm font-medium text-slate-700">
                                        01 Aug 2026
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                    <span className="text-sm text-slate-500">
                                        Rent Due Date
                                    </span>

                                    <span className="text-sm font-medium text-slate-700">
                                        01 of every month
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">
                                        Security Deposit
                                    </span>

                                    <span className="text-sm font-medium text-slate-700">
                                        Rs. 70,000
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                        <h2 className="text-lg font-semibold text-slate-800">
                            Quick Actions
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage your rental from here.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">

                            <button
                                onClick={() => navigate("/tenant/rent-payment")}
                                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                            >
                                💰 Pay Rent
                            </button>

                            <button
                                onClick={() => navigate("/tenant/maintenance")}
                                className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                🔧 Request Maintenance
                            </button>

                            <button
                                onClick={() => navigate("/tenant/documents")}
                                className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                📄 View Documents
                            </button>

                            <button
                                onClick={() => navigate("/tenant/notifications")}
                                className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                🔔 Notifications
                            </button>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
};

export default MyProperty;