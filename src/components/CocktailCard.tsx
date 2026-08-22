import type { CocktailState } from "../types";

type CocktailCardProps = {
  state: CocktailState;
};

export const CocktailCard = ({ state }: CocktailCardProps) => {
  if (state.status === "idle") return null;

  return (
    <div className="bg-red mt-4 p-6 rounded-2xl w-full max-w-200 mb-8 mx-auto">
      {state.status === "loading" && <p>thinking… crafting… mixing…</p>}
      {state.status === "error" && <p>{state.error}</p>}
      {state.status === "success" && "html" in state && (
        <div dangerouslySetInnerHTML={{ __html: state.html }} />
      )}
      {state.status === "success" && "cocktail" in state && (
        <p>{state.cocktail.name}</p>
      )}
    </div>
  );
};
