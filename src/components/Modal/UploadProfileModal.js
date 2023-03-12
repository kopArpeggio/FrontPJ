import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaUpload } from "react-icons/fa";
import { Image } from "react-bootstrap";
import { getImageUrl } from "../../utils/utils";
import { uploadImageFile } from "../../apis/uploadApi";
import { updateStudentById } from "../../apis/studentApi";
import ReactLoading from "react-loading";

export default function UploadProfileModal({
  show,
  handleClose,
  image,
  setImage,
  previewImage,
  setPreviewImage,
  user,
  setTest,
  setShow,
  test,
}) {
  const [drag, setDrag] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setPreviewImage(reader.result);
    };
    setImage(files[0]);
    reader.readAsDataURL(files[0]);
  };

  const fileInputHandler = (e) => {
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    setImage(files[0]);
    reader.readAsDataURL(files[0]);
  };

  const handleSubmitUpload = async (file) => {
    try {
      setIsLoading(false);
      const data = await uploadImageFile(file);

      if (data) {
        const stu = {
          id: user?.id,
          profilePic: data,
        };

        const imagePath = await updateStudentById({ stu });

        await setTest(imagePath?.data?.profilePic);
        setIsLoading(true);
        setShow(false);
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div className="drag-container">
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

              <div className="image-preview-container">
                <Image
                  roundedCircle
                  className="image-preview"
                  src={
                    previewImage
                      ? previewImage
                      : test
                      ? getImageUrl(test)
                      : getImageUrl(user?.profilePic)
                    // !previewImage ? getImageUrl(user?.profilePic) : previewImage
                  }
                  alt="Preview"
                />
              </div>
            </div>
          ) : (
            <ReactLoading
              type={"spin"}
              color={"green"}
              height={"10vh"}
              width={"100%"}
              className="d-flex flex-row justify-content-center "
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitUpload(image);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
