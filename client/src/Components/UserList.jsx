import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUsers } from "../hooks/useUsers";

const UserList = () => {
  // Use TanStack Query hook
  const { data, isLoading, isError } = useUsers();

  // Handle errors
  if (isError) {
    toast.error("Failed to fetch users");
  }

  const users = data?.users || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">All Users</h1>

          <div className="grid gap-4">
            {users.map((user) => (
              <Link
                key={user._id}
                to={`/users/${user._id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user.username}
                    </h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {users.length === 0 && (
            <p className="text-center text-gray-600">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
