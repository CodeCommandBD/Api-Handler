import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { changePassword } from "../lib/apiService";

/**
 * Custom hook for changing user password (PATCH)
 * @returns {Object} Mutation result with mutate, isPending, isError, error
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data.message || "Password changed successfully");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to change password";
      toast.error(errorMessage);
    },
  });
};
