import React from "react";
import { Routes, Route } from "react-router-dom";
import MyProjects from "../modules/MyProjects";
import MyBlog from "../modules/MyBlog";
import CreateBlog from "../modules/CreateBlog";
import CreateEditProject from "../modules/CreateEditProject";

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
        <Route path="/my-blog/create" element={<CreateBlog />} />
      </Routes>
    </>
  );
}

export default MainContent;
