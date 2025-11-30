import React, { useState } from "react";
import { apiRequest } from "../api";

export default function SessionPage(){
  const [mode,setMode] = useState("simple");
  const [to,setTo] = useState("");
  const [body,setBody] = useState("");
  const [raw,setRaw] = useState('{
  "type": "text",
  "text": { "body": "Hello from raw payload" }
}');
  const [sending,setSending] = useState(false);
  const [result,setResult] = useState(null);
  const [error,setError] = useState("");

  async function sendSimple(e){
    e.preventDefault();
    setError(""); setResult(null);
    if(!to || !body){ setError("Number and body are required."); return; }
    setSending(true);
    try{
      const data = await apiRequest("/api/messages/session/text",{
        method:"POST",
        body:JSON.stringify({ to, body })
      });
      setResult(data);
    }catch(err){ setError(err.message); }finally{ setSending(false); }
  }

  async function sendRaw(e){
    e.preventDefault();
    setError(""); setResult(null);
    let payload;
    try{
      payload = JSON.parse(raw);
    }catch(err){
      setError("Invalid JSON in raw payload."); return;
    }
    if(!payload.to){ setError("Raw JSON must include 'to'."); return; }
    setSending(true);
    try{
      const data = await apiRequest("/api/messages/session/raw",{
        method:"POST",
        body:JSON.stringify(payload)
      });
      setResult(data);
    }catch(err){ setError(err.message); }finally{ setSending(false); }
  }

  return (
    <div>
      <h1 className="text-lg font-semibold mb-2">24h Session Messaging</h1>
      <p className="text-xs text-slate-500 mb-4">
        Send messages within the 24h customer service window. Use simple mode for quick text, or raw mode for any WhatsApp type (media, interactive CTAs, etc.).
      </p>

      <div className="flex gap-2 mb-3 text-xs">
        <button onClick={()=>setMode("simple")} className={"px-3 py-1.5 rounded-md border "+(mode==="simple"?"border-emerald-600 text-emerald-700 bg-emerald-50":"border-slate-200 text-slate-600")}>Simple text</button>
        <button onClick={()=>setMode("raw")} className={"px-3 py-1.5 rounded-md border "+(mode==="raw"?"border-emerald-600 text-emerald-700 bg-emerald-50":"border-slate-200 text-slate-600")}>Advanced raw JSON</button>
      </div>

      {mode==="simple" && (
        <form onSubmit={sendSimple} className="bg-white rounded-lg card-border shadow-sm p-4 space-y-3 mb-4">
          <div>
            <label className="text-xs text-slate-500">Number (full international)</label>
            <input className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" value={to} onChange={e=>setTo(e.target.value)} placeholder="+919999999999"/>
          </div>
          <div>
            <label className="text-xs text-slate-500">Message body</label>
            <textarea className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm h-24 focus:outline-none focus:ring-1 focus:ring-emerald-500" value={body} onChange={e=>setBody(e.target.value)} />
          </div>
          {error && <div className="text-xs text-red-500">{error}</div>}
          <button type="submit" disabled={sending} className="text-sm px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60">
            {sending ? "Sending..." : "Send session message"}
          </button>
        </form>
      )}

      {mode==="raw" && (
        <form onSubmit={sendRaw} className="bg-white rounded-lg card-border shadow-sm p-4 space-y-3 mb-4">
          <div className="text-xs text-slate-500 mb-1">
            Full WhatsApp payload (excluding <code>messaging_product</code>). Include <code>to</code> and <code>type</code>.
          </div>
          <textarea className="w-full border border-slate-200 rounded-md px-3 py-2 text-xs h-40 focus:outline-none focus:ring-1 focus:ring-emerald-500" value={raw} onChange={e=>setRaw(e.target.value)} />
          {error && <div className="text-xs text-red-500">{error}</div>}
          <button type="submit" disabled={sending} className="text-sm px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60">
            {sending ? "Sending..." : "Send raw session"}
          </button>
        </form>
      )}

      {result && (
        <div className="bg-white rounded-lg card-border shadow-sm p-4 text-xs">
          <div className="font-semibold mb-2">Result</div>
          <pre className="bg-slate-50 rounded-md p-2 overflow-auto max-h-64">{JSON.stringify(result,null,2)}</pre>
        </div>
      )}
    </div>
  );
}
