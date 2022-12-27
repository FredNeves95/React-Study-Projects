import { useEffect, useState } from "react";
import cx from "classnames";
import "./style.scss";

const WINNING_POSITIONS = [
  //horizontal
  { position: [0, 1, 2], orientation: "horizontal" },
  { position: [3, 4, 5], orientation: "horizontal" },
  { position: [6, 7, 8], orientation: "horizontal" },
  //vertical
  { position: [0, 3, 6], orientation: "vertical" },
  { position: [1, 4, 7], orientation: "vertical" },
  { position: [2, 5, 8], orientation: "vertical" },
  //diagonal
  { position: [0, 4, 8], orientation: "diagonal-main" },
  { position: [2, 4, 6], orientation: "diagonal-secondary" },
];

const INITIAL_POSITIONS = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const INITIAL_PLAYER = 1;
const INITIAL_GAME_STATE = {
  finished: false,
  hasWinner: false,
  winningCombination: [],
};
export default function TicTacToe() {
  const [positions, setPositions] = useState(INITIAL_POSITIONS);
  const [currentPlayer, setCurrentPlayer] = useState(INITIAL_PLAYER);
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  const handleClick = (event) => {
    const selectedPosition = event.target.name;
    const hasAlreadySelectedPosition = positions[selectedPosition];

    if (hasAlreadySelectedPosition) {
      return;
    }

    setPositions((prev) => {
      let newPositions = [...prev];
      newPositions[selectedPosition] = currentPlayer;
      return newPositions;
    });

    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
  };

  const handlePositionIcon = (position) => {
    if (!position) return "";

    if (position === 1) {
      return "❌";
    }

    return "⭕";
  };

  const handleMatch = () => {
    for (let combination of WINNING_POSITIONS) {
      const { position } = combination;
      let [firstPosition, secondPosition, thirdPosition] = position;

      const hasSelectedRightCombination =
        !!positions[firstPosition] &&
        !!positions[secondPosition] &&
        !!positions[thirdPosition];

      const isSamePlayer =
        positions[firstPosition] === positions[secondPosition] &&
        positions[secondPosition] === positions[thirdPosition];

      if (isSamePlayer && hasSelectedRightCombination) {
        setGameState({
          finished: true,
          hasWinner: true,
          winningCombination: combination,
        });
      }
    }
  };

  useEffect(() => {
    const minimumOfPlaysToWin = 5;
    const numberOfSelectedFields = positions.filter(
      (position) => !!position
    ).length;
    const hasPossibilityOfWinning =
      numberOfSelectedFields >= minimumOfPlaysToWin;
    if (!hasPossibilityOfWinning) return;
    handleMatch();
    if (numberOfSelectedFields === 9) {
      setGameState({
        finished: true,
        hasWinner: false,
        winningCombination: null,
      });
    }
  }, [positions]);

  const resetGame = () => {
    setCurrentPlayer(1);
    setGameState({
      finished: false,
      hasWinner: false,
      winningCombination: [],
    });
    setPositions(INITIAL_POSITIONS);
  };

  useEffect(() => {
    if (gameState.finished) {
      setTimeout(resetGame, 2000);
    }

    return () => {
      clearTimeout(resetGame);
    };
  }, [gameState.finished]);

  const renderTitle = () => {
    if (!gameState.finished) {
      return `Round: Player ${currentPlayer}`;
    }

    if (gameState.hasWinner) {
      return `Player ${currentPlayer === 2 ? 1 : 2} wins!!`;
    }

    if (!gameState.hasWinner) {
      return `No more plays left.`;
    }
  };

  const handleWinAnimation = (index) => {
    if (gameState.hasWinner) {
      console.log(gameState.winningCombination.position.includes(index));
      return gameState.winningCombination.position.includes(index);
    }
    return false;
  };
  return (
    <div className="app-container">
      <h1>{renderTitle()}</h1>
      <div className="game-container">
        {positions.map((position, index) => (
          <button
            key={index}
            className={cx({
              button: true,
              "right-combination": handleWinAnimation(index),
            })}
            onClick={handleClick}
            name={index}
          >
            {handlePositionIcon(position)}
          </button>
        ))}
      </div>
    </div>
  );
}
