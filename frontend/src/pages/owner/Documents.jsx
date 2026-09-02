import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    BarChart3,
    House,
    Plus,
    Users,
    CircleDollarSign,
    Wrench,
    Bell,
    FileText,
    Upload,
    Download,
    Eye,
    FilePenLine,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

const documentTypes = [
    {
        type: "Rental Agreement",
        description:
            "Common rental agreement for your tenants.",
        icon: FilePenLine,
    },
    {
        type: "Property Rules & Regulations",
        description:
            "Common property rules and regulations for your tenants.",
        icon: House,
    },
];

const Documents = () => {
    const navigate = useNavigate();

    const [documents, setDocuments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [uploadingType, setUploadingType] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const [viewingId, setViewingId] =
        useState(null);

    const [downloadingId, setDownloadingId] =
        useState(null);

    // ============================================
    // FETCH OWNER DOCUMENTS
    // ============================================
    const fetchDocuments = async () => {
        try {
            setLoading(true);
            setError("");

            const token =
                localStorage.getItem(
                    "token"
                );

            if (!token) {
                setError(
                    "Please login first."
                );
                return;
            }

            const response =
                await fetch(
                    `${API_URL}/documents`,
                    {
                        method: "GET",
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Failed to fetch documents."
                );
            }

            setDocuments(
                data.documents || []
            );
        } catch (err) {
            console.error(
                "Fetch documents error:",
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
    // FIND DOCUMENT
    // ============================================
    const getDocument = (type) => {
        return documents.find(
            (doc) =>
                doc.type === type
        );
    };

    // ============================================
    // UPLOAD DOCUMENT
    // ============================================
    const handleUpload = async (
        type,
        event
    ) => {
        const file =
            event.target.files?.[0];

        event.target.value = "";

        setMessage("");
        setError("");

        if (!file) {
            return;
        }

        // PDF only
        if (
            file.type !==
            "application/pdf"
        ) {
            setError(
                "Only PDF files are allowed."
            );
            return;
        }

        // Max 7 MB
        if (
            file.size >
            7 * 1024 * 1024
        ) {
            setError(
                "PDF size must be less than 7 MB."
            );
            return;
        }

        try {
            setUploadingType(type);

            const token =
                localStorage.getItem(
                    "token"
                );

            if (!token) {
                throw new Error(
                    "Please login first."
                );
            }

            // =====================================
            // CONVERT PDF TO BASE64
            // =====================================
            const fileData =
                await new Promise(
                    (
                        resolve,
                        reject
                    ) => {
                        const reader =
                            new FileReader();

                        reader.onload =
                            () =>
                                resolve(
                                    reader.result
                                );

                        reader.onerror =
                            () =>
                                reject(
                                    new Error(
                                        "Failed to read PDF."
                                    )
                                );

                        reader.readAsDataURL(
                            file
                        );
                    }
                );

            // =====================================
            // SEND PDF TO BACKEND
            // =====================================
            const response =
                await fetch(
                    `${API_URL}/documents/upload`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`,
                        },

                        body: JSON.stringify({
                            type,
                            fileName:
                                file.name,
                            fileType:
                                file.type,
                            fileData,
                        }),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Upload failed."
                );
            }

            setMessage(
                `${type} uploaded successfully.`
            );

            await fetchDocuments();
        } catch (err) {
            console.error(
                "Upload error:",
                err
            );

            setError(
                err.message ||
                    "Failed to upload document."
            );
        } finally {
            setUploadingType("");
        }
    };

    // ============================================
    // VIEW PDF
    // ============================================
    const handleView = async (doc) => {
        try {
            setViewingId(doc._id);

            const token =
                localStorage.getItem(
                    "token"
                );

            if (!token) {
                alert(
                    "Please login first."
                );
                return;
            }

            const response =
                await fetch(
                    `${API_URL}/documents/view/${doc._id}`,
                    {
                        method: "GET",

                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            if (!response.ok) {
                const data =
                    await response.json();

                throw new Error(
                    data.message ||
                        "Failed to open PDF."
                );
            }

            const blob =
                await response.blob();

            const pdfBlob =
                new Blob(
                    [blob],
                    {
                        type: "application/pdf",
                    }
                );

            const blobUrl =
                window.URL.createObjectURL(
                    pdfBlob
                );

            const newWindow =
                window.open(
                    "",
                    "_blank"
                );

            if (!newWindow) {
                window.URL.revokeObjectURL(
                    blobUrl
                );

                throw new Error(
                    "Please allow pop-ups in your browser to view the PDF."
                );
            }

            newWindow.location.href =
                blobUrl;

            setTimeout(() => {
                window.URL.revokeObjectURL(
                    blobUrl
                );
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
    const handleDownload = async (
        doc
    ) => {
        try {
            setDownloadingId(doc._id);

            const token =
                localStorage.getItem(
                    "token"
                );

            if (!token) {
                alert(
                    "Please login first."
                );
                return;
            }

            const response =
                await fetch(
                    `${API_URL}/documents/download/${doc._id}`,
                    {
                        method: "GET",

                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            if (!response.ok) {
                const data =
                    await response.json();

                throw new Error(
                    data.message ||
                        "Failed to download PDF."
                );
            }

            const blob =
                await response.blob();

            const pdfBlob =
                new Blob(
                    [blob],
                    {
                        type: "application/pdf",
                    }
                );

            const blobUrl =
                window.URL.createObjectURL(
                    pdfBlob
                );

            const link =
                window.document.createElement(
                    "a"
                );

            link.href = blobUrl;

            let fileName =
                doc.name ||
                "document";

            fileName =
                fileName.replace(
                    /\.pdf$/i,
                    ""
                );

            link.download =
                `${fileName}.pdf`;

            window.document.body.appendChild(
                link
            );

            link.click();

            window.document.body.removeChild(
                link
            );

            window.URL.revokeObjectURL(
                blobUrl
            );
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
        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* SIDEBAR */}
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
                        Owner Menu
                    </p>

                    <div className="space-y-2">
                        <button
                            onClick={() =>
                                navigate(
                                    "/owner/dashboard"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <BarChart3 />
                            Dashboard
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    "/owner/properties"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <House />
                            Properties
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    "/owner/add-property"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <Plus />
                            Add Property
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    "/owner/tenants"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <Users />
                            Tenants
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    "/owner/payments"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <CircleDollarSign />
                            Rent Payments
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    "/owner/maintenance"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <Wrench />
                            Maintenance
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    "/owner/notifications"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            <Bell />
                            Notifications
                        </button>

                        <button
                            className="flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white"
                        >
                            <FileText />
                            Documents
                        </button>
                    </div>
                </nav>
            </aside>

            {/* MAIN */}
            <div className="ml-64">
                {/* HEADER */}
                <header className="fixed left-64 right-0 top-0 z-40 h-20 border-b border-slate-200 bg-white">
                    <div className="flex h-full items-center justify-between px-8">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">
                                Documents
                            </h2>

                            <p className="text-sm text-slate-500">
                                Manage common rental documents
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() =>
                                    navigate(
                                        "/owner/notifications"
                                    )
                                }
                                className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
                            >
                                <Bell />

                                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                            </button>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                A
                            </div>

                            <button
                                onClick={
                                    handleLogout
                                }
                                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                <main className="px-8 pb-10 pt-28">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">
                            Rental Documents
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Upload these two common documents once for your tenants.
                        </p>
                    </div>

                    {/* MESSAGES */}
                    {message && (
                        <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* DOCUMENT CARDS */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {documentTypes.map(
                            ({
                                type,
                                description,
                                icon: Icon,
                            }) => {
                                const doc =
                                    getDocument(
                                        type
                                    );

                                const isUploading =
                                    uploadingType ===
                                    type;

                                const isViewing =
                                    viewingId ===
                                    doc?._id;

                                const isDownloading =
                                    downloadingId ===
                                    doc?._id;

                                return (
                                    <div
                                        key={type}
                                        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                                    >
                                        {/* TITLE */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                                <Icon
                                                    size={
                                                        27
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <h2 className="text-lg font-semibold text-slate-800">
                                                    {
                                                        type
                                                    }
                                                </h2>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    {
                                                        description
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        {/* STATUS */}
                                        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                            {doc ? (
                                                <>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-700">
                                                                Document uploaded
                                                            </p>

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

                                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                            Uploaded
                                                        </span>
                                                    </div>

                                                    {/* VIEW / DOWNLOAD */}
                                                    <div className="mt-4 flex gap-2">
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
                                                            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-60"
                                                        >
                                                            <Eye
                                                                size={
                                                                    16
                                                                }
                                                            />

                                                            {isViewing
                                                                ? "Opening..."
                                                                : "View"}
                                                        </button>

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
                                                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                                                        >
                                                            <Download
                                                                size={
                                                                    16
                                                                }
                                                            />

                                                            {isDownloading
                                                                ? "Downloading..."
                                                                : "Download"}
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-sm font-medium text-slate-700">
                                                        No document uploaded
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        Upload a PDF to make it available to your linked tenants.
                                                    </p>
                                                </>
                                            )}
                                        </div>

                                        {/* UPLOAD */}
                                        <label className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700">
                                            <Upload
                                                size={
                                                    18
                                                }
                                            />

                                            {isUploading
                                                ? "Uploading..."
                                                : doc
                                                ? "Replace Document"
                                                : "Upload Document"}

                                            <input
                                                type="file"
                                                accept=".pdf,application/pdf"
                                                disabled={
                                                    isUploading
                                                }
                                                className="hidden"
                                                onChange={(
                                                    event
                                                ) =>
                                                    handleUpload(
                                                        type,
                                                        event
                                                    )
                                                }
                                            />
                                        </label>

                                        <p className="mt-2 text-center text-xs text-slate-400">
                                            PDF only • Maximum 7 MB
                                        </p>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Documents;