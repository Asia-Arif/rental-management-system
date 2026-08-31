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
    TriangleAlert,
    Search,
} from "lucide-react";

const Payments = () => {
    const navigate = useNavigate();

    const [payments, setPayments] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get payments from backend
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await fetch(
                    "http://localhost:5000/api/payments",
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
                        data.message || "Failed to fetch payments"
                    );
                }

                setPayments(data.payments || []);
            } catch (error) {
                console.error("Fetch payments error:", error);
                setError(error.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [navigate]);

    // Search + Filter
    const filteredPayments = payments.filter((payment) => {
        const tenantName =
            payment.tenant?.name?.toLowerCase() || "";

        const propertyName =
            payment.property?.name?.toLowerCase() || "";

        const searchValue = search.toLowerCase();

        const matchesSearch =
            tenantName.includes(searchValue) ||
            propertyName.includes(searchValue);

        const matchesStatus =
            statusFilter === "All" ||
            payment.status === statusFilter;

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
        (total, payment) => total + Number(payment.amount || 0),
        0
    );

    const totalPending = pendingPayments.reduce(
        (total, payment) => total + Number(payment.amount || 0),
        0
    );

    const totalOverdue = overduePayments.reduce(
        (total, payment) => total + Number(payment.amount || 0),
        0
    );

    const formatAmount = (amount) => {
        return `Rs. ${Number(amount || 0).toLocaleString()}`;
    };

    const formatDate = (date) => {
        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
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
                            <BarChart3 size={20} />
                            <span>Dashboard</span>
                        </button>

                        {/* Properties */}
                        <button
                            onClick={() =>
                                navigate("/owner/properties")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <House size={20} />
                            <span>Properties</span>
                        </button>

                        {/* Add Property */}
                        <button
                            onClick={() =>
                                navigate("/owner/add-property")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Plus size={20} />
                            <span>Add Property</span>
                        </button>

                        {/* Tenants */}
                        <button
                            onClick={() =>
                                navigate("/owner/tenants")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Users size={20} />
                            <span>Tenants</span>
                        </button>

                        {/* Rent Payments */}
                        <button
                            onClick={() =>
                                navigate("/owner/payments")
                            }
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            <CircleDollarSign size={20} />
                            <span>Rent Payments</span>
                        </button>

                        {/* Maintenance */}
                        <button
                            onClick={() =>
                                navigate("/owner/maintenance")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Wrench size={20} />
                            <span>Maintenance</span>
                        </button>

                        {/* Notifications */}
                        <button
                            onClick={() =>
                                navigate("/owner/notifications")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Bell size={20} />
                            <span>Notifications</span>
                        </button>

                        {/* Documents */}
                        <button
                            onClick={() =>
                                navigate("/owner/documents")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FileText size={20} />
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
                                onClick={() =>
                                    navigate(
                                        "/owner/notifications"
                                    )
                                }
                                className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                            >
                                <Bell size={20} />

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
                            Rent Payment Overview
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Monitor paid, pending and overdue rental
                            payments.
                        </p>

                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                            <p className="text-sm text-slate-500">
                                Loading payments...
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

                                {/* Rent Collected */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Rent Collected
                                            </p>

                                            <h2 className="mt-2 text-2xl font-bold text-green-600">
                                                {formatAmount(
                                                    totalCollected
                                                )}
                                            </h2>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Paid payments
                                            </p>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                                            <CircleDollarSign
                                                size={24}
                                            />
                                        </div>

                                    </div>

                                </div>

                                {/* Pending Rent */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Pending Rent
                                            </p>

                                            <h2 className="mt-2 text-2xl font-bold text-yellow-600">
                                                {formatAmount(
                                                    totalPending
                                                )}
                                            </h2>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Awaiting payment
                                            </p>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                                            <Clock3 size={24} />
                                        </div>

                                    </div>

                                </div>

                                {/* Overdue Rent */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Overdue Rent
                                            </p>

                                            <h2 className="mt-2 text-2xl font-bold text-red-600">
                                                {formatAmount(
                                                    totalOverdue
                                                )}
                                            </h2>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Requires attention
                                            </p>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                                            <TriangleAlert
                                                size={24}
                                            />
                                        </div>

                                    </div>

                                </div>

                                {/* Outstanding */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Outstanding
                                            </p>

                                            <h2 className="mt-2 text-2xl font-bold text-blue-600">
                                                {formatAmount(
                                                    totalPending +
                                                        totalOverdue
                                                )}
                                            </h2>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Pending + overdue
                                            </p>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                            <BarChart3 size={24} />
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Search and Filter */}
                            <div className="mt-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row">

                                <div className="relative flex-1">

                                    <Search
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Search tenant or property..."
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
                                        Rental payment records for your
                                        tenants.
                                    </p>

                                </div>

                                {filteredPayments.length > 0 ? (
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

                                                {filteredPayments.map(
                                                    (payment) => (

                                                        <tr
                                                            key={
                                                                payment._id
                                                            }
                                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                                        >

                                                            {/* Tenant */}
                                                            <td className="px-6 py-5">

                                                                <div className="flex items-center gap-3">

                                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                                                        {payment.tenant?.name
                                                                            ?.charAt(
                                                                                0
                                                                            )
                                                                            ?.toUpperCase() ||
                                                                            "T"}
                                                                    </div>

                                                                    <div>
                                                                        <span className="text-sm font-medium text-slate-700">
                                                                            {payment
                                                                                .tenant
                                                                                ?.name ||
                                                                                "Unknown Tenant"}
                                                                        </span>

                                                                        {payment
                                                                            .tenant
                                                                            ?.email && (
                                                                            <p className="mt-1 text-xs text-slate-400">
                                                                                {
                                                                                    payment
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
                                                                        {payment
                                                                            .property
                                                                            ?.name ||
                                                                            "Unknown Property"}
                                                                    </p>

                                                                    <p className="mt-1 text-xs text-slate-400">
                                                                        {payment
                                                                            .property
                                                                            ?.city ||
                                                                            ""}
                                                                    </p>
                                                                </div>

                                                            </td>

                                                            {/* Amount */}
                                                            <td className="px-6 py-5 text-sm font-semibold text-slate-700">
                                                                {formatAmount(
                                                                    payment.amount
                                                                )}
                                                            </td>

                                                            {/* Due Date */}
                                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                                {formatDate(
                                                                    payment.dueDate
                                                                )}
                                                            </td>

                                                            {/* Paid Date */}
                                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                                {formatDate(
                                                                    payment.paidDate
                                                                )}
                                                            </td>

                                                            {/* Status */}
                                                            <td className="px-6 py-5">

                                                                <span
                                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                                        payment.status ===
                                                                        "Paid"
                                                                            ? "bg-green-100 text-green-700"
                                                                            : payment.status ===
                                                                              "Pending"
                                                                            ? "bg-yellow-100 text-yellow-700"
                                                                            : "bg-red-100 text-red-700"
                                                                    }`}
                                                                >
                                                                    {
                                                                        payment.status
                                                                    }
                                                                </span>

                                                            </td>

                                                            {/* Receipt */}
                                                            <td className="px-6 py-5">

                                                                {payment.status ===
                                                                "Paid" ? (
                                                                    <button
                                                                        onClick={() =>
                                                                            navigate(
                                                                                `/owner/payments/${payment._id}`
                                                                            )
                                                                        }
                                                                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
                                                                    >
                                                                        View Receipt
                                                                    </button>
                                                                ) : (
                                                                    <span className="text-xs text-slate-400">
                                                                        Not
                                                                        available
                                                                    </span>
                                                                )}

                                                            </td>

                                                        </tr>

                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>
                                ) : (
                                    <div className="p-12 text-center">

                                        <Search
                                            size={42}
                                            className="mx-auto text-slate-400"
                                        />

                                        <h3 className="mt-4 font-semibold text-slate-800">
                                            No payments found
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {payments.length === 0
                                                ? "No payment records are available yet."
                                                : "Try changing your search or filter."}
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

export default Payments;