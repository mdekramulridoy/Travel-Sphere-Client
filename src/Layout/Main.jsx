import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
