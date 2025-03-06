import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BODY_IMG } from "../utils/constants";

const GptSearchPage = () => {
  return (
    <div>
        <div className="absolute -z-10">
          <img alt="Body-Image" src={BODY_IMG} />
        </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearchPage;
