import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit } from 'lucide-react';
import LoadingSpinner from "./LoadingSpinner";


const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    profileImage: "",
    phoneNumber: "",
    localAssemblyName: "",
    status: "",
    roleName: "",
  });

  const [deleteModal, setDeleteModal] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://churchsoft-backend.onrender.com/church-soft/v1.0/users/all?page=0&size=10"
      );

      const usersData = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data?.content)
        ? res.data.data.content
        : Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data?.content)
        ? res.data.content
        : [];

      // ✅ Ensure full image URL if only filename/path is returned
      const formattedUsers = usersData.map((u) => ({
        ...u,
        profileImage: u.profileImage
          ? u.profileImage.startsWith("http")
            ? u.profileImage
            : `https://churchsoft-backend.onrender.com/church-soft/v1.0/files/${u.profileImage}`
          : null,
      }));

      setUsers(formattedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load user details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    // ✅ Auto refresh every 10 seconds
    const interval = setInterval(() => {
      fetchUsers();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Handle Delete
  const handleDelete = (user) => {
    setDeleteModal(user);
  };

  const confirmDelete = async (id) => {
    try {
      await axios.delete(
        `https://churchsoft-backend.onrender.com/church-soft/v1.0/users/${id}`
      );
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setDeleteModal(null);
      setDeleteSuccess(true);
      setTimeout(() => setDeleteSuccess(false), 2000);
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user.");
    }
  };

  // Handle Edit Click
  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setFormData({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      phoneNumber: user.phoneNumber,
      localAssemblyName: user.localAssemblyName,
      status: user.status,
      roleName: user.roleName,
    });
  };

  // Handle Form Change
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Update
  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://churchsoft-backend.onrender.com/church-soft/v1.0/users`,
        formData
      );
      setEditingUser(null);
      fetchUsers();
      setEditSuccess(true);
      setTimeout(() => setEditSuccess(false), 2000);
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to update user.");
    }
  };

  if (loading)
    return (
  <div className="h-screen flex items-center justify-center bg-gray-100">
    <LoadingSpinner text="users loading  wait..." />
  </div>
);

  if (error)
    return (
      <div className="p-4 text-center text-red-500 font-semibold">{error}</div>
    );

  return (
    <div className="p-4 -m-8 mt-3 min-w-full ">
      <h2 className="text-2xl font-bold mb-4 text-center">Users Table</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-400">Profile</th>
              <th className="px-2 py-2 border border-gray-400">First Name</th>
              <th className="px-4 py-2 border border-gray-400">Last Name</th>
              <th className="px-4 py-2 border border-gray-400">Username</th>
              <th className="border border-gray-400">Email</th>
              <th className="px-4 py-2 border border-gray-400">Phone</th>
              <th className="px-4 py-2 border border-gray-400">Local Assembly</th>
              <th className="px-2 py-2 border border-gray-400">Status</th>
              <th className="px-2 py-2 border border-gray-400">Role</th>
              <th className="px-4 py-2 border border-gray-400 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="11"
                  className="px-4 py-3 text-center text-gray-500 border border-gray-400"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="profile"
                        className="w-10 h-10 rounded-full mx-auto object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-2 border border-gray-400">{user.firstName}</td>
                  <td className="px-4 py-2 border border-gray-400">{user.lastName}</td>
                  <td className="px-4 py-2 border border-gray-400">{user.username}</td>
                  <td className="px-1 py-2 border border-gray-400">{user.email}</td>
                  <td className="px-4 py-2 border border-gray-400">{user.phoneNumber}</td>
                  <td className="px-4 py-2 border border-gray-400">
                    {user.localAssemblyName}
                  </td>
                  <td
                    className={`px-2 py-2 border border-gray-400 font-semibold ${
                      user.status === "ACTIVE"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {user.status}
                  </td>
                  <td className="px-2 py-2 border border-gray-400">{user.roleName}</td>
                  <td className="px-2 py-2 border border-gray-400 text-center space-x-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-blue-500 text-white m-1 px-1 py-1 rounded hover:bg-blue-600"
                    >
                          <Edit className="w-5 h-5"/> 
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-600"
                    >
                          <Trash2 className="w-5 h-5"/>

                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Edit User
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                placeholder="First Name"
                className="w-full border border-gray-100 p-2 rounded"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                placeholder="Last Name"
                className="w-full border border-gray-100 p-2 rounded"
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleFormChange}
                placeholder="Username"
                className="w-full border border-gray-100 p-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="Email"
                className="w-full border border-gray-100 p-2 rounded"
              />
              <input
                type="text"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleFormChange}
                placeholder="Profile Image URL"
                className="w-full border border-gray-100 p-2 rounded"
              />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleFormChange}
                placeholder="Phone Number"
                className="w-full border border-gray-100 p-2 rounded"
              />
              <input
                type="text"
                name="localAssemblyName"
                value={formData.localAssemblyName}
                onChange={handleFormChange}
                placeholder="Local Assembly"
                className="w-full border border-gray-100 p-2 rounded"
              />
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                placeholder="Status"
                className="w-full border border-gray-100 p-2 rounded"
              />
              <input
                type="text"
                name="roleName"
                value={formData.roleName}
                onChange={handleFormChange}
                placeholder="Role Name"
                className="w-full border border-gray-100 p-2 rounded"
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete{" "}
              <span className="font-bold text-red-600">
                {deleteModal.firstName} {deleteModal.lastName}
              </span>
              ?
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => confirmDelete(deleteModal.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteModal(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Modal */}
      {deleteSuccess && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md">
          Delete successful
        </div>
      )}

      {/* Edit Success Modal */}
      {editSuccess && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md">
          You have successfully edited a user
        </div>
      )}
    </div>
  );
};

export default UsersTable;
