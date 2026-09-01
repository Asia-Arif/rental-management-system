import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiBarChart2,
    FiHome,
    FiDollarSign,
    FiTool,
    FiBell,
    FiFileText,
    FiCheckCircle,
    FiUpload,
} from "react-icons/fi";

const Payments = () => {
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("JazzCash");
    const [paymentDate, setPaymentDate] = useState("");
    const [screenshot, setScreenshot] = useState(null);
    const [payments, setPayments] = useState([]);
    const [property, setProperty] = useState(null);

    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Fetch tenant payments and linked property
    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                setLoading(true);
                setMessage("");

                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                // Get tenant payments
                const paymentsResponse = await fetch(
                    "http://localhost:5000/api/payments/tenant",
                    {
                        method: "GET",
                        headers,
                    }
                );

                const paymentsData = await paymentsResponse.json();

                if (!paymentsResponse.ok) {
                    throw new Error(
                        paymentsData.message ||
                            "Failed to fetch payments"
                    );
                }

                setPayments(paymentsData.payments || []);

                // Get tenant linked property
                const propertyResponse = await fetch(
                    "http://localhost:5000/api/payments/tenant/property",
                    {
                        method: "GET",
                        headers,
                    }
                );

                const propertyData = await propertyResponse.json();

                if (!propertyResponse.ok) {
                    throw new Error(
                        propertyData.message ||
                            "Failed to fetch linked property"
                    );
                }

                setProperty(propertyData.property);

                // Set rent amount automatically
                if (propertyData.property?.rent) {
                    setAmount(
                        propertyData.property.rent.toString()
                    );
                }
            } catch (error) {
                console.error(
                    "Fetch payment data error:",
                    error
                );

                setMessage(
                    error.message ||
                        "Failed to load payment data"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentData();
    }, [navigate]);

    const formatAmount = (value) => {
        return `Rs. ${Number(value || 0).toLocaleString()}`;
    };

    const approvedPayments = payments.filter(
        (payment) => payment.status === "Approved"
    );

    const totalPaid = approvedPayments.reduce(
        (total, payment) =>
            total + Number(payment.amount || 0),
        0
    );

    // Convert image to Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => resolve(reader.result);

            reader.onerror = (error) => reject(error);
        });
    };

    // Screenshot change
    const handleScreenshotChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            setMessage("Please select a valid image file.");
            return;
        }

        setScreenshot(file);
        setMessage("");
    };

    // Submit payment proof
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        if (!property) {
            setMessage(
                "You are not linked with any property yet."
            );
            return;
        }

        if (!amount || Number(amount) <= 0) {
            setMessage("Please enter a valid amount.");
            return;
        }

        if (!paymentDate) {
            setMessage("Please select the payment date.");
            return;
        }

        if (!screenshot) {
            setMessage(
                "Please upload your payment screenshot."
            );
            return;
        }

        try {
            setSubmitting(true);

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            // Convert screenshot to Base64
            const base64Screenshot =
                await convertToBase64(screenshot);

            const response = await fetch(
                "http://localhost:5000/api/payments/submit",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        propertyId: property._id,
                        amount: Number(amount),
                        paymentMethod,
                        paymentDate,
                        screenshot: base64Screenshot,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Failed to submit payment proof"
                );
            }

            setMessage(
                "Payment proof submitted successfully. Waiting for owner approval."
            );

            setScreenshot(null);
            setPaymentDate("");

            // Add new payment to history
            setPayments((previousPayments) => [
                data.payment,
                ...previousPayments,
            ]);
        } catch (error) {
            console.error(
                "Submit payment error:",
                error
            );

            setMessage(
                error.message ||
                    "Failed to submit payment proof."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const currentPayment =
        payments.find(
            (payment) => payment.status === "Pending"
        ) || null;

    const currentRent = property?.rent || 0;

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white shadow-xl">

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

                <nav className="px-4 py-6">

                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Tenant Menu
                    </p>

                    <div className="space-y-2">

                        <button
                            onClick={() =>
                                navigate("/tenant/dashboard")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiBarChart2 />
                            <span>Dashboard</span>
                        </button>

                        <button
                            onClick={() =>
                                navigate("/tenant/join-property")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiHome />
                            <span>Join Property</span>
                        </button>

                        <button
                            onClick={() =>
                                navigate("/tenant/my-property")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiHome />
                            <span>My Property</span>
                        </button>

                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            <FiDollarSign />
                            <span>Rent Payment</span>
                        </button>

                        <button
                            onClick={() =>
                                navigate("/tenant/maintenance")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiTool />
                            <span>Maintenance</span>
                        </button>

                        <button
                            onClick={() =>
                                navigate("/tenant/notifications")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiBell />
                            <span>Notifications</span>
                        </button>

                        <button
                            onClick={() =>
                                navigate("/tenant/documents")
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiFileText />
                            <span>Documents</span>
                        </button>

                    </div>
                </nav>
            </aside>

            {/* Main */}
            <div className="ml-64">

                {/* Navbar */}
                <header className="fixed left-64 right-0 top-0 z-40 h-20 border-b border-slate-200 bg-white">

                    <div className="flex h-full items-center justify-between px-8">

                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">
                                Rent Payment
                            </h2>

                            <p className="text-sm text-slate-500">
                                Submit your monthly rent payment proof
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() =>
                                    navigate(
                                        "/tenant/notifications"
                                    )
                                }
                                className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                            >
                                <FiBell />

                                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                            </button>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                T
                            </div>

                            <button
                                onClick={() => {
                                    localStorage.removeItem(
                                        "token"
                                    );

                                    localStorage.removeItem(
                                        "user"
                                    );

                                    navigate("/login");
                                }}
                                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                            >
                                Logout
                            </button>

                        </div>

                    </div>
                </header>

                {/* Content */}
                <main className="px-8 pb-10 pt-28">

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">
                            Rent Payment
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Pay your rent and upload the payment proof.
                        </p>
                    </div>

                    {loading ? (
                        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                            <p className="text-sm text-slate-500">
                                Loading payment information...
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Current Rent */}
                            <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white shadow-sm">

                                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                                    <div>
                                        <p className="text-sm text-blue-100">
                                            Current Month Rent
                                        </p>

                                        <h2 className="mt-2 text-4xl font-bold">
                                            {formatAmount(currentRent)}
                                        </h2>

                                        <p className="mt-2 text-sm text-blue-100">
                                            {property?.name ||
                                                "No property linked"}
                                        </p>

                                        {property && (
                                            <p className="mt-1 text-xs text-blue-100">
                                                {property.address},{" "}
                                                {property.city}
                                            </p>
                                        )}
                                    </div>

                                    <div className="rounded-xl bg-white/10 p-6">

                                        <p className="text-sm text-blue-100">
                                            Due Date
                                        </p>

                                        <p className="mt-2 text-xl font-semibold">
                                            01 Sep 2026
                                        </p>

                                        <span className="mt-3 inline-block rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-medium text-yellow-100">
                                            {currentPayment
                                                ? "Payment Submitted"
                                                : "Payment Due"}
                                        </span>

                                    </div>

                                </div>
                            </div>

                            {/* Statistics */}
                            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">

                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Monthly Rent
                                            </p>

                                            <h2 className="mt-2 text-2xl font-bold text-slate-800">
                                                {formatAmount(
                                                    currentRent
                                                )}
                                            </h2>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl text-blue-600">
                                            <FiDollarSign />
                                        </div>

                                    </div>

                                </div>

                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Total Paid
                                            </p>

                                            <h2 className="mt-2 text-2xl font-bold text-green-600">
                                                {formatAmount(
                                                    totalPaid
                                                )}
                                            </h2>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Approved payments
                                            </p>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl text-green-600">
                                            <FiCheckCircle />
                                        </div>

                                    </div>

                                </div>

                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Current Status
                                            </p>

                                            <h2
                                                className={`mt-2 text-2xl font-bold ${
                                                    currentPayment
                                                        ? "text-yellow-600"
                                                        : "text-blue-600"
                                                }`}
                                            >
                                                {currentPayment
                                                    ? "Pending"
                                                    : "Payment Due"}
                                            </h2>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {currentPayment
                                                    ? "Waiting for owner approval"
                                                    : "Submit payment proof"}
                                            </p>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-2xl text-yellow-600">
                                            <FiUpload />
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Upload Payment Proof */}
                            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                                <div className="mb-6">

                                    <h2 className="text-lg font-semibold text-slate-800">
                                        Upload Payment Proof
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        After paying your rent, upload a screenshot or receipt.
                                    </p>

                                </div>

                                <form onSubmit={handleSubmit}>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Amount
                                            </label>

                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) =>
                                                    setAmount(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Payment Method
                                            </label>

                                            <select
                                                value={paymentMethod}
                                                onChange={(e) =>
                                                    setPaymentMethod(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                                            >
                                                <option value="JazzCash">
                                                    JazzCash
                                                </option>

                                                <option value="Bank Transfer">
                                                    Bank Transfer
                                                </option>

                                                <option value="Cash">
                                                    Cash
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Payment Date
                                            </label>

                                            <input
                                                type="date"
                                                value={paymentDate}
                                                onChange={(e) =>
                                                    setPaymentDate(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                            />
                                        </div>

                                    </div>

                                    {/* Screenshot */}
                                    <div className="mt-6">

                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Payment Screenshot
                                        </label>

                                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 transition hover:border-blue-400 hover:bg-blue-50">

                                            <FiUpload className="mb-3 text-3xl text-blue-600" />

                                            <p className="text-sm font-medium text-slate-700">
                                                {screenshot
                                                    ? screenshot.name
                                                    : "Click to upload payment screenshot"}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                PNG, JPG or JPEG
                                            </p>

                                            <input
                                                type="file"
                                                accept="image/png,image/jpeg,image/jpg"
                                                onChange={
                                                    handleScreenshotChange
                                                }
                                                className="hidden"
                                            />

                                        </label>

                                    </div>

                                    {/* Message */}
                                    {message && (
                                        <div
                                            className={`mt-4 rounded-lg px-4 py-3 text-sm ${
                                                message.includes(
                                                    "successfully"
                                                )
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-red-50 text-red-700"
                                            }`}
                                        >
                                            {message}
                                        </div>
                                    )}

                                    {/* Submit */}
                                    <div className="mt-6 flex justify-end">

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {submitting
                                                ? "Submitting..."
                                                : "Submit Payment Proof"}
                                        </button>

                                    </div>

                                </form>
                            </div>

                            {/* Payment History */}
                            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                                <div className="border-b border-slate-200 px-6 py-5">

                                    <h2 className="font-semibold text-slate-800">
                                        Payment History
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Your previous rent payment records.
                                    </p>

                                </div>

                                <div className="overflow-x-auto">

                                    <table className="w-full min-w-[850px] text-left">

                                        <thead>
                                            <tr className="border-b border-slate-200 bg-slate-50">

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
                                                    Proof
                                                </th>

                                            </tr>
                                        </thead>

                                        <tbody>

                                            {payments.length > 0 ? (
                                                payments.map(
                                                    (payment) => (
                                                        <tr
                                                            key={
                                                                payment._id
                                                            }
                                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                                        >

                                                            <td className="px-6 py-5 text-sm font-medium text-slate-700">
                                                                {payment
                                                                    .property
                                                                    ?.name ||
                                                                    "Unknown"}
                                                            </td>

                                                            <td className="px-6 py-5 text-sm font-semibold text-slate-700">
                                                                {formatAmount(
                                                                    payment.amount
                                                                )}
                                                            </td>

                                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                                {new Date(
                                                                    payment.paymentDate
                                                                ).toLocaleDateString(
                                                                    "en-GB"
                                                                )}
                                                            </td>

                                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                                {
                                                                    payment.paymentMethod
                                                                }
                                                            </td>

                                                            <td className="px-6 py-5">

                                                                <span
                                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                                        payment.status ===
                                                                        "Approved"
                                                                            ? "bg-green-100 text-green-700"
                                                                            : payment.status ===
                                                                              "Pending"
                                                                            ? "bg-yellow-100 text-yellow-700"
                                                                            : "bg-red-100 text-red-700"
                                                                    }`}
                                                                >
                                                                    {
                                                                        payment.status
                                                                    }
                                                                </span>

                                                            </td>

                                                            <td className="px-6 py-5">

                                                                {payment.screenshot ? (
                                                                    <a
                                                                        href={
                                                                            payment.screenshot
                                                                        }
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50"
                                                                    >
                                                                        View Proof
                                                                    </a>
                                                                ) : (
                                                                    "-"
                                                                )}

                                                            </td>

                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan="6"
                                                        className="px-6 py-10 text-center text-sm text-slate-500"
                                                    >
                                                        No payment records found.
                                                    </td>
                                                </tr>
                                            )}

                                        </tbody>

                                    </table>

                                </div>
                            </div>
                        </>
                    )}

                </main>
            </div>
        </div>
    );
};

export default Payments;