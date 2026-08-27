import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";


const OwnerDashboard = () => {
    const recentPayments = [
        {
            tenant: "Ali Khan",
            property: "Green Villa",
            amount: "Rs. 35,000",
            date: "25 Aug 2026",
            status: "Paid",
        },
        {
            tenant: "Sara Ahmed",
            property: "City Apartment",
            amount: "Rs. 28,000",
            date: "24 Aug 2026",
            status: "Paid",
        },
        {
            tenant: "Usman Ali",
            property: "Model Town House",
            amount: "Rs. 40,000",
            date: "22 Aug 2026",
            status: "Pending",
        },
        {
            tenant: "Ayesha Khan",
            property: "Blue Residency",
            amount: "Rs. 32,000",
            date: "20 Aug 2026",
            status: "Paid",
        },
    ];

    const properties = [
        {
            name: "Green Villa",
            location: "Islamabad",
            tenant: "Ali Khan",
            rent: "Rs. 35,000",
            status: "Occupied",
        },
        {
            name: "City Apartment",
            location: "Rawalpindi",
            tenant: "Sara Ahmed",
            rent: "Rs. 28,000",
            status: "Occupied",
        },
        {
            name: "Model Town House",
            location: "Lahore",
            tenant: "Usman Ali",
            rent: "Rs. 40,000",
            status: "Occupied",
        },
        {
            name: "Blue Residency",
            location: "Islamabad",
            tenant: "Ayesha Khan",
            rent: "Rs. 32,000",
            status: "Occupied",
        },
    ];

    const maintenanceRequests = [
        {
            title: "Water leakage",
            property: "Green Villa",
            priority: "High",
        },
        {
            title: "AC not working",
            property: "City Apartment",
            priority: "Medium",
        },
        {
            title: "Door lock issue",
            property: "Blue Residency",
            priority: "Low",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Sidebar */}
            <Sidebar role="owner" />

            {/* Main Area */}
            <div className="ml-64">

                {/* Navbar */}
                <Navbar role="owner" />

                {/* Dashboard Content */}
                <main className="pt-24 px-8 pb-10">

                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">
                            Dashboard Overview
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage your properties, tenants and rental payments.
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                        <StatCard
                            title="Total Properties"
                            value="6"
                            icon="🏠"
                            description="4 currently occupied"
                        />

                        <StatCard
                            title="Total Tenants"
                            value="18"
                            icon="👥"
                            description="Active tenants"
                        />

                        <StatCard
                            title="Rent Collected"
                            value="Rs. 250K"
                            icon="💰"
                            description="This month"
                        />

                        <StatCard
                            title="Pending Rent"
                            value="Rs. 45K"
                            icon="⏳"
                            description="Awaiting payment"
                        />

                    </div>

                    {/* Payments + Maintenance */}
                    <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

                        {/* Recent Payments */}
                        <div className="xl:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm">

                            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                                <div>
                                    <h2 className="font-semibold text-slate-800">
                                        Recent Rent Payments
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Latest payment activity
                                    </p>
                                </div>

                                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                    View All
                                </button>
                            </div>

                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[650px] text-left">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50">
                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                                Tenant
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                                Property
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                                Amount
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                                Date
                                            </th>

                                            <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recentPayments.map((payment, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                            >
                                                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                                    {payment.tenant}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-500">
                                                    {payment.property}
                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                                    {payment.amount}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-500">
                                                    {payment.date}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-medium ${payment.status === "Paid"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                            }`}
                                                    >
                                                        {payment.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>

                        {/* Maintenance */}
                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                                <div>
                                    <h2 className="font-semibold text-slate-800">
                                        Maintenance Requests
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Requests needing attention
                                    </p>
                                </div>

                                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                    View All
                                </button>
                            </div>

                            <div className="divide-y divide-slate-100">

                                {maintenanceRequests.map((request, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between px-6 py-5"
                                    >
                                        <div>
                                            <h3 className="text-sm font-medium text-slate-700">
                                                {request.title}
                                            </h3>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {request.property}
                                            </p>
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${request.priority === "High"
                                                    ? "bg-red-100 text-red-700"
                                                    : request.priority === "Medium"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {request.priority}
                                        </span>
                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>

                    {/* Properties */}
                    <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">

                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                            <div>
                                <h2 className="font-semibold text-slate-800">
                                    My Properties
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    Overview of your rental properties
                                </p>
                            </div>

                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                View All
                            </button>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[700px] text-left">

                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Property
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Location
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Tenant
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Monthly Rent
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                            Status
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {properties.map((property, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                        >

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                                        🏠
                                                    </div>

                                                    <span className="text-sm font-medium text-slate-700">
                                                        {property.name}
                                                    </span>

                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {property.location}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {property.tenant}
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                                {property.rent}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                    {property.status}
                                                </span>
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

export default OwnerDashboard;