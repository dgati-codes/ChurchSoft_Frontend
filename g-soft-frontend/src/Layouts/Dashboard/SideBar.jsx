import React from 'react';
import { useState } from 'react';

const Sidebar = () => {
 
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [openZone, setOpenZone] = useState("");

  const [openDropdown, setOpenDropdown] = useState(null);

const toggleDropdown = (key) => {
  setOpenDropdown((prev) => (prev === key ? null : key));
};

    

  return (
        <aside className="w-64 mt-17 border-r border-gray-100  bg-gray-50 hadow-xl-30 flex flex-col h-screen justify-between">
            <div className="p-8 border-b font-bold border-gray-300">
                <nav className="space-y-1">  
                    <ul>
                        <li onClick={() => toggleDropdown("A")}  className="w-full flex text-left text-sm text-gray-500 hover:text-blue-600 p-4 rounded-lg hover:bg-white hover:cursor-pointer">
                            <img className='pr-4' src="/images/dashboard.svg" alt="dashboard" />
                            Dashboard
                        </li>
                        {openDropdown === "A" && (
                            <ul className=" left-full top-0 bg-white  shadow-md w-48 z-3">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">1</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">2</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">3</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">4</li>
                                
                            </ul>
                        )}


                        <li onClick={() => toggleDropdown("B")}  className="w-full flex text-left text-sm text-gray-500 hover:text-blue-600 p-4 rounded-lg hover:bg-white hover:cursor-pointer">
                            <img className='pr-4' src="/images/users.svg" alt="users" />
                            Members
                        </li>
                        {openDropdown === "B" && (
                            <ul className=" left-full top-0 bg-white  shadow-md w-48 z-3">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">1</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">2</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">3</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">4</li>
                            </ul>
                        )}


                        <li onClick={() => toggleDropdown("C")} className="w-full flex text-sm text-gray-500 hover:text-blue-600 p-4 rounded-lg hover:bg-white hover:cursor-pointer">
                            <img className="pr-4" src="/images/calendar-days.svg" alt="calendar" />
                            Events
                        </li>
                        {openDropdown === "C" && (
                            <ul className=" left-full top-0 bg-white  shadow-md w-48 z-3">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">1</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">2</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">3</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">4</li>
                            </ul>
                        )}

                        <li onClick={() => toggleDropdown("D")} className="w-full flex text-left text-sm text-gray-500 hover:text-blue-600 p-4 rounded-lg hover:bg-white hover:cursor-pointer">
                            <img className="pr-4" src="/images/donations.svg" alt="donations" />
                            Donations
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

                        <li onClick={() => toggleDropdown("E")} className="w-full flex text-left text-sm text-gray-500 hover:text-blue-600 p-4 rounded-lg hover:bg-white hover:cursor-pointer">
                            <img className='pr-4' src="/images/church.svg" alt="church" />
                            Ministries
                        </li>
                        {openDropdown === "E" && (
                            <ul className=" bg-white hover:cursor-pointer mt-2 w-48 shadow-md">
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <button onClick={() => setIsSubOpen(!isSubOpen)} className="w-full text-left">
                                        Greater Accra Region
                                    </button>
                                    {isSubOpen && (
                                        <ul className="relative left-full top-0 bg-white   shadow-md w-48 ">
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
                        <li onClick={() => toggleDropdown("F")} className="w-full flex text-left text-sm text-gray-500 hover:text-blue-600 p-4 rounded-lg hover:bg-white hover:cursor-pointer">
                            <img className='pr-4' src="/images/clipboard-list.svg" alt="reports" />
                            Reports
                        </li>
                        {openDropdown === "F" && ("")}

                        <li onClick={() => toggleDropdown("G")} className="w-full flex  text-sm text-gray-500 hover:text-blue-600 p-4 rounded-lg hover:bg-white hover:cursor-pointer">
                            <img className='pr-4' src="/images/cog.svg" alt="cog" />
                            Settings
                        </li>
                        {openDropdown === "G" && ("")}
                    </ul>  
                </nav>
                

            </div>

            <div className="p-2 border-t border-gray-200 text-xs text-gray-500">
                <p>Church Management System</p>
                <p>v1.0.0</p>
            </div>
        </aside>
  );};

  export default Sidebar;