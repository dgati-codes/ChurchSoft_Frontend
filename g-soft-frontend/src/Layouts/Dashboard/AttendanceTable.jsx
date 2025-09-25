import React from "react";
import { useState } from "react";


// Service type label with colors
const ServiceTypeTag = ({ type }) => {
  const colors = {
    Midweek: "bg-blue-100 text-blue-600",
    "Youth Service": "bg-green-100 text-green-600",
    "Prayer Meeting": "bg-purple-100 text-purple-600",
    "Special Service": "bg-red-100 text-red-600",
    "Sunday Service": "bg-yellow-100 text-yellow-600",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        colors[type] || "bg-gray-100 text-gray-600"
      }`}
    >
      {type}
    </span>
  );
};

// Attendance table
export default function AttendanceTable() {
      const [open, setOpen] = useState(false);
      const [enabled, setEnabled] = useState(true);



  const data = [
    {
      date: "Jan 07, 2025",
      serviceType: "Midweek",
      assembly: "Legon",
      region: "Volta",
      children: { boys: 12, girls: 16 },
      jrYouth: { m: 12, f: 16 },
      srYouth: { m: 12, f: 16 },
      adults: { men: 22, women: 32 },
      visitors: { m: 15, f: 17 },
      total: 200,
      submittedBy: "Rev M. Pinkrah",
    },
    {
      date: "Jan 07, 2025",
      serviceType: "Youth Service",
      assembly: "Adenta",
      region: "Western",
      children: { boys: 12, girls: 16 },
      jrYouth: { m: 12, f: 16 },
      srYouth: { m: 12, f: 16 },
      adults: { men: 22, women: 32 },
      visitors: { m: 15, f: 17 },
      total: 175,
      submittedBy: "Rev M. Pinkrah",
    },
    // Add more rows...
  ];

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="bg-white rounded-lg shadow border p-4">
         {/* <div className="bg-white rounded-lg shadow border p-4"> */}
        <div className="flex justify-between mb-2">
          <div className="flex gap-2 items-center">
           <div className="flex items-center space-x-3">
      {/* Toggle Button */}
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>

      {/* Label */}
      <span className="text-sm font-medium">Detailed View</span>
    </div>
            <span className="text-sm text-gray-500">16 Records</span>
            <span className="text-sm text-gray-500">1130 Total Attendance</span>
          </div>
        {/* </div> */}

       
      </div>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Service Type</th>
                <th className="border p-2">Assembly</th>
                <th className="border p-2">Region</th>
                <th className="border p-2">Children</th>
                <th className="border p-2">Jr. Youth</th>
                <th className="border p-2">Sr. Youth</th>
                <th className="border p-2">Adults</th>
                <th className="border p-2">Visitors</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Chart</th>
                <th className="border p-2">Submitted By</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="text-center">
                  <td className="border p-2">{row.date}</td>
                  <td className="border p-2">
                    <ServiceTypeTag type={row.serviceType} />
                  </td>
                  <td className="border p-2">{row.assembly}</td>
                  <td className="border p-2">{row.region}</td>
                  <td className="border p-2">
                    {row.children.boys} / {row.children.girls}
                  </td>
                  <td className="border p-2">
                    {row.jrYouth.m} / {row.jrYouth.f}
                  </td>
                  <td className="border p-2">
                    {row.srYouth.m} / {row.srYouth.f}
                  </td>
                  <td className="border p-2">
                    {row.adults.men} / {row.adults.women}
                  </td>
                  <td className="border p-2">
                    {row.visitors.m} / {row.visitors.f}
                  </td>
                  <td className="border p-2 font-bold">{row.total}</td>
                  <td className="border p-2">📊</td>
                  <td className="border p-2">{row.submittedBy}</td>
                  <td className="border p-2 flex justify-center gap-2">
                    <button className="text-blue-500">👁️</button>
                    <button className="text-green-500">✏️</button>
                    <button className="text-red-500">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Metadata */}
      <div className="bg-white rounded-lg shadow border p-4">
      {/* Header (clickable) */}
      <h2
        className="font-semibold mb-2 cursor-pointer flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        System Metadata
        <span className="text-gray-600 text-lg">
          {open ? "▲" : "▼"}
        </span>
      </h2>

      {/* Collapsible Content */}
      {open && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p>
              <strong>Recorded By:</strong> Rev. Moses Pinkrah
            </p>
            <p>
              <strong>ID:</strong> user_123
            </p>
            <p>
              <strong>Created:</strong> Aug 30, 2025, 11:33:45 AM
            </p>
            <p>
              <strong>Session ID:</strong> session_1756554261103_xl2l0st
            </p>
          </div>
          <div>
            <p>
              <strong>Last Update By:</strong> Rev. Moses Pinkrah
            </p>
            <p>
              <strong>ID:</strong> user_123
            </p>
            <p>
              <strong>Last Modified:</strong> Aug 30, 2025, 11:33:45 AM
            </p>
            <p>
              <strong>Version:</strong> V1
            </p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
