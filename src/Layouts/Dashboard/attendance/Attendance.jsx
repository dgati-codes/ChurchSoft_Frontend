import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpen, MapPin, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { attendanceService } from "../../../api/services/attendanceService";
import DeleteModal from "../modals/DeleteModal";
import LoadingSpinner from "../modals/LoadingSpinner";
import StatCard from "../modals/StatCard.jsx";
import AddAttendanceRecord from "./addattendance-record/AddAttendanceRecord.jsx";
import AttendanceTable from "./attendance-table/AttendanceTable.jsx";

export default function AttendanceTracking() {
  const [showAddAttendanceRecord, setShowAddAttendanceRecord] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [deleteModal, setDeleteModal] = useState(null);
  const [filters, setFilters] = useState({
    serviceDates: "",
    serviceType: "ALL",
    assembly: "ALL",
    district: "ALL",
    region: "ALL",
  });

  const queryClient = useQueryClient();

  /* ================= FETCH ATTENDANCE ================= */

  const { data, isFetching, isError, error } = useQuery({
    queryKey: [
      "attendance",
      currentPage,
      filters.region,
      filters.serviceType,
      filters.assembly,
      filters.district,
    ],

    queryFn: () =>
      attendanceService.getAttendanceMetrics(
        filters.region || "ALL",
        filters.serviceType || "ALL",
        filters.assembly || "ALL",
        filters.district || "ALL",
        currentPage,
        10,
      ),

    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
    refetchInterval: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  /* ================= EXTRACT DATA ================= */

  const metrics = data?.metrics || {
    totalAttendance: 0,
    averageAttendance: 0,
    activeLocations: 0,
    serviceRecords: 0,
    children: { count: 0, percentage: 0 },
    juniorYouth: { count: 0, percentage: 0 },
    seniorYouth: { count: 0, percentage: 0 },
    adults: { count: 0, percentage: 0 },
    visitors: { count: 0, percentage: 0 },
  };

  const attendanceRecords = data?.attendanceRecord?.content || [];
  const totalElements = data?.attendanceRecord?.totalElements || 0;
  const totalPages = data?.attendanceRecord?.totalPages || 0;

  /* ================= FILTER CHANGE ================= */

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    setCurrentPage(0);
  };

  /* ================= PAGE CHANGE ================= */

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  /* ================= ADD RECORD ================= */

  const handleRecordAdded = () => {
    setCurrentPage(0);

    queryClient.invalidateQueries({
      queryKey: ["attendance"],
    });
  };

  /* ================= DELETE RECORD ================= */
  const handleDelete = (id) => {
    setDeleteModal({
      id: id,
      action: "this record",
    });
  };

  const confirmDelete = async () => {
    try {
      await attendanceService.deleteAttendance(deleteModal.id);

      if (attendanceRecords.length === 1 && currentPage > 0) {
        setCurrentPage((prev) => prev - 1);
      }

      queryClient.invalidateQueries({
        queryKey: ["attendance"],
      });

      setDeleteModal(null);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete record");
    }
  };

  /* ================= VIEW RECORD ================= */

  const handleView = async (id) => {
    try {
      const record = await attendanceService.getAttendanceById(id);
      return record;
    } catch (err) {
      console.error("View failed:", err);
    }
  };

  /* ================= EDIT RECORD ================= */

  const handleEdit = async (id) => {
    try {
      const record = await attendanceService.getAttendanceById(id);
      return record;
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  /* ================= ERROR STATE ================= */

  if (isError) {
    return (
      <div className="min-h-screen p-10 bg-[#F9FAFB] flex items-center justify-center">
        <p className="text-lg text-red-600">
          {error?.message || "Failed to load attendance records"}
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen font-[DM Sans] mt-15 bg-[#F9FAFB] ">
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
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Filters</h2>
          <button
            onClick={() => {
              const resetFilters = {
                serviceDates: "",
                serviceType: "ALL",
                assembly: "ALL",
                district: "ALL",
                region: "ALL",
              };

              setFilters(resetFilters);
              setCurrentPage(0);
              // refetch();
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Attendance"
          value={
              isFetching ? (
                <LoadingSpinner text="" width={12} height={12} thickness={2} />
              ) : (
                metrics.totalAttendance.toLocaleString()
              )
            }
          subtitle={`Across ${metrics.serviceRecords || 0} services`}
          icon={<Users className="text-[#F49200] p-1 bg-[#FFF1DC]" />}
        />
        <StatCard
          title="Average Attendance"
          value={
              isFetching ? (
                <LoadingSpinner text="" width={12} height={12} thickness={2} />
              ) : (
                metrics.averageAttendance
              )
            }
          subtitle="Per Service"
          icon={<TrendingUp className="bg-[#F8FFDC] p-1 text-[#99C000]" />}
        />
        <StatCard
          title="Active Locations"
          value={
              isFetching ? (
                <LoadingSpinner text="" width={12} height={12} thickness={2} />
              ) : (
                metrics.activeLocations
              )
            }
          subtitle={`${metrics.activeLocations} regions`}
          icon={<MapPin className="bg-[#DEFFDC] p-1 text-[#09B700]" />}
        />
        <StatCard
          title="Service Records"
          value={
              isFetching ? (
                <LoadingSpinner text="" width={12} height={12} thickness={2} />
              ) : (
                metrics.serviceRecords
              )
            }
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

      <div>
        {/* Attendance Table */}
        <div className="mt-6">
          {isFetching ? (
            <div className="flex justify-center ">
              <LoadingSpinner text="Loading records..." />
            </div>
          ) : attendanceRecords.length === 0 ? (
            <p className="text-center text-gray-500">No attendance records</p>
          ) : (
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
          )}
        </div>
      </div>
      <AddAttendanceRecord
        className=" inset-0 flex items-center justify-center bg-black/50  z-50"
        isOpen={showAddAttendanceRecord}
        onClose={() => setShowAddAttendanceRecord(false)}
        onRecordAdded={handleRecordAdded}
      />

      <DeleteModal
        item={deleteModal}
        onCancel={() => setDeleteModal(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
