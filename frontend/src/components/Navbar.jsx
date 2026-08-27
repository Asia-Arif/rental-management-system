import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const Navbar = ({ role }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <header className="fixed left-64 right-0 top-0 z-40 h-20 border-b border-slate-200 bg-white">
            <div className="flex h-full items-center justify-between px-8">

                {/* Page Heading */}
                <div>
                    <h2 className="text-xl font-semibold text-slate-800">
                        {role === "owner" ? "Owner Dashboard" : "Tenant Dashboard"}
                    </h2>

                    <p className="text-sm text-slate-500">
                        Welcome back! Here's what's happening today.
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-5">

                    {/* Notification */}
                    <button
                        onClick={() =>
                            navigate(
                                role === "owner"
                                    ? "/owner/notifications"
                                    : "/tenant/notifications"
                            )
                        }
                        className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                    >
                        <FaBell className="text-xl" />

                        <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
                    </button>

                    {/* Profile */}
                    <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                            A
                        </div>

                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-slate-800">
                                {role === "owner" ? "Property Owner" : "Tenant"}
                            </p>

                            <p className="text-xs capitalize text-slate-500">
                                {role}
                            </p>
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </header>
    );
};

export default Navbar;