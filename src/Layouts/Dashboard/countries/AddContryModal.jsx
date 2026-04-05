import { Globe, Layers, MapPin, Plus, Trash2, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useCreateOrUpdateCountry,
  useImportCountryCsv,
} from "../../../hooks/country-hook/useCountrySetup";
import { TreeNode } from "./CountryAdministrativeDivisions";

const normalizeGrandChildren = (grandChildren = []) =>
  grandChildren.map((gc) =>
    typeof gc === "string"
      ? { name: gc }
      : { id: gc?.id, name: gc?.name ?? gc },
  );

const normalizeChildren = (children = []) =>
  children.map((child) => ({
    id: child?.id,
    childName: child?.childName || "",
    grandChildren: normalizeGrandChildren(child?.grandChildren),
  }));

const normalizeParents = (parents = []) =>
  parents.map((parent) => ({
    id: parent?.id,
    parentName: parent?.parentName || "",
    children: normalizeChildren(parent?.children),
  }));

export function AddContryModal({ editingData, onClose, onSaved, showToast }) {
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
  const [parents, setParents] = useState(
    normalizeParents(editingData?.parents),
  );
  // const [loading, setLoading] = useState(false);
  const isEdit = !!editingData;
  const cls = (...a) => a.filter(Boolean).join(" ");

  useEffect(() => {
    setCountryName(editingData?.countryName ?? "");
    setDescription(editingData?.description ?? "");
    setParentLevel(editingData?.parentLevel ?? "");
    setChildLevel(editingData?.childLevel ?? "");
    setParents(normalizeParents(editingData?.parents));
  }, [editingData]);

  const csvMutation = useImportCountryCsv();

  const handleFileUpload = (file) => {
    if (!file) return;
    csvMutation.importCsv(file, {
      onSuccess: () => {
        showToast("CSV imported successfully.");
        onSaved();
      },
      onError: (err) => {
        showToast(err.response?.data?.message || "CSV upload failed.", "error");
      },
    });
  };

  const mutation = useCreateOrUpdateCountry();

  const loading = mutation.isPending || csvMutation?.isPending;

  const handleSubmit = () => {
    if (!countryName.trim()) {
      showToast("Country name is required.", "error");
      return;
    }

    const payload = {
      ...(isEdit && editingData?.id ? { id: editingData.id } : {}),
      countryName,
      description,
      parentLevel,
      childLevel,
      parents: parents.map((parent) => ({
        ...(parent.id ? { id: parent.id } : {}),
        parentName: parent.parentName,
        children: parent.children.map((child) => ({
          ...(child.id ? { id: child.id } : {}),
          childName: child.childName,
          grandChildren: child.grandChildren
            .filter((gc) => gc.name?.trim() || gc.id)
            .map((gc) => ({
              ...(gc.id ? { id: gc.id } : {}),
              name: gc.name,
            })),
        })),
      })),
    };

    mutation.createOrUpdate(payload, {
      onSuccess: () => {
        showToast(
          isEdit ? `${countryName} updated.` : `${countryName} created.`,
        );
        onSaved();
      },
      onError: (err) => {
        showToast(err.response?.data?.message || "Failed to save.", "error");
      },
    });
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
    setParents((prev) =>
      prev.map((parent, idx) =>
        idx !== pi
          ? parent
          : {
              ...parent,
              children: [
                ...parent.children,
                { childName: "", grandChildren: [] },
              ],
            },
      ),
    );
  };

  const updateChildName = (pi, ci, v) => {
    setParents((prev) =>
      prev.map((parent, pIndex) =>
        pIndex !== pi
          ? parent
          : {
              ...parent,
              children: parent.children.map((child, cIndex) =>
                cIndex !== ci ? child : { ...child, childName: v },
              ),
            },
      ),
    );
  };

  const removeChild = (pi, ci) => {
    setParents((prev) =>
      prev.map((parent, pIndex) =>
        pIndex !== pi
          ? parent
          : {
              ...parent,
              children: parent.children.filter((_, cIndex) => cIndex !== ci),
            },
      ),
    );
  };

  const addGrandChild = (pi, ci) => {
    setParents((prev) =>
      prev.map((parent, pIndex) =>
        pIndex !== pi
          ? parent
          : {
              ...parent,
              children: parent.children.map((child, cIndex) =>
                cIndex !== ci
                  ? child
                  : {
                      ...child,
                      grandChildren: [...child.grandChildren, { name: "" }],
                    },
              ),
            },
      ),
    );
  };

  const updateGrandChild = (pi, ci, gi, v) => {
    setParents((prev) =>
      prev.map((parent, pIndex) =>
        pIndex !== pi
          ? parent
          : {
              ...parent,
              children: parent.children.map((child, cIndex) =>
                cIndex !== ci
                  ? child
                  : {
                      ...child,
                      grandChildren: child.grandChildren.map((gc, gIndex) =>
                        gIndex !== gi ? gc : { ...gc, name: v },
                      ),
                    },
              ),
            },
      ),
    );
  };

  const removeGrandChild = (pi, ci, gi) => {
    setParents((prev) =>
      prev.map((parent, pIndex) =>
        pIndex !== pi
          ? parent
          : {
              ...parent,
              children: parent.children.map((child, cIndex) =>
                cIndex !== ci
                  ? child
                  : {
                      ...child,
                      grandChildren: child.grandChildren.filter(
                        (_, gIndex) => gIndex !== gi,
                      ),
                    },
              ),
            },
      ),
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
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
            <div className="px-6 pt-4 pb-3 border-b border-gray-100 shrink-0">
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
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
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
                            className="text-[10px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 whitespace-nowrap shrink-0"
                          >
                            <Plus size={10} /> {childLevel || "Child"}
                          </button>
                          <button
                            onClick={() => removeParent(pi)}
                            className="text-gray-300 hover:text-red-400 transition shrink-0"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        {/* Children */}
                        {parent.children.map((child, ci) => (
                          <div key={ci} className="ml-5 space-y-1.5">
                            <div className="flex gap-2 items-center">
                              <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
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
                                className="text-[10px] text-emerald-600 hover:text-emerald-800 font-semibold flex items-center gap-0.5 whitespace-nowrap shrink-0"
                              >
                                <Plus size={10} /> Local Assembly
                              </button>
                              <button
                                onClick={() => removeChild(pi, ci)}
                                className="text-gray-300 hover:text-red-400 transition shrink-0"
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
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                <input
                                  type="text"
                                  placeholder="Local Assembly name"
                                  value={gc.name ?? gc}
                                  onChange={(e) =>
                                    updateGrandChild(pi, ci, gi, e.target.value)
                                  }
                                  className="flex-1 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white"
                                />
                                <button
                                  onClick={() => removeGrandChild(pi, ci, gi)}
                                  className="text-gray-300 hover:text-red-400 transition shrink-0"
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
            <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex gap-3">
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
            <div className="px-6 py-4 border-b border-gray-100 shrink-0">
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
                                            typeof gc === "string"
                                              ? gc || `Local Assembly ${gi + 1}`
                                              : gc.name ||
                                                `Local Assembly ${gi + 1}`
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
