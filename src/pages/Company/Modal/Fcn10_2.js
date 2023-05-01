import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";

import { Button, Col, Form, Row } from "react-bootstrap";
import { sweetAlertSubmit, sweetAlertSuccess } from "../../../swal2/swal2";
import { updateEvaluateById } from "../../../apis/evaluateApi";

function Fcn10_2({ show, handleClose, student, setStudent }) {
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
            fcn10_2Point:
              score?.score1 +
              score?.score2 +
              score?.score3 +
              score?.score4 +
              score?.score5 +
              score?.score6 +
              score?.score7 +
              score?.score8 +
              score?.score9 +
              score?.score10 +
              score?.score11 +
              score?.score12 +
              score?.score13 ,
            fcn10_2Comment: score?.fcn10_2Comment,
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
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>FCn 10.2</Modal.Title>
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
                <Form.Control min={0} max={5} type="number" required onChange={(e) =>
                  setScore({ ...score, score1: parseInt(e?.target.value) })
                } />
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
                <Form.Control min={0} max={5} type="number" required onChange={(e) =>
                  setScore({ ...score, score2: parseInt(e?.target.value) })
                } />
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
                <Form.Control min={0} max={5} type="number" required onChange={(e) =>
                  setScore({ ...score, score3: parseInt(e?.target.value) })
                } />
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
                <Form.Control min={0} max={5} type="number" required onChange={(e) =>
                  setScore({ ...score, score4: parseInt(e?.target.value) })
                } />
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
                5. การปฏิบัติงาน (ลักษณะงานและวิธีการปฏิบัติอย่างละเอียด)
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
                6. ผลการปฏิบัติงาน (Result)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  20 คะแนน
                </Form.Label>
                <Form.Control min={0} max={20} type="number" required onChange={(e) =>
                  setScore({ ...score, score6: parseInt(e?.target.value) })
                } />
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
                7. สรุปผลการปฏิบัติงาน (Conclusion)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={0} max={10} type="number" required onChange={(e) =>
                  setScore({ ...score, score7: parseInt(e?.target.value) })
                } />
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
                8. ปัญหาและข้อเสนอแนะ (Comment)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={0} max={10} type="number" required onChange={(e) =>
                  setScore({ ...score, score8: parseInt(e?.target.value) })
                } />
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
                9. สำนวนการเขียน และการสื่อความหมาย (Idiom and meaning)
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
                10. ความถูกต้องตัวสะกด (Spelling)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={0} max={10} type="number" required onChange={(e) =>
                  setScore({ ...score, score10: parseInt(e?.target.value) })
                } />
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
                11. รูปแบบ และความสวยงามของรูปเล่ม (Pattern)
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
                  setScore({ ...score, score11: parseInt(e?.target.value) })
                } />
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
                12. เอกสารอ้างอิง (References)
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
                  setScore({ ...score, score12: parseInt(e?.target.value) })
                } />
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
                13. ภาคผนวก (Appendix)
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
                  setScore({ ...score, score13: parseInt(e?.target.value) })
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
                onChange={(e) => {setScore({...score,fcn10_2Comment: e?.target?.value })}}
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

export default Fcn10_2;
