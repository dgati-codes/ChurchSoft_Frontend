import React, { useState } from "react";
import CreateLeaderForm from "./CreateLeaderForm";
// import Users from "./UsersForm";
import Register from "./register";
import MemberTable from "./table";
import AttendanceTracking from "./Attendance";
import { LayoutDashboard, Users,  Settings, Newspaper, NotepadText, BadgeDollarSign, Church } from "lucide-react";

const Sidebar = ({ onLeadersClick, onRegisterClick, onUserClick, onTableClick, onAttendanceClick }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeParent, setActiveParent] = useState(null); // track selected parent
  const [isSubOpen, setIsSubOpen] = useState(null);
  const [openZone, setOpenZone] = useState(null);

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
    setActiveParent(key); // set active when clicked
  };
    

  return (
      <aside className="w-64 fixed left-0 top-0 h-screen border-r border-gray-200 bg-blue-900  z-10">
                      
            <div className="p-4  border-b font-bold border-gray-300">
                <div className="flex mb-14 items-center space-x-2">
            <img className="w-10" src="/images/logo.png" alt="logo" />
            <h1 className="text-xl text-white font-semibold">GCCI</h1>
          </div>
                <nav className="space-y-1">  
                    <ul>
                        
                            <li
                                onClick={() => toggleDropdown("A")}
                                className={`w-full flex items-center justify-between text-left text-sm p-4  cursor-pointer ${
                                    activeParent === "A"
                                    ? "text-yellow-500 border-l-4 border-yellow-500"
                                    : "text-white hover:text-yellow-400"
                                }`}
                                >
                                {/* Left side: icon + label */}
                                
                                <div className="flex items-center gap-3">
                                    <LayoutDashboard
                                    
                                    className="w-5 h-5 "
                                    />
                                    <span>Dashboard</span>
                                </div>
                              </li>

                        {openDropdown === "A" && (
                            <ul className=" left-full top-0 bg-white  shadow-md w-48 z-3">

                                <li onClick={onTableClick} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Table</li>

                                <li onClick={onAttendanceClick} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Attendance</li>

                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">3</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">4</li>
                                
                            </ul>
                        )}


                          <li
                                onClick={() => toggleDropdown("B")}
                                className={`w-full flex items-center justify-between text-left text-sm p-4  cursor-pointer ${
                                    activeParent === "B"
                                    ? "text-yellow-500 border-l-4 border-yellow-500"
                                    : "text-white hover:text-yellow-400"
                                }`}
                                >
                                {/* Left side: icon + label */}
                                
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 " />                                                                                                           
                                    <span>Members</span>
                                </div>

                                
                                </li>
                        {openDropdown === "B" && (
                            <ul className=" left-full top-0 bg-white  shadow-md w-48 z-3">
                                <li onClick={onLeadersClick} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Create Leader</li>



                                <li onClick={onUserClick} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Add User</li>


                                <li onClick={onRegisterClick} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Member Registration</li>


                                {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">4</li> */}
                            </ul>
                        )}


                         <li
                            onClick={() => toggleDropdown("C")}
                            className={`w-full flex text-left text-sm p-4  cursor-pointer ${
                                activeParent === "C"
                                ? "text-yellow-500 border-l-4 border-yellow-500"
                                : "text-white hover:text-yellow-400"
                            }`}
                            >
                            <div className="flex items-center gap-3">
                                <NotepadText/>
                            <span>Event</span>
                            </div>
                            </li>   
                        {openDropdown === "C" && (
                            <ul className=" left-full top-0 bg-white  shadow-md w-48 z-3">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">1</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">2</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">3</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">4</li>
                            </ul>
                        )}

                         <li
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
                        )}

                        <li
                            onClick={() => toggleDropdown("E")}
                            className={`w-full flex text-left text-sm p-4  cursor-pointer ${
                                activeParent === "E"
                                ? "text-yellow-500 border-l-4 border-yellow-500"
                                : "text-white hover:text-yellow-400"
                            }`}
                            >
                            <div className="flex items-center gap-3">
                                <Church />
                            <span>Ministries</span>
                            </div>
                            </li>
                        {openDropdown === "E" && (
                            <ul className=" bg-white hover:cursor-pointer mt-2 w-48 shadow-md">
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <button onClick={() => setIsSubOpen(!isSubOpen)} className="w-full text-left">
                                        Greater Accra Region
                                    </button>
                                    {isSubOpen && (
                                        <ul className=" relative left-20 top-0 bg-white z-30   shadow-md w-48 ">
                                            <li onClick={() => setOpenZone((prev) => (prev === "A" ? null : "A"))} className="relative text-red-500/50 w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                
                                                    ZONE A
                                                
                                            </li>
                                            {openZone === "A" && (
                                                <ul className="absolute rounded-xl left-full top-0 bg-white  shadow-md w-48 z-30">
                                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">ZONE A1</li>
                                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">ZONE A1</li>
                                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">ZONE A1</li>
                                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">ZONE A1</li>
                                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">ZONE A1</li>
                                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">ZONE A1</li>
                                                </ul>
                                            )}

                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                               <button onClick={() => setOpenZone((prev) => (prev === "B" ? null : "B"))} className="w-full text-left">
                                                 ZONE B
                                               </button>
                                               {openZone === "B" && (
                                                    <ul className="absolute left-full top-0 bg-white  shadow-md w-48 z-3">
                                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">ZONE B1</li>
                                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">ZONE B1</li>
                                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">ZONE B1</li>
                                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">ZONE B1</li>
                                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">ZONE B1</li>
                                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">ZONE B1</li>
                                                    </ul>
                                               )}
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100">Central Region</li>
                                <li className="px-4 py-2 hover:bg-gray-100">Eastern Region</li>
                                <li className="px-4 py-2 hover:bg-gray-100">Bono Region</li>
                                <li className="px-4 py-2 hover:bg-gray-100">Bono East Region</li>
                                <li className="px-4 py-2 hover:bg-gray-100">Ashanti Region</li>
                                <li className="px-4 py-2 hover:bg-gray-100">Ahafo Region</li>
                                <li className="px-4 py-2 hover:bg-gray-100">Western Region</li>
                                <li className="px-4 py-2 hover:bg-gray-100">Western North Region</li>
                                <li className="px-4 py-2 hover:bg-gray-100">Oti Region</li>
                                <li className="px-4 py-2 hover:bg-gray-100">Upper East Region</li>

                                
                            </ul>
                        )}
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
                        {openDropdown === "F" && ("")}

                         <li
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
                        {openDropdown === "G" && ("")}
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
//   <Users/>;
  <Register/>;
  <MemberTable/>,
  <AttendanceTracking/>

  export default Sidebar;