import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function API() {
  return (
    <>
      <h1 className="module-header">My API</h1>
      <div className="module-content">
        <div className="api-info">
          <p>My API Key:</p>
          <p>u34958734589579f4hwferfw34ed4f</p>
        </div>
        <div className="api-documentation">
          <section>
            <h2>Overview</h2>
            <p>
              This API endpoint allows authenticated users to retrieve a list of
              their own projects and blogs to use for their own personal
              portfolio. Users must provide a valid API key as a query parameter
              to access this endpoint.
            </p>
          </section>
          <section>
            <h2>Authentication</h2>
            <p>
              To authenticate, include an API key as a query parameter in the
              URL for this endpoint:
            </p>
            <SyntaxHighlighter language="bash" style={dark}>
              /api/projects?api_key=YOUR_API_KEY
            </SyntaxHighlighter>
            <p>
              If the API key is not valid or not included, the endpoint will
              return a 401 Unauthorized response.
            </p>
          </section>
          <section>
            <h2>Request</h2>
            <h3>HTTP METHOD</h3>
            <p>GET</p>
            <h3>URL Parameters</h3>
            <p>
              `api_key` (string, required): The API key for the user who is
              making the request.
            </p>
            <h3>Request Headers</h3>
            <p>None</p>
            <h3>Request Body</h3>
            <p>None</p>
          </section>
          <section>
            <h2>Response</h2>
            <h3>Response Body</h3>
          </section>
        </div>
      </div>
    </>
  );
}

export default API;
