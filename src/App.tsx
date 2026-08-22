import { useState } from "react";
import { Header } from "./components/Header.tsx";
import { CocktailCard } from "./components/CocktailCard.tsx";
import { Footer } from "./components/Footer.tsx";
import type { CocktailState } from "./types";
import { flattenCocktail } from "./utils/flattenCocktail";

function App() {
  const [state, setState] = useState<CocktailState>({ status: "idle" });
  const [resultId, setResultId] = useState(0);

  // RANDOM HANDLER
  const handleRandom = async () => {
    setState({ status: "loading" });
    setResultId((id) => id + 1);

    try {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php",
      );
      const data = await response.json();
      const cocktail = flattenCocktail(data.drinks[0]);
      setState({ status: "success", cocktail, source: "random" });
    } catch {
      setState({
        status: "error",
        error: "Something went wrong fetching your cocktail.",
      });
    }
  };
  //

  // SEARCH HANDLER
  const handleSearch = async (ingredient: string) => {
    if (!ingredient.trim()) {
      setState({ status: "error", error: "Please enter an ingredient." });
      return;
    }

    setState({ status: "loading" });
    setResultId((id) => id + 1);

    try {
      const filterRes = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`,
      );
      const filterData = await filterRes.json();

      if (!Array.isArray(filterData.drinks) || filterData.drinks.length === 0) {
        setState({
          status: "error",
          error:
            "This doesn’t look like a real ingredient, please enter a valid one.",
        });
        return;
      }

      const randomIndex = Math.floor(Math.random() * filterData.drinks.length);
      const id = filterData.drinks[randomIndex].idDrink;

      const lookupRes = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const lookupData = await lookupRes.json();
      const cocktail = flattenCocktail(lookupData.drinks[0]);
      setState({ status: "success", cocktail, source: "search" });
    } catch {
      setState({
        status: "error",
        error: "Something went wrong fetching your cocktail.",
      });
    }
  };
  //

  // WEIRD INPUT CHECK FOR AI
  const looksWeird = (input: string) =>
    input.length > 3 && !/[aeiou]/i.test(input) && /^[a-zA-Z\s]+$/.test(input);
  //

  // AI SEARCH HANDLER
  const handleAiSearch = async (ingredient: string) => {
    if (!ingredient.trim()) {
      setState({ status: "error", error: "Please enter an ingredient." });
      return;
    }

    setState({
      status: "loading",
      note: looksWeird(ingredient)
        ? "This doesn't look like a typical ingredient, but let's see what the AI comes up with..."
        : undefined,
    });
    setResultId((id) => id + 1);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch("/.netlify/functions/ai-cocktail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: ingredient }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const data = await response.json();
      setState({ status: "success", cocktail: data.cocktail, source: "ai" });
    } catch (err) {
      clearTimeout(timeout);
      if (err instanceof DOMException && err.name === "AbortError") {
        setState({
          status: "error",
          error: "This is taking too long... something might be wrong.",
        });
      } else {
        setState({
          status: "error",
          error: "Something went wrong with the AI cocktail. Please try again.",
        });
      }
    }
  };

  //

  return (
    <>
      <Header
        onRandom={handleRandom}
        onSearch={handleSearch}
        onAiSearch={handleAiSearch}
        isLoading={state.status === "loading"}
      />
      <CocktailCard key={resultId} state={state} />
      <Footer />
    </>
  );
}

export default App;
