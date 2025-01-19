import React, { useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { FaBars, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { CgHome, CgProfile } from "react-icons/cg";
import { MdManageHistory, MdTour } from "react-icons/md";
import { SiStorybook } from "react-icons/si";
import Footer from "../Footer";

const DashBoard = () => {
  const { user, role } = UseAuth();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Role-Based Menu Configuration
  const menuConfig = {
    admin: [
      {
        to: "/",
        icon: <CgHome />,
        label: "Home",
      },
      {
        to: "/dashboard/profile",
        icon: <CgProfile />,
        label: "Manage Profile",
      },
      {
        to: "/dashboard/admin-assigned-tours",
        icon: <MdTour />,
        label: "My Assigned Tours",
      },
      {
        to: "/dashboard/guideApplications",
        icon: <MdTour />,
        label: "Guide Applications",
      },
      {
        to: "/dashboard/add-stories",
        icon: <SiStorybook />,
        label: "Add Stories",
      },
      {
        to: "/dashboard/manage-stories",
        icon: <MdManageHistory />,
        label: "Manage Stories",
      },
      { to: "/dashboard/manage-users", icon: <FaUsers />, label: "Manage Users" },
    ],
    guide: [
      {
        to: "/",
        icon: <CgHome />,
        label: "Home",
      },
      {
        to: "/dashboard/profile",
        icon: <CgProfile />,
        label: "Manage Profile",
      },
      { to: "/dashboard/assigned-tours", icon: <MdTour />, label: "My Tours" },
      {
        to: "/dashboard/add-stories",
        icon: <SiStorybook />,
        label: "Add Stories",
      },
    ],
    tourist: [
      {
        to: "/",
        icon: <CgHome />,
        label: "Home",
      },
      {
        to: "/dashboard/profile",
        icon: <CgProfile />,
        label: "Manage Profile",
      },
      {
        to: "/dashboard/tourist-booking",
        icon: <MdTour />,
        label: "My Bookings",
      },
      {
        to: "/dashboard/manage-stories",
        icon: <MdTour />,
        label: "Manage Stories",
      },
      { to: "/dashboard/add-stories", icon: <MdTour />, label: "Add Stories" },
      {
        to: "/dashboard/join-as-tour-guide",
        icon: <MdTour />,
        label: "Join as tour guide",
      },
    ],
  };

  // Select menu items based on role
  const menuItems = menuConfig[role] || [];
  console.log(role);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div
          className={`transition-all duration-300 ${
            isExpanded ? "w-64" : "w-16"
          } bg-blue-300 min-h-screen flex flex-col`}
        >
          <button
            onClick={toggleSidebar}
            className="btn bg-blue-500 text-white text-lg mb-4 mt-4 self-center"
          >
            <FaBars />
          </button>
          <ul className="menu p-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  className="flex items-center space-x-4 p-2"
                >
                  {item.icon}
                  {isExpanded && item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-5">
          <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
          <p>User: {user?.email}</p>
          <p>Role: {role}</p>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoard;
