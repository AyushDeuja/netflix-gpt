import { useRef, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleButtonClick = async () => {
    if (!email.current.value || !password.current.value) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Validate form data
    const errMessage = checkValidData(email.current.value, password.current.value);
    if (errMessage) {
      setErrorMessage(errMessage);
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      if (!isSignInForm) {
        // Sign Up logic
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name.current.value,
          photoURL: "https://avatars.githubusercontent.com/u/155053271?v=4",
        });

        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: name.current.value,
            photoURL: user.photoURL,
          })
        );

        navigate("/browse");
      } else {
        // Sign In logic
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        navigate("/browse");
      }
    } catch (error) {
      setErrorMessage(error.code + " - " + error.message);
    } finally {
      setLoading(false);
    }
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
        className="w-3/12 absolute bg-black p-12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded"
        />
        {errorMessage && (
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        )}
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg disabled:opacity-50"
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? "Processing..." : isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? (
            <>
              New to Netflix? <u>Sign up now.</u>
            </>
          ) : (
            <>
              Already registered? <u>Sign in now.</u>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
