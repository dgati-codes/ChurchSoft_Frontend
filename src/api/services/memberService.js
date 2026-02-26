// src/api/memberService.js
import axiosInstance from "../axiosInstance";

// const normalizeResponse = (payload) => {
//   if (payload?.data) return payload.data;
//   if (payload?.content) return payload;
//   if (payload?.data?.content) return payload.data;
//   return payload;
// };
const normalizeResponse = (payload) => {
  if (!payload?.content) return payload;

  return {
    ...payload,
    content: payload.content.map((member) => ({
      ...member,
      localAssemblyName:
        member.localAssemblyName || member.localAssembly?.name || "",
    })),
  };
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

 getMembersByAssembly: async (page = 0, size = 10, assembly) => {
    try {
      const res = await axiosInstance.get(`/members/assembly/${assembly}`, {
        params: { page, size },
      });

      const payload = res?.data;

      if (payload?.content) return payload;
      if (payload?.data?.content) return payload.data;
      if (payload?.data?.content === 0) return "No members found";

      return normalizeResponse(payload);
    } catch (error) {
      console.error(
        "Error fetching members by assembly:",
        error.response || error,
      );
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
  // fetchMembers: async (
  //   page = 0,
  //   size = 10,
  //   { name = "", ministry = "" } = {}
  // ) => {
  //   if (ministry) {
  //     return memberService.getMembersByMinistry(ministry, page, size);
  //   }

  //   if (name) {
  //     return memberService.searchMembers(page, size, name);
  //   }

  //   return memberService.getAllMembers(page, size);
  // },

searchMembers: async (page = 0, size = 10, name = "") => {
  try {
    const trimmed = name?.trim();

    if (!trimmed) {
      return {
        content: [],
        totalPages: 0,
        totalElements: 0,
      };
    }

    const res = await axiosInstance.get("/members/search-name", {
      params: {
        query: trimmed,
        page,
        size,
      },
    });

    return normalizeResponse(res?.data);
  } catch (error) {
    console.error(
      "Error searching members:",
      error.response?.data || error
    );
    throw error;
  }
},
fetchMembers: async (page = 0, size = 10, filters = {}) => {
  try {
    const searchValue = filters.query?.trim();

    if (searchValue) {
      const res = await axiosInstance.get("/members/search-name", {
        params: { query: searchValue, page, size },
      });
      return normalizeResponse(res?.data);
    }

    const params = { page, size };

    if (filters.ministry && filters.ministry !== "All") {
      params.ministry = filters.ministry;
    }

    const res = await axiosInstance.get("/members", { params });
    return normalizeResponse(res?.data);
  } catch (error) {
    console.error("Error fetching members:", error.response?.data || error);
    throw error;
  }
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
