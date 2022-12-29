import { useEffect, useRef, useState } from "react";
import { ACTION_BUTTONS } from "../../utils/constants";
import "./DotsFromInputStype.scss";

export default function DotsFromInput() {
  const offsetRef = useRef();
  const [selectedDots, setSelectedDots] = useState([]);
  const [inputValues, setInputValues] = useState({
    x: "",
    y: "",
  });
  const [offset, setOffset] = useState({
    top: 0,
    left: 0,
    prevTop: 0,
    prevLeft: 0,
  });

  const calculateRelativePosition = (x, y) => {
    const { top, left } = offset;
    const containerSide = 303;
    const dotSide = 3;
    const initialXPosition = left;
    const initialYPosition = top + containerSide - dotSide;

    const relativeXPosition = initialXPosition + x;
    const relativeYPosition = initialYPosition - y;

    setSelectedDots((prev) => [
      ...prev,
      {
        relativeXPosition,
        relativeYPosition,
      },
    ]);
  };

  const recalculateRelativePosition = () => {
    if (!selectedDots.length) return;
    const { top, left, prevTop, prevLeft } = offset;
    const containerHeight = 300;
    const dotHeight = 3;
    const currentXPosition = left;
    const initialXposition = prevLeft;
    const currentYPosition = top + containerHeight - dotHeight;
    const initialYposition = prevTop + containerHeight - dotHeight;

    const x = currentXPosition - initialXposition;
    const y = currentYPosition - initialYposition;

    const newDotsPositions = selectedDots.map((dot) => {
      const newXPosition = dot.relativeXPosition + x;
      const newYPosition = dot.relativeYPosition + y;
      return {
        relativeXPosition: newXPosition,
        relativeYPosition: newYPosition,
      };
    });
    setSelectedDots(newDotsPositions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { x, y } = inputValues;

    if (typeof x === "string" || typeof y === "string") {
      alert("You must fill all inputs");
      return;
    }

    calculateRelativePosition(x, y);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setInputValues((prev) => ({
      ...prev,
      [name]: +value,
    }));
  };

  const handleButtonClick = () => {
    console.log("click");
  };

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const gameContainer = offsetRef?.current;
      const { offsetLeft, offsetTop } = gameContainer;

      setOffset((prev) => ({
        top: offsetTop,
        left: offsetLeft,
        prevTop: prev.top,
        prevLeft: prev.left,
      }));
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    recalculateRelativePosition();
  }, [offset]);

  const renderDots = () => {
    const dots = selectedDots?.map((dot) => {
      return (
        <span
          className="dot-from-input"
          key={Date.now() * Math.random()}
          style={{ top: dot.relativeYPosition, left: dot.relativeXPosition }}
        />
      );
    });

    return dots;
  };

  return (
    <>
      <form className="dots-inputs-container" onSubmit={handleSubmit}>
        <div className="dots-input">
          <label htmlFor="x-axis">X axis (0 to 300): </label>
          <input
            type="number"
            name="x"
            id="x-axis"
            min="0"
            max="300"
            value={inputValues.x}
            onChange={handleChange}
          />
        </div>
        <div className="dots-input">
          <label htmlFor="y-axis">Y axis (0 to 300): </label>
          <input
            type="number"
            name="y"
            id="y-axis"
            min="0"
            max="300"
            value={inputValues.y}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="dots-button">
          Add dot
        </button>
      </form>
      <div className="dots-inputs-game-container" ref={offsetRef}>
        {renderDots()}
      </div>
      <span className="dots-button-container">
        {ACTION_BUTTONS.map((button, index) => (
          <button
            key={index}
            name={button}
            onClick={recalculateRelativePosition}
          >
            {button}
          </button>
        ))}
      </span>
    </>
  );
}
