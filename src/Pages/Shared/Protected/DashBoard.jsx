import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import UseAuth from "../../../Hooks/UseAuth";
import { FaBars, FaUsers } from "react-icons/fa";
import { CgHome, CgLogOut, CgProfile } from "react-icons/cg";
import { MdTour } from "react-icons/md";
import { SiStorybook } from "react-icons/si";
import Footer from "../Footer";

const DashBoard = () => {
  const { user, role, logOut } = UseAuth();
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  // Define role-based menu configuration
  const menuConfig = {
    admin: [
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
      {
        to: "/",
        icon: <CgHome />,
        label: "Back to Home",
      },
    ],
    guide: [
      {
        to: "/dashboard/guide-profile",
        icon: <CgProfile />,
        label: "Guide Profile",
      },
      {
        to: "/dashboard/assigned-tours",
        icon: <MdTour />,
        label: "My Assigned Tours",
      },
      {
        to: "/dashboard/add-stories",
        icon: <SiStorybook />,
        label: "Add Stories",
      },
      {
        to: "/dashboard/manage-story",
        icon: <MdTour />,
        label: "Manage Stories",
      },
      {
        to: "/",
        icon: <CgHome />,
        label: "Back to Home",
      },
    ],
    tourist: [
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
        to: "/dashboard/add-stories",
        icon: <SiStorybook />,
        label: "Add Stories",
      },
      {
        to: "/dashboard/manage-story",
        icon: <MdTour />,
        label: "Manage Stories",
      },
      {
        to: "/dashboard/join-as-tour-guide",
        icon: <MdTour />,
        label: "Join As Guide",
      },
      {
        to: "/",
        icon: <CgHome />,
        label: "Back to Home",
      },
    ],
  };

  // Handle Logout
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  // Append Logout option for all roles
  const menuItems = menuConfig[role] || [];
  menuItems.push({
    to: "/login",
    icon: <CgLogOut />,
    label: "Logout",
    onClick: handleLogOut,
  });

  // Redirect to the default profile page based on role
  useEffect(() => {
    if (role) {
      const defaultRoute = {
        admin: "/dashboard/admin-profile",
        guide: "/dashboard/guide-profile",
        tourist: "/dashboard/tourist-profile",
      }[role];

      navigate(defaultRoute, { replace: true });
    }
  }, [role, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isExpanded ? "w-64" : "w-16"
          } bg-blue-300 min-h-screen flex flex-col`}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn bg-blue-500 text-white text-lg mb-4 mt-4 self-center"
          >
            <FaBars />
          </button>
          <ul className="menu p-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  onClick={item.onClick}
                  className="flex items-center space-x-4 p-2"
                >
                  {item.icon}
                  {isExpanded && item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashBoard;
