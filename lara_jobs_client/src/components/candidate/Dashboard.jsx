import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role); 
  }, []); 

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex lg:w-60">
        <Sidebar userRole={userRole} />
      </div>

      <div className="flex-1 bg-gray-200 dark:bg-gray-700">
        <Profile  />
      </div>
    </div>
  );
}

export default Dashboard;
