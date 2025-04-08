import { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const validMovies = Array.isArray(movies) ? movies : [];
  const scrollContainerRef = useRef(null);

  if (validMovies.length === 0) {
    return <p>No movies available</p>;
  }

  return (
    <div className="px-6">
      <h1 className="py-4 text-lg md:text-3xl text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
