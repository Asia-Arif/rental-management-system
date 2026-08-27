import { NavLink } from "react-router-dom";

const Sidebar = ({ role }) => {
  const ownerLinks = [
    { name: "Dashboard", path: "/owner/dashboard", icon: "📊" },
    { name: "Properties", path: "/owner/properties", icon: "🏠" },
    { name: "Add Property", path: "/owner/add-property", icon: "➕" },
    { name: "Tenants", path: "/owner/tenants", icon: "👥" },
    { name: "Rent Payments", path: "/owner/payments", icon: "💰" },
    { name: "Maintenance", path: "/owner/maintenance", icon: "🔧" },
    { name: "Notifications", path: "/owner/notifications", icon: "🔔" },
    { name: "Documents", path: "/owner/documents", icon: "📄" },
  ];

  const tenantLinks = [
    { name: "Dashboard", path: "/tenant/dashboard", icon: "📊" },
    { name: "Join Property", path: "/tenant/join-property", icon: "🏠" },
    { name: "My Property", path: "/tenant/my-property", icon: "🏡" },
    { name: "Rent Payment", path: "/tenant/rent-payment", icon: "💰" },
    { name: "Maintenance", path: "/tenant/maintenance", icon: "🔧" },
    { name: "Notifications", path: "/tenant/notifications", icon: "🔔" },
    { name: "Documents", path: "/tenant/documents", icon: "📄" },
    { name: "Receipts", path: "/tenant/receipts", icon: "🧾" },
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
              <span className="text-lg">
                {link.icon}
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