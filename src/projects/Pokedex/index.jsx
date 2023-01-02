import { useState, useEffect } from "react";
import Pokemon from "./components/Pokemon";

const POKEMON_BASE_API = "https://pokeapi.co/api/v2/pokemon/";

export default function Pokedex() {
  const [generalPokemonData, setGeneralPokemonData] = useState();
  const [loading, setLoading] = useState(false);

  const getAllPokemonData = async () => {
    try {
      setLoading(true);
      const response = await (await fetch(POKEMON_BASE_API)).json();

      const generalPokemons = response.results;
      const sortedGeneralPokemons = generalPokemons.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else {
          return 1;
        }
      });
      setGeneralPokemonData(sortedGeneralPokemons);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPokemonData();
  }, []);

  const handleLoading = (boolean) => {
    setLoading(boolean);
  };

  return (
    <>
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
