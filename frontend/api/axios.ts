import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1",
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

// Error interceptor to handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the error for debugging
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error("Network Error: No response from server");
    } else {
      // Error setting up request
      console.error("Request Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
