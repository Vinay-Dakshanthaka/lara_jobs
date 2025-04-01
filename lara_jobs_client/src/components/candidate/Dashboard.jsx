import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Profile from "./Profile";
import Sidebar from "../../sidebar/Sidebar";
import AdminSidebar from "../../sidebar/AdminSidebar";

const Dashboard = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  return (
    <div className="flex h-screen dark:bg-gray-800">
      {/* Sidebar - Show AdminSidebar if user is admin, else show regular Sidebar */}
      <div className="hidden lg:flex lg:w-60 bg-gray-900 dark:bg-gray-700">
        {userRole === "ADMIN" ? <AdminSidebar /> : <Sidebar userRole={userRole} />}
      </div>

      {/* Main content area where components will be rendered */}
      <div className="flex-1 bg-gray-200 dark:bg-gray-700 p-4 text-gray-800 dark:text-white overflow-x-auto">
        <Outlet /> {/* This is where nested routes will render */}
      </div>
    </div>
  );
};

export default Dashboard;
