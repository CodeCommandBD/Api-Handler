import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../lib/apiService";

/**
 * Custom hook for user registration (POST)
 * @returns {Object} Mutation result with mutate, isPending, isError, error
 */
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful");
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed. Please try again";
      toast.error(errorMessage);
    },
  });
};
