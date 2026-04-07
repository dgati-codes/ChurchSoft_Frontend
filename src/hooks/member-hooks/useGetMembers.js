import { useQuery } from "@tanstack/react-query";
import memberService from "../../api/services/memberService";
import { DYNAMIC_QUERY_CONFIG } from "../constants/queryConfig.js";

const PAGE_SIZE = 10;

export const useGetMembers = (currentPage, debouncedSearch, filter = {}) => {
  return useQuery({
    queryKey: [
      "members",
      currentPage,
      debouncedSearch || "",
      filter?.ministry || "",
      filter?.assembly || "",
    ],
    queryFn: () => {
      if (debouncedSearch) {
        return memberService.searchMembers(currentPage, PAGE_SIZE, debouncedSearch);
      }
      if (filter?.ministry) {
        return memberService.getMembersByMinistry(
          filter.ministry,
          currentPage,
          PAGE_SIZE
        );
      }
      if (filter?.assembly) {
        return memberService.getMembersByAssembly(
          filter.assembly,
          currentPage,
          PAGE_SIZE
        );
      }
      return memberService.getAllMembers(currentPage, PAGE_SIZE);
    },
    keepPreviousData: true,
    ...DYNAMIC_QUERY_CONFIG,
  });
};