import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    BarChart3,
    House,
    Plus,
    Users,
    CircleDollarSign,
    Wrench,
    Bell,
    FileText,
    Search,
    FilePenLine,
} from "lucide-react";

const Documents = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Please login first.");
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    "http://localhost:5000/api/documents",
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
                        data.message || "Failed to fetch documents"
                    );
                }

                setDocuments(data.documents || []);
            } catch (error) {
                console.error("Documents fetch error:", error);
                setError(error.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    const filteredDocuments = documents.filter((document) => {
        const name = document.name || "";
        const property = document.property || "";
        const tenant = document.tenant || "";

        const matchesSearch =
            name.toLowerCase().includes(search.toLowerCase()) ||
            property.toLowerCase().includes(search.toLowerCase()) ||
            tenant.toLowerCase().includes(search.toLowerCase());

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

    const rentReceipts = documents.filter(
        (document) => document.type === "Rent Receipt"
    ).length;

    const viewDocument = (document) => {
        if (!document.url) {
            alert("Document URL is not available.");
            return;
        }

        window.open(document.url, "_blank");
    };

    const downloadDocument = (document) => {
        if (!document.url) {
            alert("Document URL is not available.");
            return;
        }

        const link = document.createElement("a");

        link.href = document.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.download = document.name || "receipt.pdf";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                            <BarChart3 />
                            <span>Dashboard</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/properties")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <House />
                            <span>Properties</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/add-property")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Plus />
                            <span>Add Property</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/tenants")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Users />
                            <span>Tenants</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/payments")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <CircleDollarSign />
                            <span>Rent Payments</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/maintenance")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Wrench />
                            <span>Maintenance</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/notifications")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Bell />
                            <span>Notifications</span>
                        </button>

                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            <FileText />
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
                                <Bell />

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
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">

                        {/* Total Documents */}
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
                                    <FileText />
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
                                    <FilePenLine />
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
                                    <House />
                                </div>

                            </div>
                        </div>

                        {/* Rent Receipts */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Rent Receipts
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-blue-600">
                                        {rentReceipts}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Payment receipts
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                    <CircleDollarSign />
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

                            <option value="Rent Receipt">
                                Rent Receipt
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

                                    {loading ? (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="px-6 py-12 text-center text-sm text-slate-500"
                                            >
                                                Loading documents...
                                            </td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="px-6 py-12 text-center text-sm text-red-500"
                                            >
                                                {error}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredDocuments.map((document) => (
                                            <tr
                                                key={document._id || document.id}
                                                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                            >

                                                {/* Document */}
                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-3">

                                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-lg">
                                                            <FileText />
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
                                                    {document.property || "N/A"}
                                                </td>

                                                {/* Tenant */}
                                                <td className="px-6 py-5 text-sm text-slate-600">
                                                    {document.tenant || "N/A"}
                                                </td>

                                                {/* Date */}
                                                <td className="px-6 py-5 text-sm text-slate-600">
                                                    {document.date || "N/A"}
                                                </td>

                                                {/* Size */}
                                                <td className="px-6 py-5 text-sm text-slate-600">
                                                    {document.size || "N/A"}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-2">

                                                        <button
                                                            onClick={() =>
                                                                viewDocument(document)
                                                            }
                                                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
                                                        >
                                                            View
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                downloadDocument(
                                                                    document
                                                                )
                                                            }
                                                            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
                                                        >
                                                            Download
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        ))
                                    )}

                                </tbody>

                            </table>

                        </div>

                        {/* Empty State */}
                        {!loading &&
                            !error &&
                            filteredDocuments.length === 0 && (
                                <div className="p-12 text-center">

                                    <div className="flex justify-center text-slate-400">
                                        <Search size={48} />
                                    </div>

                                    <h3 className="mt-4 font-semibold text-slate-800">
                                        No documents found
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Receipts will appear here after tenants
                                        make rent payments.
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