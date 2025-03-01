import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {addTrendingMovies, addUpcomingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const getupcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };
  useEffect(() => {
    getupcomingMovies();
  }, []);
};
export default useUpcomingMovies;
