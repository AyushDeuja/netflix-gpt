import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    if (!email.current || !password.current) {
      console.error("Email or Password input field not found!");
      return;
    }

    const nameValue = !isSignInForm && name.current ? name.current.value : ""; // Only use name for Sign-Up
    const message = checkValidData(
      nameValue,
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);

    if (message) return; // Stop execution if validation fails

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          console.log("User signed up successfully:", userCredential.user);

          updateProfile(userCredential.user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/155053271?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );

              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          console.log("User signed in successfully:", userCredential.user);
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(`${error.code} - ${error.message}`);
        });
    }
  };

  const toggleSignInform = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/0cf2c109-3af1-4a9d-87d7-aecfac5fe881/web/NP-en-20250217-TRIFECTA-perspective_76dcb6f9-24a4-4224-8132-cb79a5094f75_large.jpg"
          alt="Body-Image"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-md bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-800 rounded-md"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-800 rounded-md"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-800 rounded-md"
        />

        <button
          className="p-4 my-4 bg-red-800 w-full rounded-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-red-500">{errorMessage}</p>

        <p className="py-4 cursor-pointer" onClick={toggleSignInform}>
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already Registered?Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
