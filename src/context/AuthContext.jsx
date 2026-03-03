import { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance.js";
import { loginUser } from "../api/services/auth.js";
import MemberService from "../api/services/memberService.js";
import { getCurrentUser } from "../api/services/userService.js";

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
  // const [loading, setLoading] = useState(true);
  const [member, setMember] = useState(null);
  
 const login = async (credentials) => {
  try {
    const result = await loginUser(credentials);
    if (!result.success) return result;

    localStorage.setItem("accessToken", result.token);
    axiosInstance.defaults.headers.Authorization = `Bearer ${result.token}`;

    const userData = await getCurrentUser();
    const formattedUser = { ...userData, role: userData.roleName };

    setUser(formattedUser);
    localStorage.setItem("user", JSON.stringify(formattedUser));

    const member = await MemberService.getMemberByUserId(userData.id);
    setMember(member);
    localStorage.setItem("member", JSON.stringify(member));

    const message = member
      ? null
      : "You are logged in but not yet registered as a member. Please register your member profile.";

    return { success: true, message };
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, message: "Login failed" };
  }
};

  const updateUser = (updatedUser) => {
    setUser((prev) => ({
      ...prev,
      ...updatedUser,
    }));

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        ...updatedUser,
      }),
    );
  };

  /* =========================
     Logout
  ========================== */
  const logout = () => {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.Authorization;
    setUser(null);
    // setMembers([]);
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

        updateUser,
       
        member,
        // loading,
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
        isGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
