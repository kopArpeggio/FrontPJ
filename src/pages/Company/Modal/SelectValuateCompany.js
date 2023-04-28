import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Fcn9_2 from "./Fcn9_2";

function SelectValuateCompany({ show, handleClose, student, setStudent }) {
  const [doc9_2, setDoc9_2] = useState(false);

  const closeModalDoc = () => {
    setDoc9_2(false);
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
              onClick={() => setDoc9_2(true)}
            >
              FCn 10.1 (แบบประเมินรายงานนักศึกษาสหกิจศึกษา
              (ประเภทโครงการที่มีลักษณะงานวิจัย))
            </Button>
            <Button
              variant="primary"
              className="d-flex justify-content-start"
              size="lg"
              style={{ fontSize: "2vh" }}
              onClick={() => setDoc9_2(true)}
            >
              FCn 10.2 (แบบประเมินรายงานนักศึกษาสหกิจศึกษา
              (ประเภทโครงการการปฏิบัติงาน))
            </Button>
            <Button
              variant="primary"
              className="d-flex justify-content-start"
              size="lg"
              style={{ fontSize: "2vh" }}
              onClick={() => setDoc9_2(true)}
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
