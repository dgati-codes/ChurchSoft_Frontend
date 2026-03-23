import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserService from "../../api/services/userService.js";


const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export default useUpdateUser;