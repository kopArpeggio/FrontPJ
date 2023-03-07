import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { createTeacher, updateTeacherById } from "../../../apis/teacherApi";

function TeacherModal({ createMode, show, handleClose, teacher, setTeacher }) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event?.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      if (createMode) {
        await createTeacher(teacher);
        handleClose();
      }
      if (!createMode) {
        await updateTeacherById(teacher);
        handleClose();
      }
    }
    setValidated(true);
  };

  return (
    <div>
      <Modal show={show} scrollable onHide={handleClose} className={"modal"}>
        <Modal.Header closeButton>
          {/* Change Title By Modal Mode */}
          <Modal.Title>
            {createMode ? "เพิ่มอาจารย์" : "แก้ไขอาจารย์"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                ชื่อจริง
              </Form.Label>
              <Form.Control
                value={teacher?.firstname}
                onChange={(event) =>
                  setTeacher({
                    ...teacher,
                    firstname: event?.target?.value,
                  })
                }
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                นามสกุล
              </Form.Label>
              <Form.Control
                value={teacher?.lastname}
                onChange={(event) =>
                  setTeacher({
                    ...teacher,
                    lastname: event?.target?.value,
                  })
                }
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                Username
              </Form.Label>
              <Form.Control
                value={teacher?.username}
                onChange={(event) =>
                  setTeacher({
                    ...teacher,
                    username: event?.target?.value,
                  })
                }
                type="text"
                required={createMode}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                Password
              </Form.Label>
              <Form.Control
                value={teacher?.password}
                onChange={(event) =>
                  setTeacher({
                    ...teacher,
                    password: event?.target?.value,
                  })
                }
                type="text"
                required={createMode}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                สาขาวิชา
              </Form.Label>
              <Form.Control
                value={teacher?.faculty}
                onChange={(event) =>
                  setTeacher({
                    ...teacher,
                    faculty: event?.target?.value,
                  })
                }
                type="text"
                required={createMode}
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

export default TeacherModal;
