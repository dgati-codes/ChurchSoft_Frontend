// src/api/memberService.js
import axiosInstance from "./axiosInstance";

const memberService = {
  // Fetch ALL members by looping through all pages
getAllMembers: async () => {
  let allMembers = [];
  let page = 0;
  const size = 10; // backend default

  while (true) {
    const res = await axiosInstance.get(`/members?page=${page}&size=${size}`);

    const payload = res?.data;

    const currentPageData =
      Array.isArray(payload?.content) ? payload.content : [];

    allMembers = [...allMembers, ...currentPageData];

    // stop when last page is reached
    if (page >= payload?.totalPages - 1) break;

    page++;
  }

  return allMembers;
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

   createMember: async (memberData, payload) => {
    // POST to create a new member
    const res = await axiosInstance.post("/members", memberData);
    return res.data;
  },
};


export default memberService;
