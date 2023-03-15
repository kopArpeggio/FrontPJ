import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { updateStudentById } from "../../../apis/studentApi";

function SupervisionStudentModal({ show, handleClose, student, setStudent }) {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ชื่อจริง</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                disabled
                defaultValue={student?.firstname}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SupervisionStudentModal;
