import axiosInstance from "./axiosInstance";
import { setAccessToken } from "../utils/tokenHelper";

// User login
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/users/login", credentials);

    const { token, ...userData } = response.data;

    if (token) {
      setAccessToken(token);
      localStorage.setItem("user", JSON.stringify(userData));
    }

    return { success: true, token, user: userData };

  } catch (error) {
    console.error("Login failed:", error);
    const message =
      error.response?.data?.message || "Unable to log in. Please try again.";
    return { success: false, message };
  }
};

// User registration
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "/users/register",
      userData
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Registration failed:", error);

    const message =
      error.response?.data?.message ||
      "Unable to register user. Please try again.";
    return { success: false, message };
  }
};


//  Update user
export const updateUser = async (userData) => {
  try {
    const response = await axiosInstance.put("/church-soft/v1.0/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error.response?.data || error.message;
  }
};

// Change password
export const changePassword = async (passwordData) => {
  try {
    await axiosInstance.post("/church-soft/v1.0/users/change-password", passwordData);
    return { success: true, message: "Password changed successfully" };
  } catch (error) {
    console.error("Error changing password:", error);
    throw error.response?.data || error.message;
  }
};

//  Change user status (PATCH)
export const changeUserStatus = async (id, status) => {
  try {
    const response = await axiosInstance.patch(
      `/church-soft/v1.0/users/${id}/status`,
      null, 
      { params: { status } }
    );
    return response.data;
  } catch (error) {
    console.error("Error changing user status:", error);
    throw error.response?.data || error.message;
  }
};

//  Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/church-soft/v1.0/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error.response?.data || error.message;
  }
};

// Search users by name
export const searchUsers = async (name, page = 0, size = 10) => {
  try {
    const response = await axiosInstance.get("/church-soft/v1.0/users/search", {
      params: { name, page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error.response?.data || error.message;
  }
};

//  Get all users (paginated)
export const getAllUsers = async (page = 0, size = 10) => {
  try {
    const response = await axiosInstance.get("/church-soft/v1.0/users/all", {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response?.data || error.message;
  }
};

// Delete user by ID
export const deleteUser = async (id) => {
  try {
    await axiosInstance.delete(`/church-soft/v1.0/users/${id}`);
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error.response?.data || error.message;
  }
};