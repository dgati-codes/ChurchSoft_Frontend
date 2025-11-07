import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Globe,
  ChevronRight,
  UserCheck,
  Users,
  ChevronDown,
  Settings,
  UserRoundPlus,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Determine activeView based on current route
  const getActiveView = () => {
    if (location.pathname === "/dashboard") return "dashboard";
    if (location.pathname === "/dashboard/add-user") return "addUser";
    if (location.pathname === "/dashboard/register") return "addMember";
    if (location.pathname === "/dashboard/members") return "viewMembers";
    if (location.pathname === "/dashboard/attendance") return "attendance";
    if (location.pathname === "/dashboard/countries") return "countries";
    if (location.pathname === "/dashboard/configuration") return "configuration";
    return "dashboard";
  };

  const activeView = getActiveView();

  // Ensure Members dropdown opens if activeView is inside Members
  useEffect(() => {
    if (activeView === "addMember" || activeView === "viewMembers") {
      setOpenDropdown("members");
    } else {
      setOpenDropdown(null);
    }
  }, [activeView]);

  const handleParentClick = (view, route) => {
    if (view === "members") {
      setOpenDropdown("members");
      navigate("/dashboard/register");
    } else {
      setOpenDropdown(null);
      navigate(route);
    }
  };

  const handleChildClick = (childView, route) => {
    navigate(route);
    setOpenDropdown("members"); // keep dropdown open
  };

  const linkClasses = (isActive) =>
    `block w-full text-left px-2 py-1 rounded ${
      isActive ? "bg-[#FACD18] text-blue-900" : "text-white hover:text-blue-900 hover:bg-[#FACD18]"
    }`;

  return (
    <aside className="w-64 fixed left-0 top-0 h-screen border-r border-gray-200 bg-[#001866] z-10">
      <div className="p-4 border-b font-bold border-gray-300">
        <div className="flex mb-14 items-center space-x-2">
          <img className="w-20 ml-10" src="/images/logo.png" alt="logo" />
          <h1 className="text-xl text-white font-semibold">GCCI</h1>
        </div>

        <nav className="space-y-1">
          <ul>
            {/* Dashboard */}
            <li
              onClick={() => handleParentClick("dashboard", "/dashboard")}
              className={`${activeView === "dashboard" ? "text-yellow-500 border-l-4 border-yellow-500" : "text-white hover:text-yellow-400"}`}
            >
              <button className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4 cursor-pointer ${activeView === "dashboard" ? "text-blue-900 rounded-lg border-l-4 bg-amber-300" : "text-white hover:text-yellow-400"}`}>
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="font-semibold family-DM-Sans">Dashboard</span>
                </div>
              </button>
            </li>

            {/* Add User */}
            <li
              onClick={() => handleParentClick("addUser", "/dashboard/add-user")}
              className={`${activeView === "addUser" ? "text-yellow-500 border-l-4 border-yellow-500" : "text-white hover:text-yellow-400"}`}
            >
              <button className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4 cursor-pointer ${activeView === "addUser" ? "text-blue-900 rounded-lg bg-amber-300" : "text-white hover:text-yellow-400"}`}>
                <div className="flex items-center gap-3">
                  <UserRoundPlus className="w-5 h-5" />
                  <span className="font-semibold family-DM-Sans">Add User</span>
                </div>
              </button>
            </li>

            {/* Members Dropdown */}
            <li
              onClick={() => handleParentClick("members")}
              className={`${activeView === "members" ||
                 activeView === "addMember" ||
                  activeView === "viewMembers" ? 
                  "text-yellow-500 border-l-4 border-yellow-500" : "text-white hover:text-yellow-400"}`}
            > 
              <button className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4 cursor-pointer ${openDropdown === "members" ? "text-blue-900 rounded-lg bg-amber-300" : "text-white hover:text-yellow-400"}`}>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold family-DM-Sans">Members</span>
                 
                </div>
                 {openDropdown === "members" ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
              </button>
                </li>
              {openDropdown === "members" && (
                <ul className="relative ml-8 mt-2 text-xs pl-3 space-y-2">
                  <span className="absolute -left-[1px] top-1/6 w-5 h-9 border-l border-b border-yellow-300/60 rounded-bl-md "></span>

                  <li className="relative">
                    <span className="absolute -left-[13px] top-1/9 w-5 h-3 border-l border-b border-yellow-300/60  rounded-bl-md"></span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleChildClick("addMember", "/dashboard/register"); }}
                      className={linkClasses(activeView === "addMember")}
                    >
                      Add Members
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleChildClick("viewMembers", "/dashboard/members"); }}
                      className={linkClasses(activeView === "viewMembers")}
                    >
                      View Members
                    </button>
                  </li>
                </ul>
              )}
            

            {/* Attendance */}
            <li
              onClick={() => handleParentClick("attendance", "/dashboard/attendance")}
              className={`${activeView === "attendance" ? "text-yellow-500 border-l-4 border-yellow-500" : "text-white hover:text-yellow-400"}`}
            >
              <button className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4 cursor-pointer ${activeView === "attendance" ? "text-blue-900 rounded-lg bg-amber-300" : "text-white hover:text-yellow-400"}`}>
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5" />
                  <span className="font-semibold family-DM-Sans">Attendance</span>
                </div>
              </button>
            </li>

            {/* Country Set Up */}
            <li
              onClick={() => handleParentClick("countries", "/dashboard/countries")}
              className={`${activeView === "countries" ? "text-yellow-500 border-l-4 border-yellow-500" : "text-white hover:text-yellow-400"}`}
            >
              <button className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4 cursor-pointer ${activeView === "countries" ? "text-blue-900 rounded-lg bg-amber-300" : "text-white hover:text-yellow-400"}`}>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5" />
                  <span className="font-semibold family-DM-Sans">Country Set Up</span>
                </div>
              </button>
            </li>

            {/* Configuration */}
            <li
              onClick={() => handleParentClick("configuration", "/dashboard/configuration")}
              className={`${activeView === "configuration" ? "text-yellow-500 border-l-4 border-yellow-500" : "text-white hover:text-yellow-400"}`}
            >
              <button className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4 cursor-pointer ${activeView === "configuration" ? "text-blue-900 rounded-lg bg-amber-300" : "text-white hover:text-yellow-400"}`}>
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  <span className="font-semibold family-DM-Sans">Configuration</span>
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="p-2 border-t border-gray-200 text-xs text-gray-500">
        © {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}Church Management System. All rights reserved.
        <p>v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
