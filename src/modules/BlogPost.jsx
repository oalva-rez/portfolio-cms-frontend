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

  SEOKeywords.forEach((word) => {
    console.log(word.text);
  });

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <h1 className="module-header">{blog.title}</h1>
      <div className="module-content">
        <button
          onClick={() => {
            setShowSEO((prev) => !prev);
          }}
        >
          {showSEO ? "Hide" : "Show"} SEO Details
        </button>
        {showSEO ? (
          <div className="post-seo">
            <div className="seo-title">Title: {blog.metaTitle}</div>
            <div className="seo-description">
              Description: {blog.metaDescription}
            </div>
            <div className="seo-keyword-container">
              Keywords:{" "}
              {SEOKeywords.map((word) => {
                return <span className="seo-keyword">{word.text}</span>;
              })}
            </div>
          </div>
        ) : null}
        <img src={blog.imageUrl} alt={blog.title} />
        <div dangerouslySetInnerHTML={{ __html: blog.body }} />
      </div>
    </>
  );
}

export default BlogPost;
