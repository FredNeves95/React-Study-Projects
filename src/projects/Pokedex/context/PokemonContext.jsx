import { createContext, useState } from "react";

export const PokemonContext = createContext();

export const PokemonContextProvider = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState();

  const getSelectedPokemon = () => selectedPokemon;

  const selectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
  };
  console.log(selectedPokemon);
  return (
    <PokemonContext.Provider value={{ getSelectedPokemon, selectPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};
