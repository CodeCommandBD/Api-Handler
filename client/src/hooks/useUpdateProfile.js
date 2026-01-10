import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateProfile } from "../lib/apiService";

/**
 * Custom hook for updating user profile (PUT)
 * @returns {Object} Mutation result with mutate, isPending, isError, error
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated successfully");
      // Invalidate and refetch profile query
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update profile";
      toast.error(errorMessage);
    },
  });
};
