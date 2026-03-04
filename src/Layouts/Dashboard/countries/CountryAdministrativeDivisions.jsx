import { useState, useEffect, useCallback } from "react";
import {
  Upload,
  X,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Search,
  RefreshCw,
  Edit2,
  Eye,
  Globe,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Filter,
  Layers,
  MapPin,
} from "lucide-react";

import {
  createOrUpdateCountry,
  importCountryCsv,
  fetchAllHierarchies,
  deleteCountry,
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
        "fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium",
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

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteModal({ countryName, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4">
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

// ─── Tree Node — always open so preview shows all levels ─────────────────────
export function TreeNode({ label, children, level = 0 }) {
  // FIX #1: always start open so Local Assemblies (level 3) are visible in preview
  const [open, setOpen] = useState(true);

  const colors = [
    { bg: "bg-sky-50 border border-sky-200 text-sky-800", dot: "bg-sky-400" },
    {
      bg: "bg-violet-50 border border-violet-200 text-violet-800",
      dot: "bg-violet-400",
    },
    {
      bg: "bg-emerald-50 border border-emerald-200 text-emerald-800",
      dot: "bg-emerald-400",
    },
    {
      bg: "bg-amber-50 border border-amber-200 text-amber-800",
      dot: "bg-amber-400",
    },
  ];
  const c = colors[Math.min(level, colors.length - 1)];

  return (
    <div className={cls("relative", level > 0 && "ml-5 mt-1.5")}>
      {level > 0 && (
        <span className="absolute -left-3 top-4 w-3 h-px bg-gray-300" />
      )}
      <div
        onClick={() => children && setOpen(!open)}
        className={cls(
          "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide select-none",
          c.bg,
          children
            ? "cursor-pointer hover:brightness-95 transition-all"
            : "cursor-default",
        )}
      >
        <span className={cls("w-2 h-2 rounded-full flex-shrink-0", c.dot)} />
        <span className="flex-1">{label}</span>
        {children && (
          <span className="opacity-50">
            {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </span>
        )}
      </div>
      {open && children && (
        <div className="mt-1 pl-2 border-l border-gray-200">{children}</div>
      )}
    </div>
  );
}

// ─── View Modal ───────────────────────────────────────────────────────────────
export function ViewModal({ hierarchy, onClose }) {
  if (!hierarchy) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <Globe size={16} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">
                {hierarchy.countryName}
              </h2>
              {hierarchy.description && (
                <p className="text-xs text-gray-400">{hierarchy.description}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-2">
          <TreeNode label={`🌍 ${hierarchy.countryName}`}>
            {hierarchy.parents?.map((parent, pi) => (
              <TreeNode
                key={pi}
                label={parent.parentName || "Unnamed"}
                level={1}
              >
                {parent.children?.map((child, ci) => (
                  <TreeNode
                    key={ci}
                    label={child.childName || "Unnamed"}
                    level={2}
                  >
                    {child.grandChildren?.length > 0
                      ? child.grandChildren.map((gc, gi) => (
                          <TreeNode
                            key={gi}
                            label={gc || "Unnamed"}
                            level={3}
                          />
                        ))
                      : null}
                  </TreeNode>
                ))}
              </TreeNode>
            ))}
          </TreeNode>
        </div>
      </div>
    </div>
  );
}

// ─── Form Modal (Add / Edit) ──────────────────────────────────────────────────
export function FormModal({ editingData, onClose, onSaved, showToast }) {
  const [activeTab, setActiveTab] = useState("manual");
  const [countryName, setCountryName] = useState(
    editingData?.countryName ?? "",
  );
  const [description, setDescription] = useState(
    editingData?.description ?? "",
  );
  const [parentLevel, setParentLevel] = useState(
    editingData?.parentLevel ?? "",
  );
  const [childLevel, setChildLevel] = useState(editingData?.childLevel ?? "");
  const [parents, setParents] = useState(editingData?.parents ?? []);
  const [loading, setLoading] = useState(false);
  const isEdit = !!editingData;

  const handleFileUpload = async (file) => {
    if (!file) return;
    setLoading(true);
    try {
      await importCountryCsv(file);
      showToast("CSV imported successfully.");
      onSaved();
    } catch (err) {
      showToast(err.response?.data?.message || "CSV upload failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!countryName.trim()) {
      showToast("Country name is required.", "error");
      return;
    }
    setLoading(true);
    try {
      await createOrUpdateCountry({
        countryName,
        description,
        parentLevel,
        childLevel,
        parents,
      });
      showToast(isEdit ? `${countryName} updated.` : `${countryName} created.`);
      onSaved();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to save.", "error");
    } finally {
      setLoading(false);
    }
  };

  // hierarchy handlers
  const addParent = () =>
    setParents([...parents, { parentName: "", children: [] }]);
  const updateParentName = (i, v) => {
    const u = [...parents];
    u[i].parentName = v;
    setParents(u);
  };
  const removeParent = (i) => setParents(parents.filter((_, idx) => idx !== i));
  const addChild = (pi) => {
    const u = [...parents];
    u[pi].children.push({ childName: "", grandChildren: [] });
    setParents(u);
  };
  const updateChildName = (pi, ci, v) => {
    const u = [...parents];
    u[pi].children[ci].childName = v;
    setParents(u);
  };
  const removeChild = (pi, ci) => {
    const u = [...parents];
    u[pi].children = u[pi].children.filter((_, i) => i !== ci);
    setParents(u);
  };
  const addGrandChild = (pi, ci) => {
    const u = [...parents];
    u[pi].children[ci].grandChildren.push("");
    setParents(u);
  };
  const updateGrandChild = (pi, ci, gi, v) => {
    const u = [...parents];
    u[pi].children[ci].grandChildren[gi] = v;
    setParents(u);
  };
  const removeGrandChild = (pi, ci, gi) => {
    const u = [...parents];
    u[pi].children[ci].grandChildren = u[pi].children[ci].grandChildren.filter(
      (_, i) => i !== gi,
    );
    setParents(u);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <Globe size={16} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base">
                Country Administrative Divisions
              </h2>
              <p className="text-xs text-gray-400">
                {isEdit
                  ? `Editing: ${editingData.countryName}`
                  : "New Country Setup"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* LEFT — form */}
          <div className="flex flex-col w-full md:w-1/2 overflow-hidden">
            {/* Tabs */}
            <div className="px-6 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
              <div className="flex bg-gray-100 rounded-xl p-1 w-56">
                {["manual", "upload"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cls(
                      "flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition",
                      activeTab === tab
                        ? "bg-white text-blue-700 shadow-sm"
                        : "text-gray-500 hover:text-gray-700",
                    )}
                  >
                    {tab === "manual" ? "Manual Entry" : "Upload CSV"}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {/* CSV tab */}
              {activeTab === "upload" && (
                <label className="block border-dashed border-2 border-blue-300 rounded-2xl p-10 text-center cursor-pointer hover:bg-blue-50 transition group">
                  <Upload
                    className="mx-auto mb-3 text-blue-400 group-hover:text-blue-600"
                    size={28}
                  />
                  <p className="text-sm font-medium text-blue-600 mb-1">
                    Click to upload CSV
                  </p>
                  <p className="text-xs text-gray-400">
                    Format: ParentName, ChildName, "GC1|GC2|GC3"
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    disabled={loading}
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                  />
                </label>
              )}

              {/* Manual tab */}
              {activeTab === "manual" && (
                <div className="space-y-3">
                  {/* Country Name + Description */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1">
                        Country Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ghana"
                        value={countryName}
                        onChange={(e) => setCountryName(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        placeholder="Optional description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                      />
                    </div>
                  </div>

                  {/* Parent Level + Child Level */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1">
                        <span className="inline-flex items-center gap-1">
                          <Layers size={10} /> Parent Level
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Region"
                        value={parentLevel}
                        onChange={(e) => setParentLevel(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1">
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={10} /> Child Level
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. District"
                        value={childLevel}
                        onChange={(e) => setChildLevel(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                      />
                    </div>
                  </div>

                  {/* Hierarchy builder */}
                  <div className="pt-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                        Hierarchy
                      </h3>
                      <button
                        onClick={addParent}
                        className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                      >
                        <Plus size={12} /> Add {parentLevel || "Parent"}
                      </button>
                    </div>

                    {parents.length === 0 && (
                      <div className="text-xs text-gray-400 text-center py-5 border border-dashed border-gray-200 rounded-xl">
                        No divisions added yet. Click "Add{" "}
                        {parentLevel || "Parent"}" to start.
                      </div>
                    )}

                    {parents.map((parent, pi) => (
                      <div
                        key={pi}
                        className="border border-gray-200 rounded-xl p-3 bg-sky-50/30 space-y-2"
                      >
                        {/* Parent row */}
                        <div className="flex gap-2 items-center">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
                          <input
                            type="text"
                            placeholder={`${parentLevel || "Parent"} name`}
                            value={parent.parentName}
                            onChange={(e) =>
                              updateParentName(pi, e.target.value)
                            }
                            className="flex-1 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
                          />
                          <button
                            onClick={() => addChild(pi)}
                            className="text-[10px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 whitespace-nowrap flex-shrink-0"
                          >
                            <Plus size={10} /> {childLevel || "Child"}
                          </button>
                          <button
                            onClick={() => removeParent(pi)}
                            className="text-gray-300 hover:text-red-400 transition flex-shrink-0"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        {/* Children */}
                        {parent.children.map((child, ci) => (
                          <div key={ci} className="ml-5 space-y-1.5">
                            <div className="flex gap-2 items-center">
                              <span className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                              <input
                                type="text"
                                placeholder={`${childLevel || "Child"} name`}
                                value={child.childName}
                                onChange={(e) =>
                                  updateChildName(pi, ci, e.target.value)
                                }
                                className="flex-1 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/20 bg-white"
                              />
                              <button
                                onClick={() => addGrandChild(pi, ci)}
                                className="text-[10px] text-emerald-600 hover:text-emerald-800 font-semibold flex items-center gap-0.5 whitespace-nowrap flex-shrink-0"
                              >
                                <Plus size={10} /> Local Assembly
                              </button>
                              <button
                                onClick={() => removeChild(pi, ci)}
                                className="text-gray-300 hover:text-red-400 transition flex-shrink-0"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>

                            {/* Grandchildren / Local Assemblies */}
                            {child.grandChildren.map((gc, gi) => (
                              <div
                                key={gi}
                                className="ml-5 flex gap-2 items-center"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                <input
                                  type="text"
                                  placeholder="Local Assembly name"
                                  value={gc}
                                  onChange={(e) =>
                                    updateGrandChild(pi, ci, gi, e.target.value)
                                  }
                                  className="flex-1 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white"
                                />
                                <button
                                  onClick={() => removeGrandChild(pi, ci, gi)}
                                  className="text-gray-300 hover:text-red-400 transition flex-shrink-0"
                                >
                                  <Trash2 size={11} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : isEdit
                    ? "Update Structure"
                    : "Save Structure"}
              </button>
            </div>
          </div>

          {/* RIGHT — live preview (FIX #1: grandchildren always visible) */}
          <div className="hidden md:flex flex-col w-1/2 overflow-hidden border-l border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <p className="text-sm font-bold text-gray-700">Live Preview</p>
              <p className="text-xs text-gray-400">Updates as you type</p>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {!countryName ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-300">
                  <Globe size={28} />
                  <p className="text-xs">Enter a country name to see preview</p>
                </div>
              ) : (
                <TreeNode label={`🌍 ${countryName}`}>
                  {parents.length > 0
                    ? parents.map((parent, pi) => (
                        <TreeNode
                          key={pi}
                          label={
                            parent.parentName ||
                            `${parentLevel || "Parent"} ${pi + 1}`
                          }
                          level={1}
                        >
                          {parent.children.length > 0
                            ? parent.children.map((child, ci) => (
                                <TreeNode
                                  key={ci}
                                  label={
                                    child.childName ||
                                    `${childLevel || "Child"} ${ci + 1}`
                                  }
                                  level={2}
                                >
                                  {child.grandChildren.length > 0
                                    ? child.grandChildren.map((gc, gi) => (
                                        <TreeNode
                                          key={gi}
                                          label={
                                            gc || `Local Assembly ${gi + 1}`
                                          }
                                          level={3}
                                        />
                                      ))
                                    : null}
                                </TreeNode>
                              ))
                            : null}
                        </TreeNode>
                      ))
                    : null}
                </TreeNode>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Country Card ─────────────────────────────────────────────────────────────
function CountryCard({ hierarchy, onEdit, onDelete, onView }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const parentCount = hierarchy.parents?.length ?? 0;
  const childCount =
    hierarchy.parents?.reduce((s, p) => s + (p.children?.length ?? 0), 0) ?? 0;
  const grandCount =
    hierarchy.parents?.reduce(
      (s, p) =>
        s +
        (p.children?.reduce(
          (cs, c) => cs + (c.grandChildren?.length ?? 0),
          0,
        ) ?? 0),
      0,
    ) ?? 0;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Globe size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm leading-tight">
              {hierarchy.countryName}
            </h3>
            {hierarchy.description && (
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                {hierarchy.description}
              </p>
            )}
          </div>
        </div>
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
          >
            <MoreVertical size={15} />
          </button>
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-8 z-20 bg-white border border-gray-100 rounded-xl shadow-xl py-1 w-36 text-xs">
                <button
                  onClick={() => {
                    onView(hierarchy);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50 text-gray-700"
                >
                  <Eye size={13} /> View
                </button>
                <button
                  onClick={() => {
                    onEdit(hierarchy);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50 text-gray-700"
                >
                  <Edit2 size={13} /> Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(hierarchy.countryName);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-red-50 text-red-600"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-1.5 mb-4 flex-wrap">
        {hierarchy.parentLevel && (
          <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-semibold">
            {hierarchy.parentLevel}
          </span>
        )}
        {hierarchy.childLevel && (
          <span className="text-[10px] bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">
            {hierarchy.childLevel}
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Parents",
            count: parentCount,
            color: "text-sky-600 bg-sky-50",
          },
          {
            label: "Children",
            count: childCount,
            color: "text-violet-600 bg-violet-50",
          },
          {
            label: "Grandchildren",
            count: grandCount,
            color: "text-emerald-600 bg-emerald-50",
          },
        ].map(({ label, count, color }) => (
          <div key={label} className={cls("rounded-xl p-2 text-center", color)}>
            <div className="text-base font-bold leading-none">{count}</div>
            <div className="text-[9px] font-medium mt-0.5 opacity-70">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DEFAULT EXPORT — Card-grid modal
// ═══════════════════════════════════════════════════════════════════════════════
export default function CountryAdministrativeDivisions({
  isOpen,
  onClose,
  onRefreshStats,
}) {
  const [hierarchies, setHierarchies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterParentLevel, setFilterParentLevel] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [viewTarget, setViewTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => setToast({ message, type });

  const loadHierarchies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchAllHierarchies();
      const data = res.data ?? [];
      setHierarchies(data);
      onRefreshStats?.(data);
    } catch {
      showToast("Failed to load countries.", "error");
    } finally {
      setLoading(false);
    }
  }, [onRefreshStats]);

  useEffect(() => {
    if (isOpen) loadHierarchies();
  }, [isOpen, loadHierarchies]);

  if (!isOpen) return null;

  const displayed = hierarchies.filter((h) => {
    if (search && !h.countryName?.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (filterParentLevel && h.parentLevel !== filterParentLevel) return false;
    return true;
  });

  const parentLevelOptions = [
    ...new Set(hierarchies.map((h) => h.parentLevel).filter(Boolean)),
  ];
  const hasFilters = search || filterParentLevel;

  const openNew = () => {
    setEditingData(null);
    setFormOpen(true);
  };
  const openEdit = (h) => {
    setEditingData(h);
    setFormOpen(true);
  };
  const onSaved = () => {
    setFormOpen(false);
    setEditingData(null);
    loadHierarchies();
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteCountry(deleteTarget);
      showToast(`${deleteTarget} deleted.`);
      setDeleteTarget(null);
      loadHierarchies();
    } catch (err) {
      showToast(err.response?.data?.message || "Delete failed.", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-3">
        <div className="bg-white w-full max-w-7xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <Globe size={17} className="text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900 leading-tight">
                  Country Administrative Divisions
                </h1>
                <p className="text-xs text-gray-400">
                  {hierarchies.length} countr
                  {hierarchies.length !== 1 ? "ies" : "y"} configured
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={loadHierarchies}
                disabled={loading}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800 transition"
                title="Refresh"
              >
                <RefreshCw
                  size={15}
                  className={loading ? "animate-spin" : ""}
                />
              </button>
              <button
                onClick={openNew}
                className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                <Plus size={14} /> Add Country
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Filter bar */}
          <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/60 flex-shrink-0">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-56">
                <Search
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                />
              </div>
              <div className="relative">
                <Filter
                  size={12}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  value={filterParentLevel}
                  onChange={(e) => setFilterParentLevel(e.target.value)}
                  className="pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 appearance-none cursor-pointer min-w-[190px]"
                >
                  <option value="">Filter by parent level...</option>
                  {parentLevelOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
              {hasFilters && (
                <button
                  onClick={() => {
                    setSearch("");
                    setFilterParentLevel("");
                  }}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition"
                >
                  <X size={12} /> Clear
                </button>
              )}
              <span className="ml-auto text-xs text-gray-400">
                {displayed.length} of {hierarchies.length} shown
              </span>
            </div>
          </div>

          {/* Card grid */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex items-center justify-center h-48 gap-3 text-gray-400">
                <RefreshCw size={18} className="animate-spin" />
                <span className="text-sm">Loading countries...</span>
              </div>
            ) : displayed.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                  <Globe size={24} className="text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-500">
                  {hierarchies.length === 0
                    ? "No countries configured yet"
                    : "No results match your filter"}
                </p>
                <p className="text-xs text-gray-400">
                  {hierarchies.length === 0
                    ? "Click 'Add Country' to get started"
                    : "Try adjusting your search or filters"}
                </p>
                {hierarchies.length === 0 && (
                  <button
                    onClick={openNew}
                    className="mt-2 flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                  >
                    <Plus size={13} /> Add Country
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayed.map((h, i) => (
                  <CountryCard
                    key={h.countryName ?? i}
                    hierarchy={h}
                    onEdit={openEdit}
                    onDelete={setDeleteTarget}
                    onView={setViewTarget}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {formOpen && (
        <FormModal
          editingData={editingData}
          onClose={() => {
            setFormOpen(false);
            setEditingData(null);
          }}
          onSaved={onSaved}
          showToast={showToast}
        />
      )}
      {viewTarget && (
        <ViewModal hierarchy={viewTarget} onClose={() => setViewTarget(null)} />
      )}
      {deleteTarget && (
        <DeleteModal
          countryName={deleteTarget}
          onConfirm={handleDelete}
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
    </>
  );
}
