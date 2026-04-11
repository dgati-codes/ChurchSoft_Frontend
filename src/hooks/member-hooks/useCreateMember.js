import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMemberQueued } from "../../api/services/memberService";

export const useCreateMember = ({
  country,
  assembly,
  ...options
} = {}) => {
  const queryClient = useQueryClient();

  const queryKey = ["members", country, assembly];

  return useMutation({
    mutationFn: createMemberQueued,

    onMutate: async (newMember) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      // Temporary ID to track optimistic item
      const optimisticMember = {
        ...newMember,
        id: `temp-${Date.now()}`,
        __optimistic: true,
      };

      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: [optimisticMember, ...(oldData.data || [])],
        };
      });

      return { previousData, optimisticId: optimisticMember.id };
    },

    onError: (error, _newMember, context) => {
      console.error("Create Member Error:", error);

      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }

      options.onError?.(error);
    },

    onSuccess: (serverData, _newMember, context) => {
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: (oldData.data || []).map((item) =>
            item.id === context.optimisticId ? serverData : item
          ),
        };
      });

      options.onSuccess?.(serverData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
        refetchType: "active",
      });
    },

    retry: (failureCount, error) => {
      if (error?.response?.status === 429) return failureCount < 5;
      if (error?.code === "ECONNABORTED") return failureCount < 3;
      if (!error?.response) return failureCount < 3;

      return false;
    },

    retryDelay: (attempt, error) => {
      if (error?.response?.status === 429) {
        return Math.min(2000 * 2 ** attempt, 10000);
      }

      return Math.min(1000 * 2 ** attempt, 5000);
    },

    ...options,
  });
};