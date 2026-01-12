import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import UserService from "../../api/userService";

const PAGE_SIZE = 10;

const UserTable = () => {
  /* ===================== STATE ===================== */
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({
    country: "Ghana",
    region: "ALL",
    ageGroup: "ALL",
    search: "",
  });

  const [editingUser, setEditingUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    localAssemblyName: "",
    status: "",
    roleName: "",
  });
  const queryClient = useQueryClient();

  /* ===================== DATA FETCH ===================== */
  const { data, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["users", page, filters],
    queryFn: () => UserService.getAllUsers(page, PAGE_SIZE, filters),
    keepPreviousData: true,
    staleTime: 0,
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
  });

  const users = Array.isArray(data?.content)
    ? data.content
    : Array.isArray(data)
    ? data
    : [];

  const totalPages = data?.totalPages || 1;
  const totalElements = data?.totalElements || 0;

  /* ===================== HANDLERS ===================== */
  const handleFilterChange = (e) => {
    setPage(0);
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setFormData({ ...user });
  };

  const handleUpdate = async () => {
    await UserService.updateUser(formData);
    setEditingUser(null);
    queryClient.invalidateQueries(["users"]);
  };

  const handleDelete = (user) => setDeleteModal(user);
  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const confirmDelete = async () => {
    await UserService.deleteUser(deleteModal.id);
    setDeleteModal(null);
    queryClient.invalidateQueries(["users"]);
  };

  /* ===================== ERROR ===================== */
  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        {error?.message || "Failed to load users"}
      </div>
    );
  }

  /* ===================== UI ===================== */
  return (
    <div className="mt-8 w-full font-[DM_Sans] text-gray-800">
      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-semibold">View Users</h1>
        <p className="text-sm text-gray-500">
          Manage and view users with advanced filtering and search
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h3 className="text-sm font-semibold mb-4">Filters</h3>

        <div className="grid grid-cols-4 gap-4">
          <select
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            className="border rounded-lg px-3 py-2 text-sm bg-gray-50"
          >
            <option value="Ghana">Ghana</option>
          </select>

          <select
            name="region"
            value={filters.region}
            onChange={handleFilterChange}
            className="border rounded-lg px-3 py-2 text-sm bg-gray-50"
          >
            <option value="ALL">All Regions</option>
          </select>

          <select
            name="ageGroup"
            value={filters.ageGroup}
            onChange={handleFilterChange}
            className="border rounded-lg px-3 py-2 text-sm bg-gray-50"
          >
            <option value="ALL">All Age Groups</option>
          </select>

          <input
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by name or ID"
            className="border rounded-lg px-3 py-2 text-sm bg-gray-50"
          />
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-semibold mb-4">Users</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse ">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="border px-3 py-2">User ID</th>
                <th className="border px-3 py-2">Full Name</th>
                <th className="border px-3 py-2">Email</th>
                <th className="border px-3 py-2">Phone</th>
                <th className="border px-3 py-2">Assembly</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Role</th>
                <th className="border px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 border">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{user.id}</td>
                    <td className="border px-3 py-2">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="border px-3 py-2">{user.email}</td>
                    <td className="border px-3 py-2">{user.phoneNumber}</td>
                    <td className="border px-3 py-2">
                      {user.localAssemblyName}
                    </td>
                    <td className="border px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          user.status === "ACTIVE"
                            ? "bg-green-600"
                            : "bg-red-500"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="border px-3 py-2">{user.roleName}</td>
                    <td className="border p-2 text-center space-x-2">
                      <Edit
                        className="inline w-4 h-4 text-blue-500 cursor-pointer"
                        onClick={() => handleEditClick(user)}
                      />
                      <Trash2
                        className="inline w-4 h-4 text-red-500 cursor-pointer"
                        onClick={() => handleDelete(user)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-600">
          <span>
            Page {page + 1} of {totalPages} ({totalElements} users)
          </span>

          <div className="flex items-center gap-2">
            <ChevronsLeft
              onClick={() => setPage(0)}
              className="w-4 h-4 cursor-pointer"
            />
            <ChevronLeft
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              className="w-4 h-4 cursor-pointer"
            />
            <ChevronRight
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              className="w-4 h-4 cursor-pointer"
            />
            <ChevronsRight
              onClick={() => setPage(totalPages - 1)}
              className="w-4 h-4 cursor-pointer"
            />
          </div>
        </div>

        {/* BACKGROUND FETCH */}
        {isFetching && (
          <p className="text-xs text-center text-gray-400 mt-2">
            Updating data...
          </p>
        )}
      </div>

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

      {/* ================= DELETE MODAL ================= */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 text-center">
            <p className="mb-4 font-semibold">
              Delete {deleteModal.firstName} {deleteModal.lastName}?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => confirmDelete(deleteModal.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModal(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
