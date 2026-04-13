import { useQuery } from "@tanstack/react-query";
import {
  getBirthdaysThisWeek,
  getNewMembers,
  getTotalMembers,
} from "../../api/services/dashboardService";
import { getAgeDistribution } from "../../api/services/dashboardService";

export const useDashboardData = () => {
  const totalMembersQuery = useQuery({
    queryKey: ["total-members"],
    queryFn: getTotalMembers,
  });

  const newMembersQuery = useQuery({
    queryKey: ["new-members"],
    queryFn: getNewMembers,
  });

  const birthdaysQuery = useQuery({
    queryKey: ["birthdays-this-week"],
    queryFn: getBirthdaysThisWeek,
  });

  return {
    totalMembers: totalMembersQuery.data,

    newMembers: newMembersQuery.data?.content || newMembersQuery.data || [],

    birthdays: birthdaysQuery.data?.content || birthdaysQuery.data || [],

    isLoading:
      totalMembersQuery.isLoading ||
      newMembersQuery.isLoading ||
      birthdaysQuery.isLoading,

    isError:
      totalMembersQuery.isError ||
      newMembersQuery.isError ||
      birthdaysQuery.isError,

    refetchBirthdays: birthdaysQuery.refetch,
  };
};


export const useAgeDistribution = (country, options = {}) => {
  return useQuery({
    queryKey: ["age-distribution", country],
    queryFn: () => getAgeDistribution(country),
    enabled: !!country, // prevents call if no country
    ...options,
  });
};
