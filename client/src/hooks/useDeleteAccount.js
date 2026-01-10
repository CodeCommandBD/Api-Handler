import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteAccount } from "../lib/apiService";

/**
 * Custom hook for deleting user account (DELETE) with Optimistic Updates
 * @returns {Object} Mutation result with mutate, isPending, isError, error
 */
export const useDeleteAccount = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccount,

    // ✨ Optimistic Update - Instant feedback
    onMutate: async () => {
      // Show instant feedback to user
      toast.info("Deleting account...", { autoClose: 1000 });
    },

    // ✅ Success - Account deleted successfully
    onSuccess: (data) => {
      toast.success(data.message || "Account deleted successfully");
      
      // Clear all caches
      queryClient.clear();
      
      // Remove token and navigate to register
      localStorage.removeItem("token");
      navigate("/register");
    },

    // ❌ Error - Failed to delete
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete account";
      toast.error(errorMessage);
    },
  });
};
