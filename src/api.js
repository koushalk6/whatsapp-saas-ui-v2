const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export function apiRequest(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };
  return fetch(API_BASE.replace(/\/$/, "") + path, { ...options, headers })
    .then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "API error");
      return data;
    });
}
