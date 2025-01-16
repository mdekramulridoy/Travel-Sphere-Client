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
        path: "about",
        element: <About></About>,
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
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashBoard></DashBoard>
          </PrivateRoute>
        ),
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
      // for test user
      {
      path: "users",
      element: <Users></Users>,
    },
  ]
  },
]);
