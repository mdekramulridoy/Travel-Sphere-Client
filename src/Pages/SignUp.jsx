import React, { useState } from 'react';
import registerAnimation from '../assets/lottie/signup.json';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Lottie from "lottie-react";

const Signup = () => {

     const [showPassword, setShowPassword] = useState(false);

     const handleSignup = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photo = e.target.photo.value;
        console.log(email, password , photo);
      };

    return (
        <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content lg:flex-row md:flex-row flex-col">
        {/* here animation */}

        <div className="text-center lg:w-[700px] md:w-[500px] w-[400px] lg:text-left">
          <Lottie animationData={registerAnimation}></Lottie>
        </div>

        {/* here animation */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="text-center pt-5">
          <h1 className="text-5xl font-bold text-black">Signup now!</h1>
        </div>
          <form onSubmit={handleSignup} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your Full Name"
                className="input input-bordered text-black"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered text-black"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Password</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full text-black"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 cursor-pointer"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-black" />
                  ) : (
                    <FaEye className="text-black" />
                  )}
                </span>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Photo URL</span>
              </label>
              <input
                name="photo"
                type="text"
                placeholder="Photo URL"
                className="input input-bordered text-black"
              />
            </div>

            <div className="form-control flex flex-col items-center space-y-2 md:space-y-0 md:space-x-4">
              <label className="label flex items-center">
                <input name="terms" type="checkbox" className="mr-2" />
                <span className="text-black text-sm">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-bold text-black hover:underline"
                  >
                    terms & conditions
                  </Link>
                </span>
              </label>
              <div className="mt-2 md:mt-0">
              <p className=" text-center text-black">
            Already have an account?{" "}
            <Link
              className="font-bold text-red-600 hover:underline"
              to="/login"
            >
              Sign Up
            </Link>
          </p>
              </div>
            </div>

            <div className="form-control mt-6">
              <input type="submit"
                className="btn btn-primary bg-[#8BDEFF] text-black border-white hover:bg-[#4fcdff]" value="Sign Up" />
            </div>
     {/* Error here */}
          </form>
        </div>
      </div>
    </div>
    );
};

export default Signup;