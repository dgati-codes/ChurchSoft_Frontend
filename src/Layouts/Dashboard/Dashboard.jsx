import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import LoginForm from '../../features/auth/Components/Login/LoginForm.jsx';
import MainDashboard from './MainDashboard';
import CreateUsers from './users.jsx';
import CreateLeaderForm from './CreateLeaderForm';

const Dashboard = () => {
  const [showLoginForm, setShowLoginForm] = useState(true); // login initially visible
  const [showCreateLeaderForm, setShowCreateLeaderForm] = useState(false);
  const [showCreateUsers, setShowCreateUsers] = useState(false);


  const handleLeadersClick = () => {
    setShowCreateLeaderForm(true);
   
  };
  const handleUsersClick = () => {
    setShowCreateUsers(true);
  };

  return (
    <div className="">
      {!showLoginForm && <Navbar />}
      <div className="flex">
        {!showLoginForm && <Sidebar  onLeadersClick={handleLeadersClick}  onUserClick={handleUsersClick}/>}

        {/* Show Login Modal */}
        {showLoginForm && (
          <LoginForm onLoginSuccess={() => setShowLoginForm(false)} />
        )}

        {!showLoginForm && <MainDashboard />}
      </div>
      {/* {!showLoginForm && <Users />} */}
       {showCreateLeaderForm && (
          <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
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

       {showCreateUsers && (
          <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl relative">
              <button
                className="absolute top-10 right-6 text-xl"
                onClick={() => setShowCreateUsers(false)}
              >
                ✕
              </button>
              <CreateUsers />
            </div>
          </div>
        )}
    </div>
    
  );
};

export default Dashboard;
