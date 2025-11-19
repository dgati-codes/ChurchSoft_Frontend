// src/api/userService.js
import axios from "axios";
import axiosInstance from "./axiosInstance";

const BASE_URL = "https://churchsoft-backend.onrender.com/church-soft/v1.0";

/**
 * ✅ Login user
 */
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
  getAllUsers: async () => {
    try {
      const res = await axiosInstance.get("/users/all?page=0&size=10");

      const payload = res?.data;

      if (Array.isArray(payload)) return payload;
      if (Array.isArray(payload?.data?.content)) return payload.data.content;
      if (Array.isArray(payload?.data)) return payload.data;
      if (Array.isArray(payload?.content)) return payload.content;

      return [];
    } catch (error) {
      console.error("Error fetching users:", error);
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

