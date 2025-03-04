import { useSelector } from "react-redux";
import { BODY_IMG } from "../utils/constants";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  
  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    //Make an API call to GPT API and get the results

    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query " +
      searchText.current.value +
      ". Only give names of 5 movies, comma separated like the example result given ahead.Example Result: Gadar,iron man,iron man 2, golmaal, 3 idiots";
    const gptResults = await openai.chat.completions.create({ 
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-4o",
    });
    console.log(gptResults.choices);
  };

  return (
    <div>
      <div className="absolute -z-10">
        <img alt="Body-Image" src={BODY_IMG} />
      </div>
      <div className="pt-[10%] flex justify-center">
        <form
          className="w-1/2 bg-black grid grid-cols-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            className="p-4 m-4 col-span-9"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            className="py-2 m-4 px-4 bg-red-700 text-white rounded-lg col-span-3"
            onClick={handleGptSearchClick}
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GptSearchBar;
