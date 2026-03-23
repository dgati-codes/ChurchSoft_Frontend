import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserService from "../../api/services/userService";
import {
  uploadImage,
  assignImageToUser,
} from "../../api/services/userImageService";

const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      let imageId = null;

      // ✅ Upload image if exists
      if (formData.image) {
        const uploadedImage = await uploadImage(formData.image);
        imageId = uploadedImage?.id;
      }

      // ✅ Remove image before sending
      const payload = { ...formData, image: undefined };

      // ✅ Create user
      const user = await UserService.registerUser(payload);

      const userId = user?.id;

      // ✅ Assign image if both exist
      if (userId && imageId) {
        await assignImageToUser(userId, imageId);
      }

      return user; // ✅ return created user
    },

    onSuccess: () => {
      // ✅ refresh users table automatically
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export default useAddUser;