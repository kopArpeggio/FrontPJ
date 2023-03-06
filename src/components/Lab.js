import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";

function Lab() {
  const [drag, setDrag] = useState(false);
  const [image, setImage] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const dropHandler = (e) => {
    e.preventDefault();
    setDrag(false);
    const files = e.dataTransfer.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const fileInputHandler = (e) => {
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <div className="drag-container">
      <div className="bg-gray-500 text-red p-4">Hello, Tailwind CSS!</div>

      <div
        className={drag ? "drag-drop-zone active" : "drag-drop-zone"}
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dropHandler}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <div className="drag-drop-icon">
          <FaUpload />
        </div>
        <h3>Drag and Drop or Click to Upload</h3>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={fileInputHandler}
          style={{ display: "none" }}
        />
      </div>
      {image && (
        <div className="image-preview-container">
          <img className="image-preview" src={image} alt="Preview" />
        </div>
      )}
    </div>
  );
}

export default Lab;
