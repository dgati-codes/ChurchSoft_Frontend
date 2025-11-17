import { useState } from "react";
import { RefreshCw, Download, Pencil,  Plus, Clock, Eye, Globe, CircleDot, Network, Trash2 } from "lucide-react";
import AddCountryModal from "./AddCountryModal";
function CountriesOverview() {
    const [showAddCountryModal, setShowAddCountryModal] = useState(false);

  
  const [countries] = useState([
    {
      name: "Ghana",
      continent: "Africa",
      parent: "Region",
      child: "District",
      parentLevels: 20,
      status: "Active",
      updated: "2025-09-04 14:32 GMT",
    },
    {
      name: "Nigeria",
      continent: "Africa",
      parent: "Federal",
      child: "State",
      parentLevels: 36,
      status: "Active",
      updated: "2025-09-04 14:35 GMT",
    },
    {
      name: "Kenya",
      continent: "Africa",
      parent: "County",
      child: "Sub County",
      parentLevels: 47,
      status: "Inactive",
      updated: "2025-09-03 16:20 GMT",
    },
    {
      name: "South Africa",
      continent: "Africa",
      parent: "Province",
      child: "Municipality",
      parentLevels: 9,
      status: "Active",
      updated: "2025-09-02 09:45 GMT",
    },
  ]);

  return (
    <div className="p-2 font-[Poppins] bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Countries Hierarchy Overview</h1>
          <p className="text-gray-500 text-sm">
            Provide an overview of all configured countries and their hierarchy details
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => setShowAddCountryModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Add Country
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Filters</h2>
          <button className="text-sm text-red-500 hover:underline">Clear All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search countries..."
            className="p-2 bg-gray-100 rounded-md text-sm w-full"
          />
          <select className="p-2 bg-gray-100 rounded-md text-sm w-full">
            <option>All continents</option>
            <option>Africa</option>
            <option>Europe</option>
            <option>Asia</option>
            <option>North America</option>
            <option>South America</option>
          </select>
          <select className="p-2 bg-gray-100 rounded-md text-sm w-full">
            <option>All statuses</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex flex-col">
          <div className="flex justify-between items-center">
            <span>Total Countries</span>
            <Globe className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold">10</p>
          <span className="text-xs text-gray-500">Configured in system</span>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col">
          <div className="flex justify-between items-center">
            <span>Parent Levels</span>
            <Network className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold">200</p>
          <span className="text-xs text-gray-500">Total across all countries</span>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col">
          <div className="flex justify-between items-center">
            <span>Active Countries</span>
            <CircleDot className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold">4</p>
          <span className="text-xs text-gray-500">Currently active</span>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col">
          <div className="flex justify-between items-center">
            <span>Last updated</span>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-lg font-bold"><span className="text-blue-600">
            {new Date().toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}</span></p>
          <span className="text-xs text-gray-500">Most recent change</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-20 rounded-lg shadow overflow-hidden">
        <h2 className="p-4 font-medium border-b">Configured Countries Overview</h2>
        <table className="w-full text-sm p-2 border-collapse">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left border">Country Name</th>
              <th className="p-3 text-left border">Continent</th>
              <th className="p-3 text-left border">Parent Level Name</th>
              <th className="p-3 text-left border">Child Level Name</th>
              <th className="p-3 text-left border">No. of Parent levels</th>
              <th className="p-3 text-left border">Status</th>
              <th className="p-3 text-left border">Last updated</th>
              <th className="p-3 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-3 border">{c.name}</td>
                <td className="p-3 border">{c.continent}</td>
                <td className="p-3 border">{c.parent}</td>
                <td className="p-3 border">{c.child}</td>
                <td className="p-3 border">{c.parentLevels}</td>
                <td className="p-3 border">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-3 border">{c.updated}</td>
                <td className="p-3 border flex  mb-10">
                  <Eye className="text-gray-600 "/> 
                  <Pencil  className="text-gray-600 "/> 
                  <Trash2 className="text-red-500 "></Trash2>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <AddCountryModal
       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50"
        isOpen={showAddCountryModal}
        onClose={() => setShowAddCountryModal(false)}
      />
    </div>
   
  );
}

export default CountriesOverview;
