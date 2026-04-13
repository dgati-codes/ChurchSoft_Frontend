import axios from "axios";

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