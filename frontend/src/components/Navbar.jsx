import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = ({ role, title, subtitle }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully.");
        navigate("/login");
    };

    return (
        <header className="fixed left-64 top-0 z-50 h-20 w-[calc(100%-16rem)] border-b border-slate-200 bg-white">
            <div className="flex h-20 w-full items-center justify-between px-8">
                {/* Left Side */}
                <div className="min-w-0">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {title ||
                            (role === "owner"
                                ? "Owner Dashboard"
                                : "Tenant Dashboard")}
                    </h2>

                    <p className="text-sm text-slate-500">
                        {subtitle ||
                            "Welcome back! Here's what's happening today."}
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex shrink-0 items-center gap-5">
                    {/* Notification */}
                    <button
                        onClick={() =>
                            navigate(
                                role === "owner"
                                    ? "/owner/notifications"
                                    : "/tenant/notifications"
                            )
                        }
                        className="relative flex h-10 w-10 items-center justify-center rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                    >
                        <FaBell className="text-xl" />

                        <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
                    </button>

                    {/* Profile */}
                    <div className="flex h-10 items-center gap-3 border-l border-slate-200 pl-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                            A
                        </div>

                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-slate-800">
                                {role === "owner"
                                    ? "Property Owner"
                                    : "Tenant"}
                            </p>

                            <p className="text-xs capitalize text-slate-500">
                                {role}
                            </p>
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="h-10 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;