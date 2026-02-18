// src/api/memberService.js
import axiosInstance from "../axiosInstance";

const memberService = {
  // Fetch ALL members by looping through all pages
  getAllMembers: async (page = 0, size = 10, filters = {}) => {
  try {
    const res = await axiosInstance.get("/members", {
      params: {
        page,
        size,
        search: filters.search,
        assembly: filters.assembly !== "ALL" ? filters.assembly : undefined,
      },
    });

    const payload = res?.data;

    // ✅ normalize response
    if (payload?.data) return payload.data;
    if (payload?.content) return payload;
    if (payload?.data?.content) return payload.data;

    return payload;
  } catch (error) {
    console.error("Error fetching members:", error.response || error);
    throw error;
  }
},

searchMembers: async (page = 0, size = 10, name = "") => {
    try {
      const res = await axiosInstance.get("/members/search-name", {
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

      return payload;
    } catch (error) {
      console.error("Error searching Members:", error.response || error);
      throw error;
    }
  },

  deleteMember: async (id) => {
    // Use the backend memberId
    const res = await axiosInstance.delete(`/members/${id}`);
    return res.data;
  },

  updateMember: async (id, updatedData) => {
    const payload = {
      id,
      ...updatedData,
      preferredLanguages: Array.isArray(updatedData.preferredLanguages)
        ? updatedData.preferredLanguages
        : [updatedData.preferredLanguages].filter(Boolean),
    };

    const res = await axiosInstance.put("/members/update", payload);
    return res.data;
  },

  createMember: async (memberData) => {
    // POST to create a new member
    const res = await axiosInstance.post("/members", memberData);
    return res.data;
  },
};

export default memberService;
