import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../lib/apiService";

/**
 * Custom hook to fetch user details by ID
 * @param {string} id - User ID
 * @returns {Object} Query result with data, isLoading, isError, error
 */
export const useUserDetails = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id, // Only run query if ID exists
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
