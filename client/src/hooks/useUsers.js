import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../lib/apiService";

/**
 * Custom hook to fetch all users
 * @returns {Object} Query result with data, isLoading, isError, error
 */
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
