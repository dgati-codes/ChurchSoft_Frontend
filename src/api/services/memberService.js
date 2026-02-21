// src/api/memberService.js
import axiosInstance from "../axiosInstance";

const normalizeResponse = (payload) => {
  if (payload?.data) return payload.data;
  if (payload?.content) return payload;
  if (payload?.data?.content) return payload.data;
  return payload;
};

const memberService = {
  // 🔹 Get All Members (Default)
  getAllMembers: async (page = 0, size = 10) => {
    try {
      const res = await axiosInstance.get("/members", {
        params: { page, size },
      });

      return normalizeResponse(res?.data);
    } catch (error) {
      console.error("Error fetching members:", error.response?.data || error);
      throw error;
    }
  },

 

  // 🔹 Filter by Ministry
  getMembersByMinistry: async (ministry, page = 0, size = 10) => {
    try {
      const res = await axiosInstance.get(
        `/members/ministry/${ministry}`,
        {
          params: { page, size },
        }
      );

      return normalizeResponse(res?.data);
    } catch (error) {
        console.error(
        "Error fetching members by ministry:",
        error.response?.data || error
      );
      throw error;
    }
  },

  // 🔹 Smart Fetch (Auto Decides What To Call)
  fetchMembers: async (
    page = 0,
    size = 10,
    { name = "", ministry = "" } = {}
  ) => {
    if (ministry) {
      return memberService.getMembersByMinistry(ministry, page, size);
    }

    if (name) {
      return memberService.searchMembers(page, size, name);
    }

    return memberService.getAllMembers(page, size);
  },

  // 🔹 Delete Member
  deleteMember: async (id) => {
    const res = await axiosInstance.delete(`/members/${id}`);
    return res.data;
  },

  // 🔹 Update Member
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

  // 🔹 Create Member
  createMember: async (memberData) => {
    const res = await axiosInstance.post("/members", memberData);
    return res.data;
  },
};

export default memberService;