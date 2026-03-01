import { useState } from "react";
import {
  Upload,
  X,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function CountryAdministrativeDivisions({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("manual");

  const [countryName, setCountryName] = useState("");
  const [description, setDescription] = useState("");
  const [parentLevel, setParentLevel] = useState("");
  const [childLevel, setChildLevel] = useState("");
  const [parents, setParents] = useState([]);

  if (!isOpen) return null;

  // ==============================
  // CSV Upload Handler
  // ==============================
  const handleFileUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split("\n").filter((r) => r.trim() !== "");

      if (!rows.length) return;

      // Optionally, take first row to populate countryName, parentLevel, childLevel
      // Assuming CSV does not contain those, skip this for now

      const structured = [];

      rows.forEach((row) => {
        // Expected format: ParentName,ChildName,"Grand1|Grand2|Grand3"
        const [parentName, childName, grandRaw] = row.split(",");

        const grandChildren = grandRaw
          ? grandRaw
              .replace(/"/g, "")
              .split("|")
              .map((g) => g.trim())
          : [];

        let parent = structured.find((p) => p.parentName === parentName.trim());

        if (!parent) {
          parent = { parentName: parentName.trim(), children: [] };
          structured.push(parent);
        }

        parent.children.push({ childName: childName.trim(), grandChildren });
      });

      setParents(structured);
    };
    reader.readAsText(file);
  };

  // ==============================
  // Parent Handlers
  // ==============================
  const addParent = () =>
    setParents([...parents, { parentName: "", children: [] }]);
  const updateParentName = (i, v) => {
    const updated = [...parents];
    updated[i].parentName = v;
    setParents(updated);
  };
  const removeParent = (i) => setParents(parents.filter((_, idx) => idx !== i));

  // ==============================
  // Child Handlers
  // ==============================
  const addChild = (pIndex) => {
    const updated = [...parents];
    updated[pIndex].children.push({ childName: "", grandChildren: [] });
    setParents(updated);
  };
  const updateChildName = (pIndex, cIndex, value) => {
    const updated = [...parents];
    updated[pIndex].children[cIndex].childName = value;
    setParents(updated);
  };
  const removeChild = (pIndex, cIndex) => {
    const updated = [...parents];
    updated[pIndex].children = updated[pIndex].children.filter(
      (_, i) => i !== cIndex,
    );
    setParents(updated);
  };

  // ==============================
  // Grandchildren Handlers
  // ==============================
  const addGrandChild = (pIndex, cIndex) => {
    const updated = [...parents];
    updated[pIndex].children[cIndex].grandChildren.push("");
    setParents(updated);
  };
  const updateGrandChild = (pIndex, cIndex, gcIndex, value) => {
    const updated = [...parents];
    updated[pIndex].children[cIndex].grandChildren[gcIndex] = value;
    setParents(updated);
  };
  const removeGrandChild = (pIndex, cIndex, gcIndex) => {
    const updated = [...parents];
    updated[pIndex].children[cIndex].grandChildren = updated[pIndex].children[
      cIndex
    ].grandChildren.filter((_, i) => i !== gcIndex);
    setParents(updated);
  };

  const handleSubmit = () => {
    const payload = {
      countryName,
      description,
      parentLevel,
      childLevel,
      parents,
    };
    console.log(payload);
  };

  // ==============================
  // Tree Component
  // ==============================
  const TreeNode = ({ label, children, level = 0 }) => {
    const [open, setOpen] = useState(true);
    const levelStyles = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-orange-100 text-orange-800",
    ];

    return (
      <div className="ml-4 relative">
        <div className="absolute left-0 top-4 bottom-0 w-px bg-gray-300" />
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition hover:shadow-sm ${levelStyles[level]}`}
          onClick={() => setOpen(!open)}
        >
          {children &&
            (open ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
          <span className="text-sm font-medium">{label}</span>
        </div>
        {open && children && (
          <div className="ml-4 mt-2 space-y-2">{children}</div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-full max-w-7xl rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[95vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">
            Country Administrative Divisions
          </h1>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-6 w-64">
          <button
            onClick={() => setActiveTab("manual")}
            className={`flex-1 py-2 rounded-full text-sm ${activeTab === "manual" ? "bg-blue-600 text-white" : ""}`}
          >
            Manual Entry
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex-1 py-2 rounded-full text-sm ${activeTab === "upload" ? "bg-blue-600 text-white" : ""}`}
          >
            Upload CSV
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* UPLOAD */}
            {activeTab === "upload" && (
              <div className="border-dashed border-2 border-blue-400 rounded-xl p-8 text-center">
                <Upload className="mx-auto mb-4 text-blue-600" />
                <p className="text-sm text-gray-600 mb-3">Upload CSV File</p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
                <p className="text-xs text-gray-400 mt-3">
                  Format: ParentName,ChildName,"Grand1|Grand2|Grand3"
                </p>
              </div>
            )}

            {/* MANUAL */}
            {activeTab === "manual" && (
              <div className="space-y-4">
                {/* Top-level inputs */}
                <input
                  type="text"
                  placeholder="Country Name"
                  value={countryName}
                  onChange={(e) => setCountryName(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Parent Level (e.g., Region)"
                  value={parentLevel}
                  onChange={(e) => setParentLevel(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Child Level (e.g., District)"
                  value={childLevel}
                  onChange={(e) => setChildLevel(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                />

                {/* Parents */}
                {parents.map((parent, pIndex) => (
                  <div key={pIndex} className="border p-3 rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Parent Name"
                        value={parent.parentName}
                        onChange={(e) =>
                          updateParentName(pIndex, e.target.value)
                        }
                        className="flex-1 border p-1 rounded"
                      />
                      <button onClick={() => removeParent(pIndex)}>
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Children */}
                    {parent.children.map((child, cIndex) => (
                      <div key={cIndex} className="ml-4 space-y-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Child Name"
                            value={child.childName}
                            onChange={(e) =>
                              updateChildName(pIndex, cIndex, e.target.value)
                            }
                            className="flex-1 border p-1 rounded"
                          />
                          <button onClick={() => removeChild(pIndex, cIndex)}>
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {/* Grandchildren */}
                        {child.grandChildren.map((gc, gIndex) => (
                          <div
                            key={gIndex}
                            className="ml-4 flex items-center gap-2"
                          >
                            <input
                              type="text"
                              placeholder="Grandchild Name"
                              value={gc}
                              onChange={(e) =>
                                updateGrandChild(
                                  pIndex,
                                  cIndex,
                                  gIndex,
                                  e.target.value,
                                )
                              }
                              className="flex-1 border p-1 rounded"
                            />
                            <button
                              onClick={() =>
                                removeGrandChild(pIndex, cIndex, gIndex)
                              }
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}

                        <button
                          onClick={() => addGrandChild(pIndex, cIndex)}
                          className="text-xs text-blue-600 flex items-center gap-1"
                        >
                          <Plus size={12} /> Add Grandchild
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={() => addChild(pIndex)}
                      className="text-xs text-green-600 flex items-center gap-1 mt-1"
                    >
                      <Plus size={12} /> Add Child
                    </button>
                  </div>
                ))}

                <button
                  onClick={addParent}
                  className="text-xs text-purple-600 flex items-center gap-1"
                >
                  <Plus size={12} /> Add Parent
                </button>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
            >
              Save Administrative Structure
            </button>
          </div>

          {/* RIGHT SIDE - Tree Preview */}
          <div className="bg-gray-50 p-6 rounded-xl overflow-auto">
            <h2 className="text-lg font-semibold mb-4">Structure Preview</h2>

            {!countryName ? (
              <p className="text-sm text-gray-400">
                Start building to preview structure.
              </p>
            ) : (
              <TreeNode label={countryName} level={0}>
                {parents.map((parent, pIndex) => (
                  <TreeNode
                    key={pIndex}
                    label={parent.parentName || "Unnamed Parent"}
                    level={1}
                  >
                    {parent.children.map((child, cIndex) => (
                      <TreeNode
                        key={cIndex}
                        label={child.childName || "Unnamed Child"}
                        level={2}
                      >
                        {child.grandChildren.map((gc, gIndex) => (
                          <TreeNode
                            key={gIndex}
                            label={gc || "Unnamed Grandchild"}
                            level={3}
                          />
                        ))}
                      </TreeNode>
                    ))}
                  </TreeNode>
                ))}
              </TreeNode>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}