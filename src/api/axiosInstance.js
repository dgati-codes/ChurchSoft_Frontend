import axios from "axios";
import { getAccessToken } from "../utils/tokenHelper";

// ✅ Load backend URL from .env file
const BASE_URL ="https://churchsoft-backend.onrender.com/church-soft/v1.0";

console.log("✅ API Base URL:", BASE_URL); // Debug log

// ✅ Create reusable axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10s timeout
});

// ✅ Automatically attach Authorization header for all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized - possible expired or invalid token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
