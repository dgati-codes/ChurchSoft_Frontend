import { useState } from "react";
import MemberFullView from "./MemberFullView";

const members = [
  {
    id: "MEM001",
    fullName: "Sammy Tsorlevo",
    gender: "Male",
    dob: "1985-08-09",
    age: 22,
    ageGroup: "Adult",
    assembly: "Breakthrough Assembly",
    district: "North District",
    region: "Northern Reg.",
    contact: "john.smith@email.com",
    membership: "Full",
  },
  {
    id: "MEM002",
    fullName: "David Gati",
    gender: "Female",
    dob: "1986-08-09",
    age: 59,
    ageGroup: "Adult",
    assembly: "Legon Assembly",
    district: "Ga District",
    region: "Greater Accra",
    contact: "john.smith@email.com",
    membership: "Associate",
  },
  {
    id: "MEM003",
    fullName: "Geraldo El Capo",
    gender: "Male",
    dob: "1985-08-09",
    age: 40,
    ageGroup: "Adult",
    assembly: "Breakthrough Assembly",
    district: "North District",
    region: "Northern Reg.",
    contact: "john.smith@email.com",
    membership: "Visitor",
  },
  {
    id: "MEM004",
    fullName: "Kofi Akwaa",
    gender: "Male",
    dob: "1985-08-09",
    age: 33,
    ageGroup: "Adult",
    assembly: "Breakthrough Assembly",
    district: "Volta1 District",
    region: "Volta Reg.",
    contact: "john.smith@email.com",
    membership: "Member",
  },
  {
    id: "MEM005",
    fullName: "Ama Baya",
    gender: "Female",
    dob: "1985-08-09",
    age: 20,
    ageGroup: "Youth",
    assembly: "Marranatha Assembly",
    district: "Volta1 District",
    region: "Volta Reg.",
    contact: "john.smith@email.com",
    membership: "Full",
  },
];

export default function MemberTable() {
  const [showDashboard, setShowDashboard] = useState(false);
  // const [selectedMember, setSelectedMember] = useState(null);
  const [filter, setFilter] = useState({
    region: "All",
    district: "All",
    assembly: "All",
    gender: "All",
    ageGroup: "All",
    search: "",
  });

  const filtered = members.filter((m) => {
    return (
      (filter.region === "All" || m.region === filter.region) &&
      (filter.district === "All" || m.district === filter.district) &&
      (filter.assembly === "All" || m.assembly === filter.assembly) &&
      (filter.gender === "All" || m.gender === filter.gender) &&
      (filter.ageGroup === "All" || m.ageGroup === filter.ageGroup) &&
      (filter.search === "" ||
        m.fullName.toLowerCase().includes(filter.search.toLowerCase()) ||
        m.id.toLowerCase().includes(filter.search.toLowerCase()))
    );
  });

  // 🟢 Handle "View Details"
  const handleViewDetails = () => {
    // setSelectedMember(member);
    setShowDashboard(true);
  };

  // 🟣 Go back to table
  const handleBack = () => {
    setShowDashboard(false);
    // setSelectedMember(null);
  };

  // ✅ If "View Details" clicked → show Dashboard
  if (showDashboard) {
    return <MemberFullView  onBack={handleBack} />;
  }

  // ✅ Default view → Table
  return (
    <div className="min-h-screen bg-gray-100  px-4">
      {/* Header */}
      <div className="mb-6  ml-60">
        <h2 className="text-xl font-semibold ml-20">Member Registration - Table View</h2>
        <p className="text-gray-600">
          Manage and view member registrations with advanced filtering and search
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-6 mb-10 grid grid-cols-2 md:grid-cols-6 gap-4">
        {/* Region */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Region</label>
          <select
            className="input"
            value={filter.region}
            onChange={(e) => setFilter({ ...filter, region: e.target.value })}
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
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* Age Group */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Age Group</label>
          <select
            className="input"
            value={filter.ageGroup}
            onChange={(e) => setFilter({ ...filter, ageGroup: e.target.value })}
          >
            <option>All</option>
            <option>Adult</option>
            <option>Youth</option>
            <option>Child</option>
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
        <button onClick={handleViewDetails} className="text-blue-500 ml-200 cursor-pointer underline hover:text-blue-600 font-medium"
                  >
                   View Details
                  </button>
        <table className="w-full border-collapse">
          
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="p-2 border">Member ID</th>
              <th className="p-2 border">Full Name</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Date of Birth</th>
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Age Group</th>
              <th className="p-2 border">Local / Assembly</th>
              <th className="p-2 border">District</th>
              <th className="p-2 border">Region</th>
              <th className="p-2 border">Contact Info</th>
              <th className="p-2 border">Membership</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, idx) => (
              <tr key={idx} className="text-sm text-gray-700 hover:bg-gray-50">
                <td className="p-2 border">{m.id}</td>
                <td className="p-2 border">{m.fullName}</td>
                <td className="p-2 border">{m.gender}</td>
                <td className="p-2 border">{m.dob}</td>
                <td className="p-2 border">{m.age}</td>
                <td className="p-2 border">{m.ageGroup}</td>
                <td className="p-2 border">{m.assembly}</td>
                <td className="p-2 border">{m.district}</td>
                <td className="p-2 border">{m.region}</td>
                <td className="p-2 border">{m.contact}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      m.membership === "Full"
                        ? "bg-green-600"
                        : m.membership === "Associate"
                        ? "bg-blue-600"
                        : m.membership === "Visitor"
                        ? "bg-yellow-600"
                        : "bg-gray-500"
                    }`}
                  >
                    {m.membership}
                  </span>
                </td>
                <td className="p-2 border text-center">
                  ....
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
