import React, { useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { FaBars, FaHome, FaUser, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const { user } = UseAuth();
  const [isExpanded, setIsExpanded] = useState(true); 

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isExpanded ? "w-64" : "w-16"
        } bg-base-200 min-h-screen flex flex-col`}
      >
        <button
          onClick={toggleSidebar}
          className="btn btn-ghost text-lg mb-4 mt-4 self-center"
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>

        <ul className="menu p-10">
         
          {isExpanded && (
            <Link to="/" className="flex items-center space-x-4 p-2 hover:bg-white">
             <FaHome className="mr-5" />Home
            </Link>
          )}
          {isExpanded && (
            <Link to="" className="flex items-center space-x-4 p-2 hover:bg-white">
             <FaUser className="mr-5" />User
            </Link>
          )}
          {isExpanded && (
            <Link to="" className="flex items-center space-x-4 p-2 hover:bg-white">
             <FaCog className="mr-5" />Settings
            </Link>
          )}

          
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
        <p>User: {user?.displayName || "Anonymous"}</p>
      </div>
    </div>
  );
};

export default DashBoard;
