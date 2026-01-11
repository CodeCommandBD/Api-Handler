import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../lib/apiService";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

/**
 * Custom hook for user login (POST)
 * @returns {Object} Mutation result with mutate, isPending, isError, error
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store token in localStorage and Redux
      if (data.token) {
        dispatch(login(data.token));
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
