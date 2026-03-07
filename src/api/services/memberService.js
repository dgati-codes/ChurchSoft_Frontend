// src/api/memberService.js
import axiosInstance from "../axiosInstance";

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
        params: { 
          page, 
          size,
         },
      });

      return normalizeResponse(res?.data);
    } catch (error) {
      console.error("Error fetching members:", error.response?.data || error);
      throw error;
    }
  },

  getMembersByAssembly: async (assembly, page = 0, size = 10) => {
    try {
      if (!assembly) {
        throw new Error("Assembly is required");
      }

      const res = await axiosInstance.get(
        `/members/assembly/${encodeURIComponent(assembly)}`,
        {
          params: { page, size },
        },
      );

      const payload = res?.data;

      if (payload?.content) return payload;

      if (payload?.data?.content) return payload.data;
      console.log(res.payload);
      // Fallback normalization
      return normalizeResponse(payload);
    } catch (error) {
      console.error(
        "Error fetching members by assembly:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },

  // 🔹 Filter by district
  //   getMembersByDistrict: async (district, page = 0, size = 10) => {
  //   try {
  //     const res = await axiosInstance.get(
  //       `/members/district/${encodeURIComponent(district)}`,
  //       { params: { page, size } }
  //     );

  //     const payload = res?.data;

  //     if (payload?.content) return payload;
  //     if (payload?.data?.content) return payload.data;

  //     return normalizeResponse(payload);

  //   } catch (error) {
  //     console.error(
  //       "Error fetching members by district:",
  //       error.response?.data || error.message
  //     );
  //     throw error;
  //   }
  // },

  //   getMembersByRegion: async (region, page = 0, size = 10) => {
  //   try {
  //     const res = await axiosInstance.get(
  //       `/members/region/${encodeURIComponent(region)}`,
  //       { params: { page, size } }
  //     );

  //     const payload = res?.data;

  //     if (payload?.content) return payload;
  //     if (payload?.data?.content) return payload.data;

  //     return normalizeResponse(payload);

  //   } catch (error) {
  //     console.error(
  //       "Error fetching members by region:",
  //       error.response?.data || error.message
  //     );
  //     throw error;
  //   }
  // },

  // getMembersByMinistry: async (ministry, page = 0, size = 10) => {
  //   try {
  //     const res = await axiosInstance.get(
  //       `/members/ministry/${encodeURIComponent(ministry)}`,
  //       { params: { page, size } }
  //     );

  //     const payload = res?.data;

  //     if (payload?.content) return payload;
  //     if (payload?.data?.content) return payload.data;

  //     return normalizeResponse(payload);

  //   } catch (error) {
  //     console.error(
  //       "Error fetching members by ministry:",
  //       error.response?.data || error.message
  //     );
  //     throw error;
  //   }
  // },

  getMembersByMinistry: async (ministry, page = 0, size = 10) => {
    try {
      const res = await axiosInstance.get(
        `/members/ministry/${encodeURIComponent(ministry)}`,
        { params: { page, size } },
      );

      const payload = res?.data;

      if (payload?.content) return payload;
      if (payload?.data?.content) return payload.data;

      return payload;
    } catch (error) {
      console.error(
        "Error fetching members by ministry:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },
  searchMembers: async (page = 0, size = 10, query = "") => {
    try {
      const trimmedQuery = query?.trim();

      if (!trimmedQuery) {
        return {
          content: [],
          totalPages: 0,
          totalElements: 0,
        };
      }

      const { data } = await axiosInstance.get("/members/search-name", {
        params: {
          query: trimmedQuery,
          page,
          size,
        },
      });

      if (Array.isArray(data)) {
        return {
          content: data,
          totalPages: 1,
          totalElements: data.length,
        };
      }

      return normalizeResponse(data);
    } catch (error) {
      console.error("Error searching members:", error.response?.data || error);
      throw error;
    }
  },

  getMemberByUserId: async (userId) => {
    try {
      const response = await axiosInstance.get(`/members/by-user-id/${userId}`);
      const payload = response?.data;

      if (payload?.data) return payload.data;
      if (payload) return payload;

      return null;
    } catch (error) {
      if (error.response?.status === 400) {
        console.log("User is not registered as a member.");
        return null;
      }
      console.error("Error fetching member by userId:", error);
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




export const getIncompleteMembers = async () => {
  const response = await axiosInstance.get("/members");

  return response.data.data.filter(
    (member) => member.isCompleted === false
  );
};
export const getBirthdaysThisWeek = async () => {
  const response = await axiosInstance.get("/members/birthdays-this-week");
  return response.data;
  
};

export const getTotalMembers = async () => {
  const response = await axiosInstance.get("/members/total-members");
  return response.data;
};
export const getNewMembers = async () => {
  const response = await axiosInstance.get("/members/new-members");
  return response.data;
};