import { useQuery } from "@tanstack/react-query";
import { getNationalitySummaryByCountry } from "../../api/services/memberService";

export const useNationalitySummaryByCountry = (
  country,
  options = {}
) => {
  return useQuery({
    queryKey: ["nationality-summary", country],

    queryFn: () => getNationalitySummaryByCountry(country),

    enabled: !!country,

    staleTime: 5 * 60 * 1000, // cache for 5 mins

    ...options,
  });
};