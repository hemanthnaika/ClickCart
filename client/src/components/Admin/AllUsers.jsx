import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { X } from "lucide-react"; // Close icon

const fetchUsers = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/users`,
    { withCredentials: true }
  );
  return data.data;
};

const deleteUser = async (userId) => {
  await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/v1/users/delete/${userId}`,
    { withCredentials: true }
  );
};

const AllUsers = () => {
  const queryClient = useQueryClient();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setShowConfirm(false);
      setSelectedUser(null);
    },
  });

  const openConfirmModal = (user) => {
    setSelectedUser(user);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      mutation.mutate(selectedUser._id);
    }
  };

  if (isLoading)
    return <p className="text-center mt-10 text-gray-600">Loading users...</p>;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        All Users
      </h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Orders</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-50 transition-all"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      user.isAdmin
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </td>
                <td className="p-3 text-center">{user.orderCount || 0}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => openConfirmModal(user)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-red-600">
                Confirm Deletion
              </h2>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <strong>{selectedUser?.name}</strong>? This action is permanent.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={mutation.isLoading}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                {mutation.isLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
