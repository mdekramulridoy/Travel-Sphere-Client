import axios from "axios";

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;