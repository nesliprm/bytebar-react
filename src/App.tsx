import { useState } from "react";
import { Header } from "./components/Header.tsx";
import { CocktailCard } from "./components/CocktailCard.tsx";
import { Footer } from "./components/Footer.tsx";

function App() {
  const [cocktail, setCocktail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <>
      <Header />
      <CocktailCard cocktail={cocktail} isLoading={isLoading} error={error} />
      <Footer />
    </>
  );
}

export default App;
