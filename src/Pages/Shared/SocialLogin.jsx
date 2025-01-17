import React from "react";
import { FaGoogle } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = UseAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photoURL: result.user?.photoURL,
      };
      const response = await axiosPublic.post("/users", userInfo);

      if (response.status === 200) {
        // console.log("User logged in successfully:", response.data);
        navigate("/");
      } else {
        console.error("Failed to save user data:", response.data);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <div className="mb-4 flex justify-center">
      <button
        onClick={handleGoogleSignIn}
        className="btn hover:bg-white text-green-500 font-bold text-lg flex gap-3 border-2"
      >
        <FaGoogle className="border-green-500"></FaGoogle>
        <h1 className="text-black #4FCDFF">Sign In With Google</h1>
      </button>
    </div>
  );
};

export default SocialLogin;
