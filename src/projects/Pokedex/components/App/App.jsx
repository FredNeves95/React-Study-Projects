import { useContext } from "react";
import Modal from "../Modal";
import Pokemon from "../Pokemon";
import { PokemonContext } from "../../context/PokemonContext";
import { useGeneralPolemonData } from "../../hooks/useGeneralPokemonData/useGeneralPokemonData";

export default function App() {
  const { generalPokemonData, loading, handleLoading } =
    useGeneralPolemonData();
  const { getSelectedPokemon } = useContext(PokemonContext);

  const selectedPokemon = getSelectedPokemon();
  const isOpen = !!selectedPokemon;

  return (
    <>
      {isOpen && <Modal />}
      {loading && <h1>Buscando informações...</h1>}
      {generalPokemonData?.map((item) => (
        <Pokemon
          pokemonData={item}
          handleLoading={handleLoading}
          key={item.name}
        />
      ))}
    </>
  );
}
