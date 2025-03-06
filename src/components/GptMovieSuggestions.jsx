import { useSelector } from "react-redux";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  if (!movieNames) return <div>No movies to display</div>;

  return (
    <div className="p-4 m-4 bg-black text-white">
      {movieNames} 
    </div>
  );
};

export default GptMovieSuggestions;
