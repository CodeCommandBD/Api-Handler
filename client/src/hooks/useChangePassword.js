import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { changePassword } from "../lib/apiService";

/**
 * Custom hook for changing user password (PATCH) with Optimistic Updates
 * @returns {Object} Mutation result with mutate, isPending, isError, error
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,

    // ✨ Optimistic Update - Instant feedback
    onMutate: async () => {
      // Show instant feedback to user
      toast.info("Changing password...", { autoClose: 1000 });
    },

    // ✅ Success - Password changed successfully
    onSuccess: (data) => {
      toast.success(data.message || "Password changed successfully");
    },

    // ❌ Error - Failed to change password
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to change password";
      toast.error(errorMessage);
    },
  });
};
