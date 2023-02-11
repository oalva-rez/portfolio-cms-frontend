import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

function Dashboard() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    siteName: "",
  });
  const [userData, setUserData] = useState({});
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

    setUserData(response.user);
    console.log(response.user);
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
    <div className="main">
      <div className="sidebar">
        <Sidebar userData={userData} />
      </div>
      <div className="main-content">
        <MainContent userData={userData} />
      </div>
    </div>
  );
}

export default Dashboard;
