import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    siteName: "",
  });
  const [siteName, setSiteName] = useState("");
  function handleChange(event) {
    const { name, value } = event.target;
    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        [name]: value,
      };
    });
  }
  async function populateData() {
    const data = await fetch("http://localhost:3001/api/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // db data
    const response = await data.json();
    console.log(response);
    setSiteName(response.user.siteName);
  }

  function addToDB() {
    fetch("http://localhost:3001/api/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        //  Data you want to add to the database
        siteName: inputData.siteName,
      }),
    });
  }
  function signOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  useEffect(() => {
    console.log("useEffect ran");
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        populateData();
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <p>Update Site name:</p>
      <p>Current Site Name: {siteName}</p>
      <input
        type="text"
        onChange={(evt) => {
          handleChange(evt);
        }}
        name="siteName"
      />
      <button onClick={addToDB}>Add to DB</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default Dashboard;
