import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

function ParentChildManager() {
  const [parents, setParents] = useState([
    {
      id: 1,
      region: "Ashanti Region",
      cities: "Asanti North, Asanti South, Bekwai Municipal",
      open: true,
    },
    {
      id: 2,
      region: "Lagos",
      cities: "Ikeja, Surulere, Eti-Osa",
      open: true,
    },
    {
      id: 3,
      region: "Greater Accra",
      cities: "Madina, Legon, Ablekuma",
      open: false,
    },
    {
      id: 4,
      region: "Greater Accra",
      cities: "Madina, Legon, Ablekuma",
      open: false,
    },
    {
      id: 5,
      region: "Greater Accra",
      cities: "Madina, Legon, Ablekuma",
      open: false,
    },
    {
      id: 6,
      region: "Greater Accra",
      cities: "Madina, Legon, Ablekuma",
      open: false,
    },
    {
      id: 7,
      region: "central region",
      cities: "Madina, Legon, Ablekuma",
      open: false,
    },
  ]);

  const toggleParent = (id) => {
    setParents((prev) =>
      prev.map((p) => (p.id === id ? { ...p, open: !p.open } : p))
    );
  };

  const removeParent = (id) => {
    setParents((prev) => prev.filter((p) => p.id !== id));
  };

  const addParent = () => {
    const newId = parents.length + 1;
    setParents([
      ...parents,
      {
        id: newId,
        region: `New Region ${newId}`,
        cities: "",
        open: true,
      },
    ]);
  };

  const updateField = (id, field, value) => {
    setParents((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="ml-70 mb-20">
          <h1 className="text-xl font-semibold">Parent-Child Entity Manager</h1>
          <p className="text-gray-500 text-sm">
            Define parent-level entities and their child-level subdivisions
          </p>
        </div>
        <button
          onClick={addParent}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
        >
          + Add Parent Level
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {parents.map((parent) => (
          <div
            key={parent.id}
            className="bg-white rounded-lg shadow border border-gray-200"
          >
            {/* Card Header */}
            <div
              onClick={() => toggleParent(parent.id)}
              className="flex justify-between items-center p-4 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {parent.open ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
                <span className="font-medium">{parent.region}</span>
              </div>
              <Trash2
                onClick={(e) => {
                  e.stopPropagation();
                  removeParent(parent.id);
                }}
                className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600"
              />
            </div>

            {/* Card Body */}
            {parent.open && (
              <div className="p-4 space-y-4 ">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Region
                  </label>
                  <input
                    type="text"
                    value={parent.region}
                    onChange={(e) =>
                      updateField(parent.id, "region", e.target.value)
                    }
                    className="input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Cities
                  </label>
                  <input
                    type="text"
                    value={parent.cities}
                    onChange={(e) =>
                      updateField(parent.id, "cities", e.target.value)
                    }
                    className="input"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Separate multiple child levels with a comma.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParentChildManager;
