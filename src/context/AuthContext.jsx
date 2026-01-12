import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { loginUser, getCurrentUser } from "../api/userService";
import MemberService from "../api/memberService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore user on page refresh
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setLoading(false);
      return;
    }

    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

    const fetchUserAndMembers = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);

        // ✅ Fetch ALL members (pagination handled in service)
        const membersData = await MemberService.getAllMembers();
        setMembers(membersData);
      } catch (err) {
        console.error("Failed to restore user:", err);
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };
   

    fetchUserAndMembers();
  }, []);

  // 🔑 Login
  const login = async (credentials) => {
    const result = await loginUser(credentials);

    if (result.success) {
      localStorage.setItem("accessToken", result.token);

      axiosInstance.defaults.headers.Authorization =
        `Bearer ${result.token}`;

      const userData = await getCurrentUser();
      setUser(userData);

      // ✅ Fetch ALL members immediately after login
      const membersData = await MemberService.getAllMembers();
      setMembers(membersData);
    }

    return result;
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.Authorization;
    setUser(null);
    setMembers([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        members,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
