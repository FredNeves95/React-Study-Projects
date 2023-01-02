import { useState, useEffect } from "react";
import cx from "classnames";
import "./App.scss";

import BaseLayout from "./components/BaseLayout";

import CountryCapitalGame from "./projects/CountryCapitalGame";
import LikeAndDeslike from "./projects/LikeAndDislike";
import TicTacToe from "./projects/TicTacToe";
import Dots from "./projects/Dots";
import Form from "./projects/Form";
import DotsFromInput from "./projects/DotsFromInput";

import {
  COUNTRIES_AND_CAPITALS,
  countryAndCapitalGameDescription,
  dotsDescription,
  dotsFromInputsDescription,
  formDescription,
  likeAndDeslikeDescription,
  PROJECTS,
  tikTakToeDescription,
  pokedexDescription,
} from "./utils/constants";
import Pokedex from "./projects/Pokedex";

function App() {
  const [selectedProject, setSelectedProject] = useState("Pokedex");

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

    projectsMap.set(PROJECTS[4], {
      component: <Form />,
      description: formDescription,
    });

    projectsMap.set(PROJECTS[5], {
      component: <DotsFromInput />,
      description: dotsFromInputsDescription,
    });

    projectsMap.set(PROJECTS[6], {
      component: <Pokedex />,
      description: pokedexDescription,
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
