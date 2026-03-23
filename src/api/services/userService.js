import axiosInstance from "../axiosInstance";
/* ===================== HELPERS ===================== */

const extractData = (res) => {
  const payload = res?.data;

  if (payload?.data) return payload.data;
  if (payload?.content) return payload;
  if (payload?.data?.content) return payload.data;

  return normalizeUsers(payload);
};

const handleError = (error, label) => {
  console.error(`${label}:`, error.response || error);
  throw error;
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

/* ===================== SERVICE ===================== */

const UserService = {
  /* ---------- GET USERS ---------- */

  getAllUsers: async (page = 0, size = 10, filters = {}) => {
    try {
      const res = await axiosInstance.get("/users/all", {
        params: {
          page,
          size,
          search: filters.search || undefined,
          assembly:
            filters.localAssemblyName && filters.localAssemblyName !== "ALL"
              ? filters.localAssemblyName
              : undefined,
        },
      });
      return extractData(res);
    } catch (error) {
      handleError(error, "Error fetching users");
    }
  },

  searchUsers: async (page = 0, size = 10, name = "") => {
    try {
      const res = await axiosInstance.get("/users/search", {
        params: { name, page, size },
      });

      return extractData(res);
    } catch (error) {
      handleError(error, "Error searching users");
    }
  },

  getUsersByAssembly: async (page = 0, size = 10, assembly) => {
    try {
      const res = await axiosInstance.get(`/users/assembly/${assembly}`, {
        params: { page, size },
      });

      return extractData(res);
    } catch (error) {
      handleError(error, "Error fetching users by assembly");
    }
  },

  /* ---------- UPDATE USER ---------- */

  updateUser: async (data) => {
    try {
      const res = await axiosInstance.put("/users", data);
      return res.data; // ✅ return raw data only
    } catch (error) {
      handleError(error, "Error updating user");
    }
  },

  /* ---------- DELETE USER ---------- */

  deleteUser: async (id) => {
    try {
      const res = await axiosInstance.delete(`/users/${id}`);
      return res.data; // ✅ return response
    } catch (error) {
      handleError(error, "Error deleting user");
    }
  },

  /* ---------- REGISTER ----------*/

  registerUser: async (userData) => {
    try {
      const res = await axiosInstance.post("/users/register", userData, {
        headers: { "Content-Type": "application/json" },
      });

      return res.data;
    } catch (error) {
      handleError(error, "Register user error");
    }
  },
};

export default UserService;

/* ===================== EXTRA ===================== */

export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/users/me");
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res.data;
};
