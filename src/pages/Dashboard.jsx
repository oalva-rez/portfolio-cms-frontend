import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import api from "../apiLibrary";

function Dashboard() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  async function populateUserData() {
    const response = await api.verify(localStorage.getItem("token"));
    setUserData(response.user);
  }

  function signOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  useEffect(() => {
    console.log("useEffect");
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        populateUserData();
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
