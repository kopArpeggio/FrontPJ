import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select, { createFilter } from "react-select";
import { MenuList } from "../../User/Helper";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { updateStudentById } from "../../../apis/studentApi";

function EvaluateModal13({ show, handleClose, student, setStudent }) {
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
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>FCn 12</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div style={{ fontSize: "3vh" }}>หัวข้อประเมิน/Items</div>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={8}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                1. การพัฒนาตนเองของนักศึกษา
              </Form.Label>
              <Col sm={4} className="d-flex justify-content-start"></Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex justify-content-start"
              >
                1.1 บุคลิกภาพ
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  placeholder="ครั้งที่ 2"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex justify-content-start"
              >
                1.2 วุฒิภาวะ
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  placeholder="ครั้งที่ 2"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex justify-content-start"
              >
                1.3 การปรับตัว
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  placeholder="ครั้งที่ 2"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex justify-content-start"
              >
                1.4 การเรียนรู้
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  placeholder="ครั้งที่ 2"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex justify-content-start"
              >
                1.5 การแสดงความคิดเห็น การแสดงออก
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  placeholder="ครั้งที่ 2"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex justify-content-start"
              >
                1.6 มนุษยสัมพันธ์
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  placeholder="ครั้งที่ 2"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex justify-content-start"
              >
                1.7 ทัศนคติ
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  placeholder="ครั้งที่ 2"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                2. การจัดการ และสนับสนุน
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  placeholder="ครั้งที่ 2"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex  justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                3. ความประพฤติ คุณธรรม จริยธรรม และการปฏิบัติ
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  placeholder="ครั้งที่ 2"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                4. ความรู้ความสามารถพื้นฐานที่จำเป็นต่อการปฏิบัติงาน
                ที่ได้รับมอบหมายให้สำเร็จ
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  placeholder="ครั้งที่ 2"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                5. ความก้าวหน้าของการจัดทำรายงาน (Work term Report)
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  placeholder="ครั้งที่ 2"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                6. ความพึงพอใจของนักศึกษา
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex justify-content-start"
              >
                6.1 ต่องานที่ได้ปฏิบัติและสถานประกอบการ
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  placeholder="ครั้งที่ 2"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex justify-content-start"
              >
                6.2 ต่อความเหมาะสมปลอดภัยของที่พัก
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  placeholder="ครั้งที่ 2"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex justify-content-start"
              >
                6.3 ต่อความสะดวกปลอดภัยในการเดินทางไป – กลับ
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  placeholder="ครั้งที่ 2"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={7}
                className="d-flex justify-content-start"
              >
                6.4 ต่อความเหมาะสมของค่าตอบแทน
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  placeholder="ครั้งที่ 2"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
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

export default EvaluateModal13;
