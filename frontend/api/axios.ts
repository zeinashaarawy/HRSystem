import axios from "axios";

// Next.js runs on one port, Nest backend on another.
// Configure via env when possible.
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
});

// ALWAYS attach token
api.interceptors.request.use((config) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (_) {
    console.log("Token read error");
  }
  
  return config;
});

export default api;
