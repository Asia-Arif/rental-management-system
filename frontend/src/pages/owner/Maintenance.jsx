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
    Clock3,
    CircleCheck,
    Search,
} from "lucide-react";

const Maintenance = () => {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    // Get maintenance requests from backend
    useEffect(() => {
        const fetchMaintenanceRequests = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await fetch(
                    "http://localhost:5000/api/maintenance",
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
                        data.message ||
                        "Failed to fetch maintenance requests"
                    );
                }

                setRequests(data.requests || []);
            } catch (error) {
                console.error("Fetch maintenance error:", error);
                setError(
                    error.message || "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMaintenanceRequests();
    }, [navigate]);

    // Update Maintenance Status
    const updateStatus = async (id, status) => {
        try {
            setUpdatingId(id);

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `http://localhost:5000/api/maintenance/${id}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        status,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update status"
                );
            }

            setRequests((previousRequests) =>
                previousRequests.map((request) =>
                    request._id === id
                        ? data.request
                        : request
                )
            );
        } catch (error) {
            console.error(
                "Update maintenance status error:",
                error
            );

            alert(
                error.message ||
                "Failed to update status"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    // Search + Filter
    const filteredRequests = requests.filter((request) => {
        const tenantName =
            request.tenant?.name?.toLowerCase() || "";

        const propertyName =
            request.property?.name?.toLowerCase() || "";

        const issue =
            request.issue?.toLowerCase() || "";

        const searchValue = search.toLowerCase();

        const matchesSearch =
            tenantName.includes(searchValue) ||
            propertyName.includes(searchValue) ||
            issue.includes(searchValue);

        const matchesStatus =
            statusFilter === "All" ||
            request.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Statistics
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

                        {/* Dashboard */}
                        <button
                            onClick={() =>
                                navigate("/owner/dashboard")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <BarChart3 />
                            <span>Dashboard</span>
                        </button>

                        {/* Properties */}
                        <button
                            onClick={() =>
                                navigate("/owner/properties")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <House />
                            <span>Properties</span>
                        </button>

                        {/* Add Property */}
                        <button
                            onClick={() =>
                                navigate("/owner/add-property")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Plus />
                            <span>Add Property</span>
                        </button>

                        {/* Tenants */}
                        <button
                            onClick={() =>
                                navigate("/owner/tenants")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Users />
                            <span>Tenants</span>
                        </button>

                        {/* Rent Payments */}
                        <button
                            onClick={() =>
                                navigate("/owner/payments")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <CircleDollarSign />
                            <span>Rent Payments</span>
                        </button>

                        {/* Active Maintenance */}
                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            <Wrench />
                            <span>Maintenance</span>
                        </button>

                        {/* Notifications */}
                        <button
                            onClick={() =>
                                navigate(
                                    "/owner/notifications"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Bell />
                            <span>Notifications</span>
                        </button>

                        {/* Documents */}
                        <button
                            onClick={() =>
                                navigate("/owner/documents")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
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
                                Maintenance
                            </h2>

                            <p className="text-sm text-slate-500">
                                Manage tenant maintenance requests
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() =>
                                    navigate(
                                        "/owner/notifications"
                                    )
                                }
                                className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                            >
                                <Bell />

                                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                            </button>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                A
                            </div>

                            <button
                                onClick={() =>
                                    navigate("/login")
                                }
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

                    {/* Loading */}
                    {loading && (
                        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                            <p className="text-sm text-slate-500">
                                Loading maintenance requests...
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {!loading && !error && (
                        <>

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
                                            <Wrench />
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
                                            <Clock3 />
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
                                            <Wrench />
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
                                            <CircleCheck />
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Search + Filter */}
                            <div className="mt-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row">

                                <div className="relative flex-1">

                                    <Search
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Search tenant, property or issue..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                </div>

                                <select
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(
                                            e.target.value
                                        )
                                    }
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

                                            {filteredRequests.map(
                                                (request) => (
                                                    <tr
                                                        key={
                                                            request._id
                                                        }
                                                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                                    >

                                                        {/* Tenant */}
                                                        <td className="px-6 py-5">

                                                            <div className="flex items-center gap-3">

                                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                                                    {request
                                                                        .tenant
                                                                        ?.name
                                                                        ?.charAt(
                                                                            0
                                                                        )
                                                                        ?.toUpperCase() ||
                                                                        "T"}
                                                                </div>

                                                                <div>
                                                                    <span className="text-sm font-medium text-slate-700">
                                                                        {request
                                                                            .tenant
                                                                            ?.name ||
                                                                            "Unknown Tenant"}
                                                                    </span>

                                                                    {request
                                                                        .tenant
                                                                        ?.email && (
                                                                            <p className="mt-1 text-xs text-slate-400">
                                                                                {
                                                                                    request
                                                                                        .tenant
                                                                                        .email
                                                                                }
                                                                            </p>
                                                                        )}
                                                                </div>

                                                            </div>

                                                        </td>

                                                        {/* Property */}
                                                        <td className="px-6 py-5">

                                                            <div>

                                                                <p className="text-sm font-medium text-slate-700">
                                                                    {request
                                                                        .property
                                                                        ?.name ||
                                                                        "Unknown Property"}
                                                                </p>

                                                                <p className="mt-1 text-xs text-slate-400">
                                                                    {request
                                                                        .property
                                                                        ?.city ||
                                                                        ""}
                                                                </p>

                                                            </div>

                                                        </td>

                                                        {/* Issue */}
                                                        <td className="max-w-xs px-6 py-5 text-sm text-slate-600">
                                                            {request.issue ||
                                                                "-"}
                                                        </td>

                                                        {/* Date */}
                                                        <td className="px-6 py-5 text-sm text-slate-600">

                                                            {request.createdAt
                                                                ? new Date(
                                                                    request.createdAt
                                                                ).toLocaleDateString(
                                                                    "en-GB",
                                                                    {
                                                                        day: "2-digit",
                                                                        month: "short",
                                                                        year: "numeric",
                                                                    }
                                                                )
                                                                : "-"}

                                                        </td>

                                                        {/* Status */}
                                                        <td className="px-6 py-5">

                                                            <span
                                                                className={`rounded-full px-3 py-1 text-xs font-medium ${request.status ===
                                                                        "Pending"
                                                                        ? "bg-yellow-100 text-yellow-700"
                                                                        : request.status ===
                                                                            "In Progress"
                                                                            ? "bg-blue-100 text-blue-700"
                                                                            : "bg-green-100 text-green-700"
                                                                    }`}
                                                            >
                                                                {
                                                                    request.status
                                                                }
                                                            </span>

                                                        </td>

                                                        {/* Action */}
                                                        <td className="px-6 py-5">

                                                            <div className="flex items-center gap-2">

                                                                {request.status ===
                                                                    "Pending" && (
                                                                        <button
                                                                            disabled={
                                                                                updatingId ===
                                                                                request._id
                                                                            }
                                                                            onClick={() =>
                                                                                updateStatus(
                                                                                    request._id,
                                                                                    "In Progress"
                                                                                )
                                                                            }
                                                                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                                        >
                                                                            {updatingId ===
                                                                                request._id
                                                                                ? "Updating..."
                                                                                : "Start"}
                                                                        </button>
                                                                    )}

                                                                {request.status ===
                                                                    "In Progress" && (
                                                                        <button
                                                                            disabled={
                                                                                updatingId ===
                                                                                request._id
                                                                            }
                                                                            onClick={() =>
                                                                                updateStatus(
                                                                                    request._id,
                                                                                    "Completed"
                                                                                )
                                                                            }
                                                                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-green-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                                        >
                                                                            {updatingId ===
                                                                                request._id
                                                                                ? "Updating..."
                                                                                : "Complete"}
                                                                        </button>
                                                                    )}

                                                                {request.status ===
                                                                    "Completed" && (
                                                                        <span className="text-xs text-green-600">
                                                                            Completed
                                                                        </span>
                                                                    )}

                                                            </div>

                                                        </td>

                                                    </tr>
                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                                {/* Empty State */}
                                {filteredRequests.length ===
                                    0 && (
                                        <div className="p-12 text-center">

                                            <Search
                                                size={42}
                                                className="mx-auto text-slate-400"
                                            />

                                            <h3 className="mt-4 font-semibold text-slate-800">
                                                No requests found
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-500">
                                                {requests.length ===
                                                    0
                                                    ? "No maintenance requests are available yet."
                                                    : "Try changing your search or status filter."}
                                            </p>

                                        </div>
                                    )}

                            </div>

                        </>
                    )}

                </main>
            </div>
        </div>
    );
};

export default Maintenance;