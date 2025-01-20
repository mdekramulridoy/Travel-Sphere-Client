import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.init";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("tourist");
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => {
      setUser(null);
      setRole("tourist");
      setLoading(false);
    });
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    
  };
  const setUserRole = async (email) => {
    const token = localStorage.getItem("access-token");
    try {
      const res = await axiosPublic.get(`/users/role/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRole(res.data?.role || "tourist");
    } catch (err) {
      console.error("Error setting user role:", err);
      setRole("tourist");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userInfo = { email: currentUser.email };
        try {
          const res = await axiosPublic.post("jwt", userInfo);
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
          await setUserRole(currentUser.email);
        } catch (err) {
          console.error("Error setting JWT token or user role:", err);
        }
      } else {
        setUser(null);
        setRole("tourist");
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    role,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
