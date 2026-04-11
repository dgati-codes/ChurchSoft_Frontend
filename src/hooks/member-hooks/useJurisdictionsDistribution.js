import { useQuery } from "@tanstack/react-query";
import { getJurisdictionsDistribution } from "../../api/services/memberService";

export const useJurisdictionsDistribution = (country, options = {}) => {
  return useQuery({
    queryKey: ["jurisdictions-distribution", country],

    queryFn: () => getJurisdictionsDistribution(country),

    enabled: !!country, 

    staleTime: 1000 * 60 * 5, 

    select: (data) => {
      // Data transformation layer (important concept)
      const list = data?.jurisdictionsDistribution || [];

      return list.filter((item) => item.jurisdiction); 
      
    },

    ...options,
  });
};