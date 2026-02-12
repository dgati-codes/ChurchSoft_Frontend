import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance.js";
import MemberService from "../api/services/memberService.js";
import { getCurrentUser, loginUser } from "../api/services/userService.js";

const AuthContext = createContext(null);

// ✅ Role constants (prevents typo bugs)
export const ROLES = {
  ADMIN: "ADMIN",
  FINANCE: "FINANCE",
  PASTOR: "PASTOR",
  ELDER: "ELDER",
  REP: "REP",
  MEMBER: "MEMBER",
  GUEST: "GUEST",
  LEADER: "LEADER",
  
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     Restore Session On Refresh
  ========================== */
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const userData = await getCurrentUser();
        setUser({
          ...userData,
          role: userData.roleName,
        });

      


        // ✅ Fetch members ONLY for allowed roles
        if ([ROLES.ADMIN, ROLES.PASTOR, ROLES.ELDER, ROLES.REP, ROLES.FINANCE, ROLES.LEADER, ROLES.MEMBER, ROLES.GUEST].includes(userData.role)) {
          const membersData = await MemberService.getAllMembers();
          setMembers(membersData);
        }
      } catch (error) {
        console.error("Session restore failed:", error);
        logout(); // cleanup properly
      } finally {
        setLoading(false);
      }
      console.log("Normalized role:", user.role);
    };

    restoreSession();
  }, []);

  /* =========================
     Login
  ========================== */
  const login = async (credentials) => {
    try {
      const result = await loginUser(credentials);

      if (!result.success) return result;

      localStorage.setItem("accessToken", result.token);
      axiosInstance.defaults.headers.Authorization = `Bearer ${result.token}`;

      const userData = await getCurrentUser();
      setUser({
        ...userData,
        role: userData.roleName,
      });

     

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: "Login failed" };
    }
  };

  /* =========================
     Logout
  ========================== */
  const logout = () => {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.Authorization;
    setUser(null);
    setMembers([]);
  };

  /* =========================
     Role Helpers (RBAC Core)
  ========================== */

  const hasRole = (allowedRoles = []) => {
    if (!user?.role) return false;
    return allowedRoles.includes(user.role.toUpperCase());
  };

  const isAdmin = () => user?.role === ROLES.ADMIN;
  const isPastor = () => user?.role === ROLES.PASTOR;
  const isElder = () => user?.role === ROLES.ELDER;
  const isRep = () => user?.role === ROLES.REP;
  const isMember = () => user?.role === ROLES.MEMBER;
  const isLeader = () => user?.role === ROLES.LEADER;
  const isFinance = () => user?.role === ROLES.FINANCE;
  const isGuest = () => user?.role === ROLES.GUEST;


  return (
    <AuthContext.Provider
      value={{
        user,
        members,
        loading,
        login,
        logout,
        hasRole,
        isAdmin,
        isPastor,
        isElder,
        isRep,
        isMember,
        isLeader,
        isFinance,
        isGuest
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
