import React, { useState } from "react";
import CreateLeaderForm from "./CreateLeaderForm";
// import Users from "./UsersForm";
import Register from "./register";
import MemberTable from "./table";
import AttendanceTracking from "./Attendance";
import ParentChildManager from "./ParentChild";
import CountriesOverview from "./CountriesOverview";
import CountryAdministrativeDivisions from "./CountryAdministrativeDivisions";
import Configuration from  "./Configuration";   
import { LayoutDashboard, Globe, UserCheck, Users, ChevronDown,  Settings, UserRoundPlus,  } from "lucide-react";

const Sidebar = ({
  onLeadersClick,
  onRegisterClick,
  onUserClick,
  onTableClick,
  onAttendanceClick,
  onConfigurationClick,
  onCountriesOverviewClick
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeParent, setActiveParent] = useState(null);
  const [activeChild, setActiveChild] = useState(null);
  const [showConfiguration, setShowConfiguration] = useState(false);

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
    setActiveParent(key);
    setActiveChild(null);
  };

  const handleChildClick = (parent, child, callback) => {
    setActiveParent(parent);
    setActiveChild(child);
    if (callback) callback();
  };

  const handleConfigurationClick = () => {
    setShowConfiguration(true);
  }

    

  return (
<aside className="w-64 fixed left-0 top-0 h-screen border-r border-gray-200 bg-[#001866]  z-10">
                      
            <div className="p-4  border-b font-bold border-gray-300">
            <div className="flex mb-14 items-center space-x-2">
            <img className="w-20 ml-10" src="/images/logo.png" alt="logo" />
            <h1 className="text-xl text-white font-semibold">GCCI</h1>
            </div>
                <nav className="space-y-1">  
                    <ul>
                        <li onClick={() => toggleDropdown("A")} className={`relative  ${
                            activeParent === "A"
                            ? "text-yellow-500 border-l-4 border-yellow-500"
                            : "text-white hover:text-yellow-400"
                        }`}>
                            
                            <button                               
                             className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4  cursor-pointer ${
                                    activeParent === "A"
                                    ? "text-blue-900  rounded-lg  bg-amber-300   "
                                    : "text-white hover:text-yellow-400"
                                }`}
                                >
                                {/* Left side: icon + label */}
                                
                                <div className="flex items-center gap-3">
                                    <LayoutDashboard
                                    
                                    className="w-5 h-5 "
                                    />
                                    <span className="font-semibold family-DM-Sans">Dashboard</span>
                                </div>
                                
                              </button>
                        </li>
                        {openDropdown === "A" && ("")}
                        
                        <li onClick={() => toggleDropdown("B")} className={`relative  ${
                            activeParent === "B"
                            ? "text-yellow-500 border-l-4 border-yellow-500"
                            : "text-white hover:text-yellow-400"
                        }`}>
                            
                            <button                               
                             className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4  cursor-pointer ${
                                    activeParent === "B"
                                    ? "text-blue-900  rounded-lg  bg-amber-300   "
                                    : "text-white hover:text-yellow-400"
                                }`}
                                >
                                {/* Left side: icon + label */}
                                
                                <div className="flex items-center gap-3">
                                     <UserRoundPlus

                                    
                                    className="w-5 h-5 "
                                    />
                                    <span className="font-semibold family-DM-Sans">Add User</span>
                                </div>
                                
                              </button>
                        </li>
                        {/* {openDropdown === "B" && ("")} */}

                        <li onClick={() => toggleDropdown("C")} className={`relative  ${
                            activeParent === "C"
                            ? "text-yellow-500 border-l-4 border-yellow-500"
                            : "text-white hover:text-yellow-400"
                        }`}>
                            
                            <button                               
                             className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4  cursor-pointer ${
                                    activeParent === "C"
                                    ? "text-blue-900  rounded-lg  bg-amber-300   "
                                    : "text-white hover:text-yellow-400"
                                }`}
                                >
                                {/* Left side: icon + label */}
                                
                                <div className="flex items-center gap-3">
                                        <Users                                   
                                    className="w-5 h-5 "
                                    />
                                    <span className="font-semibold family-DM-Sans">Members</span>
                                </div>
                               
                                    <ChevronDown className="w-4 h-4" />             
                                
                              </button>
                        </li>
                        {openDropdown === "C" && (
                                <ul className="relative ml-8 mt-4  text-xs  pl-3 space-y-2">
                                <span className="absolute -left-[1px] top-1/6 w-5 h-9 border-l border-b border-blue-300/40 rounded-bl-md "></span>
                                <li className="relative">
                                    {/* horizontal connector */}
                                    <span className="absolute -left-[13px] top-1/9 w-5 h-3 border-l border-b border-blue-300/40 rounded-bl-md"></span>
                                    <button
                                    onClick={() =>
                                        handleChildClick("C", "addMember", onRegisterClick)
                                    }
                                    className={`block w-full text-left px-2 py-1 rounded ${
                                        activeChild === "addMember"
                                        ? "bg-[#FACD18] text-blue-900"
                                        : "text-white hover:text-blue-900 hover:bg-[#FACD18]"
                                    }`}
                                    >
                                     <span className="font-semibold family-DM-Sans">Add Members</span>
                                    </button>
                                </li>

                                <li className="relative">
                                    <button
                                    onClick={() =>
                                        handleChildClick("C", "viewMembers", onTableClick)
                                    }
                                    className={`block w-full text-left px-2 py-1 rounded ${
                                        activeChild === "viewMembers"
                                        ? "bg-[#FACD18] text-blue-900"
                                        : "text-white hover:text-blue-900 hover:bg-[#FACD18]"
                                    }`}
                                    >
                                        <span className="font-semibold family-DM-Sans"> View Members</span>
                                   
                                    </button>
                                </li>
                                </ul>
                            )}

                        

                          <li onClick={() => toggleDropdown("D")} className={`relative  ${
                            activeParent === "D"
                            ? "text-yellow-500 border-l-4 border-yellow-500"
                            : "text-white hover:text-yellow-400"
                        }`}>
                            <button onClick={onAttendanceClick}
                            className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4  cursor-pointer ${
                                    activeParent === "D"
                                    ? "text-blue-900  rounded-lg  bg-amber-300   "
                                    : "text-white hover:text-yellow-400"
                                }`}
                                >
                            <div className="flex items-center gap-3">
                            <UserCheck />
                            <span className="font-semibold family-DM-Sans">Attendance</span>
                            </div>
                            </button>
                            </li>   

                          <li onClick={() => toggleDropdown("E")} className={`relative  ${
                            activeParent === "E"
                            ? "text-yellow-500 border-l-4 border-yellow-500"
                            : "text-white hover:text-yellow-400"
                        }`}>
                            <button onClick={onCountriesOverviewClick}
                            className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4  cursor-pointer ${
                                    activeParent === "E"
                                    ? "text-blue-900  rounded-lg  bg-amber-300   "
                                    : "text-white hover:text-yellow-400"
                                }`}
                                >
                            <div className="flex items-center gap-3">
                            <Globe />
                            <span className="font-semibold family-DM-Sans">Country set up</span>
                            </div>
                            </button>
                            </li> 

                          <li onClick={() => toggleDropdown("F")} className={`relative  ${
                            activeParent === "F"
                            ? "text-yellow-500 border-l-4 border-yellow-500"
                            : "text-white hover:text-yellow-400"
                        }`}>
                            <button
                            onClick={onConfigurationClick}
                            className={`w-full flex items-center ml-2 justify-between text-left text-sm p-4  cursor-pointer ${
                                    activeParent === "F"
                                    ? "text-blue-900  rounded-lg  bg-amber-300   "
                                    : "text-white hover:text-yellow-400"
                                }`}
                                >
                            <div className="flex items-center gap-3">
                           <Settings />
                            <span className="font-semibold family-DM-Sans">Configuration</span>
                            </div>
                            </button>
                            {/* {showConfiguration && <Configuration /> } */}
                            </li>   
                       

                         {/* <li
                            onClick={() => toggleDropdown("D")}
                            className={`w-full flex text-left text-sm p-4  cursor-pointer ${
                                activeParent === "D"
                                ? "text-yellow-500 border-l-4 border-yellow-500"
                                : "text-white hover:text-yellow-400"
                            }`}
                            >
                            <div className="flex items-center gap-3">
                                <BadgeDollarSign />
                            <span>Donation</span>
                            </div>
                            </li>
                        {openDropdown === "D" && (
                            <ul className="bg-white hover:cursor-pointer mt-2 rounded-xl w-48 shadow-md">
                                <li className="px-4 py-2 hover:bg-gray-100">donation1</li>
                                <li className="px-4 py-2 hover:bg-gray-100">donation2</li>
                                <li className="px-4 py-2 hover:bg-gray-100">donation3</li>
                                <li className="px-4 py-2 hover:bg-gray-100">donation4</li>
                                <li className="px-4 py-2 hover:bg-gray-100">donation5</li>
                            </ul> 
                        )} */}

                        {/* <li
                            onClick={() => toggleDropdown("E")}
                            className={`w-full flex text-left text-sm p-4  cursor-pointer ${
                                activeParent === "E"
                                ? "text-yellow-500 border-l-4 border-yellow-500"
                                : "text-white hover:text-yellow-400"
                            }`}
                            >
                            <div className="flex items-center gap-3">
                                <Settings />
                            <span>Configuration</span>
                            </div>
                            </li>
                        {openDropdown === "E" && ( "" )}
                         <li
                                onClick={() => toggleDropdown("F")}
                                className={`w-full flex text-left text-sm p-4  cursor-pointer ${
                                    activeParent === "F"
                                    ? "text-yellow-500 border-l-4 border-yellow-500"
                                    : "text-white hover:text-yellow-400"
                                }`}
                                >
                                <div className="flex items-center gap-3">
                                    <Newspaper />
                                <span>News</span>
                                </div>
                                </li>
                        {openDropdown === "F" && ("")} */}

                         {/* <li
                                onClick={() => toggleDropdown("G")}
                                className={`w-full flex text-left text-sm p-4  cursor-pointer ${
                                    activeParent === "G"
                                    ? "text-yellow-500 border-l-4 border-yellow-500"
                                    : "text-white hover:text-yellow-400"
                                }`}
                                >
                                <div className="flex items-center gap-3">
                                    <Settings />
                                <span>Settings</span>
                                </div>
                                </li>
                        {openDropdown === "G" && ("")} */}
                    </ul>  
                </nav>
                

            </div>

            <div className="p-2 border-t border-gray-200 text-xs text-gray-500">
                © {new Date().toLocaleDateString("en-US", {
            //   day: "numeric",
              month: "long",
              year: "numeric",
            })}Church Management System. All rights reserved.
               
                <p>v1.0.0</p>
            </div>
        </aside>

        
  );};
  <CreateLeaderForm/>;
  <Configuration/>;
  <Register/>;
  <MemberTable/>,
  <AttendanceTracking/>;
  <ParentChildManager/>;
  <CountriesOverview/>;
  <CountryAdministrativeDivisions/>

  export default Sidebar;