import React, { useState } from "react";
import registerAnimation from "../assets/lottie/signup.json";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content lg:flex-row md:flex-row flex-col">
        <div className="text-center lg:w-[700px] md:w-[500px] w-[400px] lg:text-left">
          <Lottie animationData={registerAnimation}></Lottie>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="text-center pt-5">
            <h1 className="text-5xl font-bold text-black">Signup now!</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your Full Name"
                className="input input-bordered text-black"
              />
              {errors.name && (
                <span className="text-red-600 mt-1">{errors.name.message}</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="input input-bordered text-black"
              />
              {errors.email && (
                <span className="text-red-600 mt-1">{errors.email.message}</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Password</span>
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be less than 20 characters",
                    },
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full text-black"
                />
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600 mt-1">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )}
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
              {errors.password && (
                <span className="text-red-600">{errors.password.message}</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Photo URL</span>
              </label>
              <input
                {...register("photo", { required: "Photo URL is required" })}
                type="text"
                placeholder="Photo URL"
                className="input input-bordered text-black"
              />
              {errors.photo && (
                <span className="text-red-600">{errors.photo.message}</span>
              )}
            </div>
            <div className="form-control flex flex-col items-center space-y-2 md:space-y-0 md:space-x-4">
              <label className="label flex items-center">
                <input
                  {...register("terms", {
                    required: "You must agree to the terms",
                  })}
                  type="checkbox"
                  className="mr-2"
                />
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
              {errors.terms && (
                <span className="text-red-600">{errors.terms.message}</span>
              )}
              <div className="mt-2 md:mt-0">
                <p className="text-center text-black">
                  Already have an account?{" "}
                  <Link
                    className="font-bold text-red-600 hover:underline"
                    to="/login"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn btn-primary bg-[#8BDEFF] text-black border-white hover:bg-[#4fcdff]"
                value="Sign Up"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
