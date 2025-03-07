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
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      if (!response.ok) throw new Error("Failed to fetch movie data");
      const json = await response.json();
      return json.results;
    } catch (error) {
      console.error("TMDB API Error:", error);
      return [];
    }
  };

  useEffect(() => {
    const scriptId = "puter-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://js.puter.com/v2/";
      script.async = true;
      script.onload = () => console.log("Puter script loaded");
      document.body.appendChild(script);
    }
  }, []);

  const handleGptSearchClick = async () => {
    if (!window.puter) {
      console.error("Error: Puter AI SDK not loaded.");
      return;
    }

    console.log("Searching for:", query);
    const formattedQuery = `categories: Act as a movie recommendation system and suggest some movies for the query ${query}. Only give names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar,Iron Man,Iron Man 2,Golmaal,3 Idiots`;

    try {
      const gptResults = await window.puter.ai.chat(formattedQuery);
      console.log("GPT Results:", gptResults);

      if (!gptResults?.message?.content) {
        console.error("No response from GPT API.");
        return;
      }
      
      const gptMovies = gptResults.message.content.split(",").map(movie => movie.trim());
      console.log("GPT Movies to Fetch:", gptMovies);

      if (gptMovies.length === 0) {
        console.error("No valid movies returned from GPT.");
        return;
      }

      const tmdbResults = await Promise.all(gptMovies.map(searchMovieTMDB));
      console.log("TMDB Results:", tmdbResults);

      dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
      console.log("Redux Dispatch Completed!");
    } catch (error) {
      console.error("Error fetching movie names:", error);
    }
  };

  return (
    <div>
      <div className="absolute -z-10">
        <img alt="Body-Image" src={BODY_IMG} />
      </div>
      <div className="pt-[35%] md:pt-[10%] flex justify-center">
        <form
          className="w-full md:w-1/2 bg-black grid grid-cols-12"
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