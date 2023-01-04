import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import { useSpecificPokemonData } from "../../hooks/useSpecificPokemonData/useSpecificPokemonData";
import "./PokemonStyle.scss";

export default function Pokemon({ pokemonData, handleLoading }) {
  const { url } = pokemonData;
  const pokemon = useSpecificPokemonData(url, handleLoading);
  const { selectPokemon } = useContext(PokemonContext);

  if (!pokemon) {
    return null;
  }

  const handleClick = () => {
    selectPokemon(pokemon);
  };

  return (
    <button className="pokemon-container" onClick={handleClick}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <span>
        <p className="pokemon-name">
          <b>{pokemon.name}</b>
        </p>
        <p>EXP: {pokemon.base_experience}</p>
      </span>
    </button>
  );
}
