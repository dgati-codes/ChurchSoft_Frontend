import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import memberService from "../../api/memberService";
import { Trash2, Edit, MoveRight } from "lucide-react";
import MemberFullView from "./MemberFullView";
import LoadingSpinner from "./LoadingSpinner";
import EditMemberModal from "./EditMemberModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function MemberTable() {
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState({
    jurisdiction: "All",
    district: "All",
    maritalStatus: "All",
    assembly: "All",
    gender: "All",
    nationality: "All",
    search: "",
  });

  const [showDashboard, setShowDashboard] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);
  const [successModal, setSuccessModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const { data: members = [], isLoading, isError } = useQuery({
    queryKey: ["members"],
    queryFn: memberService.getAllMembers,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  const sortedMembers = useMemo(() => [...members].sort((a, b) => b.id - a.id), [members]);

  const filteredMembers = useMemo(() => {
    return sortedMembers.filter((m) => {
      return (
        (filter.jurisdiction === "All" || m.jurisdiction === filter.jurisdiction) &&
        (filter.maritalStatus === "All" || m.maritalStatus === filter.maritalStatus) &&
        (filter.district === "All" || m.district === filter.district) &&
        (filter.assembly === "All" || m.assembly === filter.assembly) &&
        (filter.gender === "All" || m.gender === filter.gender) &&
        (filter.nationality === "All" || m.nationality === filter.nationality) &&
        (filter.search === "" ||
          m.fullName?.toLowerCase().includes(filter.search.toLowerCase()) ||
          m.memberId?.toLowerCase().includes(filter.search.toLowerCase()))
      );
    });
  }, [filter, sortedMembers]);

  const totalPages = Math.ceil(filteredMembers.length / pageSize);
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMembers.slice(start, start + pageSize);
  }, [currentPage, filteredMembers]);

  const deleteMutation = useMutation({
    mutationFn: memberService.deleteMember,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["members"], (old) => old.filter((m) => m.id !== id));
      const deleted = members.find((m) => m.id === id);
      setSuccessModal({ fullName: deleted?.fullName, action: "deleted" });
      setDeletingMember(null);
    },
  });

  const confirmDelete = (member) => {
    if (!member) return;
    deleteMutation.mutate(member.id);
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => memberService.updateMember(id, payload),
    onSuccess: (_, { id, payload }) => {
      queryClient.setQueryData(["members"], (old) =>
        old.map((m) => (m.id === id ? { ...m, ...payload } : m))
      );
      setSuccessModal({ fullName: payload.fullName, action: "updated" });
      setEditingMember(null);
    },
  });

  const saveEdit = (member) => {
    const payload = {
      id: member.id,
      memberId: member.memberId,
      fullName: member.fullName,
      dateOfBirth: member.dateOfBirth,
      gender: member.gender,
      maritalStatus: member.maritalStatus,
      hometown: member.hometown,
      nationality: member.nationality,
      assembly: member.assembly,
      jurisdiction: member.jurisdiction,
      preferredLanguages: member.preferredLanguages,
      district: member.district,
      ethnicity: member.ethnicity,
      email: member.email,
      phoneNumber: member.phoneNumber,
      status: member.status,
    };
    updateMutation.mutate({ id: member.id, payload });
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner text="Members loading..." />
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Failed to load members.
      </div>
    );

  if (showDashboard) return <MemberFullView onBack={() => setShowDashboard(false)} />;

  return (
    <div className="w-[960px] font-[DM Sans] bg-gray-100 py-10 ">
      {/* Header */}
      <div className="mb-6 display flex justify-center text-center">
        <div>
          <h2 className="text-xl font-semibold">Member Registration - Table View</h2>
        <p className="text-gray-600">
          Manage and view member registrations with advanced filtering and search
        </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
        {[
          { label: "Region", key: "jurisdiction", options: ["All", "NORTHERN", "EST", "CENTRAL", "WEST", "SOUTH", "GREATER_ACCRA", "VOLTA"] },
          { label: "District", key: "district", options: ["All", "North District", "Ga District", "Volta1 District"] },
          { label: "Assembly", key: "assembly", options: ["All", "Breakthrough Assembly", "Legon Assembly", "Marranatha Assembly"] },
          { label: "Gender", key: "gender", options: ["All", "MALE", "FEMALE"] },
          { label: "Marital Status", key: "maritalStatus", options: ["All", "SINGLE", "MARRIED", "DIVORCED"] },
        ].map((f) => (
          <div key={f.key} className="flex flex-col">
            <label className="text-sm font-medium mb-1">{f.label}</label>
            <select
              className="input"
              value={filter[f.key]}
              onChange={(e) => {
                setCurrentPage(1);
                setFilter({ ...filter, [f.key]: e.target.value });
              }}
            >
              {f.options.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            placeholder="Search by name or ID"
            className="input"
            value={filter.search}
            onChange={(e) => {
              setCurrentPage(1);
              setFilter({ ...filter, search: e.target.value });
            }}
          />
        </div>
      </div>

      {/* Table */}
      {/* Table */}
<div className="rounded-xl overflow-hidden shadow-md border bg-white border-gray-200">
  <div className="flex justify-end items-center">
    <button
    onClick={() => setShowDashboard(true)}
    className="text-blue-500 cursor-pointer underline hover:text-blue-600 font-medium text-2xl  mb-4 text-center"
  >
    View Details
  </button>
   <MoveRight className="text-blue-500 mb-4 ml-2"/>
  </div>

  {/* Horizontal scroll container */}
  <div className="overflow-x-auto shadow-lg ">
    <table className="w-full min-w-[500px]   whitespace-nowrap ">
      <thead className="bg-gray-100 whitespace-nowrap  text-md text-gray-700">
        <tr>
          <th className="border p-2">Full Name</th>
          <th className="border p-2">Gender</th>
          <th className="border p-2">Date of Birth</th>
          <th className="border p-2">Marital Status</th>
          <th className="border p-2">Nationality</th>
          <th className="border p-2">Region</th>
          <th className="border p-2">Language</th>
          <th className="border p-2">District</th>
          <th className="border p-2">Local  Assembly</th>
          <th className="border p-2">Ethnicity</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Contact Info</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>

      <tbody>
        {paginatedMembers.map((m) => (
          <tr
            key={m.id}
            className="text-[13px] text-gray-700 hover:bg-gray-50"
          >
            <td className="p-2 font-semibold border">{m.fullName}</td>
            <td className="p-2 border">{m.gender}</td>
            <td className="p-2 border">{m.dateOfBirth}</td>
            <td className="p-2 border">{m.maritalStatus}</td>
            <td className="p-2 border">{m.nationality}</td>
            <td className="p-2 border">{m.jurisdiction}</td>
            <td className="p-2 border">{m.preferredLanguages}</td>
            <td className="p-2 border">{m.district}</td>
            <td className="p-2 border">{m.assembly}</td>
            <td className="p-2 border">{m.ethnicity}</td>
            <td className="p-2 border">{m.email}</td>
            <td className="p-2 border">{m.phoneNumber}</td>

            <td className="p-2 border">
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
                <button
                  onClick={() => setEditingMember(m)}
                  className="text-blue-500 hover:cursor-pointer"
                >
                  <Edit className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setDeletingMember(m)}
                  className="text-red-500 hover:cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  


      {/* Pagination */}
      <div className="flex justify-center m-4 gap-2 p-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded hover:bg-gray-300 ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
      </div>
</div>

      {editingMember && <EditMemberModal member={editingMember} onClose={() => setEditingMember(null)} onSave={saveEdit} />}
      {deletingMember && (
        <DeleteConfirmModal member={deletingMember} onClose={() => setDeletingMember(null)} onConfirm={() => confirmDelete(deletingMember)} />
      )}

      {successModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 text-center">
            <h2 className="text-xl font-semibold mb-4">
              Member {successModal.action === "updated" ? "Updated" : "Deleted"}
            </h2>
            <p className="mb-6">
              <span className="font-semibold text-green-600">{successModal.fullName}</span> has been successfully {successModal.action}.
            </p>
            <button onClick={() => setSuccessModal(null)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
