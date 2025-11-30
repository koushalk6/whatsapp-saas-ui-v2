import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";

export default function DashboardLayout(){
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <main className="max-w-6xl w-full mx-auto px-4 lg:px-6 py-6 flex gap-6">
        <div className="flex-1">
          <Outlet />
        </div>
        <aside className="w-72 hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm card-border">
              <div className="text-sm font-semibold">Quick Tips</div>
              <ul className="mt-3 space-y-2 text-xs text-slate-500">
                <li>Use templates to send outside 24h window.</li>
                <li>Use session tab for live 24h chat messages.</li>
              </ul>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
