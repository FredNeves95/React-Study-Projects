import { useEffect, useState } from "react";
import axios from "axios";

export const useSpecificPokemonData = (url, handleLoading) => {
    const [pokemon, setPokemon] = useState();

    const getPokemonData = async () => {
        try {
            handleLoading(true);
            const response = await axios.get(url);
            setPokemon(response.data);
            handleLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (url) {
            getPokemonData();
        }
    }, [url]);

    return pokemon
}