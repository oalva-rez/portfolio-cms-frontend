import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Sidebar({ userData }) {
  const { siteName } = userData;
  const Navigate = useNavigate();
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
          <li onClick={() => Navigate("/dashboard/my-projects")}>
            My Projects
          </li>
          <li onClick={() => Navigate("/dashboard/my-blog")}>My Blog</li>
        </ul>
        <div className="hr"></div>
        <ul>
          <li onClick={() => Navigate("/dashboard/my-projects/create")}>
            Add New Project
          </li>
          <li onClick={() => Navigate("/dashboard/my-blog/create")}>
            Add New Blog Post
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
