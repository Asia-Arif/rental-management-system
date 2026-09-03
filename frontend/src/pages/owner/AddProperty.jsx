import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import Sidebar from "../../components/Sidebar";

const AddProperty = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        propertyName: "",
        propertyType: "",
        location: "",
        city: "",
        bedrooms: "",
        bathrooms: "",
        monthlyRent: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/properties",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: formData.propertyName,
                        address: formData.location,
                        city: formData.city,
                        propertyType: formData.propertyType,
                        rent: Number(formData.monthlyRent),
                        bedrooms: Number(formData.bedrooms),
                        bathrooms: Number(formData.bathrooms),
                        description: formData.description,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to add property"
                );
            }

            alert("Property added successfully!");

            navigate("/owner/properties");

        } catch (error) {
            console.error("Add property error:", error);
            alert(error.message || "Unable to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Common Owner Sidebar */}
            <Sidebar role="owner" />

            {/* Main Content */}
            <div className="ml-64">

                {/* Navbar */}
                <header className="fixed left-64 right-0 top-0 z-40 h-20 border-b border-slate-200 bg-white">

                    <div className="flex h-full items-center justify-between px-8">

                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">
                                Add Property
                            </h2>

                            <p className="text-sm text-slate-500">
                                Add a new rental property
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() => navigate("/owner/notifications")}
                                className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
                            >
                                <Bell />

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

                {/* Form */}
                <main className="px-8 pb-10 pt-28">

                    <div className="mx-auto max-w-4xl">

                        {/* Page Intro */}
                        <div className="mb-8">

                            <h1 className="text-2xl font-bold text-slate-800">
                                Property Information
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Enter the details of your rental property.
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="rounded-xl border border-slate-200 bg-white shadow-sm"
                        >

                            {/* Basic Information */}
                            <div className="border-b border-slate-200 p-6">

                                <h2 className="text-lg font-semibold text-slate-800">
                                    Basic Information
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Provide basic details about the property.
                                </p>

                                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                                    {/* Property Name */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Property Name
                                        </label>

                                        <input
                                            type="text"
                                            name="propertyName"
                                            value={formData.propertyName}
                                            onChange={handleChange}
                                            placeholder="e.g. Green Villa"
                                            required
                                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>

                                    {/* Property Type */}
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

                                    {/* Location */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Address
                                        </label>

                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="e.g. Street 5, Bahria Town"
                                            required
                                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            City
                                        </label>

                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="e.g. Rawalpindi"
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

                                <p className="mt-1 text-sm text-slate-500">
                                    Add rooms and rental information.
                                </p>

                                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">

                                    {/* Bedrooms */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Bedrooms
                                        </label>

                                        <input
                                            type="number"
                                            name="bedrooms"
                                            value={formData.bedrooms}
                                            onChange={handleChange}
                                            min="0"
                                            placeholder="e.g. 3"
                                            required
                                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>

                                    {/* Bathrooms */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Bathrooms
                                        </label>

                                        <input
                                            type="number"
                                            name="bathrooms"
                                            value={formData.bathrooms}
                                            onChange={handleChange}
                                            min="0"
                                            placeholder="e.g. 2"
                                            required
                                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>

                                    {/* Monthly Rent */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Monthly Rent
                                        </label>

                                        <input
                                            type="number"
                                            name="monthlyRent"
                                            value={formData.monthlyRent}
                                            onChange={handleChange}
                                            min="1"
                                            placeholder="e.g. 35000"
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

                                <p className="mt-1 text-sm text-slate-500">
                                    Add additional information about the property.
                                </p>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Describe the property..."
                                    className="mt-6 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                            </div>

                            {/* Actions */}
                            <div className="flex flex-col-reverse gap-3 p-6 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={() => navigate("/owner/properties")}
                                    className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                                >
                                    {loading
                                        ? "Adding Property..."
                                        : "Add Property"}
                                </button>

                            </div>

                        </form>

                    </div>

                </main>

            </div>

        </div>
    );
};

export default AddProperty;