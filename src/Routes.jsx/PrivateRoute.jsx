import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
    const location = useLocation();

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{from: location}} replace></Navigate>;

  return (
    <div>
      <h1>This is private route.</h1>
    </div>
  );
};

export default PrivateRoute;
