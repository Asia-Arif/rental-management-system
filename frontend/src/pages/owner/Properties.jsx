import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiBarChart2,
    FiHome,
    FiPlus,
    FiUsers,
    FiDollarSign,
    FiTool,
    FiBell,
    FiFileText,
    FiMapPin,
    FiSearch,
} from "react-icons/fi";

const Properties = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const properties = [
        {
            id: 1,
            name: "Green Villa",
            location: "Islamabad",
            type: "House",
            bedrooms: 4,
            rent: "Rs. 35,000",
            tenant: "Ali Khan",
            status: "Occupied",
        },
        {
            id: 2,
            name: "City Apartment",
            location: "Rawalpindi",
            type: "Apartment",
            bedrooms: 3,
            rent: "Rs. 28,000",
            tenant: "Sara Ahmed",
            status: "Occupied",
        },
        {
            id: 3,
            name: "Model Town House",
            location: "Lahore",
            type: "House",
            bedrooms: 5,
            rent: "Rs. 40,000",
            tenant: "Usman Ali",
            status: "Occupied",
        },
        {
            id: 4,
            name: "Blue Residency",
            location: "Islamabad",
            type: "Apartment",
            bedrooms: 2,
            rent: "Rs. 32,000",
            tenant: "Ayesha Khan",
            status: "Occupied",
        },
        {
            id: 5,
            name: "Sunrise Apartment",
            location: "Rawalpindi",
            type: "Apartment",
            bedrooms: 2,
            rent: "Rs. 25,000",
            tenant: "No Tenant",
            status: "Vacant",
        },
        {
            id: 6,
            name: "Lake View House",
            location: "Islamabad",
            type: "House",
            bedrooms: 4,
            rent: "Rs. 45,000",
            tenant: "No Tenant",
            status: "Vacant",
        },
    ];

    const filteredProperties = properties.filter((property) => {
        const matchesSearch =
            property.name.toLowerCase().includes(search.toLowerCase()) ||
            property.location.toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
            filter === "All" || property.status === filter;

        return matchesSearch && matchesFilter;
    });

    const totalProperties = properties.length;

    const occupiedProperties = properties.filter(
        (property) => property.status === "Occupied"
    ).length;

    const vacantProperties = properties.filter(
        (property) => property.status === "Vacant"
    ).length;

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
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <FiBarChart2 />
                            <span>Dashboard</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/properties")}
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            <FiHome />
                            <span>Properties</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/add-property")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <FiPlus />
                            <span>Add Property</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/tenants")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <FiUsers />
                            <span>Tenants</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/rent-payments")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <FiDollarSign />
                            <span>Rent Payments</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/maintenance")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <FiTool />
                            <span>Maintenance</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/notifications")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <FiBell />
                            <span>Notifications</span>
                        </button>

                        <button
                            onClick={() => navigate("/owner/documents")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <FiFileText />
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
                                Properties
                            </h2>

                            <p className="text-sm text-slate-500">
                                Manage all your rental properties
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() => navigate("/owner/notifications")}
                                className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
                            >
                                <FiBell />
                                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
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
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">
                                My Properties
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                View and manage your rental properties.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/owner/add-property")}
                            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        >
                            <span className="inline-flex items-center gap-2">
                                <FiPlus />
                                Add Property
                            </span>
                        </button>

                    </div>

                    {/* Stats */}
                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-slate-500">
                                Total Properties
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-slate-800">
                                {totalProperties}
                            </h2>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-slate-500">
                                Occupied
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-green-600">
                                {occupiedProperties}
                            </h2>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-slate-500">
                                Vacant
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-orange-500">
                                {vacantProperties}
                            </h2>
                        </div>

                    </div>

                    {/* Search + Filter */}
                    <div className="mt-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row">

                        <div className="relative flex-1">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                            <input
                                type="text"
                                placeholder="Search property or location..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-lg border border-slate-200 px-4 py-3 pl-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                        >
                            <option value="All">All Properties</option>
                            <option value="Occupied">Occupied</option>
                            <option value="Vacant">Vacant</option>
                        </select>

                    </div>

                    {/* Property Cards */}
                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {filteredProperties.map((property) => (
                            <div
                                key={property.id}
                                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >

                                {/* Property Image Placeholder */}
                                <div className="flex h-40 items-center justify-center bg-slate-100 text-6xl">
                                    <FiHome />
                                </div>

                                {/* Property Details */}
                                <div className="p-5">

                                    <div className="flex items-start justify-between gap-3">

                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-800">
                                                {property.name}
                                            </h2>

                                            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                                                <FiMapPin />
                                                {property.location}
                                            </p>
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${property.status === "Occupied"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-orange-100 text-orange-700"
                                                }`}
                                        >
                                            {property.status}
                                        </span>

                                    </div>

                                    {/* Info */}
                                    <div className="mt-5 grid grid-cols-2 gap-3">

                                        <div className="rounded-lg bg-slate-50 p-3">
                                            <p className="text-xs text-slate-500">
                                                Type
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-slate-700">
                                                {property.type}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-slate-50 p-3">
                                            <p className="text-xs text-slate-500">
                                                Bedrooms
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-slate-700">
                                                {property.bedrooms}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Rent */}
                                    <div className="mt-5 flex items-center justify-between">

                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Monthly Rent
                                            </p>

                                            <p className="mt-1 text-lg font-bold text-slate-800">
                                                {property.rent}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs text-slate-500">
                                                Tenant
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-slate-700">
                                                {property.tenant}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-5 flex gap-3">

                                        <button className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
                                            View Details
                                        </button>

                                        <button className="rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-100">
                                            Edit
                                        </button>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                    {/* Empty State */}
                    {filteredProperties.length === 0 && (
                        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-12 text-center">

                            <div className="flex justify-center text-5xl text-slate-400">
                                <FiSearch />
                            </div>

                            <h2 className="mt-4 text-lg font-semibold text-slate-800">
                                No properties found
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Try changing your search or filter.
                            </p>

                        </div>
                    )}

                </main>

            </div>

        </div>
    );
};

export default Properties;