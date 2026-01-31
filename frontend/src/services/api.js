import axios from "axios";

// VITE_API_URL = http://localhost:5000 (server domain only)
const SERVER_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_BASE_URL = `${SERVER_URL}/api/news`;

console.log("🚀 Frontend initialized");
console.log("📡 Server URL:", SERVER_URL);
console.log("📡 API Base URL:", API_BASE_URL);

// Create axios instance with correct baseURL
const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor - log outgoing requests
API.interceptors.request.use((config) => {
  const fullURL = `${API_BASE_URL}${config.url}`;
  console.log(`📤 ${config.method.toUpperCase()} ${fullURL}`);
  return config;
});

// Response interceptor with detailed error logging
API.interceptors.response.use(
  (response) => {
    console.log(`✅ Response received (${response.status})`);
    return response;
  },
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("⏱️ Request timeout - backend is slow or unresponsive");
    } else if (error.code === "ERR_NETWORK") {
      console.error(
        "🔴 ERR_NETWORK: Cannot reach backend.",
        `Ensure server is running at: ${SERVER_URL}`
      );
    } else if (!error.response) {
      console.error(
        "🔴 No response from server.",
        `Check if backend is running at: ${SERVER_URL}`
      );
    } else if (error.response?.status >= 400) {
      console.error(
        `🔴 Backend error (HTTP ${error.response.status}):`,
        error.response.data
      );
    }
    return Promise.reject(error);
  }
);

// Health check to verify backend is reachable
export const checkHealth = () => {
  console.log("🏥 Checking backend health...");
  return axios.get(`${SERVER_URL}/health`, { timeout: 5000 })
    .then((res) => {
      console.log("✅ Backend is healthy:", res.data);
      return true;
    })
    .catch((err) => {
      console.error("❌ Backend health check failed:", err.message);
      return false;
    });
};

// GET /api/news/top
export const fetchTopNews = () => {
  return API.get("/top");
};

// GET /api/news/category/:category
export const fetchCategoryNews = (category) => {
  return API.get(`/category/${category}`);
};

// GET /api/news/search?q=query
export const searchNews = (query) => {
  return API.get("/search", { params: { q: query } });
};
