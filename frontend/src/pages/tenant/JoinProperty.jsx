import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiBarChart2,
    FiHome,
    FiDollarSign,
    FiTool,
    FiBell,
    FiFileText,
    FiInfo,
} from "react-icons/fi";

const JoinProperty = () => {
    const navigate = useNavigate();

    const [propertyCode, setPropertyCode] = useState("");
    const [message, setMessage] = useState("");
    const [joined, setJoined] = useState(false);

    const handleJoinProperty = (e) => {
        e.preventDefault();

        if (!propertyCode.trim()) {
            setMessage("Please enter a property code.");
            return;
        }

        // Frontend demo
        setJoined(true);
        setMessage("Property found! You can now join this property.");
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
                            onClick={() => navigate("/tenant/dashboard")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiBarChart2 />
                            <span>Dashboard</span>
                        </button>

                        {/* Active Join Property */}
                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            <FiHome />
                            <span>Join Property</span>
                        </button>

                        {/* My Property */}
                        <button
                            onClick={() => navigate("/tenant/my-property")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiHome />
                            <span>My Property</span>
                        </button>

                        {/* Rent Payment */}
                        <button
                            onClick={() => navigate("/tenant/rent-payment")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiDollarSign />
                            <span>Rent Payment</span>
                        </button>

                        {/* Maintenance */}
                        <button
                            onClick={() => navigate("/tenant/maintenance")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiTool />
                            <span>Maintenance</span>
                        </button>

                        {/* Notifications */}
                        <button
                            onClick={() => navigate("/tenant/notifications")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiBell />
                            <span>Notifications</span>
                        </button>

                        {/* Documents */}
                        <button
                            onClick={() => navigate("/tenant/documents")}
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
                                    placeholder="Example: RE-45821"
                                    value={propertyCode}
                                    onChange={(e) => {
                                        setPropertyCode(e.target.value);
                                        setMessage("");
                                        setJoined(false);
                                    }}
                                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm uppercase outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                <p className="mt-2 text-xs text-slate-400">
                                    Enter the code exactly as provided by your owner.
                                </p>

                                <button
                                    type="submit"
                                    className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    Find Property
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
                            {joined && (
                                <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">

                                    <div className="flex items-start gap-4">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                            <FiHome />
                                        </div>

                                        <div className="flex-1">

                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                                                <div>
                                                    <h3 className="font-semibold text-slate-800">
                                                        Green Villa
                                                    </h3>

                                                    <p className="mt-1 text-sm text-slate-500">
                                                        Street 12, Model Town, Lahore
                                                    </p>
                                                </div>

                                                <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                    Available
                                                </span>

                                            </div>

                                            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">

                                                <div>
                                                    <p className="text-xs text-slate-400">
                                                        Bedrooms
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                                        2
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-slate-400">
                                                        Monthly Rent
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                                        Rs. 35,000
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-slate-400">
                                                        Owner
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                                        Ahmed Khan
                                                    </p>
                                                </div>

                                            </div>

                                            <button
                                                onClick={() =>
                                                    navigate("/tenant/my-property")
                                                }
                                                className="mt-5 rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700"
                                            >
                                                Join Property
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
                                            Ask your property owner for the unique property code.
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
                                            Enter the code in the form and find your property.
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
                                            Confirm your property
                                        </h3>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Check the property details before joining.
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Note */}
                            <div className="mt-7 rounded-lg bg-blue-50 p-4">

                                <p className="text-xs leading-5 text-blue-700">
                                    <FiInfo className="mr-1 inline-block" />
                                    Make sure the property details match the information
                                    provided by your owner before joining.
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