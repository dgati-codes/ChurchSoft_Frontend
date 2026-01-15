import React, { useState } from "react";
import Register from "./register";
import IncompleteRegistrations from "./IncompleteRegistrations";

function IncompleteAndNewRegister() {
  // default = incomplete registrations
  const [activeTab, setActiveTab] = useState("incomplete");

  return (
    <div className=" w-full">
      {/* Fixed Toggle Buttons */}
      <div className="fixed mt-6 left-70  flex gap-2 bg-white rounded-lg p-1 shadow-sm">
        <button
          onClick={() => setActiveTab("new")}
          className={`px-4 py-2 rounded-md text-sm transition-all duration-200
            ${
              activeTab === "new"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          New Registration
        </button>

        <button
          onClick={() => setActiveTab("incomplete")}
          className={`px-4 py-2 rounded-md text-sm transition-all duration-200
            ${
              activeTab === "incomplete"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          Incomplete Registrations
        </button>
      </div>

      {/* Content */}
      <div className="pt-24">
        {activeTab === "new" && <Register />}
        {activeTab === "incomplete" && <IncompleteRegistrations />}
      </div>
    </div>
  );
}

export default IncompleteAndNewRegister;
