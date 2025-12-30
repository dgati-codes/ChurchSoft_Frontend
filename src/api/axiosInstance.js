import axios from "axios";
import { getAccessToken } from "../utils/tokenHelper";

const BASE_URL = "https://churchsoft-backend.onrender.com/church-soft/v1.0";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (
      !config.url.includes("/users/login") &&
      !config.url.includes("/users/register")
    ) {
      const token = getAccessToken();
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
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn(
        "⚠️ Unauthorized or Forbidden - clearing token and redirecting to login"
      );
      localStorage.removeItem("accessToken"); 
      if (typeof window !== "undefined" && window.location) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;