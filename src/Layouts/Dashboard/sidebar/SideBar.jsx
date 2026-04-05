import {
  BookOpenText,
  ChevronDown,
  ChevronRight,
  Globe,
  LayoutDashboard,
  UserCheck,
  UserRoundPlus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROLES, useAuth } from "../../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Determine activeView based on current route
  const getActiveView = () => {
    const path = location.pathname;

    if (path === "/dashboard") return "dashboard";
    if (path === "/dashboard/add-user") return "addUser";
    if (path === "/dashboard/user-table") return "userTable";
    if (path === "/dashboard/events") return "events";
    if (path === "/dashboard/news") return "news";

    // Member routes
    if (path === "/dashboard/register") return "addMember";
    if (path.startsWith("/dashboard/new-registration")) return "addMember";
    if (path === "/dashboard/members") return "viewMembers";
    if (path === "/dashboard/attendance") return "attendance";
    if (path === "/dashboard/countries") return "countries";
    if (path === "/dashboard/configuration") return "configuration";
    if (path.startsWith("/memberProfile")) return "my-profile";

    return "dashboard";
  };
  const activeView = getActiveView();
  const { hasRole } = useAuth();

  const isAdmin = hasRole([ROLES.ADMIN]);

  useEffect(() => {
    if (activeView === "addMember" || activeView === "viewMembers") {
      setOpenDropdown("members");
    } else if (activeView === "addUser" || activeView === "userTable") {
      setOpenDropdown("users");
    } else if (activeView === "configuration" || activeView === "my-profile") {
      setOpenDropdown("memberProfile");
    } else if (activeView === "news" || activeView === "events") {
      setOpenDropdown("events");
    } else {
      setOpenDropdown(null);
    }
  }, [activeView]);

  const handleParentClick = (view, route) => {
    if (view === "members") {
      setOpenDropdown("members");
      navigate("/dashboard/register");
    } else if (view === "users") {
      setOpenDropdown("users");
      navigate("/dashboard/add-user");
    } else if (view === "memberProfile") {
      setOpenDropdown("memberProfile");
      navigate("/dashboard/configuration");
    } else if (view === "events") {
      setOpenDropdown("events");
      navigate("/dashboard/events");
    } else {
      setOpenDropdown(null);
      navigate(route);
    }
  };

  const handleChildClick = (childView, route) => {
    navigate(route);
    setOpenDropdown("members");
  };

  const linkClasses = (isActive) =>
    `block w-full text-left px-2 py-1 rounded ${
      isActive
        ? "bg-[#FACD18] text-blue-900"
        : "text-white hover:text-blue-900 hover:bg-[#FACD18]"
    }`;

  return (
    <aside className="w-64 font-[DM Sans] fixed left-0 top-0 h-screen border-r border-gray-200 bg-[#001866] z-10">
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
              className={`${
                activeView === "dashboard"
                  ? "text-yellow-500 border-l-4 border-yellow-500"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              <button
                className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4 cursor-pointer ${
                  activeView === "dashboard"
                    ? "text-blue-900 rounded-lg border-l-4 bg-amber-300"
                    : "text-white hover:text-yellow-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="font-semibold family-DM-Sans">
                    Dashboard
                  </span>
                </div>
              </button>
            </li>

            {/* Add User */}
            {hasRole([ROLES.ADMIN]) && (
              <>
                <li
                  onClick={() => handleParentClick("users")}
                  className={`${
                    activeView === "users" ||
                    activeView === "addUser" ||
                    activeView === "userTable"
                      ? "text-yellow-500 border-l-4 border-yellow-500"
                      : "text-white hover:text-yellow-400"
                  }`}
                >
                  <button
                    className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4 cursor-pointer ${
                      openDropdown === "users"
                        ? "text-blue-900 rounded-lg bg-amber-300"
                        : "text-white hover:text-yellow-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <UserRoundPlus className="w-5 h-5" />
                      <span className="font-semibold family-DM-Sans">
                        Users
                      </span>
                    </div>
                    {isAdmin &&
                      (openDropdown === "users" ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      ))}
                  </button>
                </li>

                {isAdmin && openDropdown === "users" && (
                  <ul className="relative ml-8 mt-2 text-xs pl-3 space-y-2">
                    <span className="absolute -left-0.5 top-1/6 w-4 h-9 border-l border-b border-yellow-300/60 rounded-bl-md "></span>

                    <li className="relative">
                      <span className="absolute -left-3.5 top-1/9 w-4 h-3 border-l border-b border-yellow-300/60 rounded-bl-md"></span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChildClick("addUser", "/dashboard/add-user");
                        }}
                        className={linkClasses(activeView === "addUser")}
                      >
                        Add users
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChildClick(
                            "userTable",
                            "/dashboard/user-table",
                          );
                        }}
                        className={linkClasses(activeView === "userTable")}
                      >
                        User Table
                      </button>
                    </li>
                  </ul>
                )}
              </>
            )}

            {/* events dropdown */}

            {hasRole([ROLES.ADMIN]) && (
              <>
                <li
                  onClick={() => handleParentClick("events")}
                  className={`${
                    activeView === "events" ||
                    activeView === "events" ||
                    activeView === "news"
                      ? "text-yellow-500 border-l-4 border-yellow-500"
                      : "text-white hover:text-yellow-400"
                  }`}
                >
                  <button
                    className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4 cursor-pointer ${
                      openDropdown === "events"
                        ? "text-blue-900 rounded-lg bg-amber-300"
                        : "text-white hover:text-yellow-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <BookOpenText className="w-5 h-5" />
                      <span className="font-semibold family-DM-Sans">
                        Events
                      </span>
                    </div>
                    {isAdmin &&
                      (openDropdown === "events" ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      ))}
                  </button>
                </li>

                {isAdmin && openDropdown === "events" && (
                  <ul className="relative ml-8 mt-2 text-xs pl-3 space-y-2">
                    <span className="absolute -left-0.5 top-1/6 w-4 h-9 border-l border-b border-yellow-300/60 rounded-bl-md "></span>

                    <li className="relative">
                      <span className="absolute -left-3.5 top-1/9 w-4 h-3 border-l border-b border-yellow-300/60 rounded-bl-md"></span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChildClick("events", "/dashboard/events");
                        }}
                        className={linkClasses(activeView === "events")}
                      >
                        Events
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChildClick("news", "/dashboard/news");
                        }}
                        className={linkClasses(activeView === "news")}
                      >
                        News
                      </button>
                    </li>
                  </ul>
                )}
              </>
            )}

            {/* Members Dropdown */}

            <li
              onClick={() => handleParentClick("members")}
              className={`${
                activeView === "members" ||
                activeView === "addMember" ||
                activeView === "viewMembers"
                  ? "text-yellow-500 border-l-4 border-yellow-500"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              <button
                className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4 cursor-pointer ${
                  openDropdown === "members"
                    ? "text-blue-900 rounded-lg bg-amber-300"
                    : "text-white hover:text-yellow-400"
                }`}
              >
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
                <span className="absolute -left-0.5 top-1/6 w-4 h-9 border-l border-b border-yellow-300/60 rounded-bl-md "></span>

                <li className="relative">
                  <span className="absolute -left-3.5 top-1/9 w-4 h-3 border-l border-b border-yellow-300/60 rounded-bl-md"></span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChildClick("addMember", "/dashboard/register");
                    }}
                    className={linkClasses(activeView === "addMember")}
                  >
                    Add Members
                  </button>
                </li>

                <li>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChildClick("viewMembers", "/dashboard/members");
                    }}
                    className={linkClasses(activeView === "viewMembers")}
                  >
                    View Members
                  </button>
                </li>
              </ul>
            )}

            {/* Attendance */}
            <li
              onClick={() =>
                handleParentClick("attendance", "/dashboard/attendance")
              }
              className={`${
                activeView === "attendance"
                  ? "text-yellow-500 border-l-4 border-yellow-500"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              <button
                className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4 cursor-pointer ${
                  activeView === "attendance"
                    ? "text-blue-900 rounded-lg bg-amber-300"
                    : "text-white hover:text-yellow-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5" />
                  <span className="font-semibold family-DM-Sans">
                    Attendance
                  </span>
                </div>
              </button>
            </li>

            {/* Country Set Up */}
            <li
              onClick={() =>
                handleParentClick("countries", "/dashboard/countries")
              }
              className={`${
                activeView === "countries"
                  ? "text-yellow-500 border-l-4 border-yellow-500"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              <button
                className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4 cursor-pointer ${
                  activeView === "countries"
                    ? "text-blue-900 rounded-lg bg-amber-300"
                    : "text-white hover:text-yellow-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5" />
                  <span className="font-semibold family-DM-Sans">
                    Country Set Up
                  </span>
                </div>
              </button>
            </li>

            <li
              onClick={() => handleParentClick("memberProfile")}
              className={`${
                activeView === "memberProfile" ||
                activeView === "configuration" ||
                activeView === "my-profile"
                  ? "text-yellow-500 border-l-4 border-yellow-500"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              <button
                className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4 cursor-pointer ${
                  openDropdown === "memberProfile"
                    ? "text-blue-900 rounded-lg bg-amber-300"
                    : "text-white hover:text-yellow-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserRoundPlus className="w-5 h-5" />
                  <span className="font-semibold family-DM-Sans">
                    Configuration
                  </span>
                </div>

                {openDropdown === "memberProfile" ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </li>

            {openDropdown === "memberProfile" && (
              <ul className="relative ml-8 mt-2 text-xs pl-3 space-y-2">
                <span className="absolute -left-0.5 top-1/6 w-4 h-9 border-l border-b border-yellow-300/60 rounded-bl-md "></span>

                <li className="relative">
                  <span className="absolute -left-3.5 top-1/9 w-4 h-3 border-l border-b border-yellow-300/60 rounded-bl-md"></span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChildClick(
                        "configuration",
                        "/dashboard/configuration",
                      );
                    }}
                    className={linkClasses(activeView === "configuration")}
                  >
                    Configuration
                  </button>
                </li>

                <li>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChildClick("memberProfile", "/memberProfile");
                    }}
                    className={linkClasses(activeView === "memberProfile")}
                  >
                    My Profile
                  </button>
                </li>
              </ul>
            )}
          </ul>
        </nav>
      </div>

      <div className="p-2 border-t border-gray-200 text-xs text-gray-500">
        ©{" "}
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
        Church Management System. All rights reserved.
        <p>v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
