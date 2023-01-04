import App from "./components/App/App";
import { PokemonContextProvider } from "./context/PokemonContext";

export default function Pokedex() {
  return (
    <PokemonContextProvider>
      <App />
    </PokemonContextProvider>
  );
}
