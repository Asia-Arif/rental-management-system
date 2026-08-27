import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Maintenance = () => {
    const navigate = useNavigate();

    const [issueType, setIssueType] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [message, setMessage] = useState("");

    const requests = [
        {
            id: 1,
            issue: "Water Leakage",
            description: "Water is leaking from the kitchen sink.",
            date: "20 Aug 2026",
            priority: "High",
            status: "In Progress",
        },
        {
            id: 2,
            issue: "Air Conditioner",
            description: "AC is not cooling properly.",
            date: "12 Aug 2026",
            priority: "Medium",
            status: "Completed",
        },
        {
            id: 3,
            issue: "Electricity",
            description: "Bedroom light is not working.",
            date: "05 Aug 2026",
            priority: "Low",
            status: "Completed",
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!issueType || !description) {
            setMessage("Please fill in all required fields.");
            return;
        }

        setMessage(
            "Maintenance request submitted successfully!"
        );

        setIssueType("");
        setDescription("");
        setPriority("Medium");
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

                        <button
                            onClick={() => navigate("/tenant/dashboard")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            📊
                            <span>Dashboard</span>
                        </button>

                        <button
                            onClick={() => navigate("/tenant/join-property")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            🏠
                            <span>Join Property</span>
                        </button>

                        <button
                            onClick={() => navigate("/tenant/my-property")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            🏡
                            <span>My Property</span>
                        </button>

                        <button
                            onClick={() => navigate("/tenant/rent-payment")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            💰
                            <span>Rent Payment</span>
                        </button>

                        {/* Active Maintenance */}
                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            🔧
                            <span>Maintenance</span>
                        </button>

                        <button
                            onClick={() => navigate("/tenant/notifications")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            🔔
                            <span>Notifications</span>
                        </button>

                        <button
                            onClick={() => navigate("/tenant/documents")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            📄
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
                                Maintenance
                            </h2>

                            <p className="text-sm text-slate-500">
                                Report and track property maintenance issues
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() => navigate("/tenant/notifications")}
                                className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                            >
                                🔔

                                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                            </button>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                T
                            </div>

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
                            Maintenance Requests
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Report an issue and keep track of your maintenance requests.
                        </p>

                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                        {/* Total */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Total Requests
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-slate-800">
                                        3
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                    🔧
                                </div>

                            </div>

                        </div>

                        {/* In Progress */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        In Progress
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-yellow-600">
                                        1
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-2xl">
                                    ⏳
                                </div>

                            </div>

                        </div>

                        {/* Completed */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Completed
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-green-600">
                                        2
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                    ✅
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* New Request */}
                    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="mb-6">

                            <h2 className="text-lg font-semibold text-slate-800">
                                Submit Maintenance Request
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Tell your property owner about a problem in your property.
                            </p>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                {/* Issue Type */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Issue Type
                                    </label>

                                    <select
                                        value={issueType}
                                        onChange={(e) => setIssueType(e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    >

                                        <option value="">
                                            Select issue type
                                        </option>

                                        <option value="Plumbing">
                                            Plumbing
                                        </option>

                                        <option value="Electricity">
                                            Electricity
                                        </option>

                                        <option value="Air Conditioner">
                                            Air Conditioner
                                        </option>

                                        <option value="Water Leakage">
                                            Water Leakage
                                        </option>

                                        <option value="Appliance">
                                            Appliance
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                </div>

                                {/* Priority */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Priority
                                    </label>

                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    >

                                        <option value="Low">
                                            Low
                                        </option>

                                        <option value="Medium">
                                            Medium
                                        </option>

                                        <option value="High">
                                            High
                                        </option>

                                    </select>

                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">

                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Problem Description
                                    </label>

                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="5"
                                        placeholder="Describe the problem..."
                                        className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                </div>

                            </div>

                            {/* Message */}
                            {message && (
                                <div className="mt-5 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
                                    {message}
                                </div>
                            )}

                            {/* Submit */}
                            <div className="mt-6 flex justify-end">

                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    🔧 Submit Request
                                </button>

                            </div>

                        </form>

                    </div>

                    {/* Request History */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-200 px-6 py-5">

                            <h2 className="font-semibold text-slate-800">
                                My Maintenance Requests
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Track the status of your submitted requests.
                            </p>

                        </div>

                        <div className="divide-y divide-slate-100">

                            {requests.map((request) => (
                                <div
                                    key={request.id}
                                    className="p-6 transition hover:bg-slate-50"
                                >

                                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                                        {/* Request Info */}
                                        <div className="flex gap-4">

                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-2xl">
                                                🔧
                                            </div>

                                            <div>

                                                <h3 className="font-semibold text-slate-800">
                                                    {request.issue}
                                                </h3>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    {request.description}
                                                </p>

                                                <p className="mt-2 text-xs text-slate-400">
                                                    Submitted: {request.date}
                                                </p>

                                            </div>

                                        </div>

                                        {/* Status */}
                                        <div className="flex items-center gap-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${request.priority === "High"
                                                        ? "bg-red-100 text-red-700"
                                                        : request.priority === "Medium"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {request.priority} Priority
                                            </span>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${request.status === "Completed"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {request.status}
                                            </span>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
};

export default Maintenance;