import React, { useState } from "react";

function myProjects({ userData }) {
  const [image, setImage] = useState("#");
  async function getImages() {
    const response = await fetch("http://localhost:3001/files", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.blob();
    const imageURL = URL.createObjectURL(data);
    setImage(imageURL);
  }

  return (
    <>
      <button onClick={getImages}>Get Images</button>
      <img src={image} alt="" />
    </>
  );
}

export default myProjects;
