import { createContext, useEffect, useState, useContext } from "react";
import { db, auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { toast } from "react-toastify";

import {
  collection,
  doc,
  getDoc,
  limitToLast,
  setDoc,
} from "firebase/firestore";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const router = useRouter();

  const [name, setName] = useState("zaher");

  const [pageLoading, setPageLoading] = useState(false);

  const [userData, setUserData] = useState(null);
  const [profile, setProfile] = useState(null);
  const register = async (email, password, firstName, lastName) => {
    console.log("data in register Function", email);
    // step 1  register to firebase/auth with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        setPageLoading(true);
        // step 2 save this user data  {email , uuid , displaName} + Role--> {admin ,user} to firestore
        console.log("Res--->", res?.user);

        // verification Link send to user Email
        // await promise me to do this function successfully
        await sendEmailVerification(auth.currentUser);

        const userRef = doc(collection(db, "users"), res?.user?.uid);

        // send auth user data with specefic user uid as document id to firestore
        await setDoc(userRef, {
          uid: res?.user?.uid,
          email: email,
          displayName: `${firstName} ${lastName}`,
          role: "admin",
          password: password,
        });

        toast.success("User added successfully");
        router.push("/");
        setPageLoading(false);
      })

      // if auth have error  send toast message to show error to user
      .catch((err) => {
        console.log("error-->", err?.message);
        toast.error(err.message);
        setPageLoading(false);
      });
  };

  const signInUser = async (email, password) => {
    console.log("data in login function ", email, password);

    try {
      setPageLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(" logged success");
      setPageLoading(false);
      router.push("/");
    } catch (err) {
      console.log("error Login", err?.message);
      toast.error(err?.message);
      setPageLoading(false);
    }
  };

  const forgetPassword = async (email) => {
    try {
      console.log("email", email);
      await sendPasswordResetEmail(auth, email);
      toast.success("password has been successfully reseted");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("user Auth Data--->", user);
      // if auth user is  already maked register or Login
      // find his profile data from firebase/firetore
      setPageLoading(true);
      if (user) {
        // set Authuser data in state
        setUserData(user);
        localStorage.setItem("isLogged", true);
        // specify path for get Auth user Data from firestore
        const userRef = doc(db, "users", user?.uid);

        const docSnap = await getDoc(userRef);

        // if AuthUser have data in firestore set his data in setProfile
        if (docSnap.exists()) {
          console.log("firstore Data of user--->", docSnap.data());
          setProfile(docSnap.data());
        }
      }

      setPageLoading(false);
    });
  }, []);

  const logout = () => {
    signOut(auth);
    setProfile(null);
    setPageLoading(false);
  };

  return (
    <StateContext.Provider
      value={{
        name,
        logout,
        register,
        signInUser,
        forgetPassword,
        pageLoading, setPageLoading,
        profile,
        userData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(StateContext);
  return context;
};
