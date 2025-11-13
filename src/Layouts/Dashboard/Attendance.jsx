import React, { useState, useEffect } from "react";
import { Users, Trash2, TrendingUp, MapPin, BookOpen } from "lucide-react";

import AttendanceTable from "./AttendanceTable";
import AddAttendanceRecord from "./AddAttendanceRecord";
import { attendanceService } from "../../api/attendanceService";

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
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [metrics, setMetrics] = useState({
    totalAttendance: 0,
    averageAttendance: 0,
    activeLocations: 0,
    serviceRecords: 0,
    children: { count: 0, percentage: 0 },
    juniorYouth: { count: 0, percentage: 0 },
    seniorYouth: { count: 0, percentage: 0 },
    adults: { count: 0, percentage: 0 },
    visitors: { count: 0, percentage: 0 },
  });
  const [filters, setFilters] = useState({
    serviceDates: "", // Text input for date search (e.g., '2025-10')
    serviceType: "ALL",
    assembly: "ALL",
    district: "ALL", // Default ALL
    region: "ALL", // Default ALL (add if UI expands)
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data with filters and page
  const fetchAttendance = async (
    page = currentPage,
    appliedFilters = filters
  ) => {
    try {
      setLoading(true);
      setError("");
      const data = await attendanceService.getAttendanceMetrics(
        appliedFilters.region || "ALL",
        appliedFilters.serviceType || "ALL",
        appliedFilters.assembly || "ALL",
        appliedFilters.district || "ALL",
        page,
        10
      );
      setMetrics(data.metrics || {});
      setAttendanceRecords(data.attendanceRecord?.content || []);
      setTotalElements(data.attendanceRecord?.totalElements || 0);
      setTotalPages(data.attendanceRecord?.totalPages || 0);
    } catch (err) {
      console.error("Failed to fetch attendance:", err);
      setError("Failed to load attendance records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Handle filter change (reset page to 0)
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(0);
    fetchAttendance(0, { ...filters, [key]: value });
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAttendance(page);
  };

  // Handle successful add (refresh with current filters/page)
  const handleRecordAdded = async (newRecord) => {
    setCurrentPage(0);
    await fetchAttendance(0);
  };

  // Handle delete (refetch current page/filters)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await attendanceService.deleteAttendance(id);
        // If deleting the last item on page, go to previous page
        if (attendanceRecords.length === 1 && currentPage > 0) {
          setCurrentPage(currentPage - 1);
          await fetchAttendance(currentPage - 1);
        } else {
          await fetchAttendance(currentPage);
        }
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete record");
      }
    }
  };

  // Handle view
  const handleView = async (id) => {
    try {
      const record = await attendanceService.getAttendanceById(id);
      return record;
    } catch (err) {
      console.error("View failed:", err);
    }
  };

  // Handle edit
  const handleEdit = async (id) => {
    try {
      const record = await attendanceService.getAttendanceById(id);
      return record;
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-10 bg-[#F9FAFB] flex items-center justify-center">
        <p className="text-lg">Loading attendance records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-10 bg-[#F9FAFB] flex items-center justify-center">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen -ml-12 p-10 bg-[#F9FAFB] ">
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
          <button
            onClick={() => {
              setFilters({
                serviceDates: "",
                serviceType: "ALL",
                assembly: "ALL",
                district: "ALL",
                region: "ALL",
              });
              setCurrentPage(0);
              fetchAttendance(0, {
                serviceDates: "",
                serviceType: "ALL",
                assembly: "ALL",
                district: "ALL",
                region: "ALL",
              });
            }}
            className="text-sm text-blue-600"
          >
            Clear All
          </button>
        </div>
        <div className="flex gap-4">
          <div>
            <label className="family-Helvetica">Service Dates</label>
            <input
              type="date"
              className="input"
              placeholder="Select date"
              value={filters.serviceDates}
              onChange={(e) =>
                handleFilterChange("serviceDates", e.target.value)
              }
            />
          </div>
          <div>
            <label className="family-Helvetica">Service Type</label>
            <select
              className="input"
              value={filters.serviceType}
              onChange={(e) =>
                handleFilterChange("serviceType", e.target.value)
              }
            >
              <option value="ALL">ALL</option>
              <option value="SUNDAY_SERVICE">Sunday Service</option>
              <option value="MIDWEEK_SERVICE">Midweek Service</option>
              <option value="YOUTH_SERVICE">Youth Service</option>
              <option value="PRAYER_MEETING">Prayer Meeting</option>
              <option value="SPECIAL_SERVICE">Special Service</option>
            </select>
          </div>
          <div>
            <label className="family-Helvetica">Assembly</label>
            <select
              className="input"
              value={filters.assembly}
              onChange={(e) => handleFilterChange("assembly", e.target.value)}
            >
              <option value="ALL">ALL</option>
              <option value="Assembly A">Assembly A</option>
              <option value="Assembly B">Assembly B</option>
              <option value="Adenta Central Assembly">
                Adenta Central Assembly
              </option>
              {/* Add more dynamically if needed */}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards - Dynamic from metrics */}
      <div className="grid grid-cols-1 m-4 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Attendance"
          value={metrics.totalAttendance.toLocaleString()}
          subtitle={`Across ${metrics.serviceRecords || 0} services`}
          icon={<Users className="text-[#F49200] p-1 bg-[#FFF1DC]" />}
        />
        <StatCard
          title="Average Attendance"
          value={metrics.averageAttendance}
          subtitle="Per Service"
          icon={<TrendingUp className="bg-[#F8FFDC] p-1 text-[#99C000]" />}
        />
        <StatCard
          title="Active Locations"
          value={metrics.activeLocations}
          subtitle={`${metrics.activeLocations} regions`}
          icon={<MapPin className="bg-[#DEFFDC] p-1 text-[#09B700]" />}
        />
        <StatCard
          title="Service Records"
          value={metrics.serviceRecords}
          subtitle="Total entries"
          icon={<BookOpen className="bg-[#DCFAFF] p-1 text-[#007588]" />}
        />
      </div>

      {/* Demographics Breakdown - Dynamic from metrics */}
      <div className="bg-white mb-4 rounded-lg shadow border border-[#E5E5E5] p-4">
        <h2 className="font-semibold mb-4">Demographics Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div>
            <div className="h-2 bg-red-400 rounded-full mb-2"></div>
            <p className="font-bold">{metrics.children.count}</p>
            <p className="text-sm">Children</p>
            <p className="text-xs text-gray-500">
              {metrics.children.percentage}%
            </p>
          </div>
          <div>
            <div className="h-2 bg-lime-400 rounded-full mb-2"></div>
            <p className="font-bold">{metrics.juniorYouth.count}</p>
            <p className="text-sm">Junior Youth</p>
            <p className="text-xs text-gray-500">
              {metrics.juniorYouth.percentage}%
            </p>
          </div>
          <div>
            <div className="h-2 bg-blue-400 rounded-full mb-2"></div>
            <p className="font-bold">{metrics.seniorYouth.count}</p>
            <p className="text-sm">Senior Youth</p>
            <p className="text-xs text-gray-500">
              {metrics.seniorYouth.percentage}%
            </p>
          </div>
          <div>
            <div className="h-2 bg-purple-500 rounded-full mb-2"></div>
            <p className="font-bold">{metrics.adults.count}</p>
            <p className="text-sm">Adults</p>
            <p className="text-xs text-gray-500">
              {metrics.adults.percentage}%
            </p>
          </div>
          <div>
            <div className="h-2 bg-orange-400 rounded-full mb-2"></div>
            <p className="font-bold">{metrics.visitors.count}</p>
            <p className="text-sm">Visitors</p>
            <p className="text-xs text-gray-500">
              {metrics.visitors.percentage}%
            </p>
          </div>
        </div>
      </div>

      {/* Detailed View */}
      <AttendanceTable
        records={attendanceRecords}
        totalElements={totalElements}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onDelete={handleDelete}
        onView={handleView}
        onEdit={handleEdit}
      />
      <AddAttendanceRecord
        className=" inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50"
        isOpen={showAddAttendanceRecord}
        onClose={() => setShowAddAttendanceRecord(false)}
        onRecordAdded={handleRecordAdded}
      />
    </div>
  );
}
