import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
    baseURL: process.env.VITE_API_URL || "http://localhost:5000",
  });
  

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = UseAuth();

  // Request interceptor for adding authorization header
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle errors
  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
