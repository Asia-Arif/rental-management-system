import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Maintenance = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const requests = [
        {
            id: 1,
            tenant: "Ali Khan",
            property: "Green Villa",
            issue: "Water leakage in kitchen",
            date: "05 Aug 2026",
            status: "Pending",
        },
        {
            id: 2,
            tenant: "Sara Ahmed",
            property: "City Apartment",
            issue: "Air conditioner not working",
            date: "04 Aug 2026",
            status: "In Progress",
        },
        {
            id: 3,
            tenant: "Usman Ali",
            property: "Model Town House",
            issue: "Broken bathroom tap",
            date: "02 Aug 2026",
            status: "Completed",
        },
        {
            id: 4,
            tenant: "Ayesha Khan",
            property: "Blue Residency",
            issue: "Electrical issue in bedroom",
            date: "01 Aug 2026",
            status: "Pending",
        },
        {
            id: 5,
            tenant: "Hamza Malik",
            property: "Sunrise Apartment",
            issue: "Door lock replacement",
            date: "30 Jul 2026",
            status: "Completed",
        },
    ];

    const filteredRequests = requests.filter((request) => {
        const matchesSearch =
            request.tenant.toLowerCase().includes(search.toLowerCase()) ||
            request.property.toLowerCase().includes(search.toLowerCase()) ||
            request.issue.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || request.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const totalRequests = requests.length;

    const pendingRequests = requests.filter(
        (request) => request.status === "Pending"
    ).length;

    const inProgressRequests = requests.filter(
        (request) => request.status === "In Progress"
    ).length;

    const completedRequests = requests.filter(
        (request) => request.status === "Completed"
    ).length;

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

                        <button
                            onClick={() => navigate("/owner/payments")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            💰
                            <span>Rent Payments</span>
                        </button>

                        {/* Active Maintenance */}
                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
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
                                Maintenance
                            </h2>

                            <p className="text-sm text-slate-500">
                                Manage tenant maintenance requests
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
                            Maintenance Requests
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Track and manage maintenance issues reported by tenants.
                        </p>

                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                        {/* Total */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Total Requests
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-slate-800">
                                        {totalRequests}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        All maintenance requests
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                    🔧
                                </div>

                            </div>

                        </div>

                        {/* Pending */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Pending
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-yellow-600">
                                        {pendingRequests}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Need attention
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-2xl">
                                    ⏳
                                </div>

                            </div>

                        </div>

                        {/* In Progress */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        In Progress
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-blue-600">
                                        {inProgressRequests}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Currently being handled
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                    🛠️
                                </div>

                            </div>

                        </div>

                        {/* Completed */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Completed
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-green-600">
                                        {completedRequests}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Successfully resolved
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                    ✅
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Search + Filter */}
                    <div className="mt-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row">

                        <input
                            type="text"
                            placeholder="Search tenant, property or issue..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                        >
                            <option value="All">
                                All Requests
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Completed">
                                Completed
                            </option>
                        </select>

                    </div>

                    {/* Maintenance Table */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-200 px-6 py-5">

                            <h2 className="font-semibold text-slate-800">
                                Maintenance History
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                View maintenance requests submitted by your tenants.
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
                                            Issue
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Request Date
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Action
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredRequests.map((request) => (
                                        <tr
                                            key={request.id}
                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                        >

                                            {/* Tenant */}
                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                                        {request.tenant.charAt(0)}
                                                    </div>

                                                    <span className="text-sm font-medium text-slate-700">
                                                        {request.tenant}
                                                    </span>

                                                </div>

                                            </td>

                                            {/* Property */}
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {request.property}
                                            </td>

                                            {/* Issue */}
                                            <td className="max-w-xs px-6 py-5 text-sm text-slate-600">
                                                {request.issue}
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {request.date}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-5">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${request.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : request.status === "In Progress"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : "bg-green-100 text-green-700"
                                                        }`}
                                                >
                                                    {request.status}
                                                </span>

                                            </td>

                                            {/* Action */}
                                            <td className="px-6 py-5">

                                                <button
                                                    onClick={() =>
                                                        alert(
                                                            `Maintenance request from ${request.tenant}\n\nIssue: ${request.issue}`
                                                        )
                                                    }
                                                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
                                                >
                                                    View Details
                                                </button>

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                        {/* Empty State */}
                        {filteredRequests.length === 0 && (
                            <div className="p-12 text-center">

                                <div className="text-5xl">
                                    🔍
                                </div>

                                <h3 className="mt-4 font-semibold text-slate-800">
                                    No requests found
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Try changing your search or status filter.
                                </p>

                            </div>
                        )}

                    </div>

                </main>
            </div>
        </div>
    );
};

export default Maintenance;