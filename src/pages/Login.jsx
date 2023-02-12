import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../apiLibrary";

function Login() {
  const [inputData, setInputData] = useState({
    usernameOrEmail: "",
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
    const data = await api.login(inputData);
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
          name="usernameOrEmail"
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
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Login;
