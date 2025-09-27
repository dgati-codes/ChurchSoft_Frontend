import { useState } from "react";
import { RefreshCw, Download } from "lucide-react";

export default function DashboardSummary() {
  const [search, setSearch] = useState("");

  const countries = [
    {
      type: "Dropdown",
      name: "Nigeria",
      code: "NG",
      parent: 28,
      child: 85,
      date: "2025-02-06",
    },
    {
      type: "Dropdown",
      name: "Ghana",
      code: "GH",
      parent: 24,
      child: 67,
      date: "2025-01-14",
    },
    {
      type: "Dropdown",
      name: "Kenya",
      code: "KE",
      parent: 32,
      child: 94,
      date: "2025-02-09",
    },
    {
      type: "Free Input",
      name: "South Africa",
      code: "ZA",
      parent: 45,
      child: 128,
      date: "2025-09-01",
    },
    {
      type: "Dropdown",
      name: "Egypt",
      code: "EG",
      parent: 38,
      child: 112,
      date: "2025-10-10",
    },
  ];

  // Filter countries based on search input
  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 ml-64">
      {/* Header */}
      <h2 className="text-center text-xl font-bold">Dashboard Summary</h2>
      <p className="text-center text-gray-600">
        Manage and monitor configured countries and their hierarchy levels
      </p>

      {/* Summary Boxes */}
      <div className="grid grid-cols-5 gap-4 mt-6">
        <SummaryCard label="Countries" value="5" color="bg-pink-200" />
        <SummaryCard label="Dropdowns" value="4" color="bg-green-200" />
        <SummaryCard label="Free Input" value="1" color="bg-yellow-200" />
        <SummaryCard label="Parent Levels" value="167" color="bg-blue-200" />
        <SummaryCard label="Child Levels" value="486" color="bg-purple-200" />
      </div>

      {/* Countries List */}
      <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">
            Configured Countries ({filteredCountries.length})
          </h3>
          <div className="flex gap-2">
            <button className="p-2 flex items-center gap-2 rounded-lg  border hover:bg-gray-100">
                <span>Refresh</span>
              <RefreshCw size={16} />
            </button>
            <button className="p-2 rounded-lg flex items-center gap-2 border hover:bg-gray-100">
                <span>Export </span>
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search Countries"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input mb-10"
        />

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((c, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border border-gray-200 rounded-lg p-3"
              >
                <div className="flex justify-between gap-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      c.type === "Dropdown"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {c.type}
                  </span>
                  <div className="">
                    <p className="font-semibold mt-1">
                    {c.name}{" "}
                    <p className="text-gray-500 text-sm">({c.code})</p>
                  </p>
                  </div>
                  <p className="text-sm ml-30 text-gray-600">
                    {c.parent} Parent • {c.child} Child
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">{c.date}</span>
                  <button className="text-red-500 font-bold text-lg">✕</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center">
              No countries found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Summary Card Component
function SummaryCard({ label, value, color }) {
  return (
    <div
      className={`${color} p-4 rounded-xl flex flex-col justify-center items-center shadow`}
    >
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-gray-600">{label}</span>
    </div>
  );
}
