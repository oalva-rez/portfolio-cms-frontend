import React, { useState, useEffect } from "react";
import api from "../apiLibrary";

function MyBlog() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function getBlogs() {
      const data = await api.getBlogs(localStorage.getItem("token"));
      setBlogs(data.blogs);
      console.log(data.blogs);
    }
    getBlogs();
  }, []);

  return (
    <>
      <h1 className="module-header">My Blogs</h1>
      <div className="module-content"></div>
      {blogs.map((blog) => {
        return (
          <div key={blog.blogId}>
            <h2>{blog.title}</h2>
            <p>{blog.body}</p>
            <img src={blog.featuredImage} alt="" />
          </div>
        );
      })}
    </>
  );
}

export default MyBlog;
