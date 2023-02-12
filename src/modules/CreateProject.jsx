import React, { useState, useRef, useEffect } from "react";
import techIcons from "../techIcons.json";

function CreateProject({ userData }) {
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    githubUrl: "",
    liveUrl: "",
    techQuery: "",
  });
  const [techSelect, setTechSelect] = useState([]);
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const [isHoverOnTech, setIsHoverOnTech] = useState({
    isHover: false,
    id: null,
  });
  const [newProjectData, setNewProjectData] = useState({});
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
  console.log(userData);
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", inputData.title);
    formData.append("description", inputData.description);
    formData.append("githubUrl", inputData.githubUrl);
    formData.append("liveUrl", inputData.liveUrl);
    formData.append("projImage", fileRef.current.files[0]);
    formData.append("techSelect", JSON.stringify(techSelect));
    setNewProjectData(formData);
    fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  async function populateData() {
    const data = await fetch("http://localhost:3001/api/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // db data
    const response = await data.json();
    console.log(response);
  }
  useEffect(() => {
    populateData();
  }, []);

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
              name="description"
              id="projectDesc"
              onChange={handleChange}
              rows={20}
            />
          </div>

          <div className="input-container">
            <label htmlFor="projectGHLink">Github Repo URL:</label>
            <input type="text" name="githubUrl" onChange={handleChange} />
          </div>

          <div className="input-container">
            <label htmlFor="liveURL">Project URL:</label>
            <input type="text" name="liveUrl" onChange={handleChange} />
          </div>
          <div className="input-container">
            <label htmlFor="projectImg">Project Image:</label>
            <input
              type="file"
              name="projImage"
              accept="image/png, image/jpeg, image/jpg"
              ref={fileRef}
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
              {techSelect.map((tech, index) => {
                return (
                  <div
                    className="tech-icon"
                    key={tech.id + index}
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
          <button onClick={handleSubmit}>Add Project</button>
        </div>
      </div>
    </>
  );
}

export default CreateProject;
