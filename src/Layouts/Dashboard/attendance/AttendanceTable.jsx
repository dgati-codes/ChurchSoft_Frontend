import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  Eye,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import ViewModal from "./Attendance-ViewModal";
import ServiceTypeTag from "./AttendanceSeviceTypeTag";

// Service type label with colors (flexible)
<ServiceTypeTag />;
// View Modal
<ViewModal />;

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
  // const [enabled, setEnabled] = useState(true);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const totalAttendance = records.reduce((sum, record) => {
    return (
      sum +
      record.boys +
      record.girls +
      record.juniorYouthMale +
      record.juniorYouthFemale +
      record.seniorYouthMale +
      record.seniorYouthFemale +
      record.adultMen +
      record.adultWomen +
      record.visitorMale +
      record.visitorFemale
    );
  }, 0);

  const handleViewClick = async (id) => {
    const record = await onView(id);
    if (record) {
      setSelectedRecord(record);
      setViewModalOpen(true);
    }
  };

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
  const handleEditClick = (id) => onEdit(id);
  const handleDeleteClick = (id) => onDelete(id);

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
      { name: "Children", value: record.boys + record.girls, fill: "#f87171" },
      {
        name: "Jr Youth",
        value: record.juniorYouthMale + record.juniorYouthFemale,
        fill: "#84cc16",
      },
      {
        name: "Sr Youth",
        value: record.seniorYouthMale + record.seniorYouthFemale,
        fill: "#3b82f6",
      },
      {
        name: "Adults",
        value: record.adultMen + record.adultWomen,
        fill: "#a855f7",
      },
      {
        name: "Visitors",
        value: record.visitorMale + record.visitorFemale,
        fill: "#fb923c",
      },
    ];
  };

  return (
    <div className=" w-full font-[DM Sans] ">
      <div className="bg-white rounded-lg shadow border p-8">
        <div className="flex justify-between mb-2">
          <div className="flex gap-2 items-center">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className={` inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showDetails ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={` h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showDetails ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              {showDetails ? "Hide Details" : "View Details"}
            </div>
            <div className="flex gap-2 items-center  p-4">
              <span className="text-sm p-1.5 bg-[#EDEDED] rounded-xl text-black">
                {totalElements} Records
              </span>
              <span className="text-sm p-1.5 bg-[#EDEDED] rounded-xl text-black">
                {totalAttendance} Total Attendance
              </span>
            </div>
          </div>
        </div>
        <div className="">
          {!showDetails && (
            <table className=" border text-xs w-full">
              <thead className="bg-gray-100">
                <tr className="">
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
                  <th className="border text-sm p-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {records.length > 0 ? (
                  records.map((row) => {
                    const chartData = getChartData(row);
                    return (
                      <tr key={row.id} className="text-center h-2">
                        <td className="border  p-2">
                          {new Date(row.serviceDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </td>

                        <td className="border p-2">
                          <ServiceTypeTag type={row.serviceType} />
                        </td>

                        <td className="border p-2">{row.localAssembly}</td>
                        <td className="border p-2">{row.region}</td>

                        <td className="border p-2">{row.boys + row.girls}</td>
                        <td className="border p-2">
                          {row.juniorYouthMale + row.juniorYouthFemale}
                        </td>
                        <td className="border p-2">
                          {row.seniorYouthMale + row.seniorYouthFemale}
                        </td>
                        <td className="border p-2">
                          {row.adultMen + row.adultWomen}
                        </td>
                        <td className="border p-2">
                          {row.visitorMale + row.visitorFemale}
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
                          <div className="flex w-15 gap-1 justify-center items-center">
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
                        <td className="border  text-center space-x-2">
                          <Eye
                            className="inline w-4 h-4 text-black cursor-pointer"
                            onClick={() => handleViewClick(row.id)}
                          />
                          <Edit
                            className="inline w-4 h-4 text-black cursor-pointer"
                            onClick={() => handleEditClick(row.id)}
                          />
                          <Trash2
                            className="inline w-4 h-4 text-red-500 cursor-pointer"
                            onClick={() => handleDeleteClick(row.id)}
                          />
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
          )}

          {/* DETAIL VIEW TABLE REMAINS UNTOUCHED */}
          {showDetails && (
            <table className="w-full border text-xs">
              <thead className="bg-gray-100">
                <tr className="text-sm">
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Service Type</th>
                  <th className="border p-2">Assembly</th>
                  <th className="border p-2">Region</th>
                  <th colSpan={2} className="border p-2">
                    Children
                  </th>
                  <th colSpan={2} className="border p-2">
                    Jr. Youth
                  </th>
                  <th colSpan={2} className="border p-2">
                    Sr. Youth
                  </th>
                  <th colSpan={2} className="border p-2">
                    Adults
                  </th>
                  <th className="border p-2">Visitors</th>
                  <th className="border p-2">Total</th>
                  <th className="border p-2">Chart</th>
                  <th className="border p-2">Submitted By</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>

              {/* SECOND HEADER */}
              <thead className="bg-gray-50 text-xs">
                <tr className="h-2 text-sm">
                  <th colSpan={4} className="border  py-2"></th>
                  <th className="border  py-2">Boys</th>
                  <th className="border  py-2">Girls</th>
                  <th className="border  py-2"> M</th>
                  <th className="border  py-2"> F</th>
                  <th className="border  py-2"> M</th>
                  <th className="border  py-2">F</th>
                  <th className="border  py-2">M</th>
                  <th className="border  py-2">W</th>
                  <th className="border  py-2">Visitors</th>
                </tr>
              </thead>

              <tbody>
                {records.length > 0 ? (
                  records.map((row) => {
                    const chartData = getChartData(row);
                    return (
                      <tr key={row.id} className="text-center">
                        <td className="border px-3 py-2">
                          {new Date(row.serviceDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </td>

                        <td className="border px-3 py-2">
                          <ServiceTypeTag type={row.serviceType} />
                        </td>

                        <td className="border px-3 py-2">
                          {row.localAssembly}
                        </td>
                        <td className="border px-3 py-2">{row.region}</td>

                        <td className=" border-r-0 border-b  p-2">
                          {row.boys}
                        </td>
                        <td className="border px-3 py-2">{row.girls}</td>
                        <td className="border px-3 py-2">
                          {row.juniorYouthMale}
                        </td>
                        <td className="border px-3 py-2">
                          {row.juniorYouthFemale}
                        </td>
                        <td className="border px-3 py-2">
                          {row.seniorYouthMale}
                        </td>
                        <td className="border px-3 py-2">
                          {row.seniorYouthFemale}
                        </td>
                        <td className="border px-3 py-2">{row.adultMen}</td>
                        <td className="border px-3 py-2">{row.adultWomen}</td>
                        <td className="border px-3 py-2">
                          {row.visitorMale + row.visitorFemale}
                        </td>

                        <td className="border px-3 py-2 font-bold">
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

                        <td className="border px-3 py-2">
                          <div className="flex w-10 gap-1 justify-center items-center">
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

                        <td className="border px-3 py-2">{row.submittedBy}</td>

                        <td className="border  text-center space-x-2">
                          <Eye
                            className="inline w-4 h-4  text-black cursor-pointer"
                            onClick={() => handleViewClick(row.id)}
                          />
                          <Edit
                            className="inline w-4 h-4 text-black cursor-pointer"
                            onClick={() => handleEditClick(row.id)}
                          />
                          <Trash2
                            className="inline w-4 h-4 text-red-500 cursor-pointer"
                            onClick={() => handleDeleteClick(row.id)}
                          />
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
          )}
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* PAGINATION INSERTED HERE – NO LOGIC MODIFIED */}
        {/* ------------------------------------------------------------------- */}

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 px-4">
            <div className="text-sm text-gray-700">
              Showing {currentPage * 10 + 1} to{" "}
              {Math.min((currentPage + 1) * 10, totalElements)} of{" "}
              {totalElements} results
            </div>

            <div className="flex items-center gap-2">
              <ChevronsLeft
                onClick={goToPrevious}
                disabled={currentPage === 0}
                className="w-4 h-4 cursor-pointer"
              />

              {getPageNumbers().map((page) => (
                <ChevronLeft
                  key={page}
                  disabled={currentPage === 0}
                  onClick={() => goToPage(page)}
                  className="w-4 h-4 cursor-pointer"
                />
              ))}

              <ChevronRight
                onClick={goToNext}
                disabled={currentPage === totalPages + 1}
                className="w-4 h-4 cursor-pointer"
              />

              <ChevronsRight
                onClick={goToNext}
                disabled={currentPage === totalPages + 1}
                className="w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
        )}

        <ViewModal
          record={selectedRecord}
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
        />
      </div>
    </div>
  );
}
