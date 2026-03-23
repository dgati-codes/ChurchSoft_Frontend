import { useMutation, useQueryClient } from "@tanstack/react-query";
import memberService from "../../api/services/memberService";

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: memberService.deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });

  const deleteMember = (id) => mutation.mutate(id);

  return { deleteMember, ...mutation };
};