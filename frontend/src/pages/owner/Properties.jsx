import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
    FiHome,
    FiPlus,
    FiBell,
    FiMapPin,
    FiSearch,
    FiTrash2,
} from "react-icons/fi";

const Properties = () => {
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get properties from backend
    const fetchProperties = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_URL}/properties`,
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
                    data.message || "Failed to fetch properties"
                );
            }

            setProperties(data.properties || []);
        } catch (error) {
            console.error("Get properties error:", error);
            setError(error.message || "Unable to load properties.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    // Delete property
    const handleDelete = async (propertyId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this property?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_URL}/properties/${propertyId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete property"
                );
            }

            // Remove deleted property from current list
            setProperties((prevProperties) =>
                prevProperties.filter(
                    (property) => property._id !== propertyId
                )
            );

            alert("Property deleted successfully.");
        } catch (error) {
            console.error("Delete property error:", error);
            alert(error.message || "Unable to delete property.");
        }
    };

    const filteredProperties = properties.filter((property) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            property.name?.toLowerCase().includes(searchText) ||
            property.city?.toLowerCase().includes(searchText) ||
            property.address?.toLowerCase().includes(searchText);

        const status =
            property.status === "Occupied" ? "Occupied" : "Vacant";

        const matchesFilter =
            filter === "All" || status === filter;

        return matchesSearch && matchesFilter;
    });

    const totalProperties = properties.length;

    const occupiedProperties = properties.filter(
        (property) => property.status === "Occupied"
    ).length;

    const vacantProperties = properties.filter(
        (property) => property.status === "Available"
    ).length;

    const formatAmount = (amount) => {
        return `Rs. ${Number(amount || 0).toLocaleString()}`;
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Reusable Owner Sidebar */}
            <Sidebar role="owner" />

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
                                onClick={() =>
                                    navigate("/owner/notifications")
                                }
                                className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
                            >
                                <FiBell />

                                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
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
                            onClick={() =>
                                navigate("/owner/add-property")
                            }
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
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full rounded-lg border border-slate-200 px-4 py-3 pl-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                        <select
                            value={filter}
                            onChange={(e) =>
                                setFilter(e.target.value)
                            }
                            className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                        >
                            <option value="All">
                                All Properties
                            </option>

                            <option value="Occupied">
                                Occupied
                            </option>

                            <option value="Vacant">
                                Vacant
                            </option>
                        </select>

                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-12 text-center">
                            <p className="text-sm text-slate-500">
                                Loading properties...
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Property Cards */}
                    {!loading && !error && (
                        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                            {filteredProperties.map((property) => (

                                <div
                                    key={property._id}
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
                                                    {property.city}
                                                </p>

                                            </div>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    property.status === "Occupied"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-orange-100 text-orange-700"
                                                }`}
                                            >
                                                {property.status === "Available"
                                                    ? "Vacant"
                                                    : property.status}
                                            </span>

                                        </div>

                                        {/* Info */}
                                        <div className="mt-5 grid grid-cols-2 gap-3">

                                            <div className="rounded-lg bg-slate-50 p-3">

                                                <p className="text-xs text-slate-500">
                                                    Type
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-slate-700">
                                                    {property.propertyType}
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
                                                    {formatAmount(
                                                        property.rent
                                                    )}
                                                </p>

                                            </div>

                                            <div className="text-right">

                                                <p className="text-xs text-slate-500">
                                                    Tenant
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-slate-700">
                                                    {property.tenant?.name ||
                                                        "No Tenant"}
                                                </p>

                                            </div>

                                        </div>

                                        {/* Buttons */}
                                        <div className="mt-5 flex gap-3">

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/owner/properties/${property._id}`
                                                    )
                                                }
                                                className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                                            >
                                                View Details
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/owner/properties/${property._id}/edit`
                                                    )
                                                }
                                                className="rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-100"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        property._id
                                                    )
                                                }
                                                className="rounded-lg bg-red-50 px-3 py-2.5 text-red-600 hover:bg-red-100"
                                                title="Delete Property"
                                            >
                                                <FiTrash2 />
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

                    {/* Empty State */}
                    {!loading &&
                        !error &&
                        filteredProperties.length === 0 && (

                            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-12 text-center">

                                <div className="flex justify-center text-5xl text-slate-400">
                                    <FiSearch />
                                </div>

                                <h2 className="mt-4 text-lg font-semibold text-slate-800">
                                    No properties found
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    {properties.length === 0
                                        ? "You have not added any properties yet."
                                        : "Try changing your search or filter."}
                                </p>

                            </div>
                        )}

                </main>

            </div>

        </div>
    );
};

export default Properties;