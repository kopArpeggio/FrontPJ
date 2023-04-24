import React from "react";
import { sweetAlertSubmit } from "../../swal2/swal2";
import Swal from "sweetalert2";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { updateTeacherPassword } from "../../apis/teacherApi";

function ChangePasswordTeahcer({ show, handleClose, teacher, setTeacher }) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    // setLoading(true);

    const form = event?.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      sweetAlertSubmit(event).then(async (result) => {
        if (result?.isConfirmed) {
          const status = await updateTeacherPassword({
            id: teacher?.id,
            oldPassword: teacher?.oldPassword,
            newPassword: teacher?.newPassword,
          });
          if (status) {
            Swal.fire("บันทึกสำเร็จ !", "", "success").then(() => {
              handleClose();
            });
          }
        }
      });
      event?.preventDefault();
    }
    setValidated(true);
  };
  return (
    <div>
      {" "}
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Modal.Header closeButton>
            <Modal.Title>เปลี่ยนรหัสผ่าน</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="d-flex">รหัสผ่านเดิม</Form.Label>
              <Form.Control
                style={{ fontSize: "2vh" }}
                onChange={(e) => {
                  setTeacher({ ...teacher, oldPassword: e?.target?.value });
                }}
                required
                type="password"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="d-flex">รหัสผ่านใหม่</Form.Label>
              <Form.Control
                style={{ fontSize: "2vh" }}
                type="password"
                autoFocus
                required
                onChange={(e) => {
                  setTeacher({ ...teacher, newPassword: e?.target?.value });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="d-flex">รหัสผ่านใหม่</Form.Label>
              <Form.Control
                style={{ fontSize: "2vh" }}
                type="password"
                autoFocus
                required
                onChange={(e) => {
                  setTeacher({ ...teacher, newPassword2: e?.target?.value });
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              ยกเลิก
            </Button>
            <Button
              variant="primary"
              disabled={
                teacher?.newPassword !== teacher?.newPassword2 ? true : false
              }
              type="submit"
            >
              เปลี่ยนรหัสผ่าน
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ChangePasswordTeahcer;
