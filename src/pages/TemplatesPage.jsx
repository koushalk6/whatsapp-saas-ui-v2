import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function TemplatesPage(){
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  async function load(){
    setLoading(true); setError("");
    try{
      const data = await apiRequest("/api/templates");
      setItems(data.data || data.message_templates || []);
    }catch(e){ setError(e.message); }finally{ setLoading(false); }
  }

  useEffect(()=>{ load(); },[]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-semibold">Templates</h1>
          <p className="text-xs text-slate-500">Fetched from your WhatsApp Business account</p>
        </div>
        <button onClick={load} className="text-xs px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50">Refresh</button>
      </div>
      {loading && <div className="text-xs text-slate-500">Loading templates...</div>}
      {error && <div className="text-xs text-red-500 mb-2">{error}</div>}
      <div className="bg-white rounded-lg card-border shadow-sm overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="text-left px-3 py-2">Name</th>
              <th className="text-left px-3 py-2">Category</th>
              <th className="text-left px-3 py-2">Language</th>
              <th className="text-left px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(t=>(
              <tr key={t.id} className="border-t border-slate-100">
                <td className="px-3 py-2">{t.name}</td>
                <td className="px-3 py-2">{t.category}</td>
                <td className="px-3 py-2">{t.language}</td>
                <td className="px-3 py-2">{t.status}</td>
              </tr>
            ))}
            {items.length===0 && !loading && (
              <tr><td colSpan={4} className="px-3 py-4 text-center text-slate-400">No templates found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
