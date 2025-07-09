import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import LoginForm from '../../features/auth/Components/Login/LoginForm.jsx';
import MainDashboard from './MainDashboard';
import Users from '../../users';

const Dashboard = () => {
  const [showLoginForm, setShowLoginForm] = useState(true); // login initially visible

  return (
    <div className="">
      {!showLoginForm && <Navbar />}
      <div className="flex">
        {!showLoginForm && <Sidebar />}

        {/* Show Login Modal */}
        {showLoginForm && (
          <LoginForm onLoginSuccess={() => setShowLoginForm(false)} />
        )}

        {!showLoginForm && <MainDashboard />}
      </div>
      {!showLoginForm && <Users />}
    </div>
  );
};

export default Dashboard;
