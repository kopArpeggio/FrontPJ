import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getStudentByApproveCompany } from "../../../apis/studentApi";
import { sweetAlertSubmit, sweetAlertSuccess } from "../../../swal2/swal2";
import { updateWorkplaceById } from "../../../apis/workplaceApi";

function CompanyApproveModalTeacher({
  show,
  handleClose,
  company,
  setCompany,
  student,
  setStudent,
}) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event?.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      sweetAlertSubmit(
        undefined,
        "ต้องการบันทึกสถานประกอบการนี้หรือไม่ !"
      ).then(async (results) => {
        if (results.isConfirmed) {
          const done = await updateWorkplaceById(company);

          if (done) {
            sweetAlertSuccess().then(() => {
              handleClose();
            });
          }
        }
      });
    }
    setValidated(true);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>รายละเอียดสถานประกอบการ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ชื่อสถานประกอบการ</Form.Label>
              <Form.Control
                type="text"
                value={company?.companyName}
                autoFocus
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex ">ชื่อนักศึกษาที่ร้องขอ</Form.Label>
              <Form.Control
                type="text"
                value={student?.firstname}
                autoFocus
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex">
                นามสกุลนักศึกษาที่ร้องขอ
              </Form.Label>
              <Form.Control
                type="text"
                value={student?.lastname}
                autoFocus
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex">Username</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) =>
                  setCompany({ ...company, username: e?.target?.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex">Password</Form.Label>

              <Form.Control
                type="password"
                onChange={(e) =>
                  setCompany({ ...company, password: e?.target?.value })
                }
                autoFocus
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) =>
                  setCompany({ ...company, confirmPassword: e?.target?.value })
                }
                required
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">ยกเลิก</Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                setCompany({ ...company, approve: true });
              }}
              disabled={
                company?.password === company?.confirmPassword ? false : true
              }
            >
              ยืนยัน
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default CompanyApproveModalTeacher;
