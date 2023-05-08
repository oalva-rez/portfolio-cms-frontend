import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import api from "../apiLibrary";

function MyBlog() {
  const [blogs, setBlogs] = useState([]);
  const [isHoverOnCard, setIsHoverOnCard] = useState({
    isHover: false,
    id: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getBlogs() {
      const data = await api.getBlogs(localStorage.getItem("token"));
      setBlogs(data.blogs);
    }
    getBlogs();
  }, []);
  function handleBlogEdit(blogId) {
    navigate(`/dashboard/my-blog/edit/${blogId}`);
  }
  function handleBlogDelete(blogId) {
    async function deleteBlog() {
      const id = toast.info("rendering");
      toast.update(id, {
        render: "Deleting blog...",
        type: "info",
        autoClose: false,
        isLoading: true,
      });
      const data = await api.deleteBlogById(
        blogId,
        localStorage.getItem("token")
      );
      if (data.status === "success") {
        toast.update(id, {
          render: "Blog deleted successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        const newBlogs = blogs.filter((blog) => blog.blogId !== blogId);
        setBlogs(newBlogs);
      } else {
        toast.update(id, {
          render: "Failed to delete blog. Try again later.",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
    deleteBlog();
  }
  function toLocalDateTime(isoString) {
    const date = new Date(isoString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
  return (
    <>
      <h1 className="module-header">My Blogs</h1>
      <div className="module-content">
        {blogs.length > 0 ? (
          blogs.map((blog) => {
            return (
              <div
                key={blog.blogId}
                className="card"
                onMouseEnter={() =>
                  setIsHoverOnCard({ isHover: true, id: blog.blogId })
                }
                onMouseLeave={() =>
                  setIsHoverOnCard({ isHover: false, id: null })
                }
              >
                <div className="card--image">
                  <img src={blog.imageUrl} alt={blog.title} />
                </div>
                <div className="card--content">
                  <h2>
                    <Link to={`${blog.blogId}`}>{blog.title}</Link>
                  </h2>
                  <p>{blog.metaDescription}</p>
                  <p>Created At: {toLocalDateTime(blog.createdAt)}</p>
                  <p>Updated At: {toLocalDateTime(blog.updatedAt)}</p>
                  <p>
                    Status:{" "}
                    {blog.status[0].toUpperCase() + blog.status.slice(1)}
                  </p>
                </div>
                <div
                  className={
                    isHoverOnCard.isHover && isHoverOnCard.id === blog.blogId
                      ? "card--menu"
                      : "card--menu hide-menu"
                  }
                >
                  <div
                    onClick={() => {
                      handleBlogEdit(blog.blogId);
                    }}
                  >
                    Edit
                  </div>
                  <span>|</span>
                  <div
                    onClick={() => {
                      handleBlogDelete(blog.blogId);
                    }}
                    className="card--delete"
                  >
                    Delete
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-blogs">
            <h2>No blogs found.</h2>
            <Link to="/dashboard/my-blog/create">Create a new blog</Link>
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

export default MyBlog;
