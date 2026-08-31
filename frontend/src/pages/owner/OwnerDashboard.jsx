import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import {
    FaHome,
    FaUsers,
    FaMoneyBillWave,
    FaClock,
} from "react-icons/fa";

const OwnerDashboard = () => {
    const navigate = useNavigate();

    const [properties, setProperties] = useState([]);
    const [payments, setPayments] = useState([]);
    const [maintenanceRequests, setMaintenanceRequests] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Please login first.");
                    setLoading(false);
                    return;
                }

                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const [
                    propertiesResponse,
                    paymentsResponse,
                    maintenanceResponse,
                ] = await Promise.all([
                    fetch("http://localhost:5000/api/properties", {
                        method: "GET",
                        headers,
                    }),

                    fetch("http://localhost:5000/api/payments", {
                        method: "GET",
                        headers,
                    }),

                    fetch("http://localhost:5000/api/maintenance", {
                        method: "GET",
                        headers,
                    }),
                ]);

                const propertiesData = await propertiesResponse.json();
                const paymentsData = await paymentsResponse.json();
                const maintenanceData = await maintenanceResponse.json();

                if (!propertiesResponse.ok) {
                    throw new Error(
                        propertiesData.message ||
                            "Failed to fetch properties"
                    );
                }

                if (!paymentsResponse.ok) {
                    throw new Error(
                        paymentsData.message ||
                            "Failed to fetch payments"
                    );
                }

                if (!maintenanceResponse.ok) {
                    throw new Error(
                        maintenanceData.message ||
                            "Failed to fetch maintenance requests"
                    );
                }

                setProperties(propertiesData.properties || []);
                setPayments(paymentsData.payments || []);
                setMaintenanceRequests(maintenanceData.requests || []);
            } catch (error) {
                console.error("Dashboard fetch error:", error);
                setError(error.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Total Properties
    const totalProperties = properties.length;

    // Occupied Properties
    const occupiedProperties = properties.filter(
        (property) => property.status === "Occupied"
    ).length;

    // Total Tenants
    const tenantIds = properties
        .filter((property) => property.tenant)
        .map((property) => {
            if (typeof property.tenant === "object") {
                return property.tenant._id;
            }

            return property.tenant;
        });

    const totalTenants = [...new Set(tenantIds)].length;

    // Current Month
    const currentDate = new Date();

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Paid Payments This Month
    const paidPaymentsThisMonth = payments.filter((payment) => {
        if (payment.status !== "Paid") {
            return false;
        }

        const paymentDate = payment.paidDate
            ? new Date(payment.paidDate)
            : new Date(payment.createdAt);

        return (
            paymentDate.getMonth() === currentMonth &&
            paymentDate.getFullYear() === currentYear
        );
    });

    // Rent Collected
    const rentCollected = paidPaymentsThisMonth.reduce(
        (total, payment) => total + Number(payment.amount || 0),
        0
    );

    // Pending Rent
    const pendingRent = payments
        .filter(
            (payment) =>
                payment.status === "Pending" ||
                payment.status === "Overdue"
        )
        .reduce(
            (total, payment) => total + Number(payment.amount || 0),
            0
        );

    // Format currency
    const formatCurrency = (amount) => {
        return `Rs. ${Number(amount || 0).toLocaleString()}`;
    };

    // Recent Payments
    const recentPayments = payments.slice(0, 4);

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Sidebar */}
            <Sidebar role="owner" />

            {/* Main Area */}
            <div className="ml-64">

                {/* Navbar */}
                <Navbar role="owner" />

                {/* Dashboard Content */}
                <main className="pt-24 px-8 pb-10">

                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">
                            Dashboard Overview
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage your properties, tenants and rental payments.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                        <StatCard
                            title="Total Properties"
                            value={loading ? "..." : totalProperties}
                            icon={<FaHome />}
                            description={`${occupiedProperties} currently occupied`}
                        />

                        <StatCard
                            title="Total Tenants"
                            value={loading ? "..." : totalTenants}
                            icon={<FaUsers />}
                            description="Active tenants"
                        />

                        <StatCard
                            title="Rent Collected"
                            value={
                                loading
                                    ? "..."
                                    : formatCurrency(rentCollected)
                            }
                            icon={<FaMoneyBillWave />}
                            description="This month"
                        />

                        <StatCard
                            title="Pending Rent"
                            value={
                                loading
                                    ? "..."
                                    : formatCurrency(pendingRent)
                            }
                            icon={<FaClock />}
                            description="Awaiting payment"
                        />

                    </div>

                    {/* Payments + Maintenance */}
                    <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

                        {/* Recent Payments */}
                        <div className="xl:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm">

                            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                                <div>
                                    <h2 className="font-semibold text-slate-800">
                                        Recent Rent Payments
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Latest payment activity
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        navigate("/owner/payments")
                                    }
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    View All
                                </button>
                            </div>

                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[650px] text-left">
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
                                                Date
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="px-6 py-10 text-center text-sm text-slate-500"
                                                >
                                                    Loading payments...
                                                </td>
                                            </tr>
                                        ) : recentPayments.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="px-6 py-10 text-center text-sm text-slate-500"
                                                >
                                                    No payments found.
                                                </td>
                                            </tr>
                                        ) : (
                                            recentPayments.map(
                                                (payment, index) => (
                                                    <tr
                                                        key={
                                                            payment._id ||
                                                            index
                                                        }
                                                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                                    >
                                                        <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                                            {payment.tenant
                                                                ?.name ||
                                                                "N/A"}
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-slate-500">
                                                            {payment.property
                                                                ?.name ||
                                                                "N/A"}
                                                        </td>

                                                        <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                                            {formatCurrency(
                                                                payment.amount
                                                            )}
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-slate-500">
                                                            {payment.paidDate
                                                                ? new Date(
                                                                      payment.paidDate
                                                                  ).toLocaleDateString(
                                                                      "en-GB",
                                                                      {
                                                                          day: "2-digit",
                                                                          month: "short",
                                                                          year: "numeric",
                                                                      }
                                                                  )
                                                                : payment.dueDate
                                                                ? new Date(
                                                                      payment.dueDate
                                                                  ).toLocaleDateString(
                                                                      "en-GB",
                                                                      {
                                                                          day: "2-digit",
                                                                          month: "short",
                                                                          year: "numeric",
                                                                      }
                                                                  )
                                                                : "N/A"}
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                                    payment.status ===
                                                                    "Paid"
                                                                        ? "bg-green-100 text-green-700"
                                                                        : payment.status ===
                                                                          "Overdue"
                                                                        ? "bg-red-100 text-red-700"
                                                                        : "bg-yellow-100 text-yellow-700"
                                                                }`}
                                                            >
                                                                {
                                                                    payment.status
                                                                }
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        )}
                                    </tbody>
                                </table>

                            </div>
                        </div>

                        {/* Maintenance */}
                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                                <div>
                                    <h2 className="font-semibold text-slate-800">
                                        Maintenance Requests
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Requests needing attention
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        navigate("/owner/maintenance")
                                    }
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    View All
                                </button>
                            </div>

                            <div className="divide-y divide-slate-100">

                                {loading ? (
                                    <div className="px-6 py-10 text-center text-sm text-slate-500">
                                        Loading requests...
                                    </div>
                                ) : maintenanceRequests.length === 0 ? (
                                    <div className="px-6 py-10 text-center text-sm text-slate-500">
                                        No maintenance requests found.
                                    </div>
                                ) : (
                                    maintenanceRequests
                                        .slice(0, 3)
                                        .map((request, index) => (
                                            <div
                                                key={
                                                    request._id ||
                                                    index
                                                }
                                                className="flex items-center justify-between px-6 py-5"
                                            >
                                                <div>
                                                    <h3 className="text-sm font-medium text-slate-700">
                                                        {request.issue ||
                                                            "Maintenance Issue"}
                                                    </h3>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {request.property
                                                            ?.name ||
                                                            "N/A"}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                        request.status ===
                                                        "Pending"
                                                            ? "bg-red-100 text-red-700"
                                                            : request.status ===
                                                              "In Progress"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-green-100 text-green-700"
                                                    }`}
                                                >
                                                    {request.status}
                                                </span>
                                            </div>
                                        ))
                                )}

                            </div>
                        </div>

                    </div>

                    {/* Properties */}
                    <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">

                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                            <div>
                                <h2 className="font-semibold text-slate-800">
                                    My Properties
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    Overview of your rental properties
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    navigate("/owner/properties")
                                }
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                View All
                            </button>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[700px] text-left">

                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Property
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Location
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Tenant
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Monthly Rent
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Status
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {loading ? (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-10 text-center text-sm text-slate-500"
                                            >
                                                Loading properties...
                                            </td>
                                        </tr>
                                    ) : properties.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-10 text-center text-sm text-slate-500"
                                            >
                                                No properties found.
                                            </td>
                                        </tr>
                                    ) : (
                                        properties
                                            .slice(0, 4)
                                            .map((property, index) => (
                                                <tr
                                                    key={
                                                        property._id ||
                                                        index
                                                    }
                                                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                                >

                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">

                                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                                                <FaHome />
                                                            </div>

                                                            <span className="text-sm font-medium text-slate-700">
                                                                {
                                                                    property.name
                                                                }
                                                            </span>

                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-slate-500">
                                                        {property.city ||
                                                            "N/A"}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-slate-500">
                                                        {property.tenant
                                                            ?.name ||
                                                            "No Tenant"}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                                        {formatCurrency(
                                                            property.rent
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                                property.status ===
                                                                "Occupied"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-yellow-100 text-yellow-700"
                                                            }`}
                                                        >
                                                            {
                                                                property.status
                                                            }
                                                        </span>
                                                    </td>

                                                </tr>
                                            ))
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </main>

            </div>
        </div>
    );
};

export default OwnerDashboard;