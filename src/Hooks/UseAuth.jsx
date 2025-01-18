import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const UseAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext is undefined. Make sure AuthProvider is wrapped around your app.");
  }

  return auth;
};

export default UseAuth;
