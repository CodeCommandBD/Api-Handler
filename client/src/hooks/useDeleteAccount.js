import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteAccount } from "../lib/apiService";

/**
 * Custom hook for deleting user account (DELETE)
 * @returns {Object} Mutation result with mutate, isPending, isError, error
 */
export const useDeleteAccount = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      toast.success(data.message || "Account deleted successfully");
      // Clear token and navigate to register
      localStorage.removeItem("token");
      navigate("/register");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete account";
      toast.error(errorMessage);
    },
  });
};
