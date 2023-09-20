import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/auth" exact element={<Auth />} />
        <Route path="/dashboard/*" exact element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
