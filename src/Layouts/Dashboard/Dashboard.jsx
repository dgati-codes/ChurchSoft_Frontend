import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import LoginForm from "../../features/auth/Components/Login/LoginForm.jsx";
import MainDashboard from './MainDashboard';
import Users from '../../users';



const Dashboard = () => {
  
  

  return (
    <div className="">
      
      
        
  
        {/* <Navbar /> */}
       
        <div className='flex'> 
          {/* <Sidebar /> */}
          {/* <LoginForm /> */}
          {/* <MainDashboard/> */}
          
         </div>
        
         <Users/>
        
      
    </div>
  );
};

export default Dashboard;