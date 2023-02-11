import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyProjects from "../modules/MyProjects";
import MyBlog from "../modules/MyBlog";
import CreateBlog from "../modules/CreateBlog";
import CreateProject from "../modules/CreateProject";

function MainContent({ userData }) {
  return (
    <>
      <Routes>
        <Route
          path="/my-projects"
          element={<MyProjects userData={userData} />}
        />
        <Route
          path="my-projects/create"
          element={<CreateProject userData={userData} />}
        />

        <Route path="/my-blog" element={<MyBlog userData={userData} />} />
        <Route
          path="/my-blog/create"
          element={<CreateBlog userData={userData} />}
        />
      </Routes>
    </>
  );
}

export default MainContent;
