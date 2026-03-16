import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import memberService from "../../../api/services/memberService";
import { useAuth } from "../../../context/AuthContext.jsx";
import DeleteModal from "../modals/DeleteModal";
import LoadingSpinner from "../modals/LoadingSpinner";
import SuccessModal from "../modals/successModal.jsx";
import EditMemberModal from "./EditMember";
import MemberFullView from "./MemberFullView";
export default function MemberTable() {
  const [filter, setFilter] = useState({
    jurisdiction: "",
    district: "",
    maritalStatus: "",
    ministry: "",
    assembly: "",
    gender: "",
    nationality: "",
    ageGroup: "",
    search: "",
  });
  const [showDashboard, setShowDashboard] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  // const [deletingMember, setDeletingMember] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [successModal, setSuccessModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const queryClient = useQueryClient();
  const { isAdmin } = useAuth();
  const pageSize = 10;

  const { data: membersData, isLoading } = useQuery({
    queryKey: [
      "members",
      currentPage,
      debouncedSearch,
      filter.ministry,
      filter.assembly,
    ],

    queryFn: () => {
      if (debouncedSearch) {
        return memberService.searchMembers(
          currentPage,
          pageSize,
          debouncedSearch,
        );
      }

      if (filter.ministry) {
        return memberService.getMembersByMinistry(
          filter.ministry,
          currentPage,
          pageSize,
        );
      }

      return memberService.getAllMembers(currentPage, pageSize);
    },

    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
    refetchInterval: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchName.trim());
      setCurrentPage(0);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchName]);

  const members = membersData?.content ?? [];
  const totalPages = membersData?.totalPages ?? 0;
  const totalElements = membersData?.totalElements ?? 0;

  const sortedMembers = [...members].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  // const capitalizeFullName = (name = "") =>
  //   name
  //     .trim()
  //     .split(/\s+/)
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //     .join(" ");

  //      const capitalize = (str = "") =>
  //     str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const handleDeleteMember = (member) =>
    setDeleteModal({
      id: member.id,
      name: member.fullName,
    });
  const deleteMutation = useMutation({
    mutationFn: memberService.deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });

  const confirmDelete = (id) => {
    setDeleteModal(null);
    deleteMutation.mutate(id);
  };

  // 1️⃣ Mutation to update member
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => memberService.updateMember(id, payload),
    onSuccess: (_, { payload }) => {
      // Refresh the members list
      queryClient.invalidateQueries({ queryKey: ["members"] });

      // Show success modal
      setSuccessModal({ name: payload.fullName, action: "updated" });

      // Close edit modal
      setEditingMember(null);
    },
  });

  // 2️⃣ Save edited member
  const saveEdit = (payload) => {
    // Ensure arrays and nested objects exist
    const finalPayload = {
      ...payload,
      preferredLanguages: Array.isArray(payload.preferredLanguages)
        ? payload.preferredLanguages
        : [payload.preferredLanguages].filter(Boolean),
      ministries: payload.ministries || [],
      skillsTalents: payload.skillsTalents || [],
      spiritualGifts: payload.spiritualGifts || [],
      nextOfKin: payload.nextOfKin || {
        name: "",
        relationship: "",
        contactInformation: "",
      },
      consentForCommunication: payload.consentForCommunication ?? false,
      whatsappAvailable: payload.whatsappAvailable ?? false,
      hasHealthIssues: payload.hasHealthIssues ?? false,
    };

    updateMutation.mutate({ id: finalPayload.id, payload: finalPayload });
  };
  if (showDashboard)
    return <MemberFullView onBack={() => setShowDashboard(false)} />;

  return (
    <div className="w-240 mt-9 font-[DM Sans] bg-gray-100  ">
      {/* Header */}
      <div className="mb-6 display flex justify-center text-center">
        <div>
          <h2 className="text-xl font-semibold">
            Member Registration - Table View
          </h2>
          <p className="text-gray-600">
            Manage and view member registrations with advanced filtering and
            search
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Region</label>
          <input
            type="text"
            placeholder="Search by region"
            value={filter.jurisdiction}
            onChange={(e) => {
              setFilter({ ...filter, jurisdiction: e.target.value });
              setCurrentPage(0);
            }}
            className="input"
          />
        </div>
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
            // value={filter.assembly}
            // onChange={(e) => {
            //   setFilter({ ...filter, assembly: e.target.value });
            //   setCurrentPage(0);
            // }}
            className="input"
          >
            <option value="">All </option>
            <option value="PEACE_TEMPLE">PEACE Temple</option>
            <option value="TEMA">TEMA</option>
            <option value="BONOU_N">BONOU_N</option>
            <option value="	GALILEY"> GALILEY</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Age Group</label>
          <input
            type="text"
            placeholder="Search by gender"
            value={filter.gender}
            onChange={(e) => {
              setFilter({ ...filter, gender: e.target.value });
              setCurrentPage(0);
            }}
            className="input"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1" htmlFor="">
            All Ministries
          </label>
          <select
            value={filter.ministry}
            onChange={(e) => {
              setFilter({ ...filter, ministry: e.target.value });
              setCurrentPage(0);
            }}
            className="input"
          >
            <option value="">All </option>
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

      <div className="rounded-xl overflow-hidden shadow-md border p-5 bg-white border-gray-200">
        <div className="flex justify-between items-center p-3 ">
          <h1 className="ml-5 text-xl font-semibold">Filters</h1>
          <div className=" bg-blue-700 flex items-center justify-center rounded-md">
            <button
              onClick={() => setShowDashboard(true)}
              className="text-white cursor-pointer p-1  font-medium text-lg  text-center"
            >
              View Details
            </button>
            <ChevronRight className="text-white text-center ml-2" />
          </div>
        </div>

        <div className="overflow-x-auto shadow-lg ">
          <table className="w-full min-w-125 text-sm  whitespace-nowrap ">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="border px-3 py-2">Full Name</th>
                <th className="border px-3 py-2">Gender</th>
                <th className="border px-3 py-2">Date of Birth</th>
                <th className="border px-3 py-2">Marital Status</th>
                <th className="border px-3 py-2">Nationality</th>
                <th className="border px-3 py-2">Region</th>
                <th className="border px-3 py-2">Language</th>
                <th className="border px-3 py-2">District</th>
                <th className="border px-3 py-2">Local Assembly</th>
                <th className="border px-3 py-2">Ethnicity</th>
                <th className="border px-3 py-2">Email</th>
                <th className="border px-3 py-2">Contact Info</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="100%" className="  text-clip">
                    <LoadingSpinner text="Loading members..." />
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td
                    colSpan="100%"
                    className="py-10 text-center text-xl text-gray-500"
                  >
                    No members found.
                  </td>
                </tr>
              ) : (
                sortedMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{m.fullName}</td>
                    <td className="border px-3 py-2">{m.gender}</td>
                    <td className="border px-3 py-2">{m.dateOfBirth}</td>
                    <td className="border px-3 py-2">{m.maritalStatus}</td>
                    <td className="border px-3 py-2">{m.nationality}</td>
                    <td className="border px-3 py-2">{m.jurisdiction}</td>
                    <td className="border px-3 py-2">{m.preferredLanguages}</td>
                    <td className="border px-3 py-2">{m.district}</td>
                    <td className="border px-3 py-2">{m.assembly}</td>
                    <td className="border px-3 py-2">{m.ethnicity}</td>
                    <td className="border px-3 py-2">{m.email}</td>
                    <td className="border px-3 py-2">{m.phoneNumber}</td>

                    <td className="border px-3 py-2">
                      <span
                        className={`px-1 py-1 rounded text-white ${
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
                        {m.status}
                      </span>
                    </td>

                    <td className="p-2 border whitespace-nowrap">
                      <div className="flex space-x-2">
                        {!isAdmin() && (
                          <>
                            <button
                              onClick={() => setEditingMember(m)}
                              className=" ml-4 hover:cursor-pointer"
                            >
                              <Eye className="w-5 h-5 " />
                            </button>
                          </>
                        )}

                        {isAdmin() && (
                          <>
                            <button
                              onClick={() => setEditingMember(m)}
                              className="  hover:cursor-pointer"
                            >
                              <Edit className="w-4 h-4 " />
                            </button>
                          </>
                        )}

                        {isAdmin() && (
                          <>
                            <button
                              onClick={() => handleDeleteMember(m)}
                              className="text-red-500 hover:cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}

          <div className="flex items-center justify-center gap-6 m-6 text-sm text-gray-600">
            <span>
              Page {currentPage + 1} of {totalPages} ({totalElements} members)
            </span>
            <div className="flex items-center gap-2">
              <ChevronsLeft
                onClick={() => setCurrentPage(0)}
                className="w-4 h-4 cursor-pointer"
              />
              <ChevronLeft
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                className="w-4 h-4 cursor-pointer"
              />
              <ChevronRight
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages - 1))
                }
                className="w-4 h-4 cursor-pointer"
              />
              <ChevronsRight
                onClick={() => setCurrentPage(totalPages - 1)}
                className="w-4 h-4 cursor-pointer"
              />
            </div>
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
