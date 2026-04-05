import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as countrySetupService from "../../api/services/countrySetupService";
import { STATIC_QUERY_CONFIG } from "../constants/queryConfig.js";

/**
 * Fetch all countries
 */
export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await countrySetupService.fetchCountries();
      return res?.data || res?.content || res || [];
    },
    ...STATIC_QUERY_CONFIG,
  });
};

/**
 * Fetch all hierarchies
 */
export const useAllHierarchies = (options = {}) => {
  return useQuery({
    queryKey: ["hierarchies"],
    queryFn: async () => {
      const res = await countrySetupService.fetchAllHierarchies();
      return res?.data || res?.content || res || [];
    },
    ...STATIC_QUERY_CONFIG,
    ...options,
  });
};

/**
 * Fetch hierarchy by country name
 */
export const useHierarchyByCountry = (countryName, enabled = true) => {
  return useQuery({
    queryKey: ["hierarchy", countryName],
    queryFn: async () => {
      const res =
        await countrySetupService.fetchHierarchyByCountry(countryName);
      return res?.data || res?.content || res || [];
    },
    enabled: !!countryName && enabled,
    ...STATIC_QUERY_CONFIG,
  });
};

/**
 * Fetch parents by country
 */
export const useParentsByCountry = (countryName, enabled = true) => {
  return useQuery({
    queryKey: ["parents", countryName],
    queryFn: async () => {
      const res =
        await countrySetupService.fetchParentsByCountry(countryName);
      return res?.data || res?.content || res || [];
    },
    enabled: !!countryName && enabled,
    ...STATIC_QUERY_CONFIG,
  });
};

/**
 * Fetch children by parent
 */
export const useChildrenByParent = (parentName, enabled = true) => {
  return useQuery({
    queryKey: ["children", parentName],
    queryFn: async () => {
      const res =
        await countrySetupService.fetchChildrenByParent(parentName);
      return res?.data || res?.content || res || [];
    },
    enabled: !!parentName && enabled,
    ...STATIC_QUERY_CONFIG,
  });
};

/**
 * Fetch grandchildren by child
 */
export const useGrandChildrenByChild = (childName, enabled = true) => {
  return useQuery({
    queryKey: ["grandchildren", childName],
    queryFn: async () => {
      const res =
        await countrySetupService.fetchGrandChildrenByChild(childName);
      return res?.data || res?.content || res || [];
    },
    enabled: !!childName && enabled,
    ...STATIC_QUERY_CONFIG,
  });
};

// =====================================
// MUTATION HOOKS (POST/PUT/DELETE OPERATIONS)
// =====================================

/**
 * Create or update country
 */
export const useCreateOrUpdateCountry = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: countrySetupService.createOrUpdateCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      queryClient.invalidateQueries({ queryKey: ["hierarchies"] });
    },
  });

  const createOrUpdate = (payload) => {
    return mutation.mutate(payload);
  };

  return {
    createOrUpdate,
    ...mutation,
  };
};

/**
 * Delete country by name
 */
export const useDeleteCountry = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: countrySetupService.deleteCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      queryClient.invalidateQueries({ queryKey: ["hierarchies"] });
    },
  });

  const deleteCountryByName = (countryName) => {
    return mutation.mutate(countryName);
  };

  return {
    deleteCountryByName,
    ...mutation,
  };
};

/**
 * Delete country by ID
 */
export const useDeleteCountryById = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: countrySetupService.deleteCountryBYId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      queryClient.invalidateQueries({ queryKey: ["hierarchies"] });
    },
  });

  const deleteById = (id) => {
    return mutation.mutate(id);
  };

  return {
    deleteById,
    ...mutation,
  };
};

/**
 * Import countries from CSV file
 */
export const useImportCountryCsv = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: countrySetupService.importCountryCsv,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      queryClient.invalidateQueries({ queryKey: ["hierarchies"] });
    },
  });

  const importCsv = (file) => {
    return mutation.mutate(file);
  };

  return {
    importCsv,
    ...mutation,
  };
};

// =====================================
// COMBINED HOOK (ALL OPERATIONS)
// =====================================

/**
 * Combined hook providing all country setup operations
 * Usage: const { queries, mutations } = useCountrySetupAll();
 */
export const useCountrySetupAll = () => {
  const queryClient = useQueryClient();

  // Query hooks
  const countriesQuery = useCountries();
  const hierarchiesQuery = useAllHierarchies();

  // Mutation hooks
  const createOrUpdateMutation = useMutation({
    mutationFn: countrySetupService.createOrUpdateCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      queryClient.invalidateQueries({ queryKey: ["hierarchies"] });
    },
  });

  const deleteCountryMutation = useMutation({
    mutationFn: countrySetupService.deleteCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      queryClient.invalidateQueries({ queryKey: ["hierarchies"] });
    },
  });

  const deleteCountryByIdMutation = useMutation({
    mutationFn: countrySetupService.deleteCountryBYId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      queryClient.invalidateQueries({ queryKey: ["hierarchies"] });
    },
  });

  const importCsvMutation = useMutation({
    mutationFn: countrySetupService.importCountryCsv,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      queryClient.invalidateQueries({ queryKey: ["hierarchies"] });
    },
  });

  return {
    // Queries
    queries: {
      countries: countriesQuery,
      hierarchies: hierarchiesQuery,
    },
    // Mutations
    mutations: {
      createOrUpdate: (payload) => createOrUpdateMutation.mutate(payload),
      deleteByName: (countryName) => deleteCountryMutation.mutate(countryName),
      deleteById: (id) => deleteCountryByIdMutation.mutate(id),
      importCsv: (file) => importCsvMutation.mutate(file),
    },
    // Mutation states
    createOrUpdateState: createOrUpdateMutation,
    deleteCountryState: deleteCountryMutation,
    deleteByIdState: deleteCountryByIdMutation,
    importCsvState: importCsvMutation,
  };
};
