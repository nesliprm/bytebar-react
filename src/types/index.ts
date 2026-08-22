export type Cocktail = {
  name: string;
  instructions: string;
  ingredients: { ingredient: string; measure: string }[];
};

export type RawDrink = {
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  [key: string]: string | null;
};

export type CocktailState =
  | { status: "idle" }
  | { status: "loading"; note?: string }
  | { status: "error"; error: string }
  | {
      status: "success";
      cocktail: Cocktail;
      source: "random" | "search" | "ai";
    };
