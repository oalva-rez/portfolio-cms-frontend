import React, { useState, useEffect } from "react";
import techIcons from "../techIcons.json";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../apiLibrary";

function myProjects() {
  const [projects, setProjects] = useState([]);
  const [isHoverOnCard, setIsHoverOnCard] = useState({
    isHover: false,
    id: null,
  });
  const navigate = useNavigate();
  useEffect(() => {
    async function getProjects() {
      const data = await api.getProjects(localStorage.getItem("token"));
      setProjects(data.projects);
    }
    getProjects();
  }, []);

  function handleProjectEdit(projId) {
    navigate(`/dashboard/my-projects/edit/${projId}`);
  }
  function handleProjectDelete(projId) {
    async function deleteProject() {
      const id = toast.info("rendering");
      toast.update(id, {
        render: "Deleting project...",
        type: "info",
        autoClose: false,
        isLoading: true,
      });
      const data = await api.deleteProjectById(
        projId,
        localStorage.getItem("token")
      );
      if (data.status === "success") {
        toast.update(id, {
          render: "Project deleted successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        const newProjects = projects.filter(
          (proj) => proj.projectId !== projId
        );
        setProjects(newProjects);
      } else {
        toast.update(id, {
          render: "Failed to delete project. Try again later.",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
    deleteProject();
  }
  return (
    <>
      <h1 className="module-header">My Projects</h1>
      <div className="module-content">
        {projects.length == 0 ? (
          <div className="project-container">
            <h2>No projects found</h2>
            <Link to="/dashboard/my-projects/create">Add New Project</Link>
          </div>
        ) : (
          <div className="cards-container">
            {projects.map((proj) => {
              return (
                <div
                  className="card"
                  key={proj.projectId}
                  onMouseEnter={() =>
                    setIsHoverOnCard({ isHover: true, id: proj.projectId })
                  }
                  onMouseLeave={() =>
                    setIsHoverOnCard({ isHover: false, id: null })
                  }
                >
                  <div className="card--image">
                    <img src={proj.imageUrl} alt={proj.title + " screenshot"} />
                  </div>
                  <div className="card--content">
                    <h2>{proj.title}</h2>
                    <p>{proj.description}</p>
                    <div className="project--tech">
                      {JSON.parse(proj.techSelect).map((tech, index) => {
                        const iconUrl = techIcons.find(
                          (icon) => icon.tech_name === tech.tech_name
                        ).file_name;
                        return (
                          <img
                            src={"/techstackicons/" + iconUrl}
                            alt={tech.tech_name}
                            key={index + tech.tech_name}
                          />
                        );
                      })}
                      <div className="project--links">
                        <div className="project--gh">
                          <i className="fa-brands fa-github"></i>
                          <a href={proj.githubUrl}>{proj.githubUrl}</a>
                        </div>
                        <div className="project--live">
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                          <a href={proj.liveUrl}>{proj.liveUrl}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      isHoverOnCard.isHover &&
                      isHoverOnCard.id === proj.projectId
                        ? "card--menu"
                        : "card--menu hide-menu"
                    }
                  >
                    <div
                      onClick={() => {
                        handleProjectEdit(proj.projectId);
                      }}
                    >
                      Edit
                    </div>
                    <span>|</span>
                    <div
                      className="card--delete"
                      onClick={() => {
                        handleProjectDelete(proj.projectId);
                      }}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        theme="dark"
      />
    </>
  );
}

export default myProjects;
