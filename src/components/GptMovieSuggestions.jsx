import { useSelector } from "react-redux";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  if (!movieNames) return <div>No movies to display</div>;

  return (
    <div>
      
    </div>
  );
};

export default GptMovieSuggestions;
