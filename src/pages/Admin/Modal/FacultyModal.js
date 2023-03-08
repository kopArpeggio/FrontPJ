import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { createFaculty, updateFacultyById } from "../../../apis/facultyApi";

function FacultyModal({ show, faculty, setFaculty, handleClose, createMode }) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event?.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      if (createMode) {
        await createFaculty(faculty);
        handleClose();
      }
      if (!createMode) {
        await updateFacultyById(faculty);
        handleClose();
      }
    }
    setValidated(true);
  };

  return (
    <div>
      {" "}
      <Modal show={show} scrollable onHide={handleClose} className={"modal"}>
        <Modal.Header closeButton>
          {/* Change Title By Modal Mode */}
          <Modal.Title>
            {createMode ? "เพิ่มสถานประกอบการ" : "แก้ไขสถานประกอบการ"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                ชื่อคณะ
              </Form.Label>
              <Form.Control
                value={faculty?.facultyName}
                onChange={(event) =>
                  setFaculty({
                    ...faculty,
                    facultyName: event?.target?.value,
                  })
                }
                type="text"
                required
              />
            </Form.Group>

            <Modal.Footer>
              <Button
                variant="secondary"
                className="btn btn-primary "
                onClick={handleClose}
              >
                ยกเลิก
              </Button>

              <Button type="submit">ยืนยัน</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FacultyModal;
