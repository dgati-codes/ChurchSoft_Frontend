import { useState, useEffect } from "react";
import { Trash2, Edit } from "lucide-react";
import MemberFullView from "./MemberFullView";
import LoadingSpinner from "./LoadingSpinner";
import memberService from "../../api/memberService";
import EditMemberModal from "./EditMemberModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function MemberTable() {
  const [members, setMembers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [successModal, setSuccessModal] = useState(null);

  const [showDashboard, setShowDashboard] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);

  const [filter, setFilter] = useState({
    ethnicity: "All",
    district: "All",
    maritalStatus: "All",
    assembly: "All",
    gender: "All",
    nationality: "All",
    search: "",
  });

  // Fetch members
  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await memberService.getAllMembers();
        setMembers(data);
      } catch (err) {
        console.error("Error fetching members:", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Apply filters
  useEffect(() => {
    const filteredData = members.filter((m) => {
      return (
        (filter.ethnicity === "All" || m.ethnicity === filter.ethnicity) &&
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

    setFiltered(filteredData);
  }, [members, filter]);

  // DELETE
  const confirmDelete = async (member) => {
    if (!member) return;

    try {
      await memberService.deleteMember(member.id); // backend expects numeric id
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
      setDeletingMember(null);
       setSuccessModal({
      fullName: member.fullName,
    });
    } catch (err) {
      console.error("Delete failed:", err.response || err);
      alert("Delete failed. Check console for details.");
    }
  };

  // EDIT SAVE
  const saveEdit = async (member) => {
    try {
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
        district: member.district,
        ethnicity: member.ethnicity,
        phoneNumber: member.phoneNumber,
        status: member.status,
      };

      await memberService.updateMember(member.id, payload);
      setMembers((prev) => prev.map((m) => (m.id === member.id ? payload : m)));
      setEditingMember(null);
        setSuccessModal({
      fullName: member.fullName,
      action: "updated",
    });
    } catch (err) {
      console.error("Update failed:", err.response || err);
      alert("Update failed. Check console for details.");
    }
  };

  // Handlers
  const handleEdit = (member) => setEditingMember(member);
  const handleDelete = (member) => setDeletingMember(member);

  // Loading UI
  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner text="Members loading..." />
      </div>
    );

  // Error UI
  if (isError)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Failed to load members.
      </div>
    );

  // Dashboard view
  if (showDashboard) return <MemberFullView onBack={() => setShowDashboard(false)} />;

  // TABLE VIEW
  return (
    <div className="min-h-screen bg-gray-100 px-4">
      {/* Header */}
      <div className="mb-6 ml-60">
        <h2 className="text-xl font-semibold ml-20">Member Registration - Table View</h2>
        <p className="text-gray-600">
          Manage and view member registrations with advanced filtering and search
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-6 mb-10 grid grid-cols-2 md:grid-cols-6 gap-4">
        {/* Ethnicity */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Ethnicity</label>
          <select
            className="input"
            value={filter.ethnicity}
            onChange={(e) => setFilter({ ...filter, ethnicity: e.target.value })}
          >
            <option>All</option>
            <option>Northern Reg.</option>
            <option>Greater Accra</option>
            <option>Volta Reg.</option>
          </select>
        </div>

        {/* District */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">District</label>
          <select
            className="input"
            value={filter.district}
            onChange={(e) => setFilter({ ...filter, district: e.target.value })}
          >
            <option>All</option>
            <option>North District</option>
            <option>Ga District</option>
            <option>Volta1 District</option>
          </select>
        </div>

        {/* Assembly */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Assembly</label>
          <select
            className="input"
            value={filter.assembly}
            onChange={(e) => setFilter({ ...filter, assembly: e.target.value })}
          >
            <option>All</option>
            <option>Breakthrough Assembly</option>
            <option>Legon Assembly</option>
            <option>Marranatha Assembly</option>
          </select>
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Gender</label>
          <select
            className="input"
            value={filter.gender}
            onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
          >
            <option>All</option>
            <option>MALE</option>
            <option>FEMALE</option>
          </select>
        </div>

        {/* Marital Status */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Marital Status</label>
          <select
            className="input"
            value={filter.maritalStatus}
            onChange={(e) =>
              setFilter({ ...filter, maritalStatus: e.target.value })
            }
          >
            <option>All</option>
            <option>SINGLE</option>
            <option>MARRIED</option>
            <option>DIVORCED</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            placeholder="Search by name or ID"
            className="input"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <button
          onClick={() => setShowDashboard(true)}
          className="text-blue-500 ml-200 cursor-pointer underline hover:text-blue-600 font-medium"
        >
          View Details
        </button>

        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="p-2 border">Full_Name</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Date of Birth</th>
              <th className="p-2 border">Marital Status</th>
              <th className="p-2 border">Nationality</th>
              <th className="p-2 border">Local / Assembly</th>
              <th className="p-2 border">District</th>
              <th className="p-2 border">Ethnicity</th>
              <th className="p-2 border">Contact Info</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((m) => (
              <tr key={m.memberId} className="text-sm text-gray-700 hover:bg-gray-50">
                <td className="p-2 border">{m.fullName}</td>
                <td className="p-2 border">{m.gender}</td>
                <td className="p-2 border">{m.dateOfBirth}</td>
                <td className="p-2 border">{m.maritalStatus}</td>
                <td className="p-2 border">{m.nationality}</td>
                <td className="p-2 border">{m.assembly}</td>
                <td className="p-2 border">{m.district}</td>
                <td className="p-2 border">{m.ethnicity}</td>
                <td className="p-2 border">{m.phoneNumber}</td>

                <td className="p-2 border">
                  <span
                    className={`px-1 py-1 rounded text-white text-xs ${
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

                <td className="px-1 py-3 border flex space-x-2">
                  <button
                    onClick={() => handleEdit(m)}
                    className="bg-blue-500 text-white m-1 px-1 py-1 rounded hover:bg-blue-600"
                  >
                    <Edit className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleDelete(m)}
                    className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* MODALS */}
        {editingMember && (
          <EditMemberModal
            member={editingMember}
            onClose={() => setEditingMember(null)}
            onSave={saveEdit}
          />
        )}

        {deletingMember && (
          <DeleteConfirmModal
            member={deletingMember}
            onClose={() => setDeletingMember(null)}
            onConfirm={() => confirmDelete(deletingMember)}
          />
        )}

   {successModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 text-center">
      <h2 className="text-xl font-semibold mb-4">
        Member {successModal.action === "updated" ? "Updated" : "Deleted"}
      </h2>
      <p className="mb-6">
       <span className="font-semibold text-green-600"> {successModal.fullName}</span> has been successfully {successModal.action}.
      </p>
      <button
        onClick={() => setSuccessModal(null)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </div>
)}


      </div>
    </div>
  );
}
