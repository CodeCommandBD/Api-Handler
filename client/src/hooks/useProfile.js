import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../lib/apiService";

/**
 * Custom hook to fetch user profile
 * @returns {Object} Query result with data, isLoading, isError, error
 */
export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
