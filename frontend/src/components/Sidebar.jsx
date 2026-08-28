import { NavLink } from "react-router-dom";
import {
  BarChart3,
  House,
  Plus,
  Users,
  CircleDollarSign,
  Wrench,
  Bell,
  FileText,
  HousePlus,
  Receipt,
} from "lucide-react";

const Sidebar = ({ role }) => {
  const ownerLinks = [
    { name: "Dashboard", path: "/owner/dashboard", icon: BarChart3 },
    { name: "Properties", path: "/owner/properties", icon: House },
    { name: "Add Property", path: "/owner/add-property", icon: Plus },
    { name: "Tenants", path: "/owner/tenants", icon: Users },
    { name: "Rent Payments", path: "/owner/payments", icon: CircleDollarSign },
    { name: "Maintenance", path: "/owner/maintenance", icon: Wrench },
    { name: "Notifications", path: "/owner/notifications", icon: Bell },
    { name: "Documents", path: "/owner/documents", icon: FileText },
  ];

  const tenantLinks = [
    { name: "Dashboard", path: "/tenant/dashboard", icon: BarChart3 },
    { name: "Join Property", path: "/tenant/join-property", icon: House },
    { name: "My Property", path: "/tenant/my-property", icon: HousePlus },
    {
      name: "Rent Payment",
      path: "/tenant/rent-payment",
      icon: CircleDollarSign,
    },
    { name: "Maintenance", path: "/tenant/maintenance", icon: Wrench },
    { name: "Notifications", path: "/tenant/notifications", icon: Bell },
    { name: "Documents", path: "/tenant/documents", icon: FileText },
    { name: "Receipts", path: "/tenant/receipts", icon: Receipt },
  ];

  const links = role === "owner" ? ownerLinks : tenantLinks;

  return (
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
          {role === "owner" ? "Owner Menu" : "Tenant Menu"}
        </p>

        <div className="space-y-2">

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <link.icon size={20} />
              </span>

              <span>
                {link.name}
              </span>
            </NavLink>
          ))}

        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;