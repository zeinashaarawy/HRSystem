// utils/axiosInstance.ts
import axios from "axios";

// Use relative path when Next.js proxy is available, otherwise use full URL
const getBaseURL = () => {
  if (typeof window !== "undefined") {
    // In browser: use relative path to leverage Next.js rewrites
    return "/api/v1";
  }
  // Server-side: use full URL
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 🔐 Attach auth headers expected by backend
 */
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userid");
      const role = localStorage.getItem("role");

      // BACKEND EXPECTS THESE 👇
      if (userId) {
        config.headers["x-user-id"] = userId;
      }

      if (role) {
        config.headers["x-user-role"] = role;
      }

      // Optional: keep JWT for future migration
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      console.error(
        "🌐 Network Error: Cannot connect to backend server.",
        "\n📍 Attempted URL:",
        error.config?.url,
        "\n🔗 Base URL:",
        error.config?.baseURL,
        "\n💡 Make sure the backend server is running on port 3001"
      );
    } else {
      console.error(
        "API Error:",
        error?.response?.data ?? error?.message,
        "\nStatus:",
        error?.response?.status,
        "\nURL:",
        error.config?.url
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;