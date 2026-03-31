import { useQuery } from "@tanstack/react-query";
import { getMinistryLeadersByAssembly } from "../api/services/dashboardService.js";


export const useMinistryLeadersByAssembly = (assembly) => {

  return useQuery({
    queryKey: ["leaders", assembly],
    queryFn: async () => {

      const formattedAssembly = encodeURIComponent(assembly);

      const { data } =
        await getMinistryLeadersByAssembly(formattedAssembly);

      return data?.data || data;
    },
    enabled: !!assembly,
    staleTime: 0,
    refetchOnMount: true,
  });
};