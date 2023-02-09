import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        const response = await fetch("http://localhost:3001/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            siteName: inputData.siteName,
            username: inputData.username,
            password: inputData.password,
            email: inputData.email.toLowerCase(),
          }),
        });
        const data = await response.json();
        console.log(data);
        if ((data.status = "success")) {
          console.log("user registered");
          navigate("/login");
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
    </div>
  );
}

export default Register;
