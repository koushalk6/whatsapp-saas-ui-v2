import React, { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setReady(true); return; }
    apiRequest("/api/auth/me")
      .then((d)=>{ setUser({email:d.email}); setReady(true); })
      .catch(()=>{ localStorage.removeItem("token"); setReady(true); });
  }, []);

  const login = async (email, password) => {
    const d = await apiRequest("/api/auth/login",{method:"POST",body:JSON.stringify({email,password})});
    localStorage.setItem("token", d.token);
    const me = await apiRequest("/api/auth/me");
    setUser({ email: me.email });
  };

  const signup = async (email, password) => {
    await apiRequest("/api/auth/signup",{method:"POST",body:JSON.stringify({email,password})});
  };

  const logout = () => { localStorage.removeItem("token"); setUser(null); };

  return <AuthContext.Provider value={{user,ready,login,signup,logout}}>{children}</AuthContext.Provider>;
}

export function useAuth(){ return useContext(AuthContext); }
