import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Login from "../Pages/Login";
import Signup from "../Pages/SignUp";
import DashBoard from "../Pages/Shared/Protected/DashBoard";
import PrivateRoute from "./PrivateRoute";
import PackagesDetails from "../Details/PackagesDetails";
import TourGuideDetails from "../Details/TourGuideDetails";
import Users from "../Pages/Shared/Protected/dashboard/Users";
import Community from "../Pages/Community/Community";
import Trips from "../Pages/Community/Trips/Trips";

import MyBookings from "../Pages/Shared/Protected/Tourist/MyBookings";


import JoinAsGuide from "../Pages/Shared/Protected/Tourist/JoinAsGuide";

import AdminAssignedTour from "../Pages/Shared/Protected/Admin/AdminAssignedTour";
import MyProfile from "../Pages/Shared/Protected/Common/MyProfile";
import AddStory from "../Pages/Shared/Protected/Common/AddStory";
import ManageStory from "../Pages/Shared/Protected/Common/ManageStory";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "community",
        element: <Community></Community>,
      },
      {
        path: "about",
        element: <About></About>,
      },

      {
        path: "trips",
        element: <Trips></Trips>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },

      {
        path: "package-details/:id",
        element: <PackagesDetails></PackagesDetails>,
      },
      {
        path: "tour-guide-profile/:id",
        element: <TourGuideDetails></TourGuideDetails>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    children: [
      // admin user
      {
        path: "profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "add-stories",
        element: <AddStory></AddStory>,
      },
      {
        path: "manage-stories",
        element: <ManageStory></ManageStory>,
      },
      {
        path: "admin-assigned-tours",
        element: <AdminAssignedTour></AdminAssignedTour>,
      },


 
      
      // for test user
      {
        path: "users",
        element: <Users></Users>,
      },
      // that is for test

      {
        path: "tourist-booking",
        element: <MyBookings></MyBookings>,
      },

      {
        path: "join-as-tour-guide",
        element: <JoinAsGuide></JoinAsGuide>,
      },
    ],
  },
]);
