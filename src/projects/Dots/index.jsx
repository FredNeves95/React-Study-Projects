import { useState } from "react";
import { ACTION_BUTTONS } from "../../utils/constants";
import "./DotsStyle.scss";

export default function Dots() {
  const [selectedDots, setSelectedDots] = useState([]);
  const [removedDots, setRemovedDots] = useState([]);

  const handleGameClick = (event) => {
    const { pageX, pageY } = event;
    const coordinates = { pageX, pageY };
    setSelectedDots((prev) => [...prev, coordinates]);
  };

  const handleButtonClick = (event) => {
    const { name } = event.target;

    if (name === "Undo" && selectedDots.length) {
      let newArray = selectedDots;
      const lastItem = newArray.pop();
      setSelectedDots(newArray);
      setRemovedDots((prev) => [...prev, lastItem]);
    }

    if (name === "Redo" && removedDots.length) {
      let newArray = removedDots;
      const lastItem = newArray.pop();
      setRemovedDots(newArray);
      setSelectedDots((prev) => [...prev, lastItem]);
    }

    if (name === "Reset" && (selectedDots.length || removedDots.length)) {
      setSelectedDots([]);
      setRemovedDots([]);
    }
  };

  return (
    <>
      <span className="dots-button-container">
        {ACTION_BUTTONS.map((button, index) => (
          <button
            key={index}
            className="dots-button"
            name={button}
            onClick={handleButtonClick}
          >
            {button}
          </button>
        ))}
      </span>
      <div className="dots-game-container" onClick={handleGameClick}>
        {selectedDots?.map((dot) => (
          <span
            className="dot"
            key={`${dot.pageX * Math.random()} ${dot.pageY}`}
            style={{
              left: dot.pageX,
              top: dot.pageY,
            }}
          />
        ))}
      </div>
    </>
  );
}
