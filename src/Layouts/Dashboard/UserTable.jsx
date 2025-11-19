import React, { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import UserService from "../../api/userService";   // import service

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

  // Load cache
  const loadCachedUsers = () => {
    const cached = localStorage.getItem("users_cache");
    if (cached) return JSON.parse(cached);
    return null;
  };

  // Fetch via UserService
  const fetchUsers = async () => {
    try {
      const usersData = await UserService.getAllUsers();

      setUsers(usersData);

      localStorage.setItem("users_cache", JSON.stringify(usersData));
      localStorage.setItem("users_cache_time", Date.now());
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load user details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedUsers = loadCachedUsers();
    const cacheTime = localStorage.getItem("users_cache_time");

    if (cachedUsers && cacheTime) {
      const age = Date.now() - Number(cacheTime);
      if (age < 900000) {
        setUsers(cachedUsers);
        setLoading(false);
        return;
      }
    }

    fetchUsers();
    const interval = setInterval(fetchUsers, 900000);
    return () => clearInterval(interval);
  }, []);

  // DELETE (uses service)
  const handleDelete = (user) => {
  setDeleteModal(user);
};
  const confirmDelete = async (id) => {
    try {
      await UserService.deleteUser(id);

      setUsers((prev) => prev.filter((u) => u.id !== id));
      setDeleteModal(null);
      setDeleteSuccess(true);

      setTimeout(() => setDeleteSuccess(false), 2000);
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user.");
    }
  };

  // EDIT modal open
  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setFormData({ ...user });
  };

  // UPDATE (uses service)
  const handleUpdate = async () => {
    try {
      await UserService.updateUser(formData);

      setEditingUser(null);
      fetchUsers();
      setEditSuccess(true);

      setTimeout(() => setEditSuccess(false), 2000);
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to update user.");
    }
  };

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner text="Users loading  wait..." />
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  return (
    <div className="p-4 -m-8 mt-3  font-[Poppins] min-w-full ">
      <h2 className="text-2xl font-bold mb-4 text-center">Users Table</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              {/* <th className="px-4 py-2 border border-gray-400">Profile</th> */}
              <th className=" border border-gray-400">First Name</th>
              <th className=" border border-gray-400">Last Name</th>
              <th className=" border border-gray-400">Username</th>
              <th className=" border border-gray-400">Email</th>
              <th className=" border border-gray-400">Phone</th>
              <th className=" border border-gray-400">Local Assembly</th>
              <th className=" border border-gray-400">Status</th>
              <th className=" border border-gray-400">Role</th>
              <th className=" border border-gray-400 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="11"
                  className=" text-center text-gray-500 border border-gray-400"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="text-[13px] text-gray-700 hover:bg-gray-50">
                  <td className=" p-2 border  border-gray-400">{user.firstName}</td>
                  <td className=" p-2 border  border-gray-400">{user.lastName}</td>
                  <td className=" p-2 border  border-gray-400">{user.username}</td>
                  <td className=" p-2 border  border-gray-400">{user.email}</td>
                  <td className=" p-2 border  border-gray-400">{user.phoneNumber}</td>
                  <td className=" p-2 border  border-gray-400">
                    {user.localAssemblyName}
                  </td>
                  <td className=" p-2 border border-gray-400">{user.roleName}</td>
                  <td className=" p-2 border border-gray-400">              
                    <span
                    className={`px-1 py-1 rounded text-white  ${
                      user.status === "ACTIVE"
                        ? "bg-green-600"                     
                        : user.status === "INACTIVE"
                        ? "bg-red-400"
                        : "bg-gray-500"
                    }`}
                  >
                    {user.status}
                  </span>
                  </td>
                  
                  <td className="p-4 border border-gray-400 text-center space-x-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-blue-500  rounded hover:cursor-pointer"
                    >
                          <Edit className="w-5 h-5"/> 
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className=" text-red-500  rounded hover:cursor-pointer "
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
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
    <div className="bg-white rounded-lg p-6 w-96 text-center shadow-lg">
      <h2 className="text-xl font-semibold mb-2 text-green-600">Update Successful</h2>
      <p className="mb-4">
        <span className="font-medium">{editSuccess.fullName}</span> has been successfully updated.
      </p>
      <button
        onClick={() => setEditSuccess(null)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </div>
)}


      
    </div>
  );
};

export default UsersTable;
