import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, BODY_IMG } from "../utils/constants";
import lang from "../utils/languageConstants";
import { useEffect, useRef, useState } from "react";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  // Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await data.json();

      if (json && json.results) {
        // Make sure to return results if available, otherwise return an empty array
        return json.results;
      } else {
        console.error("No results found in TMDB response.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching TMDB data:", error);
      return [];
    }
  };

  useEffect(() => {
    const scriptId = "puter-script"; // Unique identifier for the script
  
    // Check if the script is already added
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId; // Assign unique ID to the script
      script.src = "https://js.puter.com/v2/";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  

  const handleGptSearchClick = async () => {
    console.log("Searching for:", query);

    if (!window.puter) {
      console.error("Error: Puter AI SDK not loaded.");
      return;
    }

    const formattedQuery = `categories: Act as a movie recommendation system and suggest some movies for the query ${query}. Only give names of 5 movies, comma separated like the example result given ahead.Example Result: Gadar,iron man,iron man 2, golmaal, 3 idiots`;

    try {
      const gptResults = await window.puter.ai.chat(formattedQuery);
      console.log("GPT Results:", gptResults);

      const gptMovies = gptResults?.message?.content.split(",");
      console.log("GPT Movies to Dispatch:", gptMovies); // Debugging line

      if (!gptMovies || gptMovies.length === 0) {
        console.error("No movie names returned from GPT.");
        return;
      }

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      console.log("TMDB Results:", tmdbResults); // 🔍 Debugging API results
      dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
      console.log("Redux Dispatch Called!");
    } catch (error) {
      console.error("Error fetching movie names:", error);
    }
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
