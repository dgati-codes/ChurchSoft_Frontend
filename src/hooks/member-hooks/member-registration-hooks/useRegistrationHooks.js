// hooks/useLocationHooks.js
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys"; // centralized query key constants
import {
  getCountries,
  getJurisdictions,
  getDistricts,
  getAssemblies,
} from "../../../api/services/hierarchy.js";

const DEFAULT_STALE_TIME = 1000 * 60 * 30; // 30 minutes

export const useCountries = () =>
  useQuery({
    queryKey: queryKeys.countries,
    queryFn: getCountries,
    staleTime: DEFAULT_STALE_TIME,
  });

export const useJurisdictions = (countryName) =>
  useQuery({
    queryKey: queryKeys.jurisdictions(countryName),
    queryFn: () => getJurisdictions(countryName),
    enabled: !!countryName,
    staleTime: DEFAULT_STALE_TIME,
  });

export const useDistricts = (jurisdictionName) =>
  useQuery({
    queryKey: queryKeys.districts(jurisdictionName),
    queryFn: () => getDistricts(jurisdictionName),
    enabled: !!jurisdictionName,
    staleTime: DEFAULT_STALE_TIME,
  });

export const useAssemblies = (districtName) =>
  useQuery({
    queryKey: queryKeys.assemblies(districtName),
    queryFn: () => getAssemblies(districtName),
    enabled: !!districtName,
    staleTime: DEFAULT_STALE_TIME,
  });