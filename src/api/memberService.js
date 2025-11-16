// src/api/memberService.js
import axiosInstance from "./axiosInstance";

const memberService = {
  getAllMembers: async () => {
    const res = await axiosInstance.get("/members");
    const payload = res?.data;
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.content)) return payload.content;
    return [];
  },

   deleteMember: async (id) => {
    // Use the backend memberId
    const res = await axiosInstance.delete(`/members/${id}`);
    return res.data;
  },

  updateMember: async (id, updatedData) => {
    // Backend expects memberId and the updated data in the body
    const payload = { id, ...updatedData };
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
