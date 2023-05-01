import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select, { createFilter } from "react-select";
import { MenuList } from "../../User/Helper";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { updateStudentById } from "../../../apis/studentApi";
import { sweetAlertSubmit, sweetAlertSuccess } from "../../../swal2/swal2";
import { updateEvaluateById } from "../../../apis/evaluateApi";

function EvaluateModal15({ show, handleClose, student, setStudent }) {
  const [validated, setValidated] = useState(false);

  const [score, setScore] = useState({
    score1: 0,
    score2: 0,
    score3: 0,
    score4: 0,
    score5: 0,
    score6: 0,
    score7: 0,
    score8: 0,
    score9: 0,
    score10: 0,
    score11: 0,
    score12: 0,
    score13: 0,
    score14: 0,
    sumpoint: 0,
  });

  const handleSubmit = async (event) => {
    const form = event?.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      sweetAlertSubmit().then(async (results) => {
        if (results.isConfirmed) {
          const done = await updateEvaluateById({
            evaluateId: student?.evaluateId,
            fcn15Point:
              score?.score1 +
              score?.score2 +
              score?.score3 +
              score?.score4 +
              score?.score5 +
              score?.score6 +
              score?.score7 +
              score?.score8 +
              score?.score9 +
              score?.score10 ,
            fcn15Comment: score?.fcn15Comment,
          });

          if (done) {
            sweetAlertSuccess("ประเมินนักศึกษาเสร็จสิ้น")
          }
        }
      });

      event.preventDefault();
    }
    setValidated(true);
  };
  
  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>FCn 15</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
              <Form.Label
                column
                sm={8}
                className="d-flex justify-content-start"
              >
                5 หมายถึง มีการพัฒนาตนเองมากที่สุด หรือเหมาะสมมากที่สุด
              </Form.Label>
              <Form.Label
                column
                sm={8}
                className="d-flex justify-content-start"
              >
                4 หมายถึง มีการพัฒนาตนเองมาก หรือเหมาะสมมาก
              </Form.Label>
              <Form.Label
                column
                sm={8}
                className="d-flex justify-content-start"
              >
                3 หมายถึง มีการพัฒนาตนเองปานกลาง หรือเหมาะสมปานกลาง
              </Form.Label>
              <Form.Label
                column
                sm={8}
                className="d-flex justify-content-start"
              >
                2 หมายถึง มีการพัฒนาตนเองน้อย หรือเหมาะสมน้อย
              </Form.Label>
              <Form.Label
                column
                sm={8}
                className="d-flex justify-content-start"
              >
                1 หมายถึง มีการพัฒนาตนเองน้อยที่สุด หรือเหมาะสมน้อยที่สุด
              </Form.Label>
              <Form.Label
                column
                sm={8}
                className="d-flex justify-content-start"
              >
                0 หมายถึง ไม่สามารถให้ระดับคะแนนได้ เช่น ไม่มีความเห็น
                ไม่มีข้อมูล ไม่ต้องการประเมิน เป็นต้น
              </Form.Label>
            </Form.Group>
            <div style={{ fontSize: "3vh" }}>หัวข้อประเมิน/Items</div>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                การบันทึกประจำวัน
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                1 กำรบันทึกสิ่งที่ประทับใจหรือน่ำสนใจได้อย่ำงสร้ำงสรรค์
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={0} max={5} type="number" required onChange={(e) =>
                  setScore({ ...score, score1: parseInt(e?.target.value) })
                } />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                2 กำรบันทึกปัญหำ อุปสรรคต่ำงๆ แต่ละวันได้อย่ำงชัดเจน
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={0} max={5} type="number" required onChange={(e) =>
                  setScore({ ...score, score2: parseInt(e?.target.value) })
                } />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                3 กำรเสนอแนวทำงแก้ไขที่สอดคล้องกับปัญหำ อุปสรรค ได้อย่ำงเหมำะสม
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={0} max={5} type="number" required onChange={(e) =>
                  setScore({ ...score, score3: parseInt(e?.target.value) })
                } />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                4 กำรบันทึกสิ่งที่ได้เรียนรู้ในแต่ละวันได้อย่ำงเหมำะสม
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={0} max={5} type="number" required onChange={(e) =>
                  setScore({ ...score, score4: parseInt(e?.target.value) })
                } />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                5 ควำมสม่ำเสมอและควำมครบถ้วนในกำรบันทึก
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={0} max={5} type="number" required onChange={(e) =>
                  setScore({ ...score, score5: parseInt(e?.target.value) })
                } />
              </Col>
            </Form.Group>
            <Form.Label
              column
              sm={9}
              className="d-flex justify-content-start"
              style={{ fontSize: "2vh", fontWeight: "bold" }}
            >
              การบันทึกหลังรับการนิเทศ
            </Form.Label>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                6 มีการบันทึกข้อเสนอแนะของอาจารย์นิเทศก์
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={0} max={5} type="number" required onChange={(e) =>
                  setScore({ ...score, score6: parseInt(e?.target.value) })
                } />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                7 มีการบันทึกคำถามหรือข้อสงสัยที่นักศึกษาได้เรียนรู้ข้อสงสัยของ
                ตนเองต่อการประเมินผลในเรื่องอื่นๆ และความรู้สึกที่เกิดขึ้นหลัง
                รับการนิเทศอย่ำงสร้างสรรค์
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={0} max={5} type="number" required onChange={(e) =>
                  setScore({ ...score, score7: parseInt(e?.target.value) })
                } />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                8 เสนอแนวทำงกำรพัฒนำหรือปรับปรุงกำรปฏิบัติงำนอย่ำง สร้ำงสรรค์
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={0} max={5} type="number" required onChange={(e) =>
                  setScore({ ...score, score8: parseInt(e?.target.value) })
                } />
              </Col>
            </Form.Group>

            <Form.Label
              column
              sm={9}
              className="d-flex justify-content-start"
              style={{ fontSize: "2vh", fontWeight: "bold" }}
            >
              สมุดบันทึกการปฏิบัติงานสหกิจศึกษา
            </Form.Label>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                9 กำรบันทึกรายการต่างๆ อย่ำงครบถ้วน เป็นระเบียบ
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={0} max={5} type="number" required onChange={(e) =>
                  setScore({ ...score, score9: parseInt(e?.target.value) })
                } />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                10 บันทึกสรุปผลกำรฝึกสหกิจศึกษำครบถ้วน มีสำระ แสดงให้เห็นถึง
                พัฒนำกำรและผลสัมฤทธิ์ที่ได้จำกกำรฝึก
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control min={0} max={5} type="number" required onChange={(e) =>
                  setScore({ ...score, score10: parseInt(e?.target.value) })
                } />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                ข้อคิดเห็นเพิ่มเติม/Other comments
              </Form.Label>
              <Form.Control
                as="textarea"
                required
                onChange={(e) => {
                  setScore({ ...score, fcn15Comment: e?.target?.value })
                }}
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

export default EvaluateModal15;
