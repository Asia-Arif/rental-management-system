
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

const API_URL = "http://localhost:5000/api";

const OwnerDashboard = () => {
    const navigate = useNavigate();

    const [properties, setProperties] = useState([]);
    const [payments, setPayments] = useState([]);
    const [maintenanceRequests, setMaintenanceRequests] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ============================================
    // FETCH DASHBOARD DATA
    // ============================================
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError("");

                const token =
                    localStorage.getItem("token");

                if (!token) {
                    setError("Please login first.");
                    setLoading(false);
                    return;
                }

                const headers = {
                    Authorization:
                        `Bearer ${token}`,
                };

                const [
                    propertiesResponse,
                    paymentsResponse,
                    maintenanceResponse,
                ] = await Promise.all([
                    fetch(
                        `${API_URL}/properties`,
                        {
                            method: "GET",
                            headers,
                        }
                    ),

                    fetch(
                        `${API_URL}/payments`,
                        {
                            method: "GET",
                            headers,
                        }
                    ),

                    fetch(
                        `${API_URL}/maintenance`,
                        {
                            method: "GET",
                            headers,
                        }
                    ),
                ]);

                const propertiesData =
                    await propertiesResponse.json();

                const paymentsData =
                    await paymentsResponse.json();

                const maintenanceData =
                    await maintenanceResponse.json();

                if (!propertiesResponse.ok) {
                    throw new Error(
                        propertiesData.message ||
                        "Failed to fetch properties."
                    );
                }

                if (!paymentsResponse.ok) {
                    throw new Error(
                        paymentsData.message ||
                        "Failed to fetch payments."
                    );
                }

                if (!maintenanceResponse.ok) {
                    throw new Error(
                        maintenanceData.message ||
                        "Failed to fetch maintenance requests."
                    );
                }

                setProperties(
                    propertiesData.properties || []
                );

                setPayments(
                    paymentsData.payments || []
                );

                setMaintenanceRequests(
                    maintenanceData.requests || []
                );
            } catch (err) {
                console.error(
                    "Dashboard fetch error:",
                    err
                );

                setError(
                    err.message ||
                    "Something went wrong."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // ============================================
    // TOTAL PROPERTIES
    // ============================================
    const totalProperties =
        properties.length;

    // ============================================
    // OCCUPIED PROPERTIES
    // ============================================
    const occupiedProperties =
        properties.filter(
            (property) =>
                property.status === "Occupied" ||
                property.tenant
        );

    const occupiedPropertiesCount =
        occupiedProperties.length;

    // ============================================
    // TOTAL TENANTS
    // 1 Property = 1 Tenant
    // ============================================
    const tenantIds =
        properties
            .filter(
                (property) =>
                    property.tenant
            )
            .map((property) => {
                if (
                    typeof property.tenant ===
                    "object"
                ) {
                    return property.tenant._id;
                }

                return property.tenant;
            })
            .filter(Boolean);

    const totalTenants =
        [...new Set(tenantIds)].length;

    // ============================================
    // DATE HELPERS
    // ============================================
    const getPaymentDate = (payment) => {
        return (
            payment.paymentDate ||
            payment.paidDate ||
            payment.createdAt ||
            payment.updatedAt ||
            null
        );
    };

    const getDateObject = (payment) => {
        const date =
            getPaymentDate(payment);

        if (!date) {
            return null;
        }

        const parsedDate =
            new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return null;
        }

        return parsedDate;
    };

    const currentDate = new Date();

    const currentMonth =
        currentDate.getMonth();

    const currentYear =
        currentDate.getFullYear();

    // ============================================
    // STATUS HELPERS
    // ============================================
    // Your actual backend approval status is
    // "Approved". "Paid" is also accepted so
    // old records won't break the dashboard.
    const isApprovedPayment = (payment) => {
        return (
            payment.status === "Approved" ||
            payment.status === "Paid"
        );
    };

    const isPendingPayment = (payment) => {
        return payment.status === "Pending";
    };

    const isRejectedPayment = (payment) => {
        return (
            payment.status === "Rejected"
        );
    };

    // ============================================
    // APPROVED PAYMENTS THIS MONTH
    // ============================================
    const approvedPaymentsThisMonth =
        payments.filter((payment) => {
            if (
                !isApprovedPayment(payment)
            ) {
                return false;
            }

            const paymentDate =
                getDateObject(payment);

            if (!paymentDate) {
                return false;
            }

            return (
                paymentDate.getMonth() ===
                currentMonth &&
                paymentDate.getFullYear() ===
                currentYear
            );
        });

    // ============================================
    // RENT COLLECTED
    // ============================================
    const rentCollected =
        approvedPaymentsThisMonth.reduce(
            (total, payment) =>
                total +
                Number(
                    payment.amount || 0
                ),
            0
        );

    // ============================================
    // PENDING PAYMENT SUBMISSIONS
    // ============================================
    const pendingPayments =
        payments.filter(
            (payment) =>
                isPendingPayment(payment)
        );

    // ============================================
    // APPROVED PAYMENT CHECK BY PROPERTY
    // ============================================
    const getPaymentPropertyId = (
        payment
    ) => {
        if (!payment.property) {
            return null;
        }

        if (
            typeof payment.property ===
            "object"
        ) {
            return (
                payment.property._id ||
                null
            );
        }

        return payment.property;
    };

    const hasApprovedPaymentThisMonth =
        (propertyId) => {
            return payments.some(
                (payment) => {
                    if (
                        !isApprovedPayment(
                            payment
                        )
                    ) {
                        return false;
                    }

                    const paymentPropertyId =
                        getPaymentPropertyId(
                            payment
                        );

                    if (
                        !paymentPropertyId ||
                        paymentPropertyId.toString() !==
                        propertyId.toString()
                    ) {
                        return false;
                    }

                    const paymentDate =
                        getDateObject(
                            payment
                        );

                    if (!paymentDate) {
                        return false;
                    }

                    return (
                        paymentDate.getMonth() ===
                        currentMonth &&
                        paymentDate.getFullYear() ===
                        currentYear
                    );
                }
            );
        };

    // ============================================
    // FIND PENDING PAYMENT FOR PROPERTY
    // ============================================
    const getPendingPaymentForProperty =
        (propertyId) => {
            return (
                payments.find(
                    (payment) => {
                        if (
                            !isPendingPayment(
                                payment
                            )
                        ) {
                            return false;
                        }

                        const paymentPropertyId =
                            getPaymentPropertyId(
                                payment
                            );

                        return (
                            paymentPropertyId &&
                            paymentPropertyId.toString() ===
                            propertyId.toString()
                        );
                    }
                ) || null
            );
        };

    // ============================================
    // PENDING RENT / OUTSTANDING CURRENT RENT
    // ============================================
    //
    // For every occupied property:
    //
    // Approved this month
    //     => rent already collected
    //
    // Pending payment exists
    //     => pending submitted amount
    //
    // No approved + no pending
    //     => monthly property rent is still due
    //
    const pendingRent = occupiedProperties.reduce(
        (total, property) => {
            const propertyId =
                property._id;

            if (
                hasApprovedPaymentThisMonth(
                    propertyId
                )
            ) {
                return total;
            }

            const pendingPayment =
                getPendingPaymentForProperty(
                    propertyId
                );

            if (pendingPayment) {
                return (
                    total +
                    Number(
                        pendingPayment.amount ||
                        property.rent ||
                        0
                    )
                );
            }

            return (
                total +
                Number(
                    property.rent || 0
                )
            );
        },
        0
    );

    // ============================================
    // FORMAT CURRENCY
    // ============================================
    const formatCurrency = (amount) => {
        return `Rs. ${Number(
            amount || 0
        ).toLocaleString()}`;
    };

    // ============================================
    // FORMAT DATE
    // ============================================
    const formatDate = (date) => {
        if (!date) {
            return "N/A";
        }

        const parsedDate =
            new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return "N/A";
        }

        return parsedDate.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // ============================================
    // PAYMENT STATUS DISPLAY
    // ============================================
    const getPaymentStatus = (payment) => {
        if (
            isApprovedPayment(payment)
        ) {
            return "Approved";
        }

        if (
            isPendingPayment(payment)
        ) {
            return "Pending";
        }

        if (
            isRejectedPayment(payment)
        ) {
            return "Rejected";
        }

        return payment.status ||
            "Unknown";
    };

    const getPaymentStatusClass = (
        payment
    ) => {
        const status =
            getPaymentStatus(payment);

        if (status === "Approved") {
            return "bg-green-100 text-green-700";
        }

        if (status === "Pending") {
            return "bg-yellow-100 text-yellow-700";
        }

        if (status === "Rejected") {
            return "bg-red-100 text-red-700";
        }

        return "bg-slate-100 text-slate-700";
    };

    // ============================================
    // RECENT PAYMENTS
    // Sort by actual payment date / createdAt
    // ============================================
    const recentPayments =
        [...payments]
            .sort((a, b) => {
                const dateA =
                    getDateObject(a)?.getTime() ||
                    0;

                const dateB =
                    getDateObject(b)?.getTime() ||
                    0;

                return dateB - dateA;
            })
            .slice(0, 4);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* ========================================
                SIDEBAR
            ======================================== */}
            <Sidebar role="owner" />

            {/* ========================================
                MAIN AREA
            ======================================== */}
            <div className="ml-64">
                {/* Navbar */}
                <Navbar role="owner" />

                {/* ====================================
                    DASHBOARD CONTENT
                ===================================== */}
                <main className="px-8 pb-10 pt-24">
                    {/* Welcome */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">
                            Dashboard Overview
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage your properties,
                            tenants and rental payments.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* =================================
                        STATISTICS
                    ================================== */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {/* Total Properties */}
                        <StatCard
                            title="Total Properties"
                            value={
                                loading
                                    ? "..."
                                    : totalProperties
                            }
                            icon={<FaHome />}
                            description={`${occupiedPropertiesCount} currently occupied`}
                        />

                        {/* Total Tenants */}
                        <StatCard
                            title="Total Tenants"
                            value={
                                loading
                                    ? "..."
                                    : totalTenants
                            }
                            icon={<FaUsers />}
                            description="Linked tenants"
                        />

                        {/* Rent Collected */}
                        <StatCard
                            title="Rent Collected"
                            value={
                                loading
                                    ? "..."
                                    : formatCurrency(
                                        rentCollected
                                    )
                            }
                            icon={
                                <FaMoneyBillWave />
                            }
                            description="Approved payments this month"
                        />

                        {/* Pending Rent */}
                        <StatCard
                            title="Pending Rent"
                            value={
                                loading
                                    ? "..."
                                    : formatCurrency(
                                        pendingRent
                                    )
                            }
                            icon={<FaClock />}
                            description="Current outstanding rent"
                        />
                    </div>

                    {/* =================================
                        PAYMENTS + MAINTENANCE
                    ================================== */}
                    <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
                        {/* =================================
                            RECENT PAYMENTS
                        ================================== */}
                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
                            {/* Header */}
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
                                        navigate(
                                            "/owner/payments"
                                        )
                                    }
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    View All
                                </button>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[700px] text-left">
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
                                                    Loading
                                                    payments...
                                                </td>
                                            </tr>
                                        ) : recentPayments.length ===
                                            0 ? (
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="px-6 py-10 text-center text-sm text-slate-500"
                                                >
                                                    No payment
                                                    records found.
                                                </td>
                                            </tr>
                                        ) : (
                                            recentPayments.map(
                                                (
                                                    payment,
                                                    index
                                                ) => (
                                                    <tr
                                                        key={
                                                            payment._id ||
                                                            index
                                                        }
                                                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                                    >
                                                        {/* Tenant */}
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-medium text-slate-700">
                                                                {payment
                                                                    .tenant
                                                                    ?.name ||
                                                                    "N/A"}
                                                            </div>

                                                            {payment
                                                                .tenant
                                                                ?.email && (
                                                                    <div className="mt-1 text-xs text-slate-400">
                                                                        {
                                                                            payment
                                                                                .tenant
                                                                                .email
                                                                        }
                                                                    </div>
                                                                )}
                                                        </td>

                                                        {/* Property */}
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-medium text-slate-700">
                                                                {payment
                                                                    .property
                                                                    ?.name ||
                                                                    "N/A"}
                                                            </div>

                                                            {payment
                                                                .property
                                                                ?.city && (
                                                                    <div className="mt-1 text-xs text-slate-400">
                                                                        {
                                                                            payment
                                                                                .property
                                                                                .city
                                                                        }
                                                                    </div>
                                                                )}
                                                        </td>

                                                        {/* Amount */}
                                                        <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                                            {formatCurrency(
                                                                payment.amount
                                                            )}
                                                        </td>

                                                        {/* Payment Date */}
                                                        <td className="px-6 py-4 text-sm text-slate-500">
                                                            {formatDate(
                                                                getPaymentDate(
                                                                    payment
                                                                )
                                                            )}
                                                        </td>

                                                        {/* Status */}
                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={`rounded-full px-3 py-1 text-xs font-medium ${getPaymentStatusClass(
                                                                    payment
                                                                )}`}
                                                            >
                                                                {getPaymentStatus(
                                                                    payment
                                                                )}
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

                        {/* =================================
                            MAINTENANCE
                        ================================== */}
                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                            {/* Header */}
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
                                        navigate(
                                            "/owner/maintenance"
                                        )
                                    }
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    View All
                                </button>
                            </div>

                            {/* Requests */}
                            <div className="divide-y divide-slate-100">
                                {loading ? (
                                    <div className="px-6 py-10 text-center text-sm text-slate-500">
                                        Loading
                                        requests...
                                    </div>
                                ) : maintenanceRequests.length ===
                                    0 ? (
                                    <div className="px-6 py-10 text-center text-sm text-slate-500">
                                        No maintenance
                                        requests found.
                                    </div>
                                ) : (
                                    maintenanceRequests
                                        .slice(0, 3)
                                        .map(
                                            (
                                                request,
                                                index
                                            ) => (
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
                                                            {request
                                                                .property
                                                                ?.name ||
                                                                "N/A"}
                                                        </p>
                                                    </div>

                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-medium ${request.status ===
                                                                "Pending"
                                                                ? "bg-red-100 text-red-700"
                                                                : request.status ===
                                                                    "In Progress"
                                                                    ? "bg-yellow-100 text-yellow-700"
                                                                    : request.status ===
                                                                        "Completed"
                                                                        ? "bg-green-100 text-green-700"
                                                                        : "bg-slate-100 text-slate-700"
                                                            }`}
                                                    >
                                                        {request.status ||
                                                            "Unknown"}
                                                    </span>
                                                </div>
                                            )
                                        )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* =================================
                        MY PROPERTIES
                    ================================== */}
                    <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
                        {/* Header */}
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
                                    navigate(
                                        "/owner/properties"
                                    )
                                }
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                View All
                            </button>
                        </div>

                        {/* Table */}
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
                                                Loading
                                                properties...
                                            </td>
                                        </tr>
                                    ) : properties.length ===
                                        0 ? (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-10 text-center text-sm text-slate-500"
                                            >
                                                No properties
                                                found.
                                            </td>
                                        </tr>
                                    ) : (
                                        properties
                                            .slice(0, 4)
                                            .map(
                                                (
                                                    property,
                                                    index
                                                ) => (
                                                    <tr
                                                        key={
                                                            property._id ||
                                                            index
                                                        }
                                                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                                    >
                                                        {/* Property */}
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

                                                        {/* Location */}
                                                        <td className="px-6 py-4 text-sm text-slate-500">
                                                            {property.city ||
                                                                "N/A"}
                                                        </td>

                                                        {/* Tenant */}
                                                        <td className="px-6 py-4 text-sm text-slate-500">
                                                            {property
                                                                .tenant
                                                                ?.name ||
                                                                "No Tenant"}
                                                        </td>

                                                        {/* Rent */}
                                                        <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                                            {formatCurrency(
                                                                property.rent
                                                            )}
                                                        </td>

                                                        {/* Status */}
                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={`rounded-full px-3 py-1 text-xs font-medium ${property.status ===
                                                                        "Occupied" ||
                                                                        property.tenant
                                                                        ? "bg-green-100 text-green-700"
                                                                        : "bg-yellow-100 text-yellow-700"
                                                                    }`}
                                                            >
                                                                {property.status ||
                                                                    (property.tenant
                                                                        ? "Occupied"
                                                                        : "Available")}
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
                </main>
            </div>
        </div>
    );
};

export default OwnerDashboard;

