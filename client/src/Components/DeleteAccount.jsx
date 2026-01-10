import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteAccountSchema } from "../lib/formSchema";
import { useDeleteAccount } from "../hooks/useDeleteAccount";

const DeleteAccount = () => {
  const [showModal, setShowModal] = useState(false);

  // Use TanStack Query mutation hook
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(deleteAccountSchema),
  });

  const onSubmit = (data) => {
    deleteAccount(data, {
      onSettled: () => {
        setShowModal(false);
        reset();
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Delete Account</h2>
      <p className="text-gray-600 mb-4">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700"
      >
        Delete Account
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Confirm Account Deletion
            </h3>
            <p className="text-gray-600 mb-4">
              This action cannot be undone. Please enter your password to
              confirm.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    reset();
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
                >
                  {isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
