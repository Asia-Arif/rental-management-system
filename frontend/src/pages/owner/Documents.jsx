import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Documents = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");

    const documents = [
        {
            id: 1,
            name: "Green Villa Rental Agreement",
            type: "Rental Agreement",
            property: "Green Villa",
            tenant: "Ali Khan",
            date: "01 Aug 2026",
            size: "2.4 MB",
        },
        {
            id: 2,
            name: "City Apartment Rental Agreement",
            type: "Rental Agreement",
            property: "City Apartment",
            tenant: "Sara Ahmed",
            date: "03 Aug 2026",
            size: "1.8 MB",
        },
        {
            id: 3,
            name: "Model Town House Property Document",
            type: "Property Document",
            property: "Model Town House",
            tenant: "Usman Ali",
            date: "05 Aug 2026",
            size: "3.2 MB",
        },
        {
            id: 4,
            name: "Blue Residency Rental Agreement",
            type: "Rental Agreement",
            property: "Blue Residency",
            tenant: "Ayesha Khan",
            date: "02 Aug 2026",
            size: "2.1 MB",
        },
        {
            id: 5,
            name: "Sunrise Apartment Property Document",
            type: "Property Document",
            property: "Sunrise Apartment",
            tenant: "Hamza Malik",
            date: "01 Aug 2026",
            size: "2.7 MB",
        },
    ];

    const filteredDocuments = documents.filter((document) => {
        const matchesSearch =
            document.name.toLowerCase().includes(search.toLowerCase()) ||
            document.property.toLowerCase().includes(search.toLowerCase()) ||
            document.tenant.toLowerCase().includes(search.toLowerCase());

        const matchesType =
            typeFilter === "All" || document.type === typeFilter;

        return matchesSearch && matchesType;
    });

    const rentalAgreements = documents.filter(
        (document) => document.type === "Rental Agreement"
    ).length;

    const propertyDocuments = documents.filter(
        (document) => document.type === "Property Document"
    ).length;

    const viewDocument = (document) => {
        alert(
            `Document: ${document.name}\n\nProperty: ${document.property}\nTenant: ${document.tenant}`
        );
    };

    const downloadDocument = (document) => {
        alert(`Download started for: ${document.name}`);
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

                        <button
                            onClick={() => navigate("/owner/payments")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
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

                        {/* Active Documents */}
                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
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
                                Documents
                            </h2>

                            <p className="text-sm text-slate-500">
                                Manage property and rental documents
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
                            Document Management
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Access and manage your property and tenant documents.
                        </p>

                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                        {/* Total */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Total Documents
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-slate-800">
                                        {documents.length}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        All available documents
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                    📄
                                </div>

                            </div>

                        </div>

                        {/* Rental Agreements */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Rental Agreements
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-green-600">
                                        {rentalAgreements}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Tenant agreements
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                    📝
                                </div>

                            </div>

                        </div>

                        {/* Property Documents */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Property Documents
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-purple-600">
                                        {propertyDocuments}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Property related files
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                                    🏠
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Search + Filter */}
                    <div className="mt-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row">

                        <input
                            type="text"
                            placeholder="Search document, property or tenant..."
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
                                All Documents
                            </option>

                            <option value="Rental Agreement">
                                Rental Agreement
                            </option>

                            <option value="Property Document">
                                Property Document
                            </option>
                        </select>

                    </div>

                    {/* Documents Table */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-200 px-6 py-5">

                            <h2 className="font-semibold text-slate-800">
                                Document Library
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Your property and tenant related documents.
                            </p>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1000px] text-left">

                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Document
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Type
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Property
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Tenant
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Date
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Size
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredDocuments.map((document) => (
                                        <tr
                                            key={document.id}
                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                        >

                                            {/* Document */}
                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-lg">
                                                        📄
                                                    </div>

                                                    <span className="text-sm font-medium text-slate-700">
                                                        {document.name}
                                                    </span>

                                                </div>

                                            </td>

                                            {/* Type */}
                                            <td className="px-6 py-5">

                                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                                    {document.type}
                                                </span>

                                            </td>

                                            {/* Property */}
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {document.property}
                                            </td>

                                            {/* Tenant */}
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {document.tenant}
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {document.date}
                                            </td>

                                            {/* Size */}
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {document.size}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-2">

                                                    <button
                                                        onClick={() => viewDocument(document)}
                                                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        onClick={() => downloadDocument(document)}
                                                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
                                                    >
                                                        Download
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                        {/* Empty State */}
                        {filteredDocuments.length === 0 && (
                            <div className="p-12 text-center">

                                <div className="text-5xl">
                                    🔍
                                </div>

                                <h3 className="mt-4 font-semibold text-slate-800">
                                    No documents found
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

export default Documents;