import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as countrySetupService from "../../api/services/countrySetupService";

// =====================================
// QUERY HOOKS (GET OPERATIONS)
// =====================================

/**
 * Fetch all countries
 */
export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: countrySetupService.fetchCountries,
  });
};

/**
 * Fetch all hierarchies
 */
export const useAllHierarchies = (options = {}) => {
  return useQuery({
    queryKey: ["hierarchies"],
    queryFn: countrySetupService.fetchAllHierarchies,
    ...options,
  });
};

/**
 * Fetch hierarchy by country name
 */
export const useHierarchyByCountry = (countryName, enabled = true) => {
  return useQuery({
    queryKey: ["hierarchy", countryName],
    queryFn: () => countrySetupService.fetchHierarchyByCountry(countryName),
    enabled: !!countryName && enabled,
  });
};

/**
 * Fetch parents by country
 */
export const useParentsByCountry = (countryName, enabled = true) => {
  return useQuery({
    queryKey: ["parents", countryName],
    queryFn: () => countrySetupService.fetchParentsByCountry(countryName),
    enabled: !!countryName && enabled,
  });
};

/**
 * Fetch children by parent
 */
export const useChildrenByParent = (parentName, enabled = true) => {
  return useQuery({
    queryKey: ["children", parentName],
    queryFn: () => countrySetupService.fetchChildrenByParent(parentName),
    enabled: !!parentName && enabled,
  });
};

/**
 * Fetch grandchildren by child
 */
export const useGrandChildrenByChild = (childName, enabled = true) => {
  return useQuery({
    queryKey: ["grandchildren", childName],
    queryFn: () => countrySetupService.fetchGrandChildrenByChild(childName),
    enabled: !!childName && enabled,
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
