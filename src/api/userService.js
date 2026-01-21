// src/api/userService.js
import axios from "axios";
import axiosInstance from "./axiosInstance";

const BASE_URL = "https://churchsoft-backend.onrender.com/church-soft/v1.0";


export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, credentials, {
      headers: { "Content-Type": "application/json" },
    });

    const { token, user, message } = response.data;

    return {
      success: true,
      token,
      user,
      message: message || "Login successful",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Login failed. Please check your credentials.",
    };
  }
};

/**
 * ✅ Register user (optional, if used elsewhere)
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Register user error:", error);
    const message =
      error.response?.data?.message || "Failed to add user. Please try again.";
    return { success: false, message };
  }
};

const UserService = {
  // Fetch all users (standardized)
  getAllUsers: async (page = 0, size = 10, filters = {}) => {
    try {
      const res = await axiosInstance.get("/users/all", {
        params: {
          page,
          size,
          country: filters.country,
          region: filters.region,
          ageGroup: filters.ageGroup,
          search: filters.search,
          assembly: filters.assembly !== "ALL" ? filters.assembly : undefined,
        },
      });

      const payload = res?.data;

      // ✅ normalize response
      if (payload?.data) return payload.data;
      if (payload?.content) return payload;
      if (payload?.data?.content) return payload.data;

     return normalizeUsers(payload);

    } catch (error) {
      console.error("Error fetching users:", error.response || error);
      throw error;
    }
  },

  searchUsers: async (page = 0, size = 10, name = "") => {
    try {
      const res = await axiosInstance.get("/users/search", {
        params: {
          name,
          page,
          size,
        },
      });

      const payload = res?.data;

      if (payload?.data) return payload.data;
      if (payload?.content) return payload;
      if (payload?.data?.content) return payload.data;

       return normalizeUsers(payload);
    } catch (error) {
      console.error("Error searching users:", error.response || error);
      throw error;
    }
  },

  getUsersByAssembly: async (page = 0, size = 10, assembly) => {
  try {
    const res = await axiosInstance.get(
      `/users/assembly/${assembly}`,
      {
        params: { page, size },
      }
    );

    const payload = res?.data;

    if (payload?.content) return payload;
    if (payload?.data?.content) return payload.data;
    if (payload?.data?.content===0) return ("No users found");

    return normalizeUsers(payload);

  } catch (error) {
    console.error("Error fetching users by assembly:", error.response || error);
    throw error;
  }
},


  // Delete a user by ID
  deleteUser: async (id) => {
    try {
      return await axiosInstance.delete(`/users/${id}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  // Update a user
  updateUser: async (data) => {
    try {
      return await axiosInstance.put(`/users`, data);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },
  
  
};

export default UserService;

// ✅ Get currently logged-in user
export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/users/me");
  return res.data;
};

const normalizeUsers = (payload) => {
  if (!payload?.content) return payload;

  return {
    ...payload,
    content: payload.content.map((user) => ({
      ...user,
      localAssemblyName:
        user.localAssemblyName || user.localAssembly?.name || "",
    })),
  };
};
