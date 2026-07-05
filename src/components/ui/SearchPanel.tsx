import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRobot,
  faDice,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";

type SearchPanelProps = {
  ingredientInput: string;
  setIngredientInput: (value: string) => void;
  setCocktail: (cocktail: any) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  isLoading: boolean;
};

export const SearchPanel = ({
  ingredientInput,
  setIngredientInput,
  setCocktail,
  setIsLoading,
  setError,
  isLoading,
}: SearchPanelProps) => {
  const handleRandomClick = () => {
    // TODO: fetch random cocktail
  };

  const handleSearchClick = () => {
    // TODO: fetch by ingredient
  };

  const handleAiClick = () => {
    // TODO: fetch AI cocktail
  };

  return (
    <>
      <div className="mb-4 mt-8 w-fit sm:w-max">
        <input
          type="text"
          placeholder="Type an ingredient"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          className="mb-1 block w-full rounded-[5px] border-[3px] border-offblack bg-offwhite py-1 pl-2.5 font-sans text-[13px]"
        />
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-1">
          <Button
            label="SEARCH"
            title="Search by ingredient"
            icon={faMagnifyingGlass}
            onClick={handleSearchClick}
            disabled={isLoading}
          />

          <Button
            label="AI SEARCH"
            title="Search by ingredient with AI"
            icon={faRobot}
            onClick={handleAiClick}
            disabled={isLoading}
          />

          <Button
            label="RANDOM"
            title="Show a random cocktail (no ingredient needed)"
            icon={faDice}
            onClick={handleRandomClick}
            disabled={isLoading}
          />
        </div>
      </div>
    </>
  );
};
