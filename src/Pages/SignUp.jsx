import React, { useContext, useState } from "react";
import registerAnimation from "../assets/lottie/signup.json";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import SocialLogin from "./Shared/SocialLogin";

// Function to upload image to imgbb
const uploadImageToImgbb = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    // console.log(data);
    return data.success ? data.data.display_url : null;
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};

const Signup = () => {
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const imageFile = data.image[0];

    // Upload image to imgbb
    const photoURL = await uploadImageToImgbb(imageFile);
    if (!photoURL) {
      Swal.fire("Image upload failed!", "Please try again.", "error");
      return;
    }

    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      updateUserProfile(data.name, photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            photoURL: photoURL,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Sign Up successful",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | Travel-Sphere</title>
      </Helmet>
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
                  <span className="text-red-600 mt-1">
                    {errors.name.message}
                  </span>
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
                  <span className="text-red-600 mt-1">
                    {errors.email.message}
                  </span>
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
                      pattern:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-full text-black"
                  />
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600 mt-1">
                      Password must have one Uppercase, one lowercase, one
                      number, and one special character.
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
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Photo</span>
                </label>
                <input
                  {...register("image", { required: "Photo is required" })}
                  type="file"
                  accept="image/*"
                  className="input input-bordered text-black"
                />
                {errors.image && (
                  <span className="text-red-600">{errors.image.message}</span>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn btn-primary bg-[#8BDEFF] text-black border-white hover:bg-[#4fcdff]"
                  value="Sign Up"
                />
              </div>
              <div className="divider mx-10"></div>
              <SocialLogin></SocialLogin>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
