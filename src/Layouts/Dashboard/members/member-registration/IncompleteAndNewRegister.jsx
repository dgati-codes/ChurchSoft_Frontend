import { useState } from "react";
import IncompleteRegistrations from "./IncompleteRegistrations";
import Register from "./register";

function IncompleteAndNewRegister() {
  const [activeTab, setActiveTab] = useState("new");

  return (
    <div className=" w-full">
      {/* <div className="fixed pt-15 left-70 top-1 bg-white z-50  "> */}
        <div className="fixed pt-12 top-1 z-50 left-70  flex gap-2 bg-white   ">
          <button
            onClick={() => setActiveTab("new")}
            className={`p-3 rounded-tl-md rounded-tr-md text-md transition-all duration-200
            ${
              activeTab === "new"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black hover:bg-gray-200"
            }`}
          >
            New Registration
          </button>

          <button
            onClick={() => setActiveTab("incomplete")}
            className={`p-3 rounded-tl-md rounded-tr-md  text-md transition-all duration-200
            ${
              activeTab === "incomplete"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black hover:bg-gray-200"
            }`}
          >
            Incomplete Registrations
          </button>
        {/* </div> */}
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
