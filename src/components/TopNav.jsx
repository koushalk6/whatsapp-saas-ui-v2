import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function TopNav(){
  const { user, logout } = useAuth();
  const linkClass = ({isActive}) =>
    "px-3 py-2 rounded-md text-sm " +
    (isActive ? "text-emerald-700 bg-emerald-50 font-medium" : "text-slate-600 hover:bg-slate-50");
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-8 rounded-md bg-emerald-700 grid place-items-center text-white font-bold text-xs">DMX</div>
            <div>
              <div className="text-base font-semibold">DMX</div>
              <div className="text-xs text-slate-400">WhatsApp SaaS</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-2 items-center ml-4">
            <NavLink to="/session" className={linkClass}>24h Session</NavLink>
            <NavLink to="/templates" className={linkClass}>Templates</NavLink>
            <NavLink to="/broadcasts" className={linkClass}>Broadcasts</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm">
          {user && <span className="hidden sm:block text-slate-500">{user.email}</span>}
          <button onClick={logout} className="text-xs px-3 py-1.5 border border-slate-200 rounded-md hover:bg-slate-50">Logout</button>
        </div>
      </div>
    </header>
  );
}
