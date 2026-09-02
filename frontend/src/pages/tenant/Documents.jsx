
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiBarChart2,
    FiHome,
    FiDollarSign,
    FiTool,
    FiBell,
    FiFileText,
    FiEye,
    FiDownload,
} from "react-icons/fi";

const API_URL = "http://localhost:5000/api";

const Documents = () => {
    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);
    const [property, setProperty] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [viewingId, setViewingId] = useState(null);
    const [downloadingId, setDownloadingId] = useState(null);

    // ============================================
    // FETCH TENANT DOCUMENTS
    // ============================================
    const fetchDocuments = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login first.");
                setLoading(false);
                return;
            }

            const response = await fetch(
                `${API_URL}/documents/tenant`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Failed to fetch documents."
                );
            }

            setDocuments(data.documents || []);
            setProperty(data.property || null);
        } catch (err) {
            console.error(
                "Tenant documents error:",
                err
            );

            setError(
                err.message ||
                    "Failed to load documents."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    // ============================================
    // VIEW PDF
    // ============================================
    const handleView = async (doc) => {
        if (!doc?._id) {
            alert("Document is not available.");
            return;
        }

        try {
            setViewingId(doc._id);

            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login first.");
                return;
            }

            const response = await fetch(
                `${API_URL}/documents/view/${doc._id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                let message =
                    "Failed to open PDF.";

                try {
                    const data = await response.json();

                    message =
                        data.message || message;
                } catch {
                    // Keep default message
                }

                throw new Error(message);
            }

            const blob = await response.blob();

            const pdfBlob = new Blob([blob], {
                type: "application/pdf",
            });

            const blobUrl =
                window.URL.createObjectURL(pdfBlob);

            // Open blank tab first
            // so popup blocker doesn't stop it
            const newWindow = window.open(
                "",
                "_blank"
            );

            if (!newWindow) {
                window.URL.revokeObjectURL(blobUrl);

                throw new Error(
                    "Please allow pop-ups in your browser to view the PDF."
                );
            }

            newWindow.location.href = blobUrl;

            // Release object URL after browser has opened it
            setTimeout(() => {
                window.URL.revokeObjectURL(blobUrl);
            }, 60000);
        } catch (err) {
            console.error(
                "View PDF error:",
                err
            );

            alert(
                err.message ||
                    "Unable to open the PDF."
            );
        } finally {
            setViewingId(null);
        }
    };

    // ============================================
    // DOWNLOAD PDF
    // ============================================
    const handleDownload = async (doc) => {
        if (!doc?._id) {
            alert("Document is not available.");
            return;
        }

        try {
            setDownloadingId(doc._id);

            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login first.");
                return;
            }

            const response = await fetch(
                `${API_URL}/documents/download/${doc._id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                let message =
                    "Failed to download PDF.";

                try {
                    const data = await response.json();

                    message =
                        data.message || message;
                } catch {
                    // Keep default message
                }

                throw new Error(message);
            }

            const blob = await response.blob();

            const pdfBlob = new Blob([blob], {
                type: "application/pdf",
            });

            const blobUrl =
                window.URL.createObjectURL(pdfBlob);

            const link =
                window.document.createElement("a");

            link.href = blobUrl;

            let fileName =
                doc.name || "document";

            // Remove old .pdf extension
            fileName = fileName.replace(
                /\.pdf$/i,
                ""
            );

            link.download = `${fileName}.pdf`;

            link.style.display = "none";

            window.document.body.appendChild(link);

            link.click();

            window.document.body.removeChild(link);

            // Release URL
            setTimeout(() => {
                window.URL.revokeObjectURL(blobUrl);
            }, 1000);
        } catch (err) {
            console.error(
                "Download PDF error:",
                err
            );

            alert(
                err.message ||
                    "Unable to download the PDF."
            );
        } finally {
            setDownloadingId(null);
        }
    };

    // ============================================
    // LOGOUT
    // ============================================
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* =========================================
                SIDEBAR
            ========================================= */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white">
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
                        {/* Dashboard */}
                        <button
                            onClick={() =>
                                navigate(
                                    "/tenant/dashboard"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiBarChart2 />
                            <span>Dashboard</span>
                        </button>

                        {/* Join Property */}
                        <button
                            onClick={() =>
                                navigate(
                                    "/tenant/join-property"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiHome />
                            <span>Join Property</span>
                        </button>

                        {/* My Property */}
                        <button
                            onClick={() =>
                                navigate(
                                    "/tenant/my-property"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiHome />
                            <span>My Property</span>
                        </button>

                        {/* Rent Payment */}
                        <button
                            onClick={() =>
                                navigate(
                                    "/tenant/payments"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiDollarSign />
                            <span>Rent Payment</span>
                        </button>

                        {/* Maintenance */}
                        <button
                            onClick={() =>
                                navigate(
                                    "/tenant/maintenance"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiTool />
                            <span>Maintenance</span>
                        </button>

                        {/* Notifications */}
                        <button
                            onClick={() =>
                                navigate(
                                    "/tenant/notifications"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <FiBell />
                            <span>Notifications</span>
                        </button>

                        {/* Documents */}
                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            <FiFileText />
                            <span>Documents</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* =========================================
                MAIN CONTENT
            ========================================= */}
            <div className="ml-64">
                {/* HEADER */}
                <header className="fixed left-64 right-0 top-0 z-40 h-20 border-b border-slate-200 bg-white">
                    <div className="flex h-full items-center justify-between px-8">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">
                                Documents
                            </h2>

                            <p className="text-sm text-slate-500">
                                Your rental documents
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Notifications */}
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

                            {/* Profile */}
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                T
                            </div>

                            {/* Logout */}
                            <button
                                onClick={
                                    handleLogout
                                }
                                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                <main className="px-8 pb-10 pt-28">
                    {/* PAGE TITLE */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">
                            My Documents
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Documents provided by your property owner.
                        </p>
                    </div>

                    {/* =====================================
                        LINKED PROPERTY
                    ====================================== */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Linked Property
                        </p>

                        <h2 className="mt-1 text-xl font-semibold text-slate-800">
                            {property
                                ? property.name
                                : "No property linked"}
                        </h2>

                        {property && (
                            <p className="mt-1 text-sm text-slate-500">
                                {property.address},{" "}
                                {property.city}
                            </p>
                        )}
                    </div>

                    {/* ERROR */}
                    {error && (
                        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* =====================================
                        DOCUMENTS
                    ====================================== */}
                    <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-200 px-6 py-5">
                            <h2 className="font-semibold text-slate-800">
                                Rental Documents
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Documents uploaded by your owner.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                            {/* LOADING */}
                            {loading ? (
                                <div className="col-span-full py-12 text-center text-sm text-slate-500">
                                    Loading documents...
                                </div>
                            ) : documents.length === 0 ? (
                                /* EMPTY STATE */
                                <div className="col-span-full py-12 text-center">
                                    <div className="flex justify-center text-slate-400">
                                        <FiFileText
                                            size={48}
                                        />
                                    </div>

                                    <h3 className="mt-4 font-semibold text-slate-800">
                                        No documents available
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Your owner has not uploaded the rental documents yet.
                                    </p>
                                </div>
                            ) : (
                                /* DOCUMENT CARDS */
                                documents.map(
                                    (doc) => {
                                        const isViewing =
                                            viewingId ===
                                            doc._id;

                                        const isDownloading =
                                            downloadingId ===
                                            doc._id;

                                        return (
                                            <div
                                                key={
                                                    doc._id
                                                }
                                                className="rounded-xl border border-slate-200 bg-slate-50 p-6"
                                            >
                                                {/* DOCUMENT INFO */}
                                                <div className="flex items-start gap-4">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                                        <FiFileText
                                                            size={
                                                                23
                                                            }
                                                        />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h3 className="font-semibold text-slate-800">
                                                            {
                                                                doc.name
                                                            }
                                                        </h3>

                                                        <p className="mt-1 text-xs text-slate-500">
                                                            {
                                                                doc.size
                                                            }{" "}
                                                            •{" "}
                                                            {
                                                                doc.date
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* ACTION BUTTONS */}
                                                <div className="mt-5 flex gap-2">
                                                    {/* VIEW */}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleView(
                                                                doc
                                                            )
                                                        }
                                                        disabled={
                                                            isViewing
                                                        }
                                                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        <FiEye
                                                            size={
                                                                17
                                                            }
                                                        />

                                                        {isViewing
                                                            ? "Opening..."
                                                            : "View"}
                                                    </button>

                                                    {/* DOWNLOAD */}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDownload(
                                                                doc
                                                            )
                                                        }
                                                        disabled={
                                                            isDownloading
                                                        }
                                                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        <FiDownload
                                                            size={
                                                                17
                                                            }
                                                        />

                                                        {isDownloading
                                                            ? "Downloading..."
                                                            : "Download"}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    }
                                )
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Documents;

