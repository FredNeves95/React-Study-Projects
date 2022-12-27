import { useState, useEffect } from "react";
import cx from "classnames";

import CountryCapitalGame from "./projects/CountryCapitalGame";
import LikeAndDeslike from "./projects/LikeAndDislike";

import "./App.scss";
import TicTacToe from "./projects/TicTacToe";
import Dots from "./projects/Dots";

const PROJECTS = [
  "Country Capital Game",
  "Like and Dislike",
  "Tic Tac Toe",
  "Dots",
];

const COUNTRIES_AND_CAPITALS = {
  Brazil: "Brasilia",
  Argentina: "Buenos Aires",
  Chile: "Santiago",
  UnitedStates: "Washington",
  Italy: "Rome",
  Germany: "Berlin",
  Portugal: "Lisbon",
};

function App() {
  const [selectedProject, setSelectedProject] = useState(
    "Country Capital Game"
  );

  useEffect(() => {
    document.title = selectedProject;
  }, [selectedProject]);

  const handleClick = (event) => {
    setSelectedProject(event.target.name);
  };

  const handleRenderProject = () => {
    const projectsMap = new Map();

    projectsMap.set(
      PROJECTS[0],
      <CountryCapitalGame data={COUNTRIES_AND_CAPITALS} />
    );
    projectsMap.set(PROJECTS[1], <LikeAndDeslike />);
    projectsMap.set(PROJECTS[2], <TicTacToe />);
    projectsMap.set(PROJECTS[3], <Dots />);
    return projectsMap.get(selectedProject);
  };

  return (
    <div className="App">
      <h1>Projects</h1>
      <div className="projects-buttons-container">
        {PROJECTS.map((project, index) => (
          <button
            className={cx({
              "project-button": true,
              selected: selectedProject === project,
            })}
            key={index}
            name={project}
            onClick={handleClick}
          >
            {project}
          </button>
        ))}
      </div>
      <div className="projects-render">{handleRenderProject()}</div>
    </div>
  );
}

export default App;
