import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import LoginForm from '../../features/auth/Components/Login/LoginForm.jsx';
import MainDashboard from './MainDashboard';
import CreateUsers from './users.jsx';
import CreateLeaderForm from './CreateLeaderForm';
import Register from './register';

const Dashboard = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showCreateLeaderForm, setShowCreateLeaderForm] = useState(false);
  const [showCreateUsers, setShowCreateUsers] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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

  return (
    <div className="">
      {!showLoginForm && <Navbar />}
      <div className="flex">
        {!showLoginForm && (
          <Sidebar
            onRegisterClick={handleRegisterClick}
            onLeadersClick={handleLeadersClick}
            onUserClick={handleUsersClick}
          />
        )}

        {showLoginForm ? (
          <LoginForm onLoginSuccess={() => setShowLoginForm(false)} />
        ) : showRegister ? (
          <div className="flex-1 ml-64 p-8 mt-10 flex-grow">
             <button
              className="absolute top-6 right-128 text-2xl"
              onClick={() => setShowRegister(false)}
            >
              ✕
            </button>
            <Register key={Date.now()} />
          </div>
        ) : (
          <MainDashboard />
        )}
      </div>

      {/* Create Leader Modal */}
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
            <CreateUsers />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
