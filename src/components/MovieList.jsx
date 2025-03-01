import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // Ensure that movies is an array and not null or undefined
  const validMovies = Array.isArray(movies) ? movies : [];

  // If there are no movies, return a message
  if (validMovies.length === 0) {
    return <p>No movies available</p>;
  }

  return (
    <div className="px-6 " >
      <h1 className="py-4 text-3xl text-white">{title}</h1>
      <div className="flex overflow-x-scroll ">
        <div className="flex ">
          {/* {validMovies.map((movie) => ( */}
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
