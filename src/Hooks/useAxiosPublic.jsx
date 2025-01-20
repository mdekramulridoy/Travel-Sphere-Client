import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://travel-sphere-server-nu.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;