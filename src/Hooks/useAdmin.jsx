// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
// import UseAuth from "./UseAuth";

// const useAdmin = () => {
//   const { user, loading } = UseAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
//     queryKey: [user?.email, "isAdmin"],
//     enabled: !!user?.email && !loading, 
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/admin/${user.email}`);
//       return res.data?.admin;
//     },
//   });

//   return [isAdmin, isAdminLoading];
// };

// export default useAdmin;
