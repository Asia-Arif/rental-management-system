import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    FiArrowLeft,
    FiHome,
    FiMapPin,
    FiUsers,
    FiDollarSign,
} from "react-icons/fi";

const PropertyDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const API_URL = import.meta.env.VITE_API_URL;

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await fetch(
                    `${API_URL}/properties/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Property not found"
                    );
                }

                setProperty(data.property);
            } catch (error) {
                console.error("Get property error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 p-10">
                <p className="text-slate-500">
                    Loading property...
                </p>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="min-h-screen bg-slate-50 p-10">
                <button
                    onClick={() => navigate("/owner/properties")}
                    className="mb-6 flex items-center gap-2 text-sm text-blue-600"
                >
                    <FiArrowLeft />
                    Back to Properties
                </button>

                <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                    <p className="text-red-600">
                        {error || "Property not found"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">

            <div className="mx-auto max-w-5xl px-8 py-10">

                <button
                    onClick={() => navigate("/owner/properties")}
                    className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
                >
                    <FiArrowLeft />
                    Back to Properties
                </button>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                    {/* Header */}
                    <div className="flex h-52 items-center justify-center bg-slate-100 text-7xl text-slate-400">
                        <FiHome />
                    </div>

                    <div className="p-8">

                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">

                            <div>

                                <h1 className="text-3xl font-bold text-slate-800">
                                    {property.name}
                                </h1>

                                <p className="mt-2 flex items-center gap-2 text-slate-500">
                                    <FiMapPin />
                                    {property.address}, {property.city}
                                </p>

                            </div>

                            <span
                                className={`w-fit rounded-full px-4 py-2 text-sm font-medium ${
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

                        {/* Details */}
                        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div className="rounded-xl bg-slate-50 p-5">
                                <p className="text-sm text-slate-500">
                                    Property Type
                                </p>

                                <p className="mt-2 font-semibold text-slate-800">
                                    {property.propertyType}
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-5">
                                <p className="text-sm text-slate-500">
                                    Monthly Rent
                                </p>

                                <p className="mt-2 flex items-center gap-2 font-semibold text-slate-800">
                                    <FiDollarSign />
                                    Rs. {Number(property.rent).toLocaleString()}
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-5">
                                <p className="text-sm text-slate-500">
                                    Bedrooms
                                </p>

                                <p className="mt-2 font-semibold text-slate-800">
                                    {property.bedrooms}
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-5">
                                <p className="text-sm text-slate-500">
                                    Bathrooms
                                </p>

                                <p className="mt-2 font-semibold text-slate-800">
                                    {property.bathrooms}
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-5 md:col-span-2">

                                <p className="text-sm text-slate-500">
                                    Tenant
                                </p>

                                <p className="mt-2 flex items-center gap-2 font-semibold text-slate-800">
                                    <FiUsers />

                                    {property.tenant?.name ||
                                        "No Tenant"}
                                </p>

                                {property.tenant?.email && (
                                    <p className="mt-1 text-sm text-slate-500">
                                        {property.tenant.email}
                                    </p>
                                )}

                            </div>

                        </div>

                        {/* Description */}
                        <div className="mt-8">

                            <h2 className="text-lg font-semibold text-slate-800">
                                Description
                            </h2>

                            <p className="mt-2 leading-7 text-slate-600">
                                {property.description ||
                                    "No description provided."}
                            </p>

                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex gap-3">

                            <button
                                onClick={() =>
                                    navigate(
                                        `/owner/properties/${property._id}/edit`
                                    )
                                }
                                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                Edit Property
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/owner/properties")
                                }
                                className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                            >
                                Back
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PropertyDetails;