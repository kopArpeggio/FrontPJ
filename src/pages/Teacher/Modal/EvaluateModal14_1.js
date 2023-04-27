import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select, { createFilter } from "react-select";
import { MenuList } from "../../User/Helper";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { updateStudentById } from "../../../apis/studentApi";

function EvaluateModal({ show, handleClose, student, setStudent }) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event?.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
    }
    setValidated(true);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>FCn 14.1</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            โปรดบันทึกหมาย 5, 4, 3, 2, 1 หรือ 0
            ตามความเห็นของท่านในแต่ละหัวข้อการประเมิน โดยใช้เกณฑ์การประเมิน
            ค่าสำหรับระดับความคิดเห็น ดังน
          </Form.Label>
          <Form.Group
            as={Row}
            className="d-flex justify-content-center"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label column sm={8} className="d-flex justify-content-start">
              5 หมายถึง มีการพัฒนาตนเองมากที่สุด หรือเหมาะสมมากที่สุด
            </Form.Label>
            <Form.Label column sm={8} className="d-flex justify-content-start">
              4 หมายถึง มีการพัฒนาตนเองมาก หรือเหมาะสมมาก
            </Form.Label>
            <Form.Label column sm={8} className="d-flex justify-content-start">
              3 หมายถึง มีการพัฒนาตนเองปานกลาง หรือเหมาะสมปานกลาง
            </Form.Label>
            <Form.Label column sm={8} className="d-flex justify-content-start">
              2 หมายถึง มีการพัฒนาตนเองน้อย หรือเหมาะสมน้อย
            </Form.Label>
            <Form.Label column sm={8} className="d-flex justify-content-start">
              1 หมายถึง มีการพัฒนาตนเองน้อยที่สุด หรือเหมาะสมน้อยที่สุด
            </Form.Label>
            <Form.Label column sm={8} className="d-flex justify-content-start">
              0 หมายถึง ไม่สามารถให้ระดับคะแนนได้ เช่น ไม่มีความเห็น ไม่มีข้อมูล
              ไม่ต้องการประเมิน เป็นต้น
            </Form.Label>
          </Form.Group>
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            หัวข้อรายงาน / Report title
          </Form.Label>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                ภาษาไทย/Thai
              </Form.Label>
              <Form.Control type="text" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                ภาษาอังกฤษ/English
              </Form.Label>
              <Form.Control type="text" required />
            </Form.Group>

            <div style={{ fontSize: "3vh" }}>หัวข้อประเมิน/Items</div>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                1. กิตติกรรมประกาศ (Acknowledgement)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={1} max={5} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                2. บทคัดย่อ (Abstract)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={1} max={5} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                3. สารบัญ สารบัญรูป และสารบัญตาราง (Table of contents)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={1} max={5} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                4. วัตถุประสงค์ (Objectives)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={1} max={5} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                5. วิธีการศึกษา (Method of Education)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={1} max={5} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                6. ผลการศึกษา (Result)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  20 คะแนน
                </Form.Label>
                <Form.Control min={1} max={5} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                7. วิเคราะห์ผลการศึกษา (Analysis)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={5} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                8. สรุปผลการศึกษา (Conclusion)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={5} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                9. ข้อเสนอแนะ (Comment)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={1} max={5} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                10. สำนวนการเขียน และการสื่อความหมาย (Idiom and meaning)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={5} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                11. ความถูกต้องตัวสะกด (Spelling)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={1} max={5} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                12. รูปแบบ และความสวยงามของรูปเล่ม (Pattern)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={1} max={5} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                13. เอกสารอ้างอิง (References)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={1} max={5} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                14. ภาคผนวก (Appendix)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={1} max={5} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                ข้อคิดเห็นเพิ่มเติม/Other comments
              </Form.Label>
              <Form.Control
                as="textarea"
                required
                style={{ height: "100px" }}
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

export default EvaluateModal;
