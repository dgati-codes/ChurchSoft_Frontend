import { useQuery } from "@tanstack/react-query";
import { getCountries,getJurisdictions, getDistricts, getAssemblies } from "../../api/services/locationService.js";

export const useCountries = () =>
  useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    staleTime: 1000 * 60 * 60, 
  });

export const useJurisdictions = (countryId) =>
  useQuery({
    queryKey: ["jurisdictions", countryId],
    queryFn: () => getJurisdictions(countryId),
    enabled: !!countryId,
  });

  export const useDistricts = (jurisdictionId) =>
  useQuery({
    queryKey: ["districts", jurisdictionId],
    queryFn: () => getDistricts(jurisdictionId),
    enabled: !!jurisdictionId,
  });

  export const useAssemblies = (districtId) =>
  useQuery({
    queryKey: ["assemblies", districtId],
    queryFn: () => getAssemblies(districtId),
    enabled: !!districtId,
  });