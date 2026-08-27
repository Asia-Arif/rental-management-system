import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Payments = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // Dummy data for frontend
    const payments = [
        {
            id: 1,
            tenant: "Ali Khan",
            property: "Green Villa",
            amount: 35000,
            dueDate: "01 Aug 2026",
            paidDate: "01 Aug 2026",
            status: "Paid",
        },
        {
            id: 2,
            tenant: "Sara Ahmed",
            property: "City Apartment",
            amount: 28000,
            dueDate: "03 Aug 2026",
            paidDate: "03 Aug 2026",
            status: "Paid",
        },
        {
            id: 3,
            tenant: "Usman Ali",
            property: "Model Town House",
            amount: 40000,
            dueDate: "05 Aug 2026",
            paidDate: "-",
            status: "Pending",
        },
        {
            id: 4,
            tenant: "Ayesha Khan",
            property: "Blue Residency",
            amount: 32000,
            dueDate: "02 Aug 2026",
            paidDate: "02 Aug 2026",
            status: "Paid",
        },
        {
            id: 5,
            tenant: "Hamza Malik",
            property: "Sunrise Apartment",
            amount: 25000,
            dueDate: "01 Aug 2026",
            paidDate: "-",
            status: "Overdue",
        },
    ];

    // Search + filter
    const filteredPayments = payments.filter((payment) => {
        const matchesSearch =
            payment.tenant.toLowerCase().includes(search.toLowerCase()) ||
            payment.property.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || payment.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Statistics
    const paidPayments = payments.filter(
        (payment) => payment.status === "Paid"
    );

    const pendingPayments = payments.filter(
        (payment) => payment.status === "Pending"
    );

    const overduePayments = payments.filter(
        (payment) => payment.status === "Overdue"
    );

    const totalCollected = paidPayments.reduce(
        (total, payment) => total + payment.amount,
        0
    );

    const totalPending = pendingPayments.reduce(
        (total, payment) => total + payment.amount,
        0
    );

    const totalOverdue = overduePayments.reduce(
        (total, payment) => total + payment.amount,
        0
    );

    const formatAmount = (amount) => {
        return `Rs. ${amount.toLocaleString()}`;
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
                            📊
                            <span>Dashboard</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/properties")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            🏠
                            <span>Properties</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/add-property")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            ➕
                            <span>Add Property</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/tenants")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            👥
                            <span>Tenants</span>
                        </button>

                        {/* Active Payments */}
                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            💰
                            <span>Rent Payments</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/maintenance")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            🔧
                            <span>Maintenance</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/notifications")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            🔔
                            <span>Notifications</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/documents")}
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
                                Rent Payments
                            </h2>

                            <p className="text-sm text-slate-500">
                                Track and manage rental payments
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() => navigate("/owner/notifications")}
                                className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                            >
                                🔔

                                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
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
                    <div className="mb-8">

                        <h1 className="text-2xl font-bold text-slate-800">
                            Rent Payment Overview
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Monitor paid, pending and overdue rental payments.
                        </p>

                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                        {/* Collected */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Rent Collected
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-green-600">
                                        {formatAmount(totalCollected)}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        This month
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                    💰
                                </div>

                            </div>

                        </div>

                        {/* Pending */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Pending Rent
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-yellow-600">
                                        {formatAmount(totalPending)}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Awaiting payment
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-2xl">
                                    ⏳
                                </div>

                            </div>

                        </div>

                        {/* Overdue */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Overdue Rent
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-red-600">
                                        {formatAmount(totalOverdue)}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Requires attention
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-2xl">
                                    ⚠️
                                </div>

                            </div>

                        </div>

                        {/* Total Outstanding */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Outstanding
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-blue-600">
                                        {formatAmount(totalPending + totalOverdue)}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Pending + overdue
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                    📊
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Search and Filter */}
                    <div className="mt-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row">

                        <input
                            type="text"
                            placeholder="Search tenant or property..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                        >
                            <option value="All">
                                All Payments
                            </option>

                            <option value="Paid">
                                Paid
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Overdue">
                                Overdue
                            </option>
                        </select>

                    </div>

                    {/* Payment Table */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-200 px-6 py-5">

                            <h2 className="font-semibold text-slate-800">
                                Payment History
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Rental payment records for your tenants.
                            </p>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[950px] text-left">

                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Tenant
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Property
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Amount
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Due Date
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Paid Date
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Receipt
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredPayments.map((payment) => (
                                        <tr
                                            key={payment.id}
                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                        >

                                            {/* Tenant */}
                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                                        {payment.tenant.charAt(0)}
                                                    </div>

                                                    <span className="text-sm font-medium text-slate-700">
                                                        {payment.tenant}
                                                    </span>

                                                </div>

                                            </td>

                                            {/* Property */}
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {payment.property}
                                            </td>

                                            {/* Amount */}
                                            <td className="px-6 py-5 text-sm font-semibold text-slate-700">
                                                {formatAmount(payment.amount)}
                                            </td>

                                            {/* Due Date */}
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {payment.dueDate}
                                            </td>

                                            {/* Paid Date */}
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {payment.paidDate}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-5">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${payment.status === "Paid"
                                                            ? "bg-green-100 text-green-700"
                                                            : payment.status === "Pending"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {payment.status}
                                                </span>

                                            </td>

                                            {/* Receipt */}
                                            <td className="px-6 py-5">

                                                {payment.status === "Paid" ? (
                                                    <button
                                                        onClick={() =>
                                                            navigate("/owner/receipts")
                                                        }
                                                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
                                                    >
                                                        View Receipt
                                                    </button>
                                                ) : (
                                                    <span className="text-xs text-slate-400">
                                                        Not available
                                                    </span>
                                                )}

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                        {/* Empty State */}
                        {filteredPayments.length === 0 && (
                            <div className="p-12 text-center">

                                <div className="text-5xl">
                                    🔍
                                </div>

                                <h3 className="mt-4 font-semibold text-slate-800">
                                    No payments found
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

export default Payments;