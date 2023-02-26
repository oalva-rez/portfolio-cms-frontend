import React, { useState, useEffect } from "react";
import techIcons from "../techIcons.json";
import { Link } from "react-router-dom";

function myProjects() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function getProjects() {
      const response = await fetch(
        "http://localhost:3001/api/dashboard/my-projects",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      setProjects(data.projects);
    }
    getProjects();
  }, []);

  return (
    <>
      <h1 className="module-header">My Projects</h1>
      <div className="module-content">
        {projects.length == 0 ? (
          <div className="project-container">
            <h2>No projects found</h2>
            <Link to="/dashboard/create-project">Add New Project</Link>
          </div>
        ) : (
          <div className="project-container">
            {projects.map((proj) => {
              return (
                <div className="project--card" key={proj.projectId}>
                  <div className="project--image">
                    <img src={proj.imageUrl} alt={proj.title + " screenshot"} />
                  </div>
                  <div className="project--content">
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
                          <p>
                            GitHub Link:{" "}
                            <a href={proj.githubUrl}>{proj.githubUrl}</a>
                          </p>
                        </div>
                        <div className="project--live">
                          <p>
                            Live Link: <a href={proj.liveUrl}>{proj.liveUrl}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default myProjects;
