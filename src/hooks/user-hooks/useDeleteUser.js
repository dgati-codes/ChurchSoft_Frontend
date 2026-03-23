import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserService from "../../api/services/userService";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export default useDeleteUser;