import { useContext, useEffect } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import "./ModalStyle.scss";

export default function Modal() {
  const { getSelectedPokemon, selectPokemon } = useContext(PokemonContext);

  const selectedPokemon = getSelectedPokemon();

  const { abilities, name, height, weight, stats, sprites } = selectedPokemon;

  const renderAbilities = () => (
    <ul>
      {abilities.map(({ ability }, index) => (
        <li key={index}>{ability.name}</li>
      ))}
    </ul>
  );

  const renderStats = () => (
    <ul>
      {stats.map(({ base_stat, stat }, index) => (
        <li key={index}>{`${stat.name}: ${base_stat}`}</li>
      ))}
    </ul>
  );

  const handleClick = () => {
    selectPokemon(null);
  };

  useEffect(() => {
    const escKeyCode = 27;
    const closeModalOnPressEsc = (event) => {
      if (event.keyCode === escKeyCode) {
        selectPokemon(null);
      }
    };

    document.addEventListener("keydown", closeModalOnPressEsc);

    return () => {
      document.removeEventListener("keydown", closeModalOnPressEsc);
    };
  }, []);

  return (
    <div className="modal-container">
      <div className="modal-content">
        <button className="close-modal" onClick={handleClick}>
          ❌
        </button>
        <span className="pokemon-info">
          <h1 className="pokemon-name">{name.toUpperCase()}</h1>
          <img src={sprites.front_default} />
          <img src={sprites.back_default} />
        </span>
        <span className="pokemon-physics-stats">
          <p>
            <strong>Height: </strong>
            {height} m
          </p>
          <p>
            <strong>Weight: </strong>
            {weight} kg
          </p>
        </span>
        <div>
          <div className="pokemon-stats">
            <h2>Abilities:</h2>
            {renderAbilities()}
            <h2>Stats:</h2>
            {renderStats()}
          </div>
        </div>
      </div>
    </div>
  );
}
