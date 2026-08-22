import type { Cocktail, RawDrink } from "../types";

export const flattenCocktail = (drink: RawDrink): Cocktail => {
  const ingredients: Cocktail["ingredients"] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return {
    name: drink.strDrink,
    thumbnail: drink.strDrinkThumb,
    instructions: drink.strInstructions,
    ingredients,
  };
};
