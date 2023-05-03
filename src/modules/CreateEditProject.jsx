import React, { useState, useRef, useEffect } from "react";
import techIcons from "../techIcons.json";
import { ToastContainer, toast } from "react-toastify";
import api from "../apiLibrary";

function CreateEditProject({ isEdit }) {
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    githubUrl: "",
    liveUrl: "",
    featured: false,
    wip: false,
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
  const [isEditProjectName, setIsEditProjectName] = useState("");
  function handleChange(e) {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        [name]: newValue,
      };
    });
  }
  useEffect(() => {
    // clear inputs on render
    setInputData({
      title: "",
      description: "",
      githubUrl: "",
      liveUrl: "",
      featured: false,
      wip: false,
      techQuery: "",
    });
    setTechSelect([]);

    // focus on first input
    firstInputRef.current.focus();

    // get project data if edit mode
    if (isEdit) {
      async function getProject() {
        const data = await api.getProjectById(
          window.location.pathname.split("/")[4],
          localStorage.getItem("token")
        );
        console.log(data.project);
        setInputData(() => {
          return {
            title: data.project.title,
            description: data.project.description,
            githubUrl: data.project.githubUrl,
            liveUrl: data.project.liveUrl,
            wip: data.project.wip,
            featured: data.project.featured,
            techQuery: "",
          };
        });
        setTechSelect(JSON.parse(data.project.techSelect));
        setIsEditProjectName(data.project.title);
      }
      getProject();
    }
  }, [isEdit]);

  function isInputValid() {
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
    //file input is not required for edit
    if (!isEdit && fileRef.current.files.length === 0) {
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
    // clear query on select
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
    e.preventDefault();
    const loadingToast = isEdit
      ? "Updating Project..."
      : "Adding New Project...";

    if (isInputValid()) {
      setIsLoading(true);
      const id = toast.info("rendering"); // init toast
      toast.update(id, {
        render: loadingToast,
        type: "info",
        autoClose: false,
        isLoading: true,
      });
      const formData = new FormData();
      formData.append("title", inputData.title);
      formData.append("description", inputData.description);
      formData.append("featured", inputData.featured);
      formData.append("wip", inputData.wip);
      formData.append("githubUrl", inputData.githubUrl);
      formData.append("liveUrl", inputData.liveUrl);
      formData.append("projImage", fileRef.current.files[0]);
      formData.append("techSelect", JSON.stringify(techSelect));
      let data;

      const projectId = window.location.pathname.split("/")[4]; // get project id from url if edit mode
      if (isEdit) {
        data = await api.updateProjectById(
          projectId,
          formData,
          localStorage.getItem("token")
        );
      } else {
        data = await api.createProject(formData, localStorage.getItem("token"));
      }
      const errorToast = isEdit
        ? "Couldn't update project"
        : "Couldn't create project";
      const successToast = isEdit
        ? "Project updated successfully!"
        : "Project created successfully!";
      if (data.error) {
        // on error
        toast.update(id, {
          render: errorToast,
          type: "error",
          isLoading: false,
        });
        setIsLoading(false);
      } else {
        // on success
        toast.update(id, {
          render: successToast,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setIsLoading(false);
        !isEdit &&
          setInputData({
            title: "",
            description: "",
            githubUrl: "",
            featured: false,
            wip: false,
            liveUrl: "",
            techQuery: "",
          });
        !isEdit && setTechSelect([]);
        firstInputRef.current.focus();
      }
    }
  }
  return (
    <>
      <h1 className="module-header">
        {isEdit ? `Editing - ${isEditProjectName}` : "Create New Project"}
      </h1>
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
              className="input-element"
            />
          </div>

          <div className="input-container">
            <label htmlFor="projectDesc">Project Description:</label>
            <textarea
              name="description"
              id="projectDesc"
              onChange={handleChange}
              rows={30}
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
              className="input-element"
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
              className="input-element"
            />
          </div>
          <div className="input-container">
            <label htmlFor="is-featured">Featured Project:</label>
            <input
              type="checkbox"
              name="featured"
              className="input-checkbox"
              onChange={handleChange}
              checked={inputData.featured}
            />
          </div>
          <div className="input-container">
            <label htmlFor="is-featured">Work In Progress:</label>
            <input
              type="checkbox"
              name="wip"
              className="input-checkbox"
              onChange={handleChange}
              checked={inputData.wip}
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
                className="input-element"
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
            {isEdit ? "Update Project" : "Add Project"}
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

export default CreateEditProject;
