import { BODY_IMG } from "../utils/constants";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img alt="Body-Image" src={BODY_IMG} />
      </div>
      <div className="pt-[10%] flex justify-center">
        <form className="w-1/2 bg-black grid grid-cols-12">
          <input
            type="text"
            className="p-4 m-4 col-span-9"
            placeholder={lang.nep.gptSearchPlaceholder}
          />
          <button className="py-2 m-4 px-4 bg-red-700 text-white rounded-lg col-span-3">
            {lang.nep.search}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GptSearchBar;
