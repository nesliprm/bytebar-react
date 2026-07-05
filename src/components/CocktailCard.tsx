// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMagnifyingGlass,
//   faRobot,
//   faDice,
// } from "@fortawesome/free-solid-svg-icons";

type CocktailCardProps = {
  cocktail: any | null;
  isLoading: boolean;
  error: string;
};

export const CocktailCard = ({
  cocktail,
  isLoading,
  error,
}: CocktailCardProps) => {
  return (
    <>
      <div className="bg-red mt-4 p-6 rounded-2xl w-full max-w-200 mb-8 mx-auto"></div>
    </>
  );
};
