import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  // All Navbar link here
  const links = (
    <>
      <li>
        <NavLink to="/" className="px-2 py-1">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="px-2 py-1">
          About us
        </NavLink>
      </li>

      {user ? (
        <>
          <button onClick={handleLogOut} className="btn btn-ghost">
            Logout
          </button>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login" className="px-2 py-1">
              Login
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 bg-[#77d8ffda] px-4 lg:px-16 py-2 z-50 shadow-md backdrop-blur-lg">
      {/* Start */}
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown rounded-lg mr-2 bg-[#47cbffda]">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden md:hidden "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
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
        {/* Center for large device*/}
        <div className="navbar-center hidden md:flex lg:flex ">
          <ul className="menu gap-2 menu-horizontal px-1">{links}</ul>
        </div>
        {/* User login button Start*/}
        <div className="navbar-end">
          {user ? (
            <>
              <button onClick={handleLogOut} className="btn btn-ghost">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="px-2 py-1">
                Login
              </NavLink>
            </>
          )}
          {/* <button className="btn">Login</button> */}
        </div>
        {/* User login button End*/}
      </div>
    </div>
  );
};

export default Navbar;
