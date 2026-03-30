import { useQuery } from "@tanstack/react-query";
import {getAssembliesByCountry} from "../api/services/memberService.js";

const fetchAssembliesByCountry = async (country) => {
  const { data } = await getAssembliesByCountry(country);
  return data;
};

export const useAssembliesByCountry = (country) => {
  return useQuery({
    queryKey: ["assemblies-by-country", country],
    queryFn: () => fetchAssembliesByCountry(country),
    enabled: !!country, 
  });
  
};