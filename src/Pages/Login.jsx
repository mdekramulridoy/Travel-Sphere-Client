import { useContext, useRef, useState } from "react";
import loginAnimation from "../assets/lottie/login.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "./Shared/SocialLogin";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/firebase.init";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const handleLogin = async (e) => {
    e.preventDefault();
    // const form = e.target;
    const email = e.target.email.value;
    const password = e.target.password.value;
    signIn(email, password).then((result) => {
      const user = result.user;

      Swal.fire({
        title: "Login Successful.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      navigate(from, { replace: true });
      // console.log(user);
    });
    // console.log(email, password);
  };



  const handleForgetPassword = () =>{
    const email = emailRef.current.value;
    if(!email){
      console.log('enter valid email');
    } else {
      sendPasswordResetEmail(auth, email)
      .then(() =>{
        Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Password reset email sent",
                        showConfirmButton: false,
                        timer: 1500,
                      });
      })
    }
  }

  return (
    <>
      <Helmet>
        <title>Login | Travel-Sphere</title>
      </Helmet>
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
                  ref={emailRef}
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
                <label onClick={handleForgetPassword} className="label">
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
                <input
                  className="btn btn-primary  bg-[#8BDEFF] text-black border-white hover:bg-[#4fcdff]"
                  type="submit"
                  value="Login"
                />
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
            <div className="divider mx-10"></div>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
