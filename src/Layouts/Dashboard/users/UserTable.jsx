import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import useDeleteUser from "../../../hooks/user-hooks/useDeleteUser.js";
import useGetUsers from "../../../hooks/user-hooks/useGetUsers.js";
import useUpdateUser from "../../../hooks/user-hooks/useUpdateUser.js";
import DeleteModal from "../modals/DeleteModal.jsx";
import LoadingSpinner from "../modals/LoadingSpinner.jsx";
import SuccessModal from "../modals/successModal.jsx";
import EditUserModal from "./EditUser.jsx";

const PAGE_SIZE = 10;

const UserTable = () => {
  /* ===================== STATE ===================== */
  const [page, setPage] = useState(0);

  const [filters, setFilters] = useState({
    localAssemblyName: "",
    search: "",
  });

  const debouncedSearch = useDebounce(filters.search, 300);
  const [successModal, setSuccessModal] = useState(null);
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
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const { data, isFetching, refetch } = useGetUsers(
    page,
    filters,
    debouncedSearch,
  );

  /* ===================== NORMALIZED DATA ===================== */
  const users = Array.isArray(data?.content)
    ? data.content
    : Array.isArray(data)
      ? data
      : [];

  const totalPages = data?.totalPages || 1;
  const totalElements = data?.totalElements || 0;
  /* ===================== HANDLERS ===================== */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setPage(0);
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const capitalize = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setFormData({ ...user });
  };

  const handleUpdate = async () => {
    try {
      await updateUserMutation.mutateAsync(formData);

      setEditingUser(null);

      setSuccessModal({
        name: `${formData.firstName} ${formData.lastName}`,
        action: "updated",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = (user) =>
    setDeleteModal({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
    });

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const confirmDelete = async () => {
    try {
      await deleteUserMutation.mutateAsync(deleteModal.id);

      setDeleteModal(null);

      setSuccessModal({
        name: deleteModal.name,
        action: "deleted",
      });
    } catch (error) {
      console.error(error);
    }
  };

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
        <div className="flex justify-end gap-5 min-w-full">
          <input
            name="localAssemblyName"
            value={filters.localAssemblyName}
            onChange={handleFilterChange}
            placeholder="Search by Assembly"
            className="border w-70 rounded-lg px-3 py-2 text-sm bg-gray-50"
          />
          <input
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by name or ID"
            className="border w-70 rounded-lg px-3 py-2 text-sm bg-gray-50"
          />
        </div>
      </div>
      {/* USERS TABLE */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-semibold mb-4">Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="border border-gray-500 px-3 py-2">UserId </th>
                <th className="border border-gray-500 px-3 py-2">Full Name</th>
                <th className="border border-gray-500 px-3 py-2">Email</th>
                <th className="border border-gray-500 px-3 py-2">Phone</th>
                <th className="border border-gray-500 px-3 py-2">Assembly</th>
                <th className="border border-gray-500 px-3 py-2">Status</th>
                <th className="border border-gray-500 px-3 py-2">Role</th>
                <th className="border border-gray-500 px-3 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isFetching ? (
                <tr>
                  <td colSpan="100%" className="  text-clip">
                    <LoadingSpinner text="Loading Users..." />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan="100%"
                    className="py-10 text-center  text-gray-500"
                  >
                    No User found.{" "}
                    <span
                      onClick={refetch}
                      className="text-blue-600 text-lg cursor-pointer"
                    >
                      Try Again
                    </span>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">
                      {user.id}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {capitalize(user.firstName)} {capitalize(user.lastName)}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {user.email}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {user.phoneNumber}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {capitalize(user.localAssemblyName)}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs text-white ${
                          user.status === "ACTIVE"
                            ? "bg-green-600"
                            : user.status === "INACTIVE"
                              ? "bg-gray-500"
                              : "bg-red-500"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="border border-gray-300 text-xs px-3 py-2">
                      {user.roleName}
                    </td>
                    <td className="border border-gray-300 p-2 text-center space-x-2">
                      <Edit
                        className="inline w-4 h-4 cursor-pointer"
                        onClick={() => handleEditClick(user)}
                      />
                      <Trash2
                        className="inline w-4 h-4 text-red-500 cursor-pointer"
                        onClick={() => handleDeleteUser(user)}
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
      </div>

      {/* Edit Modal */}
      <EditUserModal
        editingUser={editingUser}
        formData={formData}
        handleFormChange={handleFormChange}
        handleUpdate={handleUpdate}
        setEditingUser={setEditingUser}
      />
      <DeleteModal
        item={deleteModal}
        onCancel={() => setDeleteModal(null)}
        onConfirm={confirmDelete}
      />

      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      />
    </div>
  );
};

export default UserTable;

/* ===================== UserImage ===================== */
const UserImage = ({ imageId }) => {
  const src = imageId
    ? `https://churchsoft-backend.onrender.com/church-soft/v1.0/images/${imageId}`
    : "/avatar-placeholder.png";

  return (
    <img
      src={src}
      className="w-8 h-8 rounded-full object-cover mx-auto"
      alt="profile"
    />
  );
};
