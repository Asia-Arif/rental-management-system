import { useEffect, useState } from "react";
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
    MdClose,
    MdEmail,
} from "react-icons/md";

const Tenants = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [tenants, setTenants] = useState([]);
    const [properties, setProperties] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Invite Modal
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [selectedProperty, setSelectedProperty] = useState("");
    const [inviteLoading, setInviteLoading] = useState(false);
    const [inviteMessage, setInviteMessage] = useState("");
    const [inviteError, setInviteError] = useState("");

    // Get tenants and properties
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                // Get tenants
                const tenantsResponse = await fetch(
                    "http://localhost:5000/api/tenants",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const tenantsData = await tenantsResponse.json();

                if (!tenantsResponse.ok) {
                    throw new Error(
                        tenantsData.message || "Failed to fetch tenants"
                    );
                }

                setTenants(tenantsData.tenants || []);

                // Get owner's properties
                const propertiesResponse = await fetch(
                    "http://localhost:5000/api/properties",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const propertiesData = await propertiesResponse.json();

                if (!propertiesResponse.ok) {
                    throw new Error(
                        propertiesData.message ||
                            "Failed to fetch properties"
                    );
                }

                setProperties(propertiesData.properties || []);
            } catch (error) {
                console.error("Get tenants/properties error:", error);
                setError(error.message || "Unable to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    // Search tenants
    const filteredTenants = tenants.filter(
        (tenant) =>
            tenant.name
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            tenant.property
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            tenant.email
                ?.toLowerCase()
                .includes(search.toLowerCase())
    );

    // Active tenants
    const activeTenants = tenants.filter(
        (tenant) => tenant.status === "Active"
    );

    // Monthly expected rent
    const monthlyExpectedRent = activeTenants.reduce(
        (total, tenant) => total + Number(tenant.rent || 0),
        0
    );

    // Open invite modal
    const openInviteModal = () => {
        setInviteEmail("");
        setSelectedProperty("");
        setInviteMessage("");
        setInviteError("");
        setShowInviteModal(true);
    };

    // Close invite modal
    const closeInviteModal = () => {
        if (inviteLoading) return;

        setShowInviteModal(false);
        setInviteEmail("");
        setSelectedProperty("");
        setInviteMessage("");
        setInviteError("");
    };

    // Send tenant invite
    const handleSendInvite = async (e) => {
        e.preventDefault();

        setInviteMessage("");
        setInviteError("");

        if (!inviteEmail.trim()) {
            setInviteError("Please enter tenant email.");
            return;
        }

        if (!selectedProperty) {
            setInviteError("Please select a property.");
            return;
        }

        try {
            setInviteLoading(true);

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                "http://localhost:5000/api/tenants/invite",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        email: inviteEmail.trim(),
                        propertyId: selectedProperty,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to send tenant invite"
                );
            }

            setInviteMessage(
                data.message || "Invite sent successfully!"
            );

            setInviteEmail("");
            setSelectedProperty("");

        } catch (error) {
            console.error("Send tenant invite error:", error);
            setInviteError(
                error.message || "Unable to send tenant invite"
            );
        } finally {
            setInviteLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white">

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

                <nav className="px-4 py-6">

                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Owner Menu
                    </p>

                    <div className="space-y-2">

                        <button
                            onClick={() =>
                                navigate("/owner/dashboard")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <MdDashboard />
                            <span>Dashboard</span>
                        </button>

                        <button
                            onClick={() =>
                                navigate("/owner/properties")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <MdHome />
                            <span>Properties</span>
                        </button>

                        <button
                            onClick={() =>
                                navigate("/owner/add-property")
                            }
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
                            onClick={() =>
                                navigate("/owner/payments")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <MdPayments />
                            <span>Rent Payments</span>
                        </button>

                        <button
                            onClick={() =>
                                navigate("/owner/maintenance")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <MdBuild />
                            <span>Maintenance</span>
                        </button>

                        <button
                            onClick={() =>
                                navigate("/owner/notifications")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <MdNotifications />
                            <span>Notifications</span>
                        </button>

                        <button
                            onClick={() =>
                                navigate("/owner/documents")
                            }
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
                                onClick={() =>
                                    navigate("/owner/notifications")
                                }
                                className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
                            >
                                <MdNotifications />

                                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                            </button>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                A
                            </div>

                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("user");
                                    navigate("/login");
                                }}
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
                    <div className="mb-8 flex items-end justify-between">

                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">
                                My Tenants
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                View and manage tenants currently living in your
                                properties.
                            </p>
                        </div>

                        {/* Invite Tenant Button */}
                        <button
                            onClick={openInviteModal}
                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                        >
                            <MdAdd className="text-lg" />
                            Invite Tenant
                        </button>

                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-slate-500">
                                Total Tenants
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-slate-800">
                                {loading ? "..." : tenants.length}
                            </h2>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-slate-500">
                                Active Tenants
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-green-600">
                                {loading
                                    ? "..."
                                    : activeTenants.length}
                            </h2>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-slate-500">
                                Monthly Expected Rent
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-blue-600">
                                {loading
                                    ? "..."
                                    : `Rs. ${monthlyExpectedRent.toLocaleString()}`}
                            </h2>
                        </div>

                    </div>

                    {/* Search */}
                    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                        <input
                            type="text"
                            placeholder="Search tenant, property or email..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
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

                        {loading ? (
                            <div className="p-12 text-center">
                                <p className="text-sm text-slate-500">
                                    Loading tenants...
                                </p>
                            </div>
                        ) : (
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
                                                            {tenant.name
                                                                ?.charAt(0)
                                                                .toUpperCase()}
                                                        </div>

                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-700">
                                                                {tenant.name}
                                                            </p>

                                                            <p className="text-xs text-slate-500">
                                                                Tenant
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
                                                        {tenant.phone ||
                                                            "Not provided"}
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
                                                        Rs.{" "}
                                                        {Number(
                                                            tenant.rent || 0
                                                        ).toLocaleString()}
                                                    </p>

                                                </td>

                                                {/* Due Date */}
                                                <td className="px-6 py-5">

                                                    <p className="text-sm text-slate-600">
                                                        {tenant.dueDate ||
                                                            "Not set"}
                                                    </p>

                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-5">

                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                            tenant.status ===
                                                            "Active"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-slate-100 text-slate-600"
                                                        }`}
                                                    >
                                                        {tenant.status}
                                                    </span>

                                                </td>

                                                {/* Action */}
                                                <td className="px-6 py-5">

                                                    <button
                                                        onClick={() =>
                                                            alert(
                                                                `Viewing ${tenant.name}`
                                                            )
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
                        )}

                        {/* Empty */}
                        {!loading &&
                            filteredTenants.length === 0 && (
                                <div className="p-12 text-center">

                                    <div className="flex justify-center text-5xl text-slate-400">
                                        <MdSearch />
                                    </div>

                                    <h3 className="mt-4 font-semibold text-slate-800">
                                        No tenants found
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {search
                                            ? "Try searching with another name or property."
                                            : "No tenants are currently assigned to your properties."}
                                    </p>

                                </div>
                            )}

                    </div>

                </main>
            </div>

            {/* ================= INVITE TENANT MODAL ================= */}

            {showInviteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

                    <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    <MdEmail className="text-xl" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">
                                        Invite Tenant
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Send an invite code to your tenant
                                    </p>
                                </div>

                            </div>

                            <button
                                onClick={closeInviteModal}
                                className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
                            >
                                <MdClose className="text-xl" />
                            </button>

                        </div>

                        {/* Modal Body */}
                        <form
                            onSubmit={handleSendInvite}
                            className="space-y-5 px-6 py-6"
                        >

                            {/* Success Message */}
                            {inviteMessage && (
                                <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                                    <p className="text-sm text-green-700">
                                        {inviteMessage}
                                    </p>
                                </div>
                            )}

                            {/* Error Message */}
                            {inviteError && (
                                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                                    <p className="text-sm text-red-600">
                                        {inviteError}
                                    </p>
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Tenant Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="tenant@example.com"
                                    value={inviteEmail}
                                    onChange={(e) =>
                                        setInviteEmail(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                <p className="mt-1 text-xs text-slate-500">
                                    The invite code will be sent to this email.
                                </p>
                            </div>

                            {/* Property */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Select Property
                                </label>

                                <select
                                    value={selectedProperty}
                                    onChange={(e) =>
                                        setSelectedProperty(
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">
                                        Select a property
                                    </option>

                                    {properties
                                        .filter(
                                            (property) =>
                                                property.status !==
                                                "Occupied"
                                        )
                                        .map((property) => (
                                            <option
                                                key={property._id}
                                                value={property._id}
                                            >
                                                {property.name} - Rs.{" "}
                                                {Number(
                                                    property.rent || 0
                                                ).toLocaleString()}
                                            </option>
                                        ))}
                                </select>

                                {properties.filter(
                                    (property) =>
                                        property.status !== "Occupied"
                                ).length === 0 && (
                                    <p className="mt-2 text-xs text-red-500">
                                        No available properties found.
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={closeInviteModal}
                                    disabled={inviteLoading}
                                    className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={inviteLoading}
                                    className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {inviteLoading
                                        ? "Sending..."
                                        : "Send Invite"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Tenants;