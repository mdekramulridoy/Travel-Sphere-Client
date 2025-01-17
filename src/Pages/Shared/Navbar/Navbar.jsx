import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  // All Navbar links here
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className="px-2 py-1 hover:bg-slate-100 rounded-xl border"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/community"
          className="px-2 py-1 hover:bg-slate-100 rounded-xl border"
        >
          Community
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className="px-2 py-1 hover:bg-slate-100 rounded-xl border"
        >
          About us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/trips"
          className="px-2 py-1 hover:bg-slate-100 rounded-xl border"
        >
          Trips
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 bg-[#77d8ffda] px-5 lg:px-16 py-2 z-50 shadow-md backdrop-blur-lg flex items-center justify-center">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown rounded-lg mr-2 bg-[#47cbffda]">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden md:hidden"
            >
              <FaBars />
            </button>
            <ul
              tabIndex={0}
              className="menu backdrop-blur-3xl menu-compact dropdown-content bg-[#47cbffda] rounded-box z-[1] mt-3 p-2 shadow flex flex-col gap-2 text-white"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <img
              className="lg:w-12 md:w-10 w-8"
              src="https://i.ibb.co.com/SvGff4r/logo.png"
              alt="travel-sphere logo"
            />
            <h1 className="text-sm font-bold">Travel Sphere</h1>
          </Link>
        </div>
        <div className="navbar-center hidden md:flex lg:flex">
          <ul className="menu gap-2 menu-horizontal px-1 flex items-center justify-center">
            {links}
          </ul>
        </div>
        <div className="navbar-end flex items-center gap-4">
          {user ? (
            <>
              {/* Profile Picture and Dropdown */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="avatar cursor-pointer w-10 h-10">
                  <img
                    className="w-full h-full rounded-full"
                    src={
                      user.photoURL ||
                      "https://i.ibb.co.com/ph6PK0H/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                    }
                    alt="User Profile"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box shadow-lg w-52 mt-3"
                >
                  <li className="px-2 py-1 text-gray-600 font-bold">
                    {user.displayName || "User Name"}
                  </li>
                  <li className="px-2 py-1 text-gray-500 text-sm">
                    {user.email || "user@example.com"}
                  </li>
                  <div className="divider"></div>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className="px-2 py-1 hover:bg-[#8bdeff73] rounded-md mb-2 border"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="px-2 py-1 hover:bg-[#8bdeff73] font-bold rounded-md text-red-500 border"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <NavLink
              to="/login"
              className="px-2 border py-1 hover:bg-slate-100 rounded-xl"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
