import { useMutation, useQueryClient } from "@tanstack/react-query";
import memberService from "../../api/services/memberService";

export const useCreateMember = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: memberService.createMember,

    //  Optimistic Update
    onMutate: async (newMember) => {
      await queryClient.cancelQueries({ queryKey: ["members"] });

      const previousMembers = queryClient.getQueryData(["members"]);

      queryClient.setQueryData(["members"], (old = []) => [
        {
          ...newMember,
          id: Date.now(), // temporary ID
          isOptimistic: true,
        },
        ...old,
      ]);

      return { previousMembers };
    },

    // error handling
    onError: (error, newMember, context) => {
      if (context?.previousMembers) {
        queryClient.setQueryData(["members"], context.previousMembers);
      }

      console.error("Create Member Error:", error);

      if (options.onError) {
        options.onError(error);
      }
    },

    onSuccess: (data) => {
      queryClient.setQueryData(["members"], (old = []) =>
        old.map((member) =>
          member.isOptimistic && member.fullName === data.fullName
            ? data
            : member,
        ),
      );

      if (options.onSuccess) {
        options.onSuccess(data);
      }
    },

    // 🔄 Final sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },

    ...options,
  });
};
