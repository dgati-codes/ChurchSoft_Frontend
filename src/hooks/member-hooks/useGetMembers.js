import { useQuery } from "@tanstack/react-query";
import memberService from "../../api/services/memberService";

const PAGE_SIZE = 10;

export const useGetMembers = (currentPage, debouncedSearch, filter) => {
  const query = useQuery({
    queryKey: [
      "members",
      currentPage,
      debouncedSearch,
      filter.ministry,
      filter.assembly,
    ],
    queryFn: () => {
      if (debouncedSearch) {
        return memberService.searchMembers(currentPage, PAGE_SIZE, debouncedSearch);
      }
      if (filter.ministry) {
        return memberService.getMembersByMinistry(filter.ministry, currentPage, PAGE_SIZE);
      }
      return memberService.getAllMembers(currentPage, PAGE_SIZE);
    },
    keepPreviousData: true, // optional: keeps old data while fetching new page
  });

  // expose refetch along with other query states
  return {
    ...query,  // includes data, isLoading, isError, error
    refetch: query.refetch, // you can call this manually
  };
};