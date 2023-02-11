import React, { useState, useRef } from "react";
import techIcons from "../techIcons.json";

function CreateProject() {
  const [inputData, setInputData] = useState({
    title: "",
    desc: "",
    ghUrl: "",
    projUrl: "",
    techQuery: "",
  });
  const [techSelect, setTechSelect] = useState([]);
  const inputRef = useRef(null);
  const [isHoverOnTech, setIsHoverOnTech] = useState({
    isHover: false,
    id: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        [name]: value,
      };
    });
  }
  function handleTechSelect(techName) {
    setTechSelect((prevTechSelect) => {
      return [
        ...prevTechSelect,
        techIcons.find((tech) => tech.tech_name === techName),
      ];
    });
    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        techQuery: "",
      };
    });
    inputRef.current.value = "";
    inputRef.current.focus();
  }
  function handleTechDelete(id) {
    setTechSelect((prevTechSelect) => {
      return prevTechSelect.filter((tech) => tech.id !== id);
    });
  }
  console.log(techSelect);
  return (
    <>
      <h1 className="module-header">Create Project</h1>
      <div className="module-content">
        <div className="project-input-container">
          <div className="input-container">
            <label htmlFor="projectName">Project Title:</label>
            <input
              type="text"
              name="title"
              id="projectName"
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="projectDesc">Project Description:</label>
            <textarea
              name="desc"
              id="projectDesc"
              onChange={handleChange}
              rows={20}
            />
          </div>

          <div className="input-container">
            <label htmlFor="projectGHLink">Github Repo URL:</label>
            <input
              type="text"
              name="ghUrl"
              id="projectGHLink"
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="projectURL">Project URL:</label>
            <input
              type="text"
              name="projUrl"
              id="projectURL"
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="projectImg">Project Image:</label>
            <input
              type="file"
              name="img"
              id="projectImg"
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>

          <div className="choose-tech-container">
            <div className="search-container">
              <label htmlFor="chooseTech">
                Select Your Project Tech Stack:
              </label>
              <input
                type="text"
                placeholder="Search..."
                className="search"
                onChange={handleChange}
                name="techQuery"
                ref={inputRef}
              />
              <ul className="search-list">
                {techIcons
                  .filter((tech) => {
                    return inputData.techQuery === ""
                      ? false
                      : tech.tech_name
                          .toLowerCase()
                          .includes(inputData.techQuery.toLowerCase());
                  })
                  .map((tech, index) => {
                    return (
                      <li
                        key={tech.tech_name + index}
                        onClick={() => {
                          handleTechSelect(tech.tech_name);
                        }}
                      >
                        {tech.tech_name}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="chosen-tech">
              {techSelect.map((tech) => {
                return (
                  <div
                    className="tech-icon"
                    key={tech.id}
                    onMouseEnter={() => {
                      setIsHoverOnTech({
                        isHover: true,
                        id: tech.id,
                      });
                    }}
                    onMouseLeave={() => {
                      setIsHoverOnTech({
                        isHover: false,
                        id: null,
                      });
                    }}
                  >
                    <img
                      src={`/techstackicons/${tech.file_name}`}
                      alt={tech.tech_name}
                      title={tech.tech_name}
                    />
                    <i
                      className={
                        isHoverOnTech && isHoverOnTech.id === tech.id
                          ? "tech-delete fa-regular fa-trash-can"
                          : "tech-delete hide-icon fa-regular fa-trash-can"
                      }
                      onClick={() => {
                        handleTechDelete(tech.id);
                      }}
                    ></i>
                    <p>{tech.tech_name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <button>Add Project</button>
        </div>
      </div>
    </>
  );
}

export default CreateProject;
