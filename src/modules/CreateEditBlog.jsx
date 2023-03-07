import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import api from "../apiLibrary";

function CreateEditBlog({ isEdit }) {
  const editorRef = useRef(null);
  const fileRef = useRef(null);
  const firstInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const getBodyHTML = () => {
    if (editorRef.current) {
      return editorRef.current.getContent();
    }
  };
  const [inputData, setInputData] = useState({
    title: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
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
    if (inputData.metaKeywords === "") {
      toast.error("Please enter meta keywords");
      return false;
    }
    //file input is not required for edit
    if (!isEdit && fileRef.current.files.length === 0) {
      toast.error("Please select a project image");
      return false;
    }
    return true;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const loadingToast = isEdit
      ? "Updating Project..."
      : "Adding New Project...";

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
      formData.append("featuredImage", fileRef.current.files[0]);
      formData.append("metaTitle", inputData.metaTitle);
      formData.append("metaDescription", inputData.metaDescription);
      formData.append("metaKeywords", JSON.stringify(inputData.metaKeywords));
      let data;

      const blogId = window.location.pathname.split("/")[4]; // get project id from url if edit mode
      if (isEdit) {
        // data = await api.updateProjectById(
        //   projectId,
        //   formData,
        //   localStorage.getItem("token")
        // );
      } else {
        data = await api.createBlog(formData, localStorage.getItem("token"));
      }
      const errorToast = isEdit
        ? "Couldn't update project"
        : "Couldn't create project";
      const successToast = isEdit
        ? "Project updated successfully!"
        : "Project created successfully!";
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
        !isEdit &&
          setInputData({
            title: "",
            metaTitle: "",
            metaDescription: "",
            metaKeywords: "",
          });
        firstInputRef.current.focus();
      }
    }
  }
  return (
    <>
      <h1 className="module-header">Create Blog</h1>
      <div className="module-content">
        <form className="blog--form">
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
            initialValue="<p>This is the initial content of the editor.</p>"
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
          <input
            type="text"
            name="metaKeywords"
            className="input-element"
            onChange={handleChange}
            value={inputData.metaKeywords}
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            Create New Blog
          </button>
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
