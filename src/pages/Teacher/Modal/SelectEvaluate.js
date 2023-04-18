import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { updateStudentById } from "../../../apis/studentApi";
import EvaluateModal from "./EvaluateModal14_1";
import EvaluateModal14_2 from "./EvaluateModal14_2";
import EvaluateModal12 from "./EvaluateModal12";
import EvaluateModal13 from "./EvaluateModal13";

function SelectEvaluate({ show, handleClose, student, setStudent }) {
  const [doc12, setDoc12] = useState(false);
  const [doc13, setDoc13] = useState(false);
  const [doc14_1, setDoc14_1] = useState(false);
  const [doc14_2, setDoc14_2] = useState(false);

  const closeModalDoc = () => {
    setDoc12(false);
    setDoc13(false);
    setDoc14_1(false);
    setDoc14_2(false);
  };

  return (
    <div>
      {" "}
      <EvaluateModal
        show={doc14_1}
        handleClose={closeModalDoc}
        setStudent={setStudent}
        student={student}
      />
      <EvaluateModal14_2
        show={doc14_2}
        handleClose={closeModalDoc}
        setStudent={setStudent}
        student={student}
      />
      <EvaluateModal12
        show={doc12}
        handleClose={closeModalDoc}
        setStudent={setStudent}
        student={student}
      />
      <EvaluateModal13
        show={doc13}
        handleClose={closeModalDoc}
        setStudent={setStudent}
        student={student}
      />
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>โปลดเลือกแบบประเมิน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              className="d-flex justify-content-start"
              size="lg"
              style={{ fontSize: "2vh" }}
              onClick={() => setDoc12(true)}
            >
              FCn 12 (แบบประเมินการดำเนินงานสหกิจศึกษาของสถานประกอบการ)
            </Button>
            <Button
              variant="primary"
              className="d-flex justify-content-start"
              size="lg"
              style={{ fontSize: "2vh" }}
              onClick={() => setDoc13(true)}
            >
              FCn 13 (แบบประเมินการพัฒนาตนเองของนักศึกษาสหกิจศึกษา)
            </Button>
            <Button
              variant="primary"
              className="d-flex justify-content-start"
              size="lg"
              style={{ fontSize: "2vh" }}
              onClick={() => setDoc14_1(true)}
            >
              FCn 14.1 (แบบประเมินรายงานนักศึกษาสหกิจศึกษา
              (ประเภทโครงการที่มีลักษณะงานวิจัย))
            </Button>
            <Button
              variant="primary"
              className="d-flex justify-content-start"
              size="lg"
              style={{ fontSize: "2vh" }}
              onClick={() => setDoc14_2(true)}
            >
              FCn 14.2 (แบบประเมินรายงานนักศึกษาสหกิจศึกษา
              (ประเภทโครงการการปฏิบัติงาน))
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SelectEvaluate;
