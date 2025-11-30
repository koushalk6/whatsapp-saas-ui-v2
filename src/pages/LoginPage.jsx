import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function LoginPage(){
  const { login, signup } = useAuth();
  const nav = useNavigate();
  const [mode,setMode] = useState("login");
  const [email,setEmail] = useState("admin@example.com");
  const [password,setPassword] = useState("admin123");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
      if(mode==="signup"){ await signup(email,password); }
      await login(email,password);
      nav("/");
    }catch(err){
      setError(err.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-8 rounded-md bg-emerald-700 grid place-items-center text-white font-bold text-xs">DMX</div>
          <div>
            <div className="text-base font-semibold">DMX WhatsApp SaaS</div>
            <div className="text-xs text-slate-400">Login or create an account</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-slate-500">Email</label>
            <input type="email" className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" value={email} onChange={e=>setEmail(e.target.value)} required/>
          </div>
          <div>
            <label className="text-xs text-slate-500">Password</label>
            <input type="password" className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" value={password} onChange={e=>setPassword(e.target.value)} required/>
          </div>
          {error && <div className="text-xs text-red-500">{error}</div>}
          <button type="submit" disabled={loading} className="w-full mt-2 bg-emerald-600 text-white text-sm py-2 rounded-md hover:bg-emerald-700 disabled:opacity-60">
            {loading ? "Please wait..." : mode==="login" ? "Login" : "Sign up & Login"}
          </button>
        </form>
        <div className="mt-4 text-xs text-center text-slate-500">
          {mode==="login" ? <>New here? <button className="text-emerald-600 underline" onClick={()=>setMode("signup")}>Create account</button></> : <>Already have an account? <button className="text-emerald-600 underline" onClick={()=>setMode("login")}>Login</button></>}
        </div>
      </div>
    </div>
  );
}
