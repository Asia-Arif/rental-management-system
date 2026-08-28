import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiBarChart2,
    FiHome,
    FiDollarSign,
    FiTool,
    FiBell,
    FiFileText,
    FiFile,
    FiEye,
    FiDownload,
    FiSearch,
} from "react-icons/fi";

const Documents = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const documents = [
        {
            id: 1,
            name: "Rental Agreement",
            type: "Agreement",
            date: "01 Aug 2026",
            size: "2.4 MB",
            status: "Active",
        },
        {
            id: 2,
            name: "Rent Receipt - August 2026",
            type: "Receipt",
            date: "01 Aug 2026",
            size: "850 KB",
            status: "Available",
        },
        {
            id: 3,
            name: "Property Rules & Regulations",
            type: "Property",
            date: "01 Aug 2026",
            size: "1.2 MB",
            status: "Available",
        },
        {
            id: 4,
            name: "Rent Receipt - July 2026",
            type: "Receipt",
            date: "01 Jul 2026",
            size: "820 KB",
            status: "Available",
        },
    ];

    const filteredDocuments = documents.filter((document) =>
        document.name.toLowerCase().includes(search.toLowerCase())
    );

    const getIcon = (type) => {
        if (type === "Agreement") return <FiFile />;
        if (type === "Receipt") return <FiFileText />;
        if (type === "Property") return <FiHome />;

        return <FiFileText />;
    };

    const getIconBackground = (type) => {
        if (type === "Agreement") return "bg-blue-100";
        if (type === "Receipt") return "bg-green-100";
        if (type === "Property") return "bg-purple-100";

        return "bg-slate-100";
    };

    const handleView = (document) => {
        alert(`Opening: ${document.name}`);
    };

    const handleDownload = (document) => {
        alert(`Downloading: ${document.name}`);
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
                            <FiBarChart2 />
                            <span>Dashboard</span>
                        </button>

                        <button
                            onClick={() => navigate("/tenant/join-property")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiHome />
                            <span>Join Property</span>
                        </button>

                        <button
                            onClick={() => navigate("/tenant/my-property")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiHome />
                            <span>My Property</span>
                        </button>

                        <button
                            onClick={() => navigate("/tenant/rent-payment")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiDollarSign />
                            <span>Rent Payment</span>
                        </button>

                        <button
                            onClick={() => navigate("/tenant/maintenance")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiTool />
                            <span>Maintenance</span>
                        </button>

                        <button
                            onClick={() => navigate("/tenant/notifications")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiBell />
                            <span>Notifications</span>
                        </button>

                        {/* Active Documents */}
                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
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
                                Documents
                            </h2>

                            <p className="text-sm text-slate-500">
                                Access your rental documents and receipts
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() => navigate("/tenant/notifications")}
                                className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                            >
                                <FiBell />
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
                            My Documents
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            View and manage documents related to your rental property.
                        </p>

                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Total Documents
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-slate-800">
                                        {documents.length}
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                    <FiFileText />
                                </div>

                            </div>

                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Agreements
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-blue-600">
                                        {
                                            documents.filter(
                                                (document) => document.type === "Agreement"
                                            ).length
                                        }
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                    <FiFile />
                                </div>

                            </div>

                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Receipts
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-green-600">
                                        {
                                            documents.filter(
                                                (document) => document.type === "Receipt"
                                            ).length
                                        }
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                    <FiFileText />
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Search */}
                    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                        <input
                            type="text"
                            placeholder="Search documents..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>

                    {/* Documents */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-200 px-6 py-5">

                            <h2 className="font-semibold text-slate-800">
                                Available Documents
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Documents uploaded by your property owner.
                            </p>

                        </div>

                        {filteredDocuments.length > 0 ? (

                            <div className="divide-y divide-slate-100">

                                {filteredDocuments.map((document) => (

                                    <div
                                        key={document.id}
                                        className="p-6 transition hover:bg-slate-50"
                                    >

                                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                                            {/* Document Information */}
                                            <div className="flex items-center gap-4">

                                                <div
                                                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl ${getIconBackground(
                                                        document.type
                                                    )}`}
                                                >
                                                    {getIcon(document.type)}
                                                </div>

                                                <div>

                                                    <h3 className="font-semibold text-slate-800">
                                                        {document.name}
                                                    </h3>

                                                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">

                                                        <span>
                                                            {document.type}
                                                        </span>

                                                        <span>•</span>

                                                        <span>
                                                            {document.date}
                                                        </span>

                                                        <span>•</span>

                                                        <span>
                                                            {document.size}
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>

                                            {/* Status + Actions */}
                                            <div className="flex flex-wrap items-center gap-3">

                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                    {document.status}
                                                </span>

                                                <button
                                                    onClick={() => handleView(document)}
                                                    className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
                                                >
                                                    <FiEye className="mr-1 inline-block" />
                                                    View
                                                </button>

                                                <button
                                                    onClick={() => handleDownload(document)}
                                                    className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
                                                >
                                                    <FiDownload className="mr-1 inline-block" />
                                                    Download
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        ) : (

                            <div className="p-12 text-center">

                                <div className="text-5xl">
                                    <FiSearch className="mx-auto" />
                                </div>

                                <h3 className="mt-4 font-semibold text-slate-800">
                                    No documents found
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Try searching with a different document name.
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