import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { loginUser, getCurrentUser } from "../api/userService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore user on page refresh
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setLoading(false);
      return;
    }

    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData); // 🔥 triggers re-render everywhere
      } catch (err) {
        console.error("Failed to restore user:", err);
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔑 Login — IMMEDIATE username update
  const login = async (credentials) => {
    const result = await loginUser(credentials);

    if (result.success) {
      // 1️⃣ Save token
      localStorage.setItem("accessToken", result.token);

      // 2️⃣ Update axios header immediately
      axiosInstance.defaults.headers.Authorization =
        `Bearer ${result.token}`;

      // 3️⃣ Fetch user and update context state
      const userData = await getCurrentUser();
      setUser(userData); // 🔥 THIS fixes the delay
    }

    return result;
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
