import React from "react";
import { BarChart, Bar,  XAxis,  CartesianGrid, Tooltip } from "recharts";
import { Users, TrendingUp,  MapPin, BookOpen } from "lucide-react";

import AttendanceTable from "./AttendanceTable";
import AddAttendanceRecord from "./AddAttendanceRecord ";
import { useState } from "react";

// Reusable Card component
const StatCard = ({ title, value, subtitle, icon, color }) => (
  <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-1 border border-[#E5E5E5]">
    <div className="flex justify-between items-center">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      {icon && <span className="text-xl">{icon}</span>}
    </div>
    <p className="text-2xl font-bold">{value}</p>
    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
  </div>
);

export default function AttendanceTracking() {
  const [showAddAttendanceRecord, setShowAddAttendanceRecord] = useState(false);



  return (
    <div className="min-h-screen p-10 bg-[#F9FAFB] ">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Attendance Tracking</h1>
          <p className="text-gray-600">
            Track and manage service attendance records
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddAttendanceRecord(true)}
            className="bg-[#0063D4] text-white px-4 py-2 rounded-lg"
          >
            + Add Record
          </button>
          <button className="bg-[#0063D4] text-white px-4 py-2 rounded-lg">
            + Add Notes
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg">
            Export PDF
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg">
            Print
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 m-4 rounded-lg shadow border border-[#E5E5E5]">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Filters</h2>
          <button className="text-sm text-blue-600">Clear All</button>
        </div>
        <div className="flex gap-4">
          <div>
            <label className="family-Helvetica">Service Dates</label>
            <input type="text" className="input " placeholder="login date" />
          </div>
          <div>
            <label className="family-Helvetica">Service Type</label>
            <select className="input">
              <option>Service Type</option>
            </select>
          </div>
          <div>
            <label className="family-Helvetica">Assembly</label>
            <select className="input">
              <option>Assembly</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 m-4 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Attendance"
          value="1550"
          subtitle="Across 1 service"
          icon={<Users className="text-[#F49200] p-1 bg-[#FFF1DC]" />}
        />
        <StatCard
          title="Average Attendance"
          value="189"
          subtitle="Per Service"
          icon={<TrendingUp className="bg-[#F8FFDC] p-1 text-[#99C000]" />}
        />
        <StatCard
          title="Active Locations"
          value="16"
          subtitle="16 regions"
          icon={<MapPin className="bg-[#DEFFDC] p-1 text-[#09B700]" />}
        />
        <StatCard
          title="Service Records"
          value="32"
          subtitle="Total entries"
          icon={<BookOpen className="bg-[#DCFAFF] p-1 text-[#007588]" />}
        />
      </div>

      {/* Demographics Breakdown */}
      <div className="bg-white mb-4 rounded-lg shadow border border-[#E5E5E5] p-4">
        <h2 className="font-semibold mb-4">Demographics Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div>
            <div className="h-2 bg-red-400 rounded-full mb-2"></div>
            <p className="font-bold">137</p>
            <p className="text-sm">Children</p>
            <p className="text-xs text-gray-500">12%</p>
          </div>
          <div>
            <div className="h-2 bg-lime-400 rounded-full mb-2"></div>
            <p className="font-bold">125</p>
            <p className="text-sm"> Junior Youth</p>
            <p className="text-xs text-gray-500">13%</p>
          </div>
          <div>
            <div className="h-2 bg-blue-400 rounded-full mb-2"></div>
            <p className="font-bold">257</p>
            <p className="text-sm">Senior Youth</p>
            <p className="text-xs text-gray-500">23%</p>
          </div>
          <div>
            <div className="h-2 bg-purple-500 rounded-full mb-2"></div>
            <p className="font-bold">532</p>
            <p className="text-sm">Adults</p>
            <p className="text-xs text-gray-500">47%</p>
          </div>
          <div>
            <div className="h-2 bg-orange-400 rounded-full mb-2"></div>
            <p className="font-bold">64</p>
            <p className="text-sm">Visitors</p>
            <p className="text-xs text-gray-500">6%</p>
          </div>
        </div>
      </div>

      {/* Detailed View */}

      <AttendanceTable />
      <AddAttendanceRecord
        className=" inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50"
        isOpen={showAddAttendanceRecord}
        onClose={() => setShowAddAttendanceRecord(false)}
      />
    </div>
  );
}
