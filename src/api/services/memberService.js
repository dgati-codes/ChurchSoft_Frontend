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
        // console.log("User is not registered as a member.");
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
 
};

export default memberService;

export const getIncompleteMembers = async (userId) => {
  const response = await axiosInstance.get(
    `/members/incomplete?createdBy=${userId}`
  );
// console.log(response.data); 
  return response.data;
};

export const getMemberByMemberId = async (id) => {
  const response = await axiosInstance.get(`/members/${id}`);
  return response.data;
};



// Advanced Queue System

const MAX_CONCURRENT = 3; // allow 3 parallel requests
let activeRequests = 0;

const queue = [];

// 🔥 Process Queue
const processQueue = () => {
  // Run while we have capacity
  while (activeRequests < MAX_CONCURRENT && queue.length > 0) {
    const { data, resolve, reject } = queue.shift();

    activeRequests++;

    axiosInstance
      .post("/members", data, {
        timeout: 10000, // timeout protection (10s)
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        activeRequests--;
        processQueue(); // keep draining queue
      });
  }
};

// Public function used by hook
export const createMemberQueued = (data) => {
  return new Promise((resolve, reject) => {
    queue.push({ data, resolve, reject });
    processQueue();
  });
};


// Fetch jurisdictions distribution by country
export const getJurisdictionsDistribution = async (country) => {
  if (!country) {
    throw new Error("Country is required"); // Input validation
  }

  const response = await axiosInstance.get(
    `/members/summary/distribution/${country}`
  );

  return response.data;
};

export const getNationalitySummaryByCountry = async (country) => {
  const response = await axiosInstance.get(
    `/members/summary/nationality/${country}`
  );
  return response.data;
};