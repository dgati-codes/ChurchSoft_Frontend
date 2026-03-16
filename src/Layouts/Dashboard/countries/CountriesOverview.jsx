import {
  AlertCircle,
  CheckCircle2,
  CircleDot,
  Clock,
  Download,
  Edit2,
  Eye,
  Globe,
  Network,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import CountryAdministrativeDivisions, {
  ViewModal,
} from "./CountryAdministrativeDivisions";
import { AddContryModal } from "./AddContryModal";

import {
  deleteCountry,
  fetchAllHierarchies,
} from "../../../api/services/countrySetupService";

const cls = (...a) => a.filter(Boolean).join(" ");

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div
      className={cls(
        "fixed bottom-6 right-6 z-9999 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium",
        type === "success"
          ? "bg-emerald-600 text-white"
          : "bg-red-600 text-white",
      )}
    >
      {type === "success" ? (
        <CheckCircle2 size={16} />
      ) : (
        <AlertCircle size={16} />
      )}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────
function DeleteModal({ countryName, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-70 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-red-600" />
        </div>
        <h3 className="font-bold text-gray-900 mb-2">Delete Country</h3>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete <strong>{countryName}</strong> and all
          its administrative divisions? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Name pill list ───────────────────────────────────────────────────────────
// Renders a comma-separated list of name pills, truncated with "+N more" if long
function NamePills({ names = [], color = "bg-gray-100 text-gray-600" }) {
  const MAX = 3;
  const visible = names.slice(0, MAX);
  const extra = names.length - MAX;
  if (names.length === 0)
    return <span className="text-gray-300 text-xs">—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((name, i) => (
        <span
          key={i}
          className={cls(
            "text-[11px] font-medium px-2 py-0.5 rounded-full",
            color,
          )}
        >
          {name}
        </span>
      ))}
      {extra > 0 && (
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
          +{extra} more
        </span>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COUNTRIES OVERVIEW — main page
// ═══════════════════════════════════════════════════════════════════════════════
export default function CountriesOverview() {
  // FIX #2: "Add Country" now opens FormModal directly (not card-grid modal)
  const [showAddForm, setShowAddForm] = useState(false);
  // card-grid modal still accessible via a separate trigger if needed
  const [showDivisions, setShowDivisions] = useState(false);

  // live stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    totalParents: 0,
    lastUpdated: null,
  });

  // table state
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  // table filters
  const [tableSearch, setTableSearch] = useState("");
  const [tableContinent, setTableContinent] = useState("");
  const [tableStatus, setTableStatus] = useState("");

  // table row modals
  const [viewTarget, setViewTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => setToast({ message, type });

  const deriveStats = (data) => {
    const totalParents = data.reduce((s, h) => s + (h.parents?.length ?? 0), 0);
    setStats({
      total: data.length,
      active: data.filter((h) => h.status !== "Inactive").length,
      totalParents,
      lastUpdated: data.length > 0 ? new Date() : null,
    });
  };

  const loadTableData = useCallback(async () => {
    setTableLoading(true);
    try {
      const res = await fetchAllHierarchies();
      const data = res.data ?? [];
      setTableData(data);
      deriveStats(data);
    } catch {
      showToast("Failed to load data.", "error");
    } finally {
      setTableLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTableData();
  }, [loadTableData]);

  const handleRefreshStats = useCallback((data) => {
    deriveStats(data);
    setTableData(data);
  }, []);

  const handleDeleteFromTable = async () => {
    setDeleteLoading(true);
    try {
      await deleteCountry(deleteTarget);
      showToast(`${deleteTarget} deleted.`);
      setDeleteTarget(null);
      loadTableData();
    } catch (err) {
      showToast(err.response?.data?.message || "Delete failed.", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = [
      "Country Name",
      "Parent Level",
      "Child Level",
      "Parents",
      "Children",
      "Grandchildren",
    ];
    const rows = tableData.map((h) => {
      const parentNames = h.parents?.map((p) => p.parentName).join("|") ?? "";
      const childNames =
        h.parents
          ?.flatMap((p) => p.children?.map((c) => c.childName) ?? [])
          .join("|") ?? "";
      const grandNames =
        h.parents
          ?.flatMap(
            (p) => p.children?.flatMap((c) => c.grandChildren ?? []) ?? [],
          )
          .join("|") ?? "";
      return [
        h.countryName,
        h.parentLevel ?? "",
        h.childLevel ?? "",
        parentNames,
        childNames,
        grandNames,
      ].join(",");
    });
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "countries.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredRows = tableData.filter((h) => {
    if (
      tableSearch &&
      !h.countryName?.toLowerCase().includes(tableSearch.toLowerCase())
    )
      return false;
    if (tableStatus === "Active" && h.status === "Inactive") return false;
    if (tableStatus === "Inactive" && h.status !== "Inactive") return false;
    return true;
  });

  const statCards = [
    {
      label: "Total Countries",
      value: stats.total,
      sub: "Configured in system",
      icon: <Globe className="w-5 h-5 text-yellow-500" />,
      isDate: false,
    },
    {
      label: "Parent Levels",
      value: stats.totalParents,
      sub: "Total across all countries",
      icon: <Network className="w-5 h-5 text-green-600" />,
      isDate: false,
    },
    {
      label: "Active Countries",
      value: stats.active,
      sub: "Currently active",
      icon: <CircleDot className="w-5 h-5 text-green-600" />,
      isDate: false,
    },
    {
      label: "Last Updated",
      value: stats.lastUpdated
        ? stats.lastUpdated.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "—",
      sub: "Most recent change",
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      isDate: true,
    },
  ];

  return (
    <div className="font-[DM_Sans,sans-serif] mt-10 bg-gray-50 min-h-screen px-6 pb-10">
      {/* ── Page Header ── */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Countries Hierarchy Overview
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Provide an overview of all configured countries and their hierarchy
            details
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadTableData}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition"
          >
            <RefreshCw size={15} /> Refresh
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition"
          >
            <Download size={15} /> Export
          </button>
          {/* FIX #2: opens FormModal directly */}
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-sm font-medium transition"
          >
            <Plus size={15} /> Add Country
          </button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-3">
          
          <h2 className="text-sm font-semibold text-gray-700">Filters</h2>
          <button
            onClick={() => {
              setTableSearch("");
              setTableContinent("");
              setTableStatus("");
            }}
            className="text-xs text-red-500 hover:underline"
          >
            Clear All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search countries..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <select
            value={tableContinent}
            onChange={(e) => setTableContinent(e.target.value)}
            className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All continents</option>
            <option>Africa</option>
            <option>Europe</option>
            <option>Asia</option>
            <option>North America</option>
            <option>South America</option>
          </select>
          <select
            value={tableStatus}
            onChange={(e) => setTableStatus(e.target.value)}
            className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All statuses</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {statCards.map(({ label, value, sub, icon, isDate }) => (
          <div
            key={label}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-1"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{label}</span>
              {icon}
            </div>
            <p
              className={cls(
                "font-bold leading-tight",
                isDate ? "text-base text-blue-600" : "text-2xl text-gray-900",
              )}
            >
              {value}
            </p>
            <span className="text-xs text-gray-400">{sub}</span>
          </div>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Configured Countries Overview
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                {[
                  "Country Name",
                  "Parent Level Name",
                  "Child Level Name",
                  // FIX #3: names, not counts
                  "Parents",
                  "Children",
                  "Grandchildren",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 font-semibold border-b border-gray-100 whitespace-nowrap text-xs uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableLoading && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw size={15} className="animate-spin" />{" "}
                      Loading...
                    </div>
                  </td>
                </tr>
              )}

              {!tableLoading && filteredRows.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-12 text-gray-400 text-sm"
                  >
                    {tableData.length === 0
                      ? "No countries configured yet."
                      : "No results match your filters."}
                  </td>
                </tr>
              )}

              {!tableLoading &&
                filteredRows.map((h, i) => {
                  // FIX #3: extract actual names
                  const parentNames =
                    h.parents?.map((p) => p.parentName).filter(Boolean) ?? [];
                  const childNames =
                    h.parents?.flatMap(
                      (p) =>
                        p.children?.map((c) => c.childName).filter(Boolean) ??
                        [],
                    ) ?? [];
                  const grandNames =
                    h.parents?.flatMap(
                      (p) =>
                        p.children?.flatMap(
                          (c) => c.grandChildren?.filter(Boolean) ?? [],
                        ) ?? [],
                    ) ?? [];

                  return (
                    <tr
                      key={h.countryName ?? i}
                      className="border-b border-gray-100 hover:bg-gray-50/40 transition"
                    >
                      {/* Country Name */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                            <Globe size={13} className="text-blue-600" />
                          </div>
                          <span className="font-semibold text-gray-900">
                            {h.countryName}
                          </span>
                        </div>
                      </td>

                      {/* Parent Level Name */}
                      <td className="px-4 py-3">
                        {h.parentLevel ? (
                          <span className="bg-sky-100 text-sky-700 text-xs font-medium px-2 py-0.5 rounded-full">
                            {h.parentLevel}
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>

                      {/* Child Level Name */}
                      <td className="px-4 py-3">
                        {h.childLevel ? (
                          <span className="bg-violet-100 text-violet-700 text-xs font-medium px-2 py-0.5 rounded-full">
                            {h.childLevel}
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>

                      {/* FIX #3: Parent names */}
                      <td className="px-4 py-3 max-w-40">
                        <NamePills
                          names={parentNames}
                          color="bg-sky-50 text-sky-700"
                        />
                      </td>

                      {/* FIX #3: Child names */}
                      <td className="px-4 py-3 max-w-40">
                        <NamePills
                          names={childNames}
                          color="bg-violet-50 text-violet-700"
                        />
                      </td>

                      {/* FIX #3: Grandchild names */}
                      <td className="px-4 py-3 max-w-45">
                        <NamePills
                          names={grandNames}
                          color="bg-emerald-50 text-emerald-700"
                        />
                      </td>

                      {/* FIX #3: Actions — always visible */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setViewTarget(h)}
                            className="p-1.5 hover:bg-blue-100 rounded-lg text-gray-400 hover:text-blue-600 transition"
                            title="View"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => setEditTarget(h)}
                            className="p-1.5 hover:bg-amber-100 rounded-lg text-gray-400 hover:text-amber-600 transition"
                            title="Edit"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(h.countryName)}
                            className="p-1.5 hover:bg-red-100 rounded-lg text-gray-400 hover:text-red-600 transition"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── FIX #2: Add Country → FormModal directly ── */}
      {showAddForm && (
        <AddContryModal
          editingData={null}
          onClose={() => setShowAddForm(false)}
          onSaved={() => {
            setShowAddForm(false);
            loadTableData();
          }}
          showToast={showToast}
        />
      )}

      {/* ── Card-grid modal (still available if navigated to) ── */}
      <CountryAdministrativeDivisions
        isOpen={showDivisions}
        onClose={() => {
          setShowDivisions(false);
          loadTableData();
        }}
        onRefreshStats={handleRefreshStats}
      />

      {/* ── Edit from table row ── */}
      {editTarget && (
        <AddContryModal
          editingData={editTarget}
          onClose={() => setEditTarget(null)}
          onSaved={() => {
            setEditTarget(null);
            loadTableData();
          }}
          showToast={showToast}
        />
      )}

      {/* ── View from table row ── */}
      {viewTarget && (
        <ViewModal hierarchy={viewTarget} onClose={() => setViewTarget(null)} />
      )}

      {/* ── Delete from table row ── */}
      {deleteTarget && (
        <DeleteModal
          countryName={deleteTarget}
          onConfirm={handleDeleteFromTable}
          onCancel={() => setDeleteTarget(null)}
          loading={deleteLoading}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
