import { useQuery } from "@tanstack/react-query";
import { getJurisdictionsDistribution } from "../../api/services/memberService";

export const useJurisdictionsDistribution = (
  country,
  options = {}
) => {
  return useQuery({
    queryKey: ["jurisdictions-distribution", country],

    // Prevent invalid API calls
    enabled: !!country,

    // Safe query function
    queryFn: () => getJurisdictionsDistribution(country),

    //  Caching strategy (good for dashboard data)
    staleTime: 1000 * 60 * 5,

    // Data Transformation Layer
    select: (data) => {
      const list = data?.jurisdictionsDistribution || [];

      // TECHNICAL: Data Sanitization + Filtering
      return list.filter((item) => item?.jurisdiction);
    },

    ...options,
  });
};