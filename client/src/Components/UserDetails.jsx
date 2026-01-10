import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserDetails } from "../hooks/useUserDetails";

const UserDetails = () => {
  const { id } = useParams(); // ← Dynamic parameter from URL!
  const navigate = useNavigate();

  // Use TanStack Query hook
  const { data, isLoading, isError, error } = useUserDetails(id);

  // Handle errors
  if (isError) {
    toast.error("Failed to fetch user details");
    navigate("/users");
    return null;
  }

  const user = data?.user;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/users")}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-700"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Users
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            {user.username}
          </h1>
          <p className="text-center text-gray-600 mb-8">{user.email}</p>

          <div className="space-y-4">
            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                User Information
              </h2>

              <div className="grid gap-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">User ID:</span>
                  <span className="font-mono text-sm text-gray-900">
                    {user._id}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Username:</span>
                  <span className="font-semibold text-gray-900">
                    {user.username}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold text-gray-900">
                    {user.email}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Account Created:</span>
                  <span className="text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
