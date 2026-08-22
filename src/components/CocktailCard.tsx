import type { CocktailState } from "../types";
import Typewriter from "typewriter-effect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

type CocktailCardProps = {
  state: CocktailState;
};

export const CocktailCard = ({ state }: CocktailCardProps) => {
  if (state.status === "idle") return null;

  return (
    <div className="bg-red mt-4 p-6 rounded-2xl w-full max-w-200 mb-8 mx-auto animate-[fade-in_0.5s_ease-in-out]">
      {state.status === "loading" && (
        <>
          {state.note && <p className="mb-2">{state.note}</p>}
          <Typewriter
            options={{
              strings: [
                "thinking...",
                "crafting...",
                "mixing...",
                "pouring...",
                "garnishing...",
              ],
              autoStart: true,
              delay: 20,
              cursor: "",
              loop: true,
            }}
          />
        </>
      )}
      {state.status === "error" && <p>{state.error}</p>}

      {state.status === "success" && "cocktail" in state && (
        <div>
          {state.source === "random" && (
            <h3 className="mt-0 mb-5">
              <FontAwesomeIcon icon={faWandMagicSparkles} /> Your cocktail of
              the moment:
            </h3>
          )}
          <h1 className="text-[42px] font-header text-yellow text-shadow-header mt-2.5 mb-0">
            {state.cocktail.name}
          </h1>
          <div>
            {state.cocktail.ingredients.map((item, index) => (
              <p key={index} className="text-sm leading-normal">
                - {item.measure} {item.ingredient}
              </p>
            ))}
          </div>
          <p className="text-sm leading-normal mt-2">
            {state.cocktail.instructions}
          </p>
        </div>
      )}
    </div>
  );
};
