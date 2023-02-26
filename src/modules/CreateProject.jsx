import React, { useState, useRef, useEffect } from "react";
import techIcons from "../techIcons.json";
import { ToastContainer, toast } from "react-toastify";

function CreateProject() {
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
  const firstInputRef = useRef(null);
  const [isHoverOnTech, setIsHoverOnTech] = useState({
    isHover: false,
    id: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        [name]: value,
      };
    });
  }
  useEffect(() => {
    firstInputRef.current.focus();
  }, []);

  function validateInput() {
    console.log(inputData);
    if (inputData.title === "") {
      toast.error("Please enter a title");
      return false;
    }
    if (inputData.description === "") {
      toast.error("Please enter a description");
      return false;
    }
    if (inputData.githubUrl === "") {
      toast.error("Please enter a github url");
      return false;
    }
    if (inputData.liveUrl === "") {
      toast.error("Please enter a live url");
      return false;
    }
    if (techSelect.length === 0) {
      toast.error("Please select at least one tech stack");
      return false;
    }
    if (fileRef.current.files.length === 0) {
      toast.error("Please select a project image");
      return false;
    }
    return true;
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
  async function handleSubmit(e) {
    //do something else
    e.preventDefault();
    if (validateInput()) {
      setIsLoading(true);
      const id = toast.info("rendering");
      toast.update(id, {
        render: "Adding New Project...",
        type: "info",
        autoClose: false,
        isLoading: true,
      });
      const formData = new FormData();
      formData.append("title", inputData.title);
      formData.append("description", inputData.description);
      formData.append("githubUrl", inputData.githubUrl);
      formData.append("liveUrl", inputData.liveUrl);
      formData.append("projImage", fileRef.current.files[0]);
      formData.append("techSelect", JSON.stringify(techSelect));

      fetch("http://localhost:3001/api/dashboard/my-projects/create", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            // on error
            toast.update(id, {
              render: "Couldn't create project. Please try again later.",
              type: "error",
              isLoading: false,
            });
            setIsLoading(false);
          } else {
            // on success
            toast.update(id, {
              render: "Project created successfully!",
              type: "success",
              isLoading: false,
              autoClose: 2000,
            });
            setIsLoading(false);
            setInputData({
              title: "",
              description: "",
              githubUrl: "",
              liveUrl: "",
              techQuery: "",
            });
            setTechSelect([]);
            firstInputRef.current.focus();
          }
        });
    }
  }

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
              ref={firstInputRef}
              required
              value={inputData.title}
            />
          </div>

          <div className="input-container">
            <label htmlFor="projectDesc">Project Description:</label>
            <textarea
              name="description"
              id="projectDesc"
              onChange={handleChange}
              rows={20}
              required
              value={inputData.description}
            />
          </div>

          <div className="input-container">
            <label htmlFor="projectGHLink">Github Repo URL:</label>
            <input
              type="text"
              name="githubUrl"
              onChange={handleChange}
              required
              value={inputData.githubUrl}
            />
          </div>

          <div className="input-container">
            <label htmlFor="liveURL">Project URL:</label>
            <input
              type="text"
              name="liveUrl"
              onChange={handleChange}
              required
              value={inputData.liveUrl}
            />
          </div>
          <div className="input-container">
            <label htmlFor="projectImg">Project Image:</label>
            <input
              type="file"
              name="imageFile"
              accept="image/png, image/jpeg, image/jpg image/webp"
              ref={fileRef}
              required
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
                value={inputData.techQuery}
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
          <button
            onClick={handleSubmit}
            disabled={isLoading ? true : false}
            style={isLoading ? { opacity: ".2", cursor: "not-allowed" } : null}
          >
            Add Project
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        theme="dark"
      />
    </>
  );
}

export default CreateProject;
