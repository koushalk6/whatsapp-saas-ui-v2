import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import TemplatesPage from "./pages/TemplatesPage";
import BroadcastPage from "./pages/BroadcastPage";
import SessionPage from "./pages/SessionPage";

function PrivateRoute({ children }) {
  const { user, ready } = useAuth();
  if (!ready) return <div className="p-6 text-sm text-slate-500">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route index element={<SessionPage />} />
          <Route path="session" element={<SessionPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="broadcasts" element={<BroadcastPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
