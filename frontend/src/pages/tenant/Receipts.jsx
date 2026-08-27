import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Receipts = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const receipts = [
        {
            id: 1,
            receiptNo: "REC-2026-001",
            tenant: "Tenant",
            property: "Green Villa",
            amount: 35000,
            paymentDate: "01 Aug 2026",
            paymentMethod: "Bank Transfer",
            status: "Paid",
        },
        {
            id: 2,
            receiptNo: "REC-2026-002",
            tenant: "Tenant",
            property: "Green Villa",
            amount: 35000,
            paymentDate: "01 Jul 2026",
            paymentMethod: "Cash",
            status: "Paid",
        },
        {
            id: 3,
            receiptNo: "REC-2026-003",
            tenant: "Tenant",
            property: "Green Villa",
            amount: 35000,
            paymentDate: "01 Jun 2026",
            paymentMethod: "Bank Transfer",
            status: "Paid",
        },
    ];

    const filteredReceipts = receipts.filter(
        (receipt) =>
            receipt.receiptNo.toLowerCase().includes(search.toLowerCase()) ||
            receipt.property.toLowerCase().includes(search.toLowerCase())
    );

    const totalPaid = receipts.reduce(
        (total, receipt) => total + receipt.amount,
        0
    );

    const formatAmount = (amount) => {
        return `Rs. ${amount.toLocaleString()}`;
    };

    const handleViewReceipt = (receipt) => {
        alert(`Opening receipt: ${receipt.receiptNo}`);
    };

    const handleDownloadReceipt = (receipt) => {
        alert(`Downloading receipt: ${receipt.receiptNo}`);
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

                        <button
                            onClick={() => navigate("/tenant/maintenance")}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
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

                        {/* Active Receipts */}
                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            🧾
                            <span>Receipts</span>
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
                                Rent Receipts
                            </h2>

                            <p className="text-sm text-slate-500">
                                View and download your rent payment receipts
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() => navigate("/tenant/notifications")}
                                className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                            >
                                🔔
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
                            My Rent Receipts
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Keep track of your previous rent payments and receipts.
                        </p>

                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                        {/* Total Receipts */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Total Receipts
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-slate-800">
                                        {receipts.length}
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                    🧾
                                </div>

                            </div>

                        </div>

                        {/* Total Paid */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Total Paid
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-green-600">
                                        {formatAmount(totalPaid)}
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                    💰
                                </div>

                            </div>

                        </div>

                        {/* Payment Status */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Payment Status
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-green-600">
                                        All Paid
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                    ✅
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Search */}
                    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                        <input
                            type="text"
                            placeholder="Search receipt number or property..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>

                    {/* Receipt Table */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-200 px-6 py-5">

                            <h2 className="font-semibold text-slate-800">
                                Payment Receipts
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Your previous rental payment records.
                            </p>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[900px] text-left">

                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Receipt No.
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Property
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Amount
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Payment Date
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Method
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredReceipts.map((receipt) => (

                                        <tr
                                            key={receipt.id}
                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                        >

                                            {/* Receipt Number */}
                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-lg">
                                                        🧾
                                                    </div>

                                                    <span className="text-sm font-semibold text-slate-700">
                                                        {receipt.receiptNo}
                                                    </span>

                                                </div>

                                            </td>

                                            {/* Property */}
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {receipt.property}
                                            </td>

                                            {/* Amount */}
                                            <td className="px-6 py-5 text-sm font-semibold text-slate-700">
                                                {formatAmount(receipt.amount)}
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {receipt.paymentDate}
                                            </td>

                                            {/* Method */}
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {receipt.paymentMethod}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-5">

                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                    {receipt.status}
                                                </span>

                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-5">

                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() =>
                                                            handleViewReceipt(receipt)
                                                        }
                                                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
                                                    >
                                                        👁 View
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDownloadReceipt(receipt)
                                                        }
                                                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
                                                    >
                                                        ⬇ Download
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                        {/* Empty State */}
                        {filteredReceipts.length === 0 && (

                            <div className="p-12 text-center">

                                <div className="text-5xl">
                                    🔍
                                </div>

                                <h3 className="mt-4 font-semibold text-slate-800">
                                    No receipts found
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Try searching with a different receipt number.
                                </p>

                            </div>

                        )}

                    </div>

                </main>
            </div>
        </div>
    );
};

export default Receipts;