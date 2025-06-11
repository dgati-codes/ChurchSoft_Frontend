import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
// import LoginForm from "../../features/auth/Components/Login/LoginForm.jsx";
import MainDashboard from './MainDashboard';


const Dashboard = () => {
  
  

  return (
    <div className=" bg-gray-100">
      
      
        
  
        <Navbar />
        <div className='flex'>
          <Sidebar />
          {/* <LoginForm /> */}
          <MainDashboard/>
        </div>
        
        
        
      
    </div>
  );
};

export default Dashboard;