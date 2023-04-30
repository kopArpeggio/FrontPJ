import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Fcn9_2 from "./Fcn9_2";
import Fcn10_1 from "./Fcn10_1";
import Fcn10_2 from "./Fcn10_2";
import Fcn11 from "./Fcn11";

function SelectValuateCompany({ show, handleClose, student, setStudent }) {
  const [doc9_2, setDoc9_2] = useState(false);
  const [doc10_1, setDoc10_1] = useState(false);
  const [doc10_2, setDoc10_2] = useState(false);
  const [doc11, setDoc11] = useState(false);

  const closeModalDoc = () => {
    setDoc9_2(false);
    setDoc10_1(false);
    setDoc10_2(false);
    setDoc11(false);
  };

  return (
    <div>
      {" "}
      <Fcn9_2
        show={doc9_2}
        handleClose={closeModalDoc}
        setStudent={setStudent}
        student={student}
      />
      <Fcn10_1
        show={doc10_1}
        handleClose={closeModalDoc}
        setStudent={setStudent}
        student={student}
      />
      <Fcn10_2
        show={doc10_2}
        handleClose={closeModalDoc}
        setStudent={setStudent}
        student={student}
      />
      <Fcn11
        show={doc11}
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
              onClick={() => setDoc9_2(true)}
            >
              FCn 9.2 (แบบประเมินผลนักศึกษาสหกิจ)
            </Button>
            <Button
              variant="primary"
              className="d-flex justify-content-start"
              size="lg"
              style={{ fontSize: "2vh" }}
              onClick={() => setDoc10_1(true)}
            >
              FCn 10.1 (แบบประเมินรายงานนักศึกษาสหกิจศึกษา
              (ประเภทโครงการที่มีลักษณะงานวิจัย))
            </Button>
            <Button
              variant="primary"
              className="d-flex justify-content-start"
              size="lg"
              style={{ fontSize: "2vh" }}
              onClick={() => setDoc10_2(true)}
            >
              FCn 10.2 (แบบประเมินรายงานนักศึกษาสหกิจศึกษา
              (ประเภทโครงการการปฏิบัติงาน))
            </Button>
            <Button
              variant="primary"
              className="d-flex justify-content-start"
              size="lg"
              style={{ fontSize: "2vh" }}
              onClick={() => setDoc11(true)}
            >
              FCn 11 (แบบประเมินการดำเนินงานสหกิจศึกษาของสถาบันการศึกษา)
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SelectValuateCompany;
