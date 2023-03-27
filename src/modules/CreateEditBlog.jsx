import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import { WithContext as ReactTags } from "react-tag-input";

import api from "../apiLibrary";

function CreateEditBlog({ isEdit }) {
  const editorRef = useRef(null);
  const fileRef = useRef(null);
  const firstInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isEditBlogName, setIsEditBlogName] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [tags, setTags] = useState([]);

  const keyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [keyCodes.comma, keyCodes.enter];

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const getBodyHTML = () => {
    if (editorRef.current) {
      return editorRef.current.getContent();
    }
  };
  const clearEditor = () => {
    editorRef.current.setContent("");
  };
  const [inputData, setInputData] = useState({
    title: "",
    metaTitle: "",
    metaDescription: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  function isInputValid() {
    if (inputData.title === "") {
      toast.error("Please enter a title");
      return false;
    }
    if (getBodyHTML === "") {
      toast.error("Please enter a blog body");
      return false;
    }
    if (inputData.metaTitle === "") {
      toast.error("Please enter a meta title");
      return false;
    }
    if (inputData.metaDescription === "") {
      toast.error("Please enter a meta description");
      return false;
    }
    if (inputData.tags === "") {
      toast.error("Please enter meta keywords");
      return false;
    }
    //file input is not required for edit
    if (!isEdit && fileRef.current.files.length === 0) {
      toast.error("Please select a blog image");
      return false;
    }
    return true;
  }
  async function handleSubmit(e, status) {
    e.preventDefault();
    const loadingToast = isEdit ? "Updating Blog..." : "Adding New Blog...";

    if (isInputValid()) {
      setIsLoading(true);
      const id = toast.info("rendering"); // init toast
      toast.update(id, {
        render: loadingToast,
        type: "info",
        autoClose: false,
        isLoading: true,
      });
      const formData = new FormData();
      formData.append("title", inputData.title);
      formData.append("body", getBodyHTML());
      formData.append("blogImage", fileRef.current.files[0]);
      formData.append("metaTitle", inputData.metaTitle);
      formData.append("metaDescription", inputData.metaDescription);
      formData.append("metaKeywords", JSON.stringify(tags));
      formData.append("status", status === "draft" ? "draft" : "published");
      let data;

      const blogId = window.location.pathname.split("/")[4]; // get blog id from url if edit mode
      if (isEdit) {
        data = await api.updateBlogById(
          blogId,
          formData,
          localStorage.getItem("token")
        );
      } else {
        data = await api.createBlog(formData, localStorage.getItem("token"));
      }
      const errorToast = isEdit
        ? "Couldn't update blog"
        : "Couldn't create blog";
      const successToast = isEdit
        ? "Blog updated successfully!"
        : "Blog created successfully!";
      if (data.error) {
        // on error
        toast.update(id, {
          render: errorToast,
          type: "error",
          isLoading: false,
        });
        setIsLoading(false);
      } else {
        // on success
        toast.update(id, {
          render: successToast,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setIsLoading(false);
        if (!isEdit) {
          clearEditor();
          setTags([]);
          setInputData({
            title: "",
            metaTitle: "",
            metaDescription: "",
          });
        }

        firstInputRef.current.focus();
      }
    }
  }
  useEffect(() => {
    // clear inputs on render
    setInputData({
      title: "",
      metaTitle: "",
      metaDescription: "",
    });
    setTags([]);

    // focus on first input
    firstInputRef.current.focus();
    // get blog data if edit mode
    if (isEdit) {
      async function getBlog() {
        const data = await api.getBlogById(
          window.location.pathname.split("/")[4],
          localStorage.getItem("token")
        );
        setInputData((prevInputData) => {
          return {
            title: data.blog.title,
            metaTitle: data.blog.metaTitle,
            metaDescription: data.blog.metaDescription,
          };
        });
        setTags(JSON.parse(data.blog.metaKeywords));
        setIsEditBlogName(data.blog.title);
        setBlogBody(data.blog.body);
      }
      getBlog();
    }
  }, [isEdit]);
  return (
    <>
      <h1 className="module-header">
        {isEdit ? `Editing - ${isEditBlogName}` : "Create New Blog Post"}
      </h1>
      <div className="module-content">
        <form className="blog--form input-container">
          <h2>Content</h2>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="input-element"
            onChange={handleChange}
            value={inputData.title}
            ref={firstInputRef}
          />
          <label htmlFor="body">Body</label>
          <Editor
            apiKey={import.meta.env.VITE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={isEdit ? blogBody : ""}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          <label htmlFor="featuredImage">Featured Image</label>
          <input
            type="file"
            name="featuredImage"
            onChange={handleChange}
            ref={fileRef}
          />
          <h2>SEO</h2>
          <label htmlFor="metaTitle">Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            className="input-element"
            onChange={handleChange}
            value={inputData.metaTitle}
          />
          <label htmlFor="metaDescription">Meta Description</label>
          <textarea
            name="metaDescription"
            onChange={handleChange}
            value={inputData.metaDescription}
          />
          <label htmlFor="metaKeywords">Keywords</label>
          <div>
            <ReactTags
              tags={tags}
              delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              inputFieldPosition="bottom"
            />
          </div>
          <div className="blog--buttons">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e, "draft");
              }}
              className="draft"
            >
              Save As Draft
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e, "publish");
              }}
              className="publish"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        theme="dark"
      />
    </>
  );
}

export default CreateEditBlog;
