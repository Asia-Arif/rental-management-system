import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    MdDashboard,
    MdHome,
    MdAdd,
    MdPeople,
    MdPayments,
    MdBuild,
    MdNotifications,
    MdDescription,
    MdSearch,
} from "react-icons/md";

const Tenants = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const tenants = [
        {
            id: 1,
            name: "Ali Khan",
            email: "ali@example.com",
            phone: "0300-1234567",
            property: "Green Villa",
            rent: "Rs. 35,000",
            dueDate: "01 Sep 2026",
            status: "Active",
        },
        {
            id: 2,
            name: "Sara Ahmed",
            email: "sara@example.com",
            phone: "0312-7654321",
            property: "City Apartment",
            rent: "Rs. 28,000",
            dueDate: "03 Sep 2026",
            status: "Active",
        },
        {
            id: 3,
            name: "Usman Ali",
            email: "usman@example.com",
            phone: "0333-4567890",
            property: "Model Town House",
            rent: "Rs. 40,000",
            dueDate: "05 Sep 2026",
            status: "Active",
        },
        {
            id: 4,
            name: "Ayesha Khan",
            email: "ayesha@example.com",
            phone: "0345-9876543",
            property: "Blue Residency",
            rent: "Rs. 32,000",
            dueDate: "02 Sep 2026",
            status: "Active",
        },
    ];

    const filteredTenants = tenants.filter(
        (tenant) =>
            tenant.name.toLowerCase().includes(search.toLowerCase()) ||
            tenant.property.toLowerCase().includes(search.toLowerCase()) ||
            tenant.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white">

                <div className="flex h-20 items-center border-b border-slate-700 px-6">
                    <div>
                        <h1 className="text-xl font-bold">RentEase</h1>
                        <p className="text-xs text-slate-400">
                            Property Management
                        </p>
                    </div>
                </div>

                <nav className="px-4 py-6">

                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Owner Menu
                    </p>

                    <div className="space-y-2">

                        <button
                            onClick={() => navigate("/owner/dashboard")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <MdDashboard />
                            <span>Dashboard</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/properties")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <MdHome />
                            <span>Properties</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/add-property")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <MdAdd />
                            <span>Add Property</span>
                        </button>

                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            <MdPeople />
                            <span>Tenants</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/payments")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <MdPayments />
                            <span>Rent Payments</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/maintenance")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <MdBuild />
                            <span>Maintenance</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/notifications")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <MdNotifications />
                            <span>Notifications</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/documents")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <MdDescription />
                            <span>Documents</span>
                        </button>

                    </div>
                </nav>
            </aside>

            {/* Main */}
            <div className="ml-64">

                {/* Navbar */}
                <header className="fixed left-64 right-0 top-0 z-40 h-20 border-b border-slate-200 bg-white">

                    <div className="flex h-full items-center justify-between px-8">

                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">
                                Tenants
                            </h2>

                            <p className="text-sm text-slate-500">
                                Manage your property tenants
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() => navigate("/owner/notifications")}
                                className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
                            >
                                <MdNotifications />
                                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                            </button>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                A
                            </div>

                            <button
                                onClick={() => navigate("/login")}
                                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                            >
                                Logout
                            </button>

                        </div>

                    </div>
                </header>

                {/* Content */}
                <main className="px-8 pb-10 pt-28">

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">
                            My Tenants
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            View and manage tenants currently living in your properties.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-slate-500">
                                Total Tenants
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-slate-800">
                                {tenants.length}
                            </h2>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-slate-500">
                                Active Tenants
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-green-600">
                                {tenants.filter(
                                    (tenant) => tenant.status === "Active"
                                ).length}
                            </h2>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-slate-500">
                                Monthly Expected Rent
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-blue-600">
                                Rs. 135K
                            </h2>
                        </div>

                    </div>

                    {/* Search */}
                    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                        <input
                            type="text"
                            placeholder="Search tenant, property or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>

                    {/* Tenant Table */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-200 px-6 py-5">
                            <h2 className="font-semibold text-slate-800">
                                Tenant List
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                All tenants associated with your properties.
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
                                            Contact
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Property
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Monthly Rent
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Due Date
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

                                    {filteredTenants.map((tenant) => (
                                        <tr
                                            key={tenant.id}
                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                        >

                                            {/* Tenant */}
                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                                        {tenant.name.charAt(0)}
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-700">
                                                            {tenant.name}
                                                        </p>

                                                        <p className="text-xs text-slate-500">
                                                            Tenant #{tenant.id}
                                                        </p>
                                                    </div>

                                                </div>

                                            </td>

                                            {/* Contact */}
                                            <td className="px-6 py-5">

                                                <p className="text-sm text-slate-600">
                                                    {tenant.email}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    {tenant.phone}
                                                </p>

                                            </td>

                                            {/* Property */}
                                            <td className="px-6 py-5">

                                                <p className="text-sm font-medium text-slate-700">
                                                    {tenant.property}
                                                </p>

                                            </td>

                                            {/* Rent */}
                                            <td className="px-6 py-5">

                                                <p className="text-sm font-semibold text-slate-700">
                                                    {tenant.rent}
                                                </p>

                                            </td>

                                            {/* Due Date */}
                                            <td className="px-6 py-5">

                                                <p className="text-sm text-slate-600">
                                                    {tenant.dueDate}
                                                </p>

                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-5">

                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                    {tenant.status}
                                                </span>

                                            </td>

                                            {/* Action */}
                                            <td className="px-6 py-5">

                                                <button
                                                    onClick={() =>
                                                        alert(`Viewing ${tenant.name}`)
                                                    }
                                                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                                                >
                                                    View
                                                </button>

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                        {/* Empty */}
                        {filteredTenants.length === 0 && (
                            <div className="p-12 text-center">

                                <div className="text-5xl">
                                    <MdSearch />
                                </div>

                                <h3 className="mt-4 font-semibold text-slate-800">
                                    No tenants found
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Try searching with another name or property.
                                </p>

                            </div>
                        )}

                    </div>

                </main>
            </div>
        </div>
    );
};

export default Tenants;