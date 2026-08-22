import { useState } from "react";
import { Header } from "./components/Header.tsx";
import { CocktailCard } from "./components/CocktailCard.tsx";
import { Footer } from "./components/Footer.tsx";
import type { CocktailState } from "./types";
import { flattenCocktail } from "./utils/flattenCocktail";

function App() {
  const [state, setState] = useState<CocktailState>({ status: "idle" });
  const handleRandom = async () => {
    setState({ status: "loading" });

    try {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php",
      );
      const data = await response.json();
      const cocktail = flattenCocktail(data.drinks[0]);
      setState({ status: "success", cocktail });
    } catch {
      setState({
        status: "error",
        error: "Something went wrong fetching your cocktail.",
      });
    }
  };

  return (
    <>
      <Header onRandom={handleRandom} isLoading={state.status === "loading"} />
      <CocktailCard state={state} />
      <Footer />
    </>
  );
}

export default App;
