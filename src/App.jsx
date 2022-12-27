import { useState, useEffect } from "react";
import cx from "classnames";

import CountryCapitalGame from "./projects/CountryCapitalGame";
import LikeAndDeslike from "./projects/LikeAndDislike";

import "./App.scss";
import TicTacToe from "./projects/TicTacToe";
import Dots from "./projects/Dots";
import {
  COUNTRIES_AND_CAPITALS,
  countryAndCapitalGameDescription,
  dotsDescription,
  likeAndDeslikeDescription,
  PROJECTS,
  tikTakToeDescription,
} from "./utils/constants";
import BaseLayout from "./components/BaseLayout";

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

    projectsMap.set(PROJECTS[0], {
      component: <CountryCapitalGame data={COUNTRIES_AND_CAPITALS} />,
      description: countryAndCapitalGameDescription,
    });
    projectsMap.set(PROJECTS[1], {
      component: <LikeAndDeslike />,
      description: likeAndDeslikeDescription,
    });
    projectsMap.set(PROJECTS[2], {
      component: <TicTacToe />,
      description: tikTakToeDescription,
    });
    projectsMap.set(PROJECTS[3], {
      component: <Dots />,
      description: dotsDescription,
    });

    const currentProject = projectsMap.get(selectedProject);

    const { component, description } = currentProject;
    return <BaseLayout description={description}>{component}</BaseLayout>;
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
