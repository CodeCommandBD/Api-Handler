import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSkeleton from "./ProfileSkeleton";
import { toast } from "react-toastify";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import { useProfile } from "../hooks/useProfile";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("view");
  const navigate = useNavigate();

  // Use TanStack Query hook
  const { data, isLoading, isError, error } = useProfile();

  // Handle errors
  if (isError) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch profile data";
    toast.error(errorMessage);
  }

  const user = data?.user;

  if (isLoading) {
    return <ProfileSkeleton></ProfileSkeleton>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No user data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="bg-white rounded-t-2xl shadow-xl border border-gray-100">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("view")}
              className={`flex-1 py-4 px-6 font-semibold ${
                activeTab === "view"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              View Profile
            </button>
            <button
              onClick={() => setActiveTab("update")}
              className={`flex-1 py-4 px-6 font-semibold ${
                activeTab === "update"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Update Profile
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`flex-1 py-4 px-6 font-semibold ${
                activeTab === "password"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Change Password
            </button>
            <button
              onClick={() => setActiveTab("delete")}
              className={`flex-1 py-4 px-6 font-semibold ${
                activeTab === "delete"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-2xl shadow-xl p-8 border-x border-b border-gray-100">
          {activeTab === "view" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Username
                  </label>
                  <p className="text-lg text-gray-900">{user.username}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-lg text-gray-900">{user.email}</p>
                </div>
              </div>

              {/* View All Users Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => navigate("/users")}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  View All Users
                </button>
              </div>
            </div>
          )}

          {activeTab === "update" && (
            <UpdateProfile
              currentUser={user}
              onTabChange={() => setActiveTab("view")}
            />
          )}

          {activeTab === "password" && <ChangePassword />}

          {activeTab === "delete" && <DeleteAccount />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
