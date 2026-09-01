import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiBarChart2,
    FiHome,
    FiDollarSign,
    FiTool,
    FiBell,
    FiFileText,
    FiUser,
    FiClipboard,
} from "react-icons/fi";

const MyProperty = () => {
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get logged-in tenant's property
    useEffect(() => {
        const fetchMyProperty = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await fetch(
                    "http://localhost:5000/api/tenants/my-property",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                            "Failed to fetch property"
                    );
                }

                setProperty(data.property);
            } catch (error) {
                console.error(
                    "Get my property error:",
                    error
                );

                setError(
                    error.message ||
                        "Unable to load your property"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyProperty();
    }, [navigate]);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
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

                        {/* Dashboard */}
                        <button
                            onClick={() =>
                                navigate(
                                    "/tenant/dashboard"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiBarChart2 />
                            <span>Dashboard</span>
                        </button>

                        {/* Join Property */}
                        <button
                            onClick={() =>
                                navigate(
                                    "/tenant/join-property"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiHome />
                            <span>Join Property</span>
                        </button>

                        {/* Active My Property */}
                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            <FiHome />
                            <span>My Property</span>
                        </button>

                        {/* Rent Payment */}
                        <button
                            onClick={() =>
                                navigate(
                                    "/tenant/rent-payment"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiDollarSign />
                            <span>Rent Payment</span>
                        </button>

                        {/* Maintenance */}
                        <button
                            onClick={() =>
                                navigate(
                                    "/tenant/maintenance"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiTool />
                            <span>Maintenance</span>
                        </button>

                        {/* Notifications */}
                        <button
                            onClick={() =>
                                navigate(
                                    "/tenant/notifications"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiBell />
                            <span>Notifications</span>
                        </button>

                        {/* Documents */}
                        <button
                            onClick={() =>
                                navigate(
                                    "/tenant/documents"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
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
                                My Property
                            </h2>

                            <p className="text-sm text-slate-500">
                                View your rental property details
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            {/* Notification */}
                            <button
                                onClick={() =>
                                    navigate(
                                        "/tenant/notifications"
                                    )
                                }
                                className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                            >
                                <FiBell />

                                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                            </button>

                            {/* Profile */}
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                T
                            </div>

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
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
                            My Rental Property
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Details about your current rental property.
                        </p>

                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">

                            <p className="text-sm text-slate-500">
                                Loading your property...
                            </p>

                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-6">

                            <h2 className="font-semibold text-red-700">
                                Unable to load property
                            </h2>

                            <p className="mt-2 text-sm text-red-600">
                                {error}
                            </p>

                            <button
                                onClick={() =>
                                    navigate(
                                        "/tenant/join-property"
                                    )
                                }
                                className="mt-4 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                            >
                                Join Property
                            </button>

                        </div>
                    )}

                    {/* Property */}
                    {!loading && !error && property && (
                        <>
                            {/* Property Header */}
                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                                {/* Property Banner */}
                                <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-8 text-white">

                                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                                        <div className="flex items-center gap-5">

                                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-4xl">
                                                <FiHome />
                                            </div>

                                            <div>

                                                <h2 className="text-2xl font-bold">
                                                    {property.name}
                                                </h2>

                                                <p className="mt-1 text-sm text-blue-100">
                                                    {property.address}
                                                    {property.city
                                                        ? `, ${property.city}`
                                                        : ""}
                                                </p>

                                                <span className="mt-3 inline-block rounded-full bg-green-400/20 px-3 py-1 text-xs font-medium text-green-100">
                                                    {property.status ===
                                                    "Occupied"
                                                        ? "Active Rental"
                                                        : property.status}
                                                </span>

                                            </div>

                                        </div>

                                        <div className="text-left md:text-right">

                                            <p className="text-sm text-blue-100">
                                                Monthly Rent
                                            </p>

                                            <p className="mt-1 text-2xl font-bold">
                                                Rs.{" "}
                                                {Number(
                                                    property.rent || 0
                                                ).toLocaleString()}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                {/* Property Information */}
                                <div className="p-8">

                                    <h2 className="text-lg font-semibold text-slate-800">
                                        Property Information
                                    </h2>

                                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                                        {/* Property Type */}
                                        <div className="rounded-lg bg-slate-50 p-5">

                                            <p className="text-xs text-slate-400">
                                                Property Type
                                            </p>

                                            <p className="mt-2 text-sm font-semibold text-slate-700">
                                                {property.propertyType ||
                                                    "Not provided"}
                                            </p>

                                        </div>

                                        {/* Bedrooms */}
                                        <div className="rounded-lg bg-slate-50 p-5">

                                            <p className="text-xs text-slate-400">
                                                Bedrooms
                                            </p>

                                            <p className="mt-2 text-sm font-semibold text-slate-700">
                                                {property.bedrooms ??
                                                    0}{" "}
                                                {Number(
                                                    property.bedrooms || 0
                                                ) === 1
                                                    ? "Bedroom"
                                                    : "Bedrooms"}
                                            </p>

                                        </div>

                                        {/* Bathrooms */}
                                        <div className="rounded-lg bg-slate-50 p-5">

                                            <p className="text-xs text-slate-400">
                                                Bathrooms
                                            </p>

                                            <p className="mt-2 text-sm font-semibold text-slate-700">
                                                {property.bathrooms ??
                                                    0}{" "}
                                                {Number(
                                                    property.bathrooms || 0
                                                ) === 1
                                                    ? "Bathroom"
                                                    : "Bathrooms"}
                                            </p>

                                        </div>

                                        {/* Monthly Rent */}
                                        <div className="rounded-lg bg-slate-50 p-5">

                                            <p className="text-xs text-slate-400">
                                                Monthly Rent
                                            </p>

                                            <p className="mt-2 text-sm font-semibold text-blue-600">
                                                Rs.{" "}
                                                {Number(
                                                    property.rent || 0
                                                ).toLocaleString()}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Description */}
                                    {property.description && (
                                        <div className="mt-5 rounded-lg bg-slate-50 p-5">

                                            <p className="text-xs text-slate-400">
                                                Description
                                            </p>

                                            <p className="mt-2 text-sm leading-6 text-slate-700">
                                                {
                                                    property.description
                                                }
                                            </p>

                                        </div>
                                    )}

                                </div>

                            </div>

                            {/* Details Grid */}
                            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

                                {/* Owner Information */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-600">
                                            <FiUser />
                                        </div>

                                        <div>

                                            <h2 className="font-semibold text-slate-800">
                                                Property Owner
                                            </h2>

                                            <p className="text-xs text-slate-500">
                                                Your landlord information
                                            </p>

                                        </div>

                                    </div>

                                    <div className="mt-6 space-y-4">

                                        {/* Owner Name */}
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                                            <span className="text-sm text-slate-500">
                                                Name
                                            </span>

                                            <span className="text-sm font-medium text-slate-700">
                                                {property.owner?.name ||
                                                    "Not provided"}
                                            </span>

                                        </div>

                                        {/* Owner Email */}
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                                            <span className="text-sm text-slate-500">
                                                Email
                                            </span>

                                            <span className="break-all text-right text-sm font-medium text-slate-700">
                                                {property.owner?.email ||
                                                    "Not provided"}
                                            </span>

                                        </div>

                                        {/* Owner Phone */}
                                        <div className="flex items-center justify-between">

                                            <span className="text-sm text-slate-500">
                                                Phone
                                            </span>

                                            <span className="text-sm font-medium text-slate-700">
                                                {property.owner?.phone ||
                                                    "Not provided"}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                {/* Tenancy Information */}
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl text-green-600">
                                            <FiClipboard />
                                        </div>

                                        <div>

                                            <h2 className="font-semibold text-slate-800">
                                                Tenancy Information
                                            </h2>

                                            <p className="text-xs text-slate-500">
                                                Your current rental status
                                            </p>

                                        </div>

                                    </div>

                                    <div className="mt-6 space-y-4">

                                        {/* Rental Status */}
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                                            <span className="text-sm text-slate-500">
                                                Rental Status
                                            </span>

                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                {property.status ||
                                                    "Not provided"}
                                            </span>

                                        </div>

                                        {/* Monthly Rent */}
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                                            <span className="text-sm text-slate-500">
                                                Monthly Rent
                                            </span>

                                            <span className="text-sm font-medium text-slate-700">
                                                Rs.{" "}
                                                {Number(
                                                    property.rent || 0
                                                ).toLocaleString()}
                                            </span>

                                        </div>

                                        {/* Property Type */}
                                        <div className="flex items-center justify-between">

                                            <span className="text-sm text-slate-500">
                                                Property Type
                                            </span>

                                            <span className="text-sm font-medium text-slate-700">
                                                {property.propertyType ||
                                                    "Not provided"}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </>
                    )}

                    {/* No Property */}
                    {!loading && !error && !property && (
                        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">

                            <div className="flex justify-center text-5xl text-slate-400">
                                <FiHome />
                            </div>

                            <h2 className="mt-4 text-lg font-semibold text-slate-800">
                                No Property Linked
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                You are not currently linked to any rental property.
                            </p>

                            <button
                                onClick={() =>
                                    navigate(
                                        "/tenant/join-property"
                                    )
                                }
                                className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                            >
                                Join Property
                            </button>

                        </div>
                    )}

                </main>
            </div>
        </div>
    );
};

export default MyProperty;