import React, { useState } from 'react';
import { X } from 'lucide-react';
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
import Configuration from  './Configuration';

const Dashboard = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showCreateLeaderForm, setShowCreateLeaderForm] = useState(false);
  const [showCreateUsers, setShowCreateUsers] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [showCountriesOverview, setShowCountriesOverview] = useState(false);
  

  const handleLeadersClick = () => {
    setShowCreateLeaderForm(true);
  };

  const handleConfigurationClick = () => {
    setShowConfiguration(true);
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
  const handleCountriesOverviewClick = () => {
    setShowCountriesOverview(true);
  }

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
            onLogoutClick={() => setShowLoginForm(true)}
            onConfigurationClick={handleConfigurationClick}
            onCountriesOverviewClick={handleCountriesOverviewClick}
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
                  <X />
            </button>
            <Register key={Date.now()} />
          </div>
        ) : (
          <div >
            <MainDashboard />
        <ParentChildManager  />
        <CountryAdministrativeDivisions />
       
          </div>
        )} 
      </div>



      {showAttendance && (
         <div className="relative inset-0 ml-64   flex justify-center items-center ">
          <div className="flex-1 ml-64 p-8 mt-10 flex-grow">
            <button
             className="absolute top-2 right-128 text-2xl"
              onClick={() => setShowAttendance(false)}
            >
                  <X />
            </button>
            <AttendanceTracking />
          </div>
        </div>
      )}



      {/* Create Leader Modal */}
      {showTable && (
        <div className="fixed inset-0 ml-64   flex justify-center items-center ">
          <div cclassName="flex-1 ml-64 p-8 mt-10 flex-grow">
            <button
             className="absolute top-2 right-128 text-2xl"
              onClick={() => setShowTable(false)}
            >
                  <X />
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
                  <X />
            </button>
            <CreateLeaderForm />
          </div>
        </div>
      )}



      {/* Create Users Modal */}
      {showConfiguration && (
        <div className="flex-1 ml-64 p-8  flex-grow">
          <div className=" p-6 rounded-xl  relative">
            <button
              className="absolute top-10 right-6 text-xl"
              onClick={() => setShowConfiguration(false)}
            >
                  <X />
            </button>
             <Configuration/>
          </div>
        </div>
      )}
   
      {showCountriesOverview && (
        <div className="flex-1 ml-58 p-2 flex-grow">
          <div className=" p-6 rounded-xl  relative">
            <button
              className="absolute top-0 right-6 text-xl"
              onClick={() => setShowCountriesOverview(false)}
            >
              <X />
            </button>
             <CountriesOverview/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


