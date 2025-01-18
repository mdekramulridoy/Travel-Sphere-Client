import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./UseAuth";


const useUserRole = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: [user?.email, "userRole"],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
        try {
          const res = await axiosSecure.get(`/users/role/${user.email}`);
          return res.data?.role;
        } catch (error) {
          console.error("Error fetching role:", error);
          return 'tourist';
        }
      }
      
  });

  const isAdmin = role === "admin";
  const isGuide = role === "guide";
  const isTourist = role === "tourist";

  return { isAdmin, isGuide, isTourist, roleLoading };
};

export default useUserRole;
