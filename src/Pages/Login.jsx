import { useContext, useState } from "react";
import loginAnimation from "../assets/lottie/login.json";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {signIn} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    // const form = e.target;
    const email = e.target.email.value;
    const password = e.target.password.value;
    signIn(email, password)
    .then(result => {
      const user =result.user;
      console.log(user);
    })
    // console.log(email, password);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content lg:flex-row md:flex-row flex-col">
        {/* here animation */}
        <div className="text-center lg:text-left">
          <Lottie animationData={loginAnimation}></Lottie>
        </div>

        {/* here animation */}

        <div className="card bg-base-100 w-full max-w-sm shrink-0">
          <div className="text-center pt-5">
            <h1 className="text-5xl font-bold text-black">Login now!</h1>
          </div>
          <form className="card-body" onSubmit={handleLogin}> 
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input text-black input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input text-black input-bordered"
                required
              />
              <label className="label">
                <Link
                  href="#"
                  className="label-text-alt text-blue-500 link link-hover"
                >
                  Forgot password?
                </Link>
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute right-3 top-12"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="form-control mt-3">
              <input className="btn btn-primary  bg-[#8BDEFF] text-black border-white hover:bg-[#4fcdff]" type="submit" value="Login" />
            </div>
          </form>
          {/* Here Error */}
          <p className="mb-4 text-center text-black">
            No Account? Please{" "}
            <Link
              className="font-bold text-red-600 hover:underline"
              to="/signup"
            >
              Sign Up
            </Link>
          </p>

          <div className="mb-4 flex justify-center">
            <button
              className="btn bg-white hover:bg-blue-600 text-green-500 font-bold text-lg flex gap-3 border-2"
            >
              <FaGoogle className="border-green-500"></FaGoogle>
              <h1 className="text-black">Sign In With Google</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
