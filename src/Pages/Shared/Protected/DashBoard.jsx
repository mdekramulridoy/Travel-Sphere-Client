import React, { useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { FaBars, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { CgHome, CgLogOut, CgProfile } from "react-icons/cg";
import { MdTour } from "react-icons/md";
import { SiStorybook } from "react-icons/si";
import Footer from "../Footer";

const DashBoard = () => {
  const { user, role, logOut } = UseAuth(); // Make sure logOut is available
  const [isExpanded, setIsExpanded] = useState(true);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // Redirect or show a success message
      })
      .catch((error) => console.log(error));
  };

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
        to: "/dashboard/admin-profile",
        icon: <CgProfile />,
        label: "Admin Profile",
      },
      {
        to: "/dashboard/guideApplications",
        icon: <MdTour />,
        label: "Guide Applications",
      },
      {
        to: "/dashboard/add-package",
        icon: <SiStorybook />,
        label: "Add Package",
      },
      {
        to: "/dashboard/manage-users",
        icon: <FaUsers />,
        label: "Manage Users",
      },
      { to: "/login", icon: <CgLogOut />, label: "Logout", onClick: handleLogOut },
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
        label: "Guide Profile",
      },
      { to: "/dashboard/assigned-tours", icon: <MdTour />, label: "My Tours" },
      {
        to: "/dashboard/add-stories",
        icon: <SiStorybook />,
        label: "Add Stories",
      },
      { to: "/login", icon: <CgLogOut />, label: "Logout", onClick: handleLogOut },
    ],
    tourist: [
      {
        to: "/",
        icon: <CgHome />,
        label: "Home",
      },
      {
        to: "/dashboard/tourist-profile",
        icon: <CgProfile />,
        label: "Tourist Profile",
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
      {
        to: "/dashboard/join-as-tour-guide",
        icon: <MdTour />,
        label: "join As Guide",
      },
      { to: "/login", icon: <CgLogOut />, label: "Logout", onClick: handleLogOut },
    ],
  };

  // Select menu items based on role
  const menuItems = menuConfig[role] || [];

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
                  onClick={item.onClick} // Adding onClick to the logout button
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
          <h1 className="text-3xl font-bold">Welcome t o the Dashboard</h1>
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
