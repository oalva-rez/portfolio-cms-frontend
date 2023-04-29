import React, { useState, useEffect } from "react";
import api from "../apiLibrary";

function BlogPost() {
  const [blog, setBlog] = useState(null);
  const [showSEO, setShowSEO] = useState(false);
  const [SEOKeywords, setSEOKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      async function getBlog() {
        const data = await api.getBlogById(
          window.location.pathname.split("/")[3],
          localStorage.getItem("token")
        );
        setBlog(data.blog);
        setSEOKeywords(JSON.parse(data.blog.metaKeywords));
        setIsLoading(false);
      }
      getBlog();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const Loading = () => {
    return (
      <div className="loading">
        <div className="loading__text">Loading...</div>
      </div>
    );
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <h1 className="module-header">{blog.title}</h1>
      <div className="module-content">
        <div className="blogpost-container">
          <button
            onClick={() => {
              setShowSEO((prev) => !prev);
            }}
            className="seo-button"
          >
            {showSEO ? "Hide" : "Show"} SEO Details
          </button>
          {showSEO ? (
            <div className="post-seo">
              <h2>SEO Data</h2>
              <div>
                <div className="seo-title">
                  <span className="seo-titles">Title:</span>{" "}
                  <span className="seo-data">{blog.metaTitle}</span>
                </div>
                <div className="seo-description">
                  <span className="seo-titles">Description:</span>{" "}
                  <span className="seo-data">
                    {blog.metaDescription ? blog.metaDescription : "N/A"}
                  </span>
                </div>
                <div className="seo-keyword-container">
                  <span className="seo-titles">Keywords:</span>{" "}
                  {SEOKeywords.map((word) => {
                    return (
                      <span className="seo-keyword seo-data">{word.text}</span>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
          <div className="blog-image-container">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="blogpost--image"
            />
          </div>
          <div
            className="blog-text"
            dangerouslySetInnerHTML={{ __html: blog.body }}
          />
        </div>
      </div>
    </>
  );
}

export default BlogPost;
