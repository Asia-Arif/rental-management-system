import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import OwnerDashboard from "./pages/owner/OwnerDashboard";
import Properties from "./pages/owner/Properties";
import AddProperty from "./pages/owner/AddProperty";
import Tenants from "./pages/owner/Tenants";
import Payments from "./pages/owner/Payments";
import Maintenance from "./pages/owner/Maintenance";
import Notifications from "./pages/owner/Notifications";
import Documents from "./pages/owner/Documents";


import TenantDashboard from "./pages/tenant/TenantDashboard";
import JoinProperty from "./pages/tenant/JoinProperty";
import MyProperty from "./pages/tenant/MyProperty";
import TenantPayments from "./pages/tenant/Payments";
import TenantMaintenance from "./pages/tenant/Maintenance";
import TenantNotifications from "./pages/tenant/Notifications";
import TenantDocuments from "./pages/tenant/Documents";
import TenantReceipts from "./pages/tenant/Receipts";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Owner */}
        <Route
          path="/owner/dashboard"
          element={<OwnerDashboard />}
        />

        <Route
          path="/owner/properties"
          element={<Properties />}
        />

        <Route
          path="/owner/add-property"
          element={<AddProperty />}
        />

        <Route
          path="/owner/tenants"
          element={<Tenants />}
        />

        <Route
          path="/owner/payments"
          element={<Payments />}
        />

        <Route
          path="/owner/maintenance"
          element={<Maintenance />}
        />

        <Route
          path="/owner/notifications"
          element={<Notifications />}
        />

        <Route
          path="/owner/documents"
          element={<Documents />}
        />

        {/* Default Route - ALWAYS LAST */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/tenant/dashboard"
          element={<TenantDashboard />}
        />

        <Route
          path="/tenant/join-property"
          element={<JoinProperty />}
        />

        <Route
          path="/tenant/my-property"
          element={<MyProperty />}
        />
        <Route
          path="/tenant/rent-payment"
          element={<TenantPayments />}
        />

        <Route
          path="/tenant/maintenance"
          element={<TenantMaintenance />}
        />

        <Route
          path="/tenant/notifications"
          element={<TenantNotifications />}
        />

        <Route
          path="/tenant/documents"
          element={<TenantDocuments />}
        />

        <Route
          path="/tenant/receipts"
          element={<TenantReceipts />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;