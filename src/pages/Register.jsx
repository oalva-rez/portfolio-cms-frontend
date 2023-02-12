import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../apiLibrary";

function Register() {
  const [inputData, setInputData] = useState({
    siteName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
    const regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (regularExpression.test(inputData.password) === true) {
      if (inputData.password === inputData.confirmPassword) {
        try {
          const data = await api.register(inputData);
          if (!data.error) {
            navigate("/login");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("passwords do not match");
      }
    } else {
      alert("password does not meet requirements");
    }
  }

  return (
    <div>
      <h1>Register your site</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="site name"
          name="siteName"
          onChange={(evt) => {
            handleChange(evt);
          }}
          required
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={(evt) => {
            handleChange(evt);
          }}
          required
        />
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={(evt) => {
            handleChange(evt);
          }}
          required
        />
        <p>
          Password must be between 6-16 characters, contain at one num and on
          special character
        </p>
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={(evt) => {
            handleChange(evt);
          }}
          required
        />

        <input
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          onChange={(evt) => {
            handleChange(evt);
          }}
          required
        />
        <input type="submit" value="Register" />
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Register;
