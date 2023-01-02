import { useEffect, useState } from "react";

export default function Pokemon({ pokemonData, handleLoading }) {
  const { url } = pokemonData;
  const [pokemon, setPokemon] = useState();

  const getPokemonData = async () => {
    try {
      handleLoading(true);
      const response = await (await fetch(url)).json();
      setPokemon(response);
      handleLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pokemonData) {
      getPokemonData();
    }
  }, []);

  const pokemonNameWithCapitalLetter = () => {
    const pokemonNameArray = pokemon?.name.split("");

    const firstLetter = pokemonNameArray[0].toUpperCase();

    pokemonNameArray.shift();

    const capitalizedName = [...firstLetter, ...pokemonNameArray].join("");

    return capitalizedName;
  };

  if (!pokemon) {
    return null;
  }

  return (
    <>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>
        <b>{pokemonNameWithCapitalLetter()}</b>
      </p>
      <p>EXP: {pokemon.base_experience}</p>
    </>
  );
}
