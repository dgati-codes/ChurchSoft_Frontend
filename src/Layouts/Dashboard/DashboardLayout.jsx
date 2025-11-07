import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Navbar */}
        <Navbar />

        {/* Dynamic Main Content */}
        <main className="flex-1 p-6 mt-16 overflow-y-auto transition-all duration-300 ease-in-out">
          <Outlet /> {/* 🔹 Where pages will render */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
