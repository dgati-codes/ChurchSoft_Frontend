import { useMutation, useQueryClient } from "@tanstack/react-query";
import memberService from "../../api/services/memberService";

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, payload }) => memberService.updateMember(id, payload),
    onSuccess: (_, { payload }) => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });

  const updateMember = (payload) => {
    const finalPayload = {
      ...payload,
      preferredLanguages: Array.isArray(payload.preferredLanguages)
        ? payload.preferredLanguages
        : [payload.preferredLanguages].filter(Boolean),
      ministries: payload.ministries || [],
      skillsTalents: payload.skillsTalents || [],
      spiritualGifts: payload.spiritualGifts || [],
      nextOfKin: payload.nextOfKin || { name: "", relationship: "", contactInformation: "" },
      consentForCommunication: payload.consentForCommunication ?? false,
      whatsappAvailable: payload.whatsappAvailable ?? false,
      hasHealthIssues: payload.hasHealthIssues ?? false,
    };

    mutation.mutate({ id: finalPayload.id, payload: finalPayload });
  };

  return { updateMember, ...mutation };
};