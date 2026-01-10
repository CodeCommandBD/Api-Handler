import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateProfile } from "../lib/apiService";

/**
 * Custom hook for updating user profile (PUT) with Optimistic Updates
 * @returns {Object} Mutation result with mutate, isPending, isError, error
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    // ✨ Optimistic Update - UI instantly update হবে
    onMutate: async (newProfileData) => {
      // 1. Cancel any outgoing refetches (যাতে optimistic update overwrite না হয়)
      await queryClient.cancelQueries({ queryKey: ["profile"] });

      // 2. Snapshot the previous value (rollback এর জন্য)
      const previousProfile = queryClient.getQueryData(["profile"]);

      // 3. Optimistically update to the new value
      queryClient.setQueryData(["profile"], (old) => {
        if (!old) return old;
        return {
          ...old,
          user: {
            ...old.user,
            ...newProfileData, // নতুন data দিয়ে update
          },
        };
      });

      // 4. Return context with previous value (rollback এর জন্য)
      return { previousProfile };
    },

    // ✅ Success - Server confirm করেছে
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated successfully");
    },

    // ❌ Error - Rollback করতে হবে
    onError: (error, newProfileData, context) => {
      // Rollback to previous value
      if (context?.previousProfile) {
        queryClient.setQueryData(["profile"], context.previousProfile);
      }

      const errorMessage =
        error.response?.data?.message || "Failed to update profile";
      toast.error(errorMessage);
    },

    // 🔄 Settled - Success/Error যাই হোক, final sync
    onSettled: () => {
      // Refetch to ensure we have the latest data from server
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
