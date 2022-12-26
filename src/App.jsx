import { useState } from "react";

import CountryCapitalGame from "./projects/CountryCapitalGame";
import LikeAndDeslike from "./projects/LikeAndDislike";

import "./App.css";

const PROJECTS = ["Country Capital Game", "Like and Dislike"];

const countriesAndCapitals = {
  Brazil: "Brasilia",
  Argentina: "Buenos Aires",
  Chile: "Santiago",
  UnitedStates: "Washington",
  Italy: "Rome",
  Germany: "Berlin",
  Portugal: "Lisboa",
};
function App() {
  const [selectedProject, setSelectedProject] = useState("Like and Dislike");

  const handleClick = (event) => {
    setSelectedProject(event.target.name);
  };

  const handleRenderProject = () => {
    const projectsMap = new Map();

    projectsMap.set(
      PROJECTS[0],
      <CountryCapitalGame data={countriesAndCapitals} />
    );
    projectsMap.set(PROJECTS[1], <LikeAndDeslike />);

    return projectsMap.get(selectedProject);
  };

  return (
    <div className="App">
      <div className="project-container">
        {PROJECTS.map((project, index) => (
          <button
            className="project-button"
            key={index}
            name={project}
            onClick={handleClick}
          >
            {project}
          </button>
        ))}
      </div>
      {handleRenderProject()}
    </div>
  );
}

export default App;
