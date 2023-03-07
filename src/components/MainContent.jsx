import React from "react";
import { Routes, Route } from "react-router-dom";
import MyProjects from "../modules/MyProjects";
import MyBlog from "../modules/MyBlog";
import CreateEditBlog from "../modules/CreateEditBlog";
import CreateEditProject from "../modules/CreateEditProject";
import API from "../modules/API";

function MainContent() {
  return (
    <>
      <Routes>
        <Route path="/my-projects" element={<MyProjects />} />
        <Route
          path="my-projects/create"
          element={<CreateEditProject isEdit={false} />}
        />
        <Route
          path="/my-projects/edit/:id"
          element={<CreateEditProject isEdit={true} />}
        />

        <Route path="/my-blog" element={<MyBlog />} />
        <Route
          path="/my-blog/create"
          element={<CreateEditBlog isEdit={false} />}
        />
        <Route
          path="/my-blog/edit/:id"
          element={<CreateEditBlog isEdit={true} />}
        />

        <Route path="/API" element={<API />} />

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default MainContent;
