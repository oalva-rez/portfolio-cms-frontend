import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
function Sidebar({ userData }) {
  const { siteName } = userData;
  const Navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/").slice(-2).join("/");

  return (
    <>
      <h1>Portfolio CMS</h1>
      <div className="sidebar--content">
        <h2>
          Site Domain:{" "}
          <span className="domain">
            <Link to={`/${siteName}`} target="_blank" rel="noopener noreferrer">
              {siteName}
            </Link>
          </span>
        </h2>
        <ul>
          <li
            onClick={() => Navigate("/dashboard/my-projects")}
            className={path === "dashboard/my-projects" ? "selected" : null}
          >
            My Projects
          </li>
          <li
            onClick={() => Navigate("/dashboard/my-blog")}
            className={path === "dashboard/my-blog" ? "selected" : null}
          >
            My Blog
          </li>
        </ul>
        <ul>
          <li
            onClick={() => Navigate("/dashboard/my-projects/create")}
            className={path === "my-projects/create" ? "selected" : null}
          >
            Add New Project
          </li>
          <li
            onClick={() => Navigate("/dashboard/my-blog/create")}
            className={path === "my-blog/create" ? "selected" : null}
          >
            Add New Blog Post
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
