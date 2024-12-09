import { useDispatch } from "react-redux";
import "../style/signup.css";
import { appStateType, setAppState } from "../store/Slices/webSocketSlice";
import React, { useState, useContext, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const oauthData = location.state || {};
  const [credentials, setCredentials] = useState({
    C_name: oauthData.C_name || "", // Pre-fill if available
    C_email: oauthData.C_email || "",
    C_password: "",
  });
  const [repassword, setRepassword] = useState({ re_password: "" });
  const [error, setError] = useState("");
  const [passwordMatchError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = () => {
    navigate("/signin");
  };

  const dispatch = useDispatch();
  const clickedtoSignIn = () => {
    dispatch(setAppState(appStateType.SIGNIN));
  };


  return (
    <>
      <form
      // onSubmit={}
      >
        <img
          className="relative w-[480px] h-[450px] mt-32"
          src="src\pic\signupframe.png"
        ></img>
        <div className="absolute flex flex-col space-y-1 font-['Arial'] items-center justify-center">
          <h1 className="text-center font-bold text-4xl">
            Create your account
          </h1>
          <div className="flex flex-row space-x-2 text-sm py-2">
            <h3 className="text-center ">Already have an account?</h3>
            <button
              className="relative transition-underline-signup text-red-600"
              type="button"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </div>
          <div className="pt-24"></div>
          <div>
            <h2 className="font-bold py-2">Username</h2>
            <input
              type="text"
              name="C_name"
              value={credentials.C_name}
              className="appearance-none border rounded-xl w-[300px] h-[30px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#d9d9d9" }}
              placeholder="Username"
              required
            ></input>
          </div>
          <div>
            <h2 className="font-bold py-2">Email</h2>
            <input
              type="text"
              name="C_email"
              value={credentials.C_email}
              className="appearance-none border rounded-xl w-[300px] h-[30px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#d9d9d9" }}
              placeholder="Email"
              required
            ></input>
          </div>
          <div>
            <h2 className="font-bold py-2">Password</h2>
            <input
              type="text"
              name="C_password"
              value={credentials.C_password}
              className="appearance-none border rounded-xl w-[300px] h-[30px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#d9d9d9" }}
              placeholder="Password"
              required
            ></input>
          </div>
          {/* <div>
          <h2 className="font-bold py-2">Confirm Password</h2>
          <input
            className="appearance-none border rounded-xl w-[300px] h-[30px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            style={{ backgroundColor: "#d9d9d9" }}
            placeholder="Password"
            required
          ></input>
        </div> */}
          <div className="py-3"></div>
          <button

            className="rectangleSignUp font-bold hover:bg-blue-900"
            type="submit"
            
            onClick={handleSignIn}
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}