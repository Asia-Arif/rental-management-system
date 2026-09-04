import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiHome,
    FiBell,
    FiInfo,
} from "react-icons/fi";

import Sidebar from "../../components/Sidebar";

const API_URL = import.meta.env.VITE_API_URL;

const JoinProperty = () => {
    const navigate = useNavigate();

    const [propertyCode, setPropertyCode] = useState("");
    const [message, setMessage] = useState("");
    const [joined, setJoined] = useState(false);
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleJoinProperty = async (e) => {
        e.preventDefault();

        if (!propertyCode.trim()) {
            setMessage("Please enter a property code.");
            setJoined(false);
            setProperty(null);
            return;
        }

        try {
            setLoading(true);
            setMessage("");
            setJoined(false);
            setProperty(null);

            const token = localStorage.getItem("token");

            if (!token) {
                setMessage("Please login as a tenant first.");
                return;
            }

            const response = await fetch(
                `${API_URL}/tenants/accept-invite`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        inviteCode: propertyCode.trim(),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Failed to join property.");
                return;
            }

            setJoined(true);
            setProperty(data.property);
            setMessage(data.message || "Property joined successfully!");

        } catch (error) {
            console.error("Join property error:", error);
            setMessage(
                "Unable to connect to the server. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Common Sidebar */}
            <Sidebar role="tenant" />

            {/* Main Content */}
            <div className="ml-64">

                {/* Navbar */}
                <header className="fixed left-64 right-0 top-0 z-40 h-20 border-b border-slate-200 bg-white">

                    <div className="flex h-full items-center justify-between px-8">

                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">
                                Join Property
                            </h2>

                            <p className="text-sm text-slate-500">
                                Connect with your rental property
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            {/* Notification */}
                            <button
                                onClick={() => navigate("/tenant/notifications")}
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
                                onClick={() => navigate("/login")}
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
                            Join a Property
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter the property code provided by your owner.
                        </p>

                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                        {/* Join Form */}
                        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">

                            <div className="mb-6">

                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                    <FiHome />
                                </div>

                                <h2 className="mt-5 text-xl font-semibold text-slate-800">
                                    Enter Property Code
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    Your property owner should provide you with a unique
                                    property code.
                                </p>

                            </div>

                            <form onSubmit={handleJoinProperty}>

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Property Code
                                </label>

                                <input
                                    type="text"
                                    placeholder="Example: 458921"
                                    value={propertyCode}
                                    onChange={(e) => {
                                        setPropertyCode(e.target.value);
                                        setMessage("");
                                        setJoined(false);
                                        setProperty(null);
                                    }}
                                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm uppercase outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                <p className="mt-2 text-xs text-slate-400">
                                    Enter the 6-digit code sent to your email by the owner.
                                </p>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? "Joining Property..." : "Join Property"}
                                </button>

                            </form>

                            {/* Message */}
                            {message && (
                                <div
                                    className={`mt-5 rounded-lg p-4 text-sm ${
                                        joined
                                            ? "border border-green-200 bg-green-50 text-green-700"
                                            : "border border-red-200 bg-red-50 text-red-700"
                                    }`}
                                >
                                    {message}
                                </div>
                            )}

                            {/* Property Preview */}
                            {joined && property && (
                                <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">

                                    <div className="flex items-start gap-4">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                            <FiHome />
                                        </div>

                                        <div className="flex-1">

                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                                                <div>
                                                    <h3 className="font-semibold text-slate-800">
                                                        {property.name}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-slate-500">
                                                        {property.address}, {property.city}
                                                    </p>
                                                </div>

                                                <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                    Joined
                                                </span>

                                            </div>

                                            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">

                                                <div>
                                                    <p className="text-xs text-slate-400">
                                                        Bedrooms
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                                        {property.bedrooms}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-slate-400">
                                                        Monthly Rent
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                                        Rs. {property.rent?.toLocaleString()}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-slate-400">
                                                        Owner
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                                        {property.owner?.name || "Owner"}
                                                    </p>
                                                </div>

                                            </div>

                                            <button
                                                onClick={() =>
                                                    navigate("/tenant/my-property")
                                                }
                                                className="mt-5 rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700"
                                            >
                                                View My Property
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            )}

                        </div>

                        {/* Instructions */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <h2 className="text-lg font-semibold text-slate-800">
                                How to Join?
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Follow these simple steps.
                            </p>

                            <div className="mt-6 space-y-5">

                                {/* Step 1 */}
                                <div className="flex gap-4">

                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                                        1
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-700">
                                            Get the property code
                                        </h3>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            The owner will send you a unique invite code by email.
                                        </p>
                                    </div>

                                </div>

                                {/* Step 2 */}
                                <div className="flex gap-4">

                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                                        2
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-700">
                                            Enter the code
                                        </h3>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Enter the 6-digit code in the form and join your property.
                                        </p>
                                    </div>

                                </div>

                                {/* Step 3 */}
                                <div className="flex gap-4">

                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                                        3
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-700">
                                            View your property
                                        </h3>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            After joining, you can view your rental property details.
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Note */}
                            <div className="mt-7 rounded-lg bg-blue-50 p-4">

                                <p className="text-xs leading-5 text-blue-700">
                                    <FiInfo className="mr-1 inline-block" />
                                    Make sure you are logged in with the same email address
                                    that received the property invitation.
                                </p>

                            </div>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
};

export default JoinProperty;