import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import {changeLanguage} from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);
  const handleGptSearchClick = () => {
    //Toggle Gpt search
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black z-10">
      <img className="w-44 " src={LOGO} alt="logo" />
      {user && (
        <div className="flex items-center space-x-4 p-2">
          {showGptSearch && <select
            className="p-2 m-2 bg-gray-900 text-white"
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>}
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch? "HomePage": "Gpt Search"}
          </button>
          <img
            className="h-10 w-10 rounded-full"
            src={user.photoURL}
            alt="userIcon"
          />

          <button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
