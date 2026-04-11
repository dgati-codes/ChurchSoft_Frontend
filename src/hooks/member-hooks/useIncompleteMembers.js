import { useQuery } from "@tanstack/react-query";
import { getIncompleteMembers } from "../../api/services/memberService";

export const useIncompleteMembers = (userId, options = {}) => {
  return useQuery({
    queryKey: ["incompleteMembers", userId],

    queryFn: async () => {
      if (!userId) return [];
      return await getIncompleteMembers(userId);
    },

    enabled: !!userId,

    // PERFORMANCE + UX (Production Ready Config)
    staleTime: 1000 * 60 * 5, // 5 mins (avoid refetch spam)
    cacheTime: 1000 * 60 * 10, // keep cache for 10 mins

    keepPreviousData: true, // smooth UI pagination/refetch

    retry: 2, // retry failed requests twice

    ...options, // allow override when needed
  });
};
