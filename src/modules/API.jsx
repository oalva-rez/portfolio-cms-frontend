import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import api from "../apiLibrary";

function API() {
  const [showAPIKey, setShowAPIKey] = useState(false);
  const [newApi, setNewApi] = useState(false);
  const [apiKey, setApiKey] = useState(null);
  function generateNewApiKey() {
    const confirmed = confirm(
      "Are you sure you want to generate a new API key? This may break your existing API endpoints."
    );
    if (confirmed) {
      alert("A new API key has been generated.");
      setNewApi(true);
    }
  }
  useEffect(() => {
    // set api key on load
    async function fetchApiKey() {
      const data = await api.getApiKey(localStorage.getItem("token"));
      setApiKey(data.apiKey);
    }
    fetchApiKey();
    // if (newApi) call for new api key
  }, [newApi]);

  function getCodeString(path) {
    return `
    fetch('https://custom-cms.onrender.com/api/users/${path}', {
        headers: {
            'x-api-key': '[your API key]'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))`.trim();
  }
  return (
    <>
      <h1 className="module-header">My API</h1>
      <div className="module-content">
        <div className="api-info">
          {showAPIKey ? (
            <>
              <button onClick={() => setShowAPIKey(false)}>Hide API Key</button>
              <p>
                <b>Key: </b>
                {apiKey}
              </p>
            </>
          ) : (
            <button onClick={() => setShowAPIKey(true)}>Show API Key</button>
          )}
        </div>
        <div className="api-documentation">
          <section>
            <h2>Introduction</h2>
            <p>
              Welcome to the documentation for the headless CMS platform
              developed by <a href="ozkaralvarez.com">ozkaralvarez.com</a>. This
              platform allows you to upload and manage your blog posts and
              projects using a RESTful API.
            </p>
            <h2>Authentication</h2>
            <p>
              Before you can start using the API, you need to authenticate
              yourself by providing your API key in the x-api-key header. You
              can obtain your API key at the top of this page. You can also
              generate a new API key by clicking the button below.{" "}
            </p>
            <div className="alert">
              *Generating a new API Key will break existing endpoints in your
              front end application.*
            </div>
            <button className="new-api-key" onClick={generateNewApiKey}>
              Generate New API Key
            </button>
          </section>
          <section>
            <h2>Endpoints</h2>
            <h4>ADVISORY</h4>
            <p>
              Remember, it's important to protect your API keys and other
              sensitive information to prevent unauthorized access to your
              resources and services. Use environment variables to keep your
              keys hidden and secure. You can learn more about environment
              variables for React{" "}
              <a
                href="https://create-react-app.dev/docs/adding-custom-environment-variables/"
                target="_blank"
              >
                here.
              </a>
            </p>
            <h3>GET /all</h3>
            <p>Retrieves all user data.</p>
            <SyntaxHighlighter language="javascript" style={darcula}>
              {getCodeString("all")}
            </SyntaxHighlighter>

            <h3>GET /projects</h3>
            <p>Retrieves all projects data.</p>
            <SyntaxHighlighter language="javascript" style={darcula}>
              {getCodeString("projects")}
            </SyntaxHighlighter>
            <h3>GET /blogs</h3>
            <p>Retrieves all blogs data.</p>
            <SyntaxHighlighter language="javascript" style={darcula}>
              {getCodeString("blogs")}
            </SyntaxHighlighter>
          </section>
        </div>
      </div>
    </>
  );
}

export default API;
