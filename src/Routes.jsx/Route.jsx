import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import DashBoard from "../Pages/Shared/Protected/DashBoard";
import PrivateRoute from "./PrivateRoute";
import Community from "../Pages/Community/Community";
import Trips from "../Pages/Community/Trips/Trips";
import JoinAsTourGuide from "../Pages/Shared/Protected/Tourist/JoinAsTourGuide";
import GuideApplications from "../Pages/Shared/Protected/Admin/GuideApplications";
import ManageUsers from "../Pages/Shared/Protected/Admin/ManageUsers";

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
      {
         path: "manage-users", element: <ManageUsers></ManageUsers>
      },
      {
         path: "join-as-tour-guide", element: <JoinAsTourGuide></JoinAsTourGuide>
      },
      {
         path: "guideApplications", element: <GuideApplications></GuideApplications>
      },
    ],
  },
]);
