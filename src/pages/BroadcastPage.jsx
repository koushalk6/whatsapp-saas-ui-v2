import React, { useState } from "react";
import { apiRequest } from "../api";

export default function BroadcastPage(){
  const [templateName,setTemplateName] = useState("");
  const [languageCode,setLanguageCode] = useState("en");
  const [numbers,setNumbers] = useState("");
  const [sending,setSending] = useState(false);
  const [result,setResult] = useState(null);
  const [error,setError] = useState("");

  async function handleSend(e){
    e.preventDefault();
    setError(""); setResult(null);
    const to = numbers.split(/[,
]/).map(x=>x.trim()).filter(Boolean);
    if(!templateName || to.length===0){ setError("Template name and at least one number required."); return; }
    setSending(true);
    try{
      const data = await apiRequest("/api/broadcasts/template",{
        method:"POST",
        body:JSON.stringify({ template_name: templateName, language_code: languageCode, to })
      });
      setResult(data);
    }catch(err){ setError(err.message); }finally{ setSending(false); }
  }

  return (
    <div>
      <h1 className="text-lg font-semibold mb-2">Template Broadcast</h1>
      <p className="text-xs text-slate-500 mb-4">Send a WhatsApp template message to multiple numbers.</p>
      <form onSubmit={handleSend} className="bg-white rounded-lg card-border shadow-sm p-4 space-y-3 mb-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-500">Template name</label>
            <input className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" value={templateName} onChange={e=>setTemplateName(e.target.value)} placeholder="your_template_name"/>
          </div>
          <div>
            <label className="text-xs text-slate-500">Language code</label>
            <input className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" value={languageCode} onChange={e=>setLanguageCode(e.target.value)} placeholder="en"/>
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-500">Numbers (comma or newline separated, full international format)</label>
          <textarea className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-xs h-24 focus:outline-none focus:ring-1 focus:ring-emerald-500" value={numbers} onChange={e=>setNumbers(e.target.value)} placeholder="+919999999999, +918888888888"/>
        </div>
        {error && <div className="text-xs text-red-500">{error}</div>}
        <button type="submit" disabled={sending} className="text-sm px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60">
          {sending ? "Sending..." : "Send broadcast"}
        </button>
      </form>
      {result && (
        <div className="bg-white rounded-lg card-border shadow-sm p-4 text-xs">
          <div className="font-semibold mb-2">Broadcast result</div>
          <pre className="bg-slate-50 rounded-md p-2 overflow-auto max-h-64">{JSON.stringify(result,null,2)}</pre>
        </div>
      )}
    </div>
  );
}
