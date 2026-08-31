import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProperty = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        propertyType: "",
        rent: "",
        bedrooms: "",
        bathrooms: "",
        description: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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
                    `http://localhost:5000/api/properties/${id}`,
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

                const property = data.property;

                setFormData({
                    name: property.name || "",
                    address: property.address || "",
                    city: property.city || "",
                    propertyType: property.propertyType || "",
                    rent: property.rent || "",
                    bedrooms: property.bedrooms || "",
                    bathrooms: property.bathrooms || "",
                    description: property.description || "",
                });
            } catch (error) {
                console.error("Get property error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `http://localhost:5000/api/properties/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        address: formData.address,
                        city: formData.city,
                        propertyType: formData.propertyType,
                        rent: Number(formData.rent),
                        bedrooms: Number(formData.bedrooms),
                        bathrooms: Number(formData.bathrooms),
                        description: formData.description,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update property"
                );
            }

            alert("Property updated successfully.");

            navigate(`/owner/properties/${id}`);
        } catch (error) {
            console.error("Update property error:", error);
            setError(error.message || "Unable to update property.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 p-10">
                <p className="text-slate-500">
                    Loading property...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">

            <main className="mx-auto max-w-4xl px-8 py-10">

                <div className="mb-8">

                    <h1 className="text-2xl font-bold text-slate-800">
                        Edit Property
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Update your property information.
                    </p>

                </div>

                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="rounded-xl border border-slate-200 bg-white shadow-sm"
                >

                    {/* Basic Information */}
                    <div className="border-b border-slate-200 p-6">

                        <h2 className="text-lg font-semibold text-slate-800">
                            Basic Information
                        </h2>

                        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Property Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Property Type
                                </label>

                                <select
                                    name="propertyType"
                                    value={formData.propertyType}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                                >
                                    <option value="">
                                        Select property type
                                    </option>

                                    <option value="House">
                                        House
                                    </option>

                                    <option value="Apartment">
                                        Apartment
                                    </option>

                                    <option value="Room">
                                        Room
                                    </option>

                                    <option value="Shop">
                                        Shop
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Address
                                </label>

                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                        </div>

                    </div>

                    {/* Property Details */}
                    <div className="border-b border-slate-200 p-6">

                        <h2 className="text-lg font-semibold text-slate-800">
                            Property Details
                        </h2>

                        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Bedrooms
                                </label>

                                <input
                                    type="number"
                                    name="bedrooms"
                                    min="0"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Bathrooms
                                </label>

                                <input
                                    type="number"
                                    name="bathrooms"
                                    min="0"
                                    value={formData.bathrooms}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Monthly Rent
                                </label>

                                <input
                                    type="number"
                                    name="rent"
                                    min="0"
                                    value={formData.rent}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                        </div>

                    </div>

                    {/* Description */}
                    <div className="border-b border-slate-200 p-6">

                        <h2 className="text-lg font-semibold text-slate-800">
                            Description
                        </h2>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            className="mt-6 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 p-6 sm:flex-row sm:justify-end">

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/owner/properties")
                            }
                            className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {saving
                                ? "Updating..."
                                : "Update Property"}
                        </button>

                    </div>

                </form>

            </main>

        </div>
    );
};

export default EditProperty;