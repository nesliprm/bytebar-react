import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRobot,
  faDice,
} from "@fortawesome/free-solid-svg-icons";

export const SearchPanel = () => {
  return (
    <>
      <div className="mb-4 mt-8 w-fit sm:w-max">
        <input
          type="text"
          id="ingredient-input"
          placeholder="Type an ingredient"
          className="mb-1 block w-full rounded-[5px] border-[3px] border-offblack bg-offwhite py-1 pl-2.5 font-sans text-[13px]"
        />
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-1">
          <button
            id="search-cocktail-btn"
            title="Search by ingredient"
            className="relative w-full cursor-pointer touch-manipulation rounded-[5px] border-[3px] p-[0.4em] font-sans text-sm font-bold uppercase tracking-[1px] text-offblack bg-offwhite shadow-[1px_1px_0_0,2px_2px_0_0,3px_3px_0_0] active:top-1.25 active:left-1.25 active:shadow-none sm:w-auto sm:px-[0.5em] sm:py-[0.25em]"
          >
            SEARCH <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <button
            id="ai-cocktail-btn"
            title="Search by ingredient with AI"
            className="relative w-full cursor-pointer touch-manipulation rounded-[5px] border-[3px] p-[0.4em] font-sans text-sm font-bold uppercase tracking-[1px] text-offblack  bg-offwhite shadow-[1px_1px_0_0,2px_2px_0_0,3px_3px_0_0] active:top-1.25 active:left-1.25 active:shadow-none sm:w-auto sm:px-[0.5em] sm:py-[0.25em]"
          >
            AI SEARCH <FontAwesomeIcon icon={faRobot} />
          </button>
          <button
            id="random-cocktail-btn"
            title="Show a random cocktail (no ingredient needed)"
            className="relative w-full cursor-pointer touch-manipulation rounded-[5px] border-[3px] p-[0.4em] font-sans text-sm font-bold uppercase tracking-[1px] text-offblack  bg-offwhite shadow-[1px_1px_0_0,2px_2px_0_0,3px_3px_0_0] active:top-1.25 active:left-1.25 active:shadow-none sm:w-auto sm:px-[0.5em] sm:py-[0.25em]"
          >
            RANDOM <FontAwesomeIcon icon={faDice} />
          </button>
        </div>
      </div>
    </>
  );
};
