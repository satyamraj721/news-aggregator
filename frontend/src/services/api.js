import axios from "axios";

/*
  LOCAL:
    VITE_API_URL=http://localhost:5000

  PRODUCTION (Vercel):
    VITE_API_URL=https://news-aggregator-ug2i.onrender.com
*/

// 🔥 Never rely on localhost in production
const SERVER_URL =
  import.meta.env.VITE_API_URL ??
  "https://news-aggregator-ug2i.onrender.com";

const API_BASE_URL = `${SERVER_URL}/api/news`;

console.log("🚀 Frontend initialized");
console.log("📡 Server URL:", SERVER_URL);
console.log("📡 API Base URL:", API_BASE_URL);

// Axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 📤 Log outgoing requests
API.interceptors.request.use((config) => {
  console.log(
    `📤 ${config.method?.toUpperCase()} ${API_BASE_URL}${config.url}`
  );
  return config;
});

// 📥 Handle responses & errors
API.interceptors.response.use(
  (response) => {
    console.log(`✅ Response received (${response.status})`);
    return response;
  },
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("⏱️ Request timeout");
    } else if (error.code === "ERR_NETWORK") {
      console.error(
        "🔴 Cannot reach backend.",
        `Check server: ${SERVER_URL}`
      );
    } else if (!error.response) {
      console.error(
        "🔴 No response from backend.",
        `Check server: ${SERVER_URL}`
      );
    } else {
      console.error(
        `🔴 Backend error (${error.response.status})`,
        error.response.data
      );
    }
    return Promise.reject(error);
  }
);

// 🏥 Health check
export const checkHealth = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/health`, { timeout: 5000 });
    console.log("✅ Backend healthy:", res.data);
    return true;
  } catch (err) {
    console.error("❌ Backend health check failed");
    return false;
  }
};

// 📰 Top headlines
export const fetchTopNews = () => {
  return API.get("/top");
};

// 🗂️ Category news
export const fetchCategoryNews = (category) => {
  return API.get(`/category/${category}`);
};

// 🔍 Search news
export const searchNews = (query) => {
  return API.get("/search", {
    params: { q: query },
  });
};
