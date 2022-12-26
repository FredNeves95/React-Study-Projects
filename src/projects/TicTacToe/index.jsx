import { useState } from "react";
import "./style.scss";

export default function TicTacToe() {
  const [positions, setPositions] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  return (
    <div className="app-container">
      <h1>Round: Player 1</h1>
      <div className="game-container">
        {positions.map((position, index) => (
          <button key={index} className="button">
            {position}
          </button>
        ))}
      </div>
    </div>
  );
}
