import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../lib/apiService";

/**
 * Custom hook for user login (POST)
 * @returns {Object} Mutation result with mutate, isPending, isError, error
 */
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      toast.success(data.message || "Login Successful");
      navigate("/profile");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please check your credentials";
      toast.error(errorMessage);
    },
  });
};
