// src/api/userService.js
import axios from "axios";

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
export const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get('/Users/All');
      return response.data;
    } catch (error) {
      console.error('Error fetching all attendance records:', error);
      throw error;
    }
  };

