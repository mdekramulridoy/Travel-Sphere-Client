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
import AddPackage from "../Pages/Shared/Protected/Admin/AddPackage";
import TouristProfile from "../Pages/Shared/Protected/Tourist/TouristProfile";
import PackagesDetails from "../Pages/Shared/Protected/Common/PackagesDetails";
import GuideDetails from "../Pages/Shared/Protected/Common/GuideDetails";
import MyBookings from "../Pages/Shared/Protected/Tourist/MyBookings";
import AddStory from "../Pages/Shared/Protected/Common/AddStory";
import ManageStory from "../Pages/Shared/Protected/Common/ManageStory";
import EditStory from "../Pages/Shared/Protected/Common/EditStory";
import AssignedTour from "../Pages/Shared/Protected/TourGuide/AssignedTour";
import GuideProfile from "../Pages/Shared/Protected/TourGuide/GuideProfile";
import AdminProfile from "../Pages/Shared/Protected/Admin/AdminProfile";
import Payment from "../Pages/Shared/Protected/Common/Payment";

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
        path: "package-details/:id",
        element: (
          <PrivateRoute>
            <PackagesDetails></PackagesDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "guides/:id",
        element: (
          <PrivateRoute>
            <GuideDetails></GuideDetails>
          </PrivateRoute>
        ),
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
        path: "payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "tourist-profile",
        element: <TouristProfile></TouristProfile>,
      },
      {
        path: "guide-profile",
        element: <GuideProfile></GuideProfile>,
      },
      {
        path: "admin-profile",
        element: <AdminProfile></AdminProfile>,
      },

      {
        path: "tourist-booking",
        element: <MyBookings></MyBookings>,
      },
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "add-stories",
        element: <AddStory></AddStory>,
      },
      {
        path: "manage-story",
        element: <ManageStory></ManageStory>,
      },
      {
        path: "edit-story/:id",
        element: <EditStory></EditStory>,
      },      
      {
        path: "add-package",
        element: <AddPackage></AddPackage>,
      },
      {
        path: "join-as-tour-guide",
        element: <JoinAsTourGuide></JoinAsTourGuide>,
      },
      {
        path: "assigned-tours",
        element: <AssignedTour></AssignedTour>,
      },
      {
        path: "guideApplications",
        element: <GuideApplications></GuideApplications>,
      },
    ],
  },
]);
