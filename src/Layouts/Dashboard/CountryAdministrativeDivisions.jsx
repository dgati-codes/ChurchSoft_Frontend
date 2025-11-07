import { useState } from "react";
import { Upload, FileText } from 'lucide-react';

export default function CountryAdministrativeDivisions() {
  const [activeTab, setActiveTab] = useState("manual");
  const [parentLevels, setParentLevels] = useState("");
  const [childLevels, setChildLevels] = useState("");
  const [grandchildrenLevels, setGrandchildrenLevels] = useState("");
  const [submittedDivisions, setSubmittedDivisions] = useState([]);

  const handleSubmit = () => {
    if (!parentLevels || !childLevels) return;
    setSubmittedDivisions([
      ...submittedDivisions,
      {
        parent: parentLevels,
        child: childLevels,
        grandchildren: grandchildrenLevels,
      },
    ]);
    setParentLevels("");
    setChildLevels("");
    setGrandchildrenLevels("");
  };

  return (
    <div className="p-6 ml-64 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold">
            Country Administrative Divisions
          </h1>
          <p className="text-gray-500 text-sm">
            Administrative divisions for countries with their specific regional and local terminology. <br /> 
            Use the dropdowns and text fields to update the information as needed.
          </p>
        </div>

        {/* Two-column layout */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Form */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <p className="text-lg font-semibold mb-4">Add Administrative Divisions</p>
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-full p-1 mb-6">
              <button
                onClick={() => setActiveTab("manual")}
                className={`flex-1 py-2 rounded-full text-sm font-medium ${
                  activeTab === "manual"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
              >
                Manual Entry
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`flex-1 py-2 rounded-full text-sm font-medium ${
                  activeTab === "upload"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
              >
                File Upload
              </button>
            </div>

            {activeTab === "manual" ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Parent Level Names
                  </label>
                  <input
                    type="text"
                    value={parentLevels}
                    onChange={(e) => setParentLevels(e.target.value)}
                    placeholder="eg. Ghana, Nigeria, South Africa"
                    className="w-full bg-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Child Level Names
                  </label>
                  <input
                    type="text"
                    value={childLevels}
                    onChange={(e) => setChildLevels(e.target.value)}
                    placeholder="eg. Region, State, Province"
                    className="w-full bg-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Grandchildren Level Names
                  </label>
                  <input
                    type="text"
                    value={grandchildrenLevels}
                    onChange={(e) => setGrandchildrenLevels(e.target.value)}
                    placeholder="eg. Bride Assembly, Mount Carmel"
                    className="w-full bg-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Separate multiple names with commas.
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-2 rounded-lg bg-gray-200 text-gray-600 font-medium hover:bg-blue-600 hover:text-white transition"
                >
                     
                 <span> Add Administration Division</span>
                </button>

              </div>
            ) : (
              <>
              <div className="text-center border-dashed border border-gray-300 rounded-md text-gray-500 py-10">
                <Upload className="w-10 h-10  bg-gray-100 rounded-full   mx-auto mb-4"/>
                <p className="font-semibold">Click to upload or drag and drop</p>
                <p className="text-xs">CSV files only. Max file size: 5MB</p>
              </div>
              
                <div>
                  <p className="text-sm text-black font-bold mt-4">
                  File Format Requirements.
                </p>
                
                <div className="flex mt-2 rounded-xl p-4 bg-gray-100">
                  <FileText className="w-10 h-10"/>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-black ">
                  CSV Format:
                </p>
                <p className="text-sm  text-gray-400 ">
                  Three columns: Parent Name, Child Name, Grandchildren Names 
               
                  Example: United States, California,"Los Angeles, San Francisco, Sacramento"
                </p>
                  </div>
                  </div>
                </div>
               
                </>
            )}
          </div>

          {/* Right Side - Preview */}
          
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col items-center justify-center">
            <div>
            <p className="text-lg font-semibold ">Submitted Administrative Divisions ({submittedDivisions.length}
                  )</p>
            {submittedDivisions.length === 0 ? (
              <div className="text-center ">
                
                <img
                  src="/images/empty-state.svg"
                  alt="No data"
                  className="mx-auto w-40 mb-4"
                />
                <p className="text-gray-500">
                  No administrative divisions added yet.
                </p>
                <p className="text-sm text-gray-400">
                  Use the form to add your first division.
                </p>
              </div>
            ) : (
              <div className="w-full">
                <h2 className="text-sm font-medium mb-2">
                  Submitted Administrative Divisions ({submittedDivisions.length}
                  )
                </h2>
                <ul className="space-y-2">
                  {submittedDivisions.map((division, idx) => (
                    <li
                      key={idx}
                      className="border rounded-lg p-3 text-sm bg-gray-50"
                    >
                      <p>
                        <span className="font-medium">Parent:</span>{" "}
                        {division.parent}
                      </p>
                      <p>
                        <span className="font-medium">Child:</span>{" "}
                        {division.child}
                      </p>
                      <p>
                        <span className="font-medium">Grandchildren:</span>{" "}
                        {division.grandchildren || "None"}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
