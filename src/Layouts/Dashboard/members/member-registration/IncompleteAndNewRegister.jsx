import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import IncompleteRegistrations from "./IncompleteRegistrations";
import Register from "./register";

function IncompleteAndNewRegister() {
  const location = useLocation();
  const navigationData = location.state; // this contains prefill from UserProfile

  // default to "new" tab unless navigationData exists
  const [activeTab, setActiveTab] = useState(
    navigationData?.prefill ? "incomplete" : "new"
  );

  const [prefillData, setPrefillData] = useState(null);

  useEffect(() => {
    if (navigationData?.prefill) {
      setPrefillData(navigationData.prefill);
    }
  }, [navigationData]);

  return (
    <div className=" w-full">
      <div className="fixed pt-12 top-1 z-50 left-70 flex gap-2 bg-white">
        <button
          onClick={() => setActiveTab("new")}
          className={`p-3 rounded-tl-md rounded-tr-md text-md transition-all duration-200
            ${
              activeTab === "new"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black hover:bg-gray-200"
            }`}
        >
          Incomplete Registrations
        </button>

        <button
          onClick={() => setActiveTab("incomplete")}
          className={`p-3 rounded-tl-md rounded-tr-md text-md transition-all duration-200
            ${
              activeTab === "incomplete"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black hover:bg-gray-200"
            }`}
        >
          New Registration
        </button>
      </div>

      <div className="pt-10">
        {activeTab === "incomplete" && <Register prefill={prefillData} />}
        {activeTab === "new" && <IncompleteRegistrations />}
      </div>
    </div>
  );
}

export default IncompleteAndNewRegister;