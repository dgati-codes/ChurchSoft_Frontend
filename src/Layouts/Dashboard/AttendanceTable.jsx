import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Service type label with colors (flexible)
const ServiceTypeTag = ({ type }) => {
  const displayMap = {
    SUNDAY_SERVICE: "Sunday Service",
    MIDWEEK_SERVICE: "Midweek Service",
    YOUTH_SERVICE: "Youth Service",
    PRAYER_MEETING: "Prayer Meeting",
    SPECIAL_SERVICE: "Special Service",
    MENS_FELLOWSHIP: "Men's Fellowship",
    WOMENS_FELLOWSHIP: "Women's Fellowship",
    BIBLE_STUDY: "Bible Study",
    OUTREACH_PROGRAM: "Outreach Program",
  };
  const displayType = displayMap[type] || type;

  const colors = {
    "Sunday Service": "bg-yellow-100 text-yellow-600",
    "Midweek Service": "bg-blue-100 text-blue-600",
    "Youth Service": "bg-green-100 text-green-600",
    "Prayer Meeting": "bg-purple-100 text-purple-600",
    "Special Service": "bg-red-100 text-red-600",
    "Men's Fellowship": "bg-indigo-100 text-indigo-600",
    "Women's Fellowship": "bg-pink-100 text-pink-600",
    "Bible Study": "bg-teal-100 text-teal-600",
    "Outreach Program": "bg-orange-100 text-orange-600",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        colors[displayType] || "bg-gray-100 text-gray-600"
      }`}
    >
      {displayType}
    </span>
  );
};

// View Modal
const ViewModal = ({ record, isOpen, onClose }) => {
  if (!isOpen || !record) return null;

  const total =
    record.boys +
    record.girls +
    record.juniorYouthMale +
    record.juniorYouthFemale +
    record.seniorYouthMale +
    record.seniorYouthFemale +
    record.adultMen +
    record.adultWomen +
    record.visitorMale +
    record.visitorFemale;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">View Record</h3>
          <button onClick={onClose} className="text-gray-500">
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <p>
            <strong>Date:</strong>{" "}
            {new Date(record.serviceDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Service Type:</strong>{" "}
            <ServiceTypeTag type={record.serviceType} />
          </p>
          <p>
            <strong>Submitted By:</strong> {record.submittedBy}
          </p>
          <p>
            <strong>Region:</strong> {record.region}
          </p>
          <p>
            <strong>District:</strong> {record.district}
          </p>
          <p>
            <strong>Assembly:</strong> {record.localAssembly}
          </p>
          <p>
            <strong>Total Attendance:</strong> {total}
          </p>
          <p>
            <strong>Notes:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Observations:</strong>{" "}
              {record.generalObservations || "N/A"}
            </li>
            <li>
              <strong>Challenges:</strong> {record.challengesNoticed || "N/A"}
            </li>
            <li>
              <strong>Recommendations:</strong> {record.recommendation || "N/A"}
            </li>
          </ul>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Attendance Table
export default function AttendanceTable({
  records = [],
  totalElements = 0,
  totalPages = 0,
  currentPage = 0,
  onPageChange,
  onDelete,
  onView,
  onEdit,
}) {
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Total attendance across all records
  const totalAttendance = records.reduce((sum, record) => {
    return (
      sum +
      (record.boys +
        record.girls +
        record.juniorYouthMale +
        record.juniorYouthFemale +
        record.seniorYouthMale +
        record.seniorYouthFemale +
        record.adultMen +
        record.adultWomen +
        record.visitorMale +
        record.visitorFemale)
    );
  }, 0);

  // Pagination helpers
  const goToPrevious = () => currentPage > 0 && onPageChange(currentPage - 1);
  const goToNext = () =>
    currentPage < totalPages - 1 && onPageChange(currentPage + 1);
  const goToPage = (page) =>
    page >= 0 && page < totalPages && onPageChange(page);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(0, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible);
    if (end - start < maxVisible) start = Math.max(0, end - maxVisible);
    for (let i = start; i < end; i++) pages.push(i);
    return pages;
  };

  // Handlers
  const handleViewClick = async (id) => {
    const record = await onView(id);
    if (record) {
      setSelectedRecord(record);
      setViewModalOpen(true);
    }
  };

  const handleEditClick = (id) => onEdit(id);
  const handleDeleteClick = (id) => onDelete(id);

  // Chart data (for each row)
  const getChartData = (record) => {
    const total =
      record.boys +
      record.girls +
      record.juniorYouthMale +
      record.juniorYouthFemale +
      record.seniorYouthMale +
      record.seniorYouthFemale +
      record.adultMen +
      record.adultWomen +
      record.visitorMale +
      record.visitorFemale;
    if (total === 0) return [];
    return [
      {
        name: "Children",
        value: ((record.boys + record.girls) / total) * 100,
        fill: "#f87171",
      }, // red-400
      {
        name: "Jr Youth",
        value:
          ((record.juniorYouthMale + record.juniorYouthFemale) / total) * 100,
        fill: "#84cc16",
      }, // lime-400
      {
        name: "Sr Youth",
        value:
          ((record.seniorYouthMale + record.seniorYouthFemale) / total) * 100,
        fill: "#3b82f6",
      }, // blue-400
      {
        name: "Adults",
        value: ((record.adultMen + record.adultWomen) / total) * 100,
        fill: "#a855f7",
      }, // purple-500
      {
        name: "Visitors",
        value: ((record.visitorMale + record.visitorFemale) / total) * 100,
        fill: "#fb923c",
      }, // orange-400
    ];
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow border p-4">
        <div className="flex justify-between mb-2">
          <div className="flex gap-2 items-center">
            <div className="flex items-center space-x-3">
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
              <span className="text-sm font-medium">Detailed View</span>
            </div>
            <div className="flex gap-2 items-center ml-20 p-4">
              <span className="text-sm p-1.5 bg-[#EDEDED] rounded-xl text-black">
                {totalElements} Records
              </span>
              <span className="text-sm p-1.5 bg-[#EDEDED] rounded-xl text-black">
                {totalAttendance} Total Attendance
              </span>
            </div>
          </div>
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
              {records.length > 0 ? (
                records.map((row) => {
                  const chartData = getChartData(row);
                  return (
                    <tr key={row.id} className="text-center">
                      <td className="border p-2">
                        {new Date(row.serviceDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="border p-2">
                        <ServiceTypeTag type={row.serviceType} />
                      </td>
                      <td className="border p-2">{row.localAssembly}</td>
                      <td className="border p-2">{row.region}</td>
                      <td className="border p-2">
                        {row.boys} / {row.girls}
                      </td>
                      <td className="border p-2">
                        {row.juniorYouthMale} / {row.juniorYouthFemale}
                      </td>
                      <td className="border p-2">
                        {row.seniorYouthMale} / {row.seniorYouthFemale}
                      </td>
                      <td className="border p-2">
                        {row.adultMen} / {row.adultWomen}
                      </td>
                      <td className="border p-2">
                        {row.visitorMale} / {row.visitorFemale}
                      </td>
                      <td className="border p-2 font-bold">
                        {row.boys +
                          row.girls +
                          row.juniorYouthMale +
                          row.juniorYouthFemale +
                          row.seniorYouthMale +
                          row.seniorYouthFemale +
                          row.adultMen +
                          row.adultWomen +
                          row.visitorMale +
                          row.visitorFemale}
                      </td>
                      <td className="border p-2">
                        <div className="flex gap-[3px] justify-center items-center">
                          {chartData.map((entry, index) => (
                            <div
                              key={index}
                              className="rounded-md"
                              style={{
                                backgroundColor: entry.fill,
                                height: "16px",
                                width: `${
                                  entry.value > 0
                                    ? Math.max(entry.value, 10)
                                    : 10
                                }px`,
                              }}
                            ></div>
                          ))}
                        </div>
                      </td>

                      <td className="border p-2">{row.submittedBy}</td>
                      <td className="border p-2 flex justify-center gap-2">
                        <button
                          onClick={() => handleViewClick(row.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => handleEditClick(row.id)}
                          className="text-green-500 hover:text-green-700"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteClick(row.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="13"
                    className="border p-4 text-center text-gray-500"
                  >
                    No records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 px-4">
            <div className="text-sm text-gray-700">
              Showing {currentPage * 10 + 1} to{" "}
              {Math.min((currentPage + 1) * 10, totalElements)} of{" "}
              {totalElements} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={goToPrevious}
                disabled={currentPage === 0}
                className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 border rounded ${
                    page === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={goToNext}
                disabled={currentPage === totalPages - 1}
                className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <ViewModal
        record={selectedRecord}
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />
    </div>
  );
}
