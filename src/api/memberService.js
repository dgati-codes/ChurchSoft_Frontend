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

  deleteMember: async (memberId) => {
    const res = await axiosInstance.delete(`/members/${memberId}`);
    return res.data;
  },

  updateMember: async (memberId, updatedData) => {
    const res = await axiosInstance.put(`/members/${memberId}`, updatedData);
    return res.data;
  },
};

export default memberService;
