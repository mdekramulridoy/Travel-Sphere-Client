import React, { useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { FaBars, FaCog, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdManageHistory, MdTour } from "react-icons/md";
import { SiStorybook } from "react-icons/si";
import useAdmin from "../../../Hooks/useAdmin";

const DashBoard = () => {
  const [isAdmin] = useAdmin();

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
        } bg-[#8BDEFF] min-h-screen flex flex-col`}
      >
        <button
          onClick={toggleSidebar}
          className="btn bg-[#6ed6ffa5] btn-ghost text-lg mb-4 mt-4 self-center"
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>

        {isAdmin ? (
          <>
            <ul className="menu p-10 gap-2">
              <li>
                {" "}
                {isExpanded && (
                  <NavLink
                    to="/dashboard/admin"
                    className="flex items-center space-x-4 p-2 hover:bg-white"
                  >
                    <CgProfile className="mr-5" />
                    Manage profile
                  </NavLink>
                )}
              </li>
              <li>
                {isExpanded && (
                  <NavLink
                    to="/dashboard/assigned-tour"
                    className="flex items-center space-x-4 p-2 hover:bg-white"
                  >
                    <MdTour className="mr-5" />
                    My Assigned Tours
                  </NavLink>
                )}
              </li>
              <li>
                {isExpanded && (
                  <NavLink
                    to="/dashboard/add-stories"
                    className="flex items-center space-x-4 p-2 hover:bg-white"
                  >
                    <SiStorybook className="mr-5" />
                    Add Stories
                  </NavLink>
                )}
              </li>
              <li>
                {isExpanded && (
                  <NavLink
                    to="/dashboard/manage-stories"
                    className="flex items-center space-x-4 p-2 hover:bg-white"
                  >
                    <MdManageHistory className="mr-5" />
                    Manage Stories
                  </NavLink>
                )}
              </li>
              <li>
                {isExpanded && (
                  <NavLink
                    to="/dashboard/users"
                    className="flex items-center space-x-4 p-2 hover:bg-white"
                  >
                    <FaUsers className="mr-5" />
                    Users
                  </NavLink>
                )}
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="menu p-10">
              <li>
                {isExpanded && (
                  <NavLink
                    to="/dashboard/manage-profile"
                    className="flex items-center space-x-4 p-2 hover:bg-white"
                  >
                    <FaCog className="mr-5" />
                    Manage profile
                  </NavLink>
                )}
              </li>
              <li>
                {isExpanded && (
                  <NavLink
                    to="/dashboard/my-booking"
                    className="flex items-center space-x-4 p-2 hover:bg-white"
                  >
                    <FaCog className="mr-5" />
                    My Bookings
                  </NavLink>
                )}
              </li>
            </ul>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
