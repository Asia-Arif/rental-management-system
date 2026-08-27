import { useNavigate } from "react-router-dom";

const Payments = () => {
    const navigate = useNavigate();

    const payments = [
        {
            id: 1,
            month: "August 2026",
            amount: 35000,
            dueDate: "01 Aug 2026",
            paidDate: "01 Aug 2026",
            status: "Paid",
        },
        {
            id: 2,
            month: "July 2026",
            amount: 35000,
            dueDate: "01 Jul 2026",
            paidDate: "01 Jul 2026",
            status: "Paid",
        },
        {
            id: 3,
            month: "June 2026",
            amount: 35000,
            dueDate: "01 Jun 2026",
            paidDate: "02 Jun 2026",
            status: "Paid",
        },
        {
            id: 4,
            month: "May 2026",
            amount: 35000,
            dueDate: "01 May 2026",
            paidDate: "01 May 2026",
            status: "Paid",
        },
    ];

    const formatAmount = (amount) => {
        return `Rs. ${amount.toLocaleString()}`;
    };

    const paidPayments = payments.filter(
        (payment) => payment.status === "Paid"
    );

    const totalPaid = paidPayments.reduce(
        (total, payment) => total + payment.amount,
        0
    );

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

                        {/* Active Payments */}
                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
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
                                Rent Payment
                            </h2>

                            <p className="text-sm text-slate-500">
                                Manage your monthly rental payments
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
                            Rent Payment
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Keep track of your monthly rent and payment history.
                        </p>

                    </div>

                    {/* Current Rent Card */}
                    <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white shadow-sm">

                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                            <div>

                                <p className="text-sm text-blue-100">
                                    Current Month Rent
                                </p>

                                <h2 className="mt-2 text-4xl font-bold">
                                    Rs. 35,000
                                </h2>

                                <p className="mt-2 text-sm text-blue-100">
                                    Green Villa
                                </p>

                            </div>

                            <div className="rounded-xl bg-white/10 p-6">

                                <p className="text-sm text-blue-100">
                                    Due Date
                                </p>

                                <p className="mt-2 text-xl font-semibold">
                                    01 Sep 2026
                                </p>

                                <span className="mt-3 inline-block rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-medium text-yellow-100">
                                    Upcoming
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Statistics */}
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">

                        {/* Monthly Rent */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Monthly Rent
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-slate-800">
                                        Rs. 35,000
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                    💰
                                </div>

                            </div>

                        </div>

                        {/* Paid This Year */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Total Paid
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-green-600">
                                        {formatAmount(totalPaid)}
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Payment history
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                    ✅
                                </div>

                            </div>

                        </div>

                        {/* Payment Status */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Current Status
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-green-600">
                                        Paid
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Latest payment received
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                    ✓
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Payment Information */}
                    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Payment Information
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your next rent payment is due on 01 September 2026.
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    alert("Online payment will be available soon.")
                                }
                                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                            >
                                💳 Pay Rent
                            </button>

                        </div>

                    </div>

                    {/* Payment History */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-200 px-6 py-5">

                            <h2 className="font-semibold text-slate-800">
                                Payment History
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Your previous rental payments.
                            </p>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[750px] text-left">

                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Month
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Amount
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Due Date
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Paid Date
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Receipt
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {payments.map((payment) => (
                                        <tr
                                            key={payment.id}
                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                        >

                                            <td className="px-6 py-5 text-sm font-medium text-slate-700">
                                                {payment.month}
                                            </td>

                                            <td className="px-6 py-5 text-sm font-semibold text-slate-700">
                                                {formatAmount(payment.amount)}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {payment.dueDate}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {payment.paidDate}
                                            </td>

                                            <td className="px-6 py-5">

                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                    {payment.status}
                                                </span>

                                            </td>

                                            <td className="px-6 py-5">

                                                <button
                                                    onClick={() =>
                                                        navigate("/tenant/receipts")
                                                    }
                                                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
                                                >
                                                    View Receipt
                                                </button>

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
};

export default Payments;