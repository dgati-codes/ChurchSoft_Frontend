import { useQuery } from "@tanstack/react-query";
import UserService from "../../api/services/userService";

const PAGE_SIZE = 10;

const useGetUsers = (page, filters, debouncedSearch) => {
  const isSearching = debouncedSearch.trim().length > 0;
  const hasAssembly = filters.localAssemblyName !== "";

  let queryKey;
  if (isSearching) {
    queryKey = ["users", "search", page, debouncedSearch];
  } else if (hasAssembly) {
    queryKey = ["users", "assembly", page, filters.localAssemblyName];
  } else {
    queryKey = ["users", "all", page];
  }

  const query = useQuery({
    queryKey,
    queryFn: () => {
      if (isSearching) {
        return UserService.searchUsers(page, PAGE_SIZE, debouncedSearch);
      }

      if (hasAssembly) {
        return UserService.getUsersByAssembly(
          page,
          PAGE_SIZE,
          filters.localAssemblyName
        );
      }

      return UserService.getAllUsers(page, PAGE_SIZE, filters);
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 30, // 30 min
  });

  // Explicitly return refetch along with other query info
  return {
    ...query,
    refetch: query.refetch,
  };
};

export default useGetUsers;