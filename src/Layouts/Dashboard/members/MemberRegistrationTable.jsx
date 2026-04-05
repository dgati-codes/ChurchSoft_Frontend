import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  Eye,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useAssembliesByCountry } from "../../../hooks/country-hook/useAssembliesByCountry.js";
import { useDeleteMember } from "../../../hooks/member-hooks/useDeleteMember.js";
import { useGetMembers } from "../../../hooks/member-hooks/useGetMembers.js";
import { useUpdateMember } from "../../../hooks/member-hooks/useUpdateMember.js";
import DeleteModal from "../modals/DeleteModal";
import LoadingSpinner from "../modals/LoadingSpinner";
import SuccessModal from "../modals/successModal.jsx";
import EditMemberModal from "./EditMember";
import MemberFullView from "./MemberFullView";

export default function MemberTable() {
  const [filter, setFilter] = useState({ ministry: "", assembly: "" });
  const [showDashboard, setShowDashboard] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [successModal, setSuccessModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { isAdmin } = useAuth();
  const pageSize = 10;

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchName.trim());
      setCurrentPage(0);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchName]);

  // Hooks
  const {
    data: membersData,
    isLoading,
    refetch,
  } = useGetMembers(currentPage, debouncedSearch, filter);
  const { deleteMember } = useDeleteMember();
  const { updateMember } = useUpdateMember();

  const members = membersData?.content ?? [];
  const totalPages = membersData?.totalPages ?? 0;
  const totalElements = membersData?.totalElements ?? 0;

  const sortedMembers = [...members].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const handleDeleteMember = (member) =>
    setDeleteModal({ id: member.id, name: member.fullName });
  const confirmDelete = (id) => {
    setDeleteModal(null);
    deleteMember(id);
  };
  const saveEdit = (payload) => {
    updateMember(payload);
    setSuccessModal({ name: payload.fullName, action: "updated" });
    setEditingMember(null);
  };

  const { member } = useAuth();
  const country = member?.nationality;
  const {
    data: assemblies,
  } = useAssembliesByCountry(country);

  
  const toTitleCase = (value) => {
    if (!value && value !== 0) return "";
    if (Array.isArray(value)) {
      return value.map((item) => toTitleCase(item)).join(", ");
    }
    const text = `${value}`.trim().toLowerCase();
    return text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatMemberValue = (value) => {
    if (!value && value !== 0) return "";
    if (Array.isArray(value)) return toTitleCase(value);
    return toTitleCase(value);
  };

  if (showDashboard)
    return <MemberFullView onBack={() => setShowDashboard(false)} />;

  return (
    <div className=" font-[DM_Sans] bg-gray-100 mt-10 ">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">
            Member Registration - Table View
          </h2>
          <p className="text-gray-600 text-sm mt-0.5">
            Manage and view member registrations with advanced filtering and
            search
          </p>
        </div>
        <button
          onClick={() => setShowDashboard(true)}
          className="inline-flex items-center gap-1 bg-blue-700 hover:bg-blue-800
                     text-white text-sm font-medium px-4 py-2 rounded-md cursor-pointer
                     transition-colors duration-150 shrink-0"
        >
          View Details
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filters */}
      <div
        className="bg-white border border-gray-300 shadow-md rounded-xl p-5 mb-6
                      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">District</label>
          <input
            type="text"
            placeholder="Search by district"
            value={filter.district}
            onChange={(e) => {
              setFilter({ ...filter, district: e.target.value });
              setCurrentPage(0);
            }}
            className="input"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Local Assembly</label>
          <select
            value={filter.assembly}
            onChange={(e) => {
              setFilter({ ...filter, assembly: e.target.value });
              setCurrentPage(0);
            }}
            className="input"
          >
            <option value="">Select Assembly</option>
            {assemblies?.map((assembly) => (
              <option key={assembly.id} value={assembly}>
                {assembly}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">All Ministries</label>
          <select
            value={filter.ministry}
            onChange={(e) => {
              setFilter({ ...filter, ministry: e.target.value });
              setCurrentPage(0);
            }}
            className="input"
          >
            <option value="">All</option>
            <option value="MEN">MEN</option>
            <option value="WOMEN">WOMEN</option>
            <option value="SENIOR_YOUTH">SENIOR_YOUTH</option>
            <option value="JUNIOR_YOUTH">JUNIOR_YOUTH</option>
            <option value="CHILDREN">CHILDREN</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              setCurrentPage(0);
            }}
            className="input"
          />
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-gray-200 shadow-md bg-white">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold">Members</h1>
            {!isLoading && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                {totalElements}
              </span>
            )}
          </div>
          {!isLoading && totalElements > 0 && (
            <p className="text-xs text-gray-400">
              Showing {currentPage * pageSize + 1}–
              {Math.min((currentPage + 1) * pageSize, totalElements)} of{" "}
              {totalElements}
            </p>
          )}
        </div>

        <div className="overflow-x-auto ">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold whitespace-normal">
                  Full Name
                </th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold whitespace-normal">
                  District
                </th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold whitespace-normal">
                  Local Assembly
                </th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold whitespace-normal">
                  Language
                </th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold whitespace-normal">
                  Email
                </th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold whitespace-normal">
                  Contact Info
                </th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold">
                  Status
                </th>
                <th
                  className="border border-gray-400 px-4 py-3 text-left font-semibold sticky right-0 bg-gray-50 z-20"
                  style={{ boxShadow: "-3px 0 6px -2px rgba(0,0,0,0.08)" }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="11" className="py-10 text-center">
                    <LoadingSpinner text="Loading members..." />
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan="11" className="py-10 text-center text-gray-500">
                    No member found.
                    <span
                      className="text-blue-600 ml-2 cursor-pointer"
                      onClick={refetch}
                    >
                      Try Again
                    </span>
                  </td>
                </tr>
              ) : (
                sortedMembers.map((m) => (
                  <tr
                    key={m.id}
                    className="hover:bg-gray-50 border border-gray-200 last:border-0"
                  >
                    <td className="px-3 py-2 border border-gray-200 font-medium text-black whitespace-nowrap">
                      {formatMemberValue(m.fullName)}
                    </td>
                    <td className="px-3 py-2 border border-gray-200 text-gray-600 text-sx whitespace-normal">
                      {formatMemberValue(m.district)}
                    </td>
                    <td className="px-3 py-2 border border-gray-200 text-gray-600 whitespace-normal">
                      {formatMemberValue(m.assembly)}
                    </td>
                    <td className="px-3 py-2 border border-gray-200 text-gray-600 whitespace-normal">
                      {formatMemberValue(m.preferredLanguages)}
                    </td>
                    <td className="px-3 py-2 border border-gray-200 text-gray-600 text-xs truncate whitespace-normal">
                      {formatMemberValue(m.email)}
                    </td>
                    <td className="px-3 py-2 border border-gray-200 text-gray-600">
                      {formatMemberValue(m.phoneNumber)}
                    </td>
                    <td className="px-3 py-2 border border-gray-200">
                      <span
                        className={`px-2 py-0.5 rounded text-white text-xs font-medium ${
                          m.status === "ACTIVE"
                            ? "bg-green-600"
                            : m.status === "VISITOR"
                              ? "bg-blue-600"
                              : m.status === "INACTIVE"
                                ? "bg-red-400"
                                : m.status === "SUSPENDED"
                                  ? "bg-yellow-500"
                                  : "bg-gray-500"
                        }`}
                      >
                        {formatMemberValue(m.status)}
                      </span>
                    </td>
                    <td
                      className="px-3 py-2 border border-gray-200 sticky right-0 bg-white z-10"
                      style={{ boxShadow: "-3px 0 6px -2px rgba(0,0,0,0.06)" }}
                    >
                      <div className="flex items-center space-x-1">
                        {!isAdmin() && (
                          <button
                            onClick={() => setEditingMember(m)}
                            className="p-1 m-auto rounded hover:bg-gray-200 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {isAdmin() && (
                          <button
                            onClick={() => setEditingMember(m)}
                            className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {isAdmin() && (
                          <button
                            onClick={() => handleDeleteMember(m)}
                            className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 border-t border-gray-100">
          <span className="text-sm text-gray-600">
            Page {currentPage + 1} of {totalPages} ({totalElements} members)
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(0)}
              disabled={currentPage === 0}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-200
                         text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
              disabled={currentPage === 0}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-200
                         text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages - 1))
              }
              disabled={currentPage >= totalPages - 1}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-200
                         text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages - 1)}
              disabled={currentPage >= totalPages - 1}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-200
                         text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {editingMember && (
        <EditMemberModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={saveEdit}
        />
      )}
      {deleteModal && (
        <DeleteModal
          item={deleteModal}
          onCancel={() => setDeleteModal(null)}
          onConfirm={confirmDelete}
        />
      )}
      {successModal && (
        <SuccessModal
          successModal={successModal}
          setSuccessModal={setSuccessModal}
        />
      )}
    </div>
  );
}
