import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://churchsoft-backend.onrender.com/church-soft/v1.0",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
