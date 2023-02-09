import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [inputData, setInputData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  function handleChange(event) {
    const { name, value } = event.target;
    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        [name]: value,
      };
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usernameOrEmail: inputData.emailOrUsername,
        password: inputData.password,
      }),
    });
    const data = await response.json();
    if (data.user) {
      console.log(data);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      setError(data.error);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email or username"
          name="emailOrUsername"
          onChange={(evt) => {
            handleChange(evt);
          }}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={(evt) => {
            handleChange(evt);
          }}
          required
        />
        {error ? <p>{error}</p> : null}
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
