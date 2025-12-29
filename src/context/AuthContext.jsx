import { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, loginUser } from "../api/userService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Get token from localStorage
  const token = localStorage.getItem("accessToken");

  // 🔐 Fetch logged-in user, only if token exists
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: !!token, // fetch only when token is available
    retry: false,
  });

  // 🔑 Login handler
  const login = async (credentials) => {
    const result = await loginUser(credentials);

    if (result.success) {
      // Store token
      localStorage.setItem("accessToken", result.token);

      // Immediately fetch current user and update cache
      const userData = await queryClient.fetchQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
      });

      queryClient.setQueryData(["currentUser"], userData);
    }

    return result;
  };

  // 🚪 Logout handler
  const logout = () => {
    localStorage.removeItem("accessToken");
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isLoading,
        isError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
