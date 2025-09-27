import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import LoginForm from '../../features/auth/Components/Login/LoginForm.jsx';
import MainDashboard from './MainDashboard';
// import CreateUsers from './UsersForm.jsx';
import CreateLeaderForm from './CreateLeaderForm';
import Register from './register';
import MemberTable from './table';
import AttendanceTracking from './Attendance';
import ParentChildManager from './ParentChild';
import CountriesOverview from './CountriesOverview';
import CountryAdministrativeDivisions from './CountryAdministrativeDivisions';
import DashboardSummary from  './Configuration';

const Dashboard = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showCreateLeaderForm, setShowCreateLeaderForm] = useState(false);
  const [showCreateUsers, setShowCreateUsers] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);

  const handleLeadersClick = () => {
    setShowCreateLeaderForm(true);
  };

  const handleUsersClick = () => {
    setShowCreateUsers(true);
  };

  const handleRegisterClick = () => {
    // Reset the Register form and show it
    setShowRegister(false); // Hide first to force re-mount
    setTimeout(() => setShowRegister(true), 0); // Show again next tick
  };
  const handleTableClick = () => {
    setShowTable(true);
  };
  const handleAttendanceClick = () => {
    setShowAttendance(true);
  };

  return (
    <div className="">
      


      {!showLoginForm && <Navbar />}
      <div className="flex">
        {!showLoginForm && (
          <Sidebar
            onRegisterClick={handleRegisterClick}
            onLeadersClick={handleLeadersClick}
            onUserClick={handleUsersClick}
            onTableClick={handleTableClick}
            onAttendanceClick={handleAttendanceClick}
          />
        )}

        {showLoginForm ? (
          <LoginForm onLoginSuccess={() => setShowLoginForm(false)} />
        ) : 
        showRegister ? (
          <div className="flex-1 ml-64 p-8  flex-grow">
             <button
              className="absolute top-6 right-128 text-2xl"
              onClick={() => setShowRegister(false)}
            >
              ✕
            </button>
            <Register key={Date.now()} />
          </div>
        ) : (
          <div >
            <MainDashboard />
          <CountriesOverview  />
        <ParentChildManager  />
        <CountryAdministrativeDivisions />
        <DashboardSummary />
          </div>
        )} 
      </div>



      {showAttendance && (
         <div className="relative inset-0 ml-64  bg-white flex justify-center items-center ">
          <div className="flex-1 ml-64 p-8 mt-10 flex-grow">
            <button
             className="absolute top-2 right-128 text-2xl"
              onClick={() => setShowAttendance(false)}
            >
              ✕
            </button>
            <AttendanceTracking />
          </div>
        </div>
      )}



      {/* Create Leader Modal */}
      {showTable && (
        <div className="fixed inset-0 ml-64  bg-white flex justify-center items-center ">
          <div cclassName="flex-1 ml-64 p-8 mt-10 flex-grow">
            <button
             className="absolute top-2 right-128 text-2xl"
              onClick={() => setShowTable(false)}
            >
              ✕
            </button>
            <MemberTable />
          </div>
        </div>
      )}



      {showCreateLeaderForm && (
        <div className="absolute inset-0 ml-64  bg-white flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-2xl relative">
            <button
              className="absolute top-3 right-4 text-xl"
              onClick={() => setShowCreateLeaderForm(false)}
            >
              ✕
            </button>
            <CreateLeaderForm />
          </div>
        </div>
      )}



      {/* Create Users Modal */}
      {showCreateUsers && (
        <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl relative">
            <button
              className="absolute top-10 right-6 text-xl"
              onClick={() => setShowCreateUsers(false)}
            >
              ✕
            </button>
            {/* <CreateUsers /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


