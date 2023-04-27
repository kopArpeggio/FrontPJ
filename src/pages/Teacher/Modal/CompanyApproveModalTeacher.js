import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getStudentByApproveCompany } from "../../../apis/studentApi";

function CompanyApproveModalTeacher({
  show,
  handleClose,
  company,
  setCompany,
  student,
  setStudent
}) {

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event?.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      console.log(student)
    }
    setValidated(true);
  };


  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดสถานประกอบการ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
              <Form.Label className="d-flex">นามสกุลนักศึกษาที่ร้องขอ</Form.Label>
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
                onChange={(e) => setStudent({ ...student, username: e?.target?.value })}
                required
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex">Password</Form.Label>

              <Form.Control
                type="password"
                onChange={((e) => setStudent({ ...student, password: e?.target?.value }))}
                autoFocus
                required
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                onChange={((e) => setStudent({ ...student, confirmPassword: e?.target?.value }))}
                required
                autoFocus
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >Close</Button>
          <Button variant="primary" type="submit" disabled={student?.password === student?.confirmPassword ? false : true}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CompanyApproveModalTeacher;
