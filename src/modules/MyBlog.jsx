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
      <div className="module-content">
        {blogs.map((blog) => {
          return (
            <div key={blog.blogId}>
              <img src={blog.imageUrl} alt={blog.title} />
              <div>
                <h1>
                  <a href={`/blog/${blog.blogId}`}>{blog.title}</a>
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MyBlog;
