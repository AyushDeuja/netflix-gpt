import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addTrendingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector(store => store.trendingMovies)
  const getTrendingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTrendingMovies(json.results));
  };
  useEffect(() => {
   !trendingMovies && getTrendingMovies();
  }, []);
};
export default useTrendingMovies;
