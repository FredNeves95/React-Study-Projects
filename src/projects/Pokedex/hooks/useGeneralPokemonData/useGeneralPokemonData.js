import { useEffect, useState } from "react";
import axios from "axios";
import { POKEMON_BASE_API } from "../../utils/constants";

export const useGeneralPolemonData = () => {
    const [generalPokemonData, setGeneralPokemonData] = useState();

    const [loading, setLoading] = useState(false);

    const getAllPokemonData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(POKEMON_BASE_API)
            const generalPokemons = response.data.results;
            const sortedGeneralPokemons = generalPokemons?.sort((a, b) => {
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

    return {
        generalPokemonData, loading, handleLoading
    }
}