// hooks/useHierarchy.js
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

export const useHierarchy = ({ nationality, region, district }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hierarchy"],
    queryFn: async () => {
      const res = await axiosInstance.get("/country-setup/hierarchy");
      return res.data; // raw backend data
    },
    staleTime: 1000 * 60 * 10,
  });

  // 🔹 All nationalities exactly as backend
  const nationalities = data || [];

  // 🔹 Selected nationality object
  const selectedNationality = nationalities.find(
    (c) => c.countryName === nationality
  );

  // 🔹 Regions exactly as backend
  const regions = selectedNationality?.parents || [];

  // 🔹 Districts exactly as backend
  const districts =
    regions.find((r) => r.parentName === region)?.children || [];

  // 🔹 Assemblies exactly as backend
  const assemblies =
    districts.find((d) => d.childName === district)?.grandChildren || [];

  return {
    nationalities,
    regions,
    districts,
    assemblies,
    isLoading,
    error,
  };
};