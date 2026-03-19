// hooks/useHierarchy.js
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const formatName = (name) =>
  name?.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export const useHierarchy = ({ country, region, district }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hierarchy"],
    queryFn: async () => {
      const res = await axiosInstance.get("/country-setup/hierarchy");
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  // 🔹 Countries
  const countries = data || [];

  // 🔹 Selected country
  const selectedCountry = countries.find(
    (c) => c.countryName === country
  );

  // 🔹 Regions
  const regions =
    selectedCountry?.parents?.filter(
      (r) => r.parentName && r.parentName.trim() !== ""
    ) || [];

  // 🔹 Districts
  const districts =
    regions.find((r) => r.parentName === region)?.children || [];

  // 🔹 Assemblies
  const assemblies =
    districts.find((d) => d.childName === district)
      ?.grandChildren || [];

  return {
    countries,
    regions,
    districts,
    assemblies,
    isLoading,
    error,
    formatName,
  };
};