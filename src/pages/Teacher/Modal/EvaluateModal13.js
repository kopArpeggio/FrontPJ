import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select, { createFilter } from "react-select";
import { MenuList } from "../../User/Helper";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { updateStudentById } from "../../../apis/studentApi";
import { sweetAlertSubmit, sweetAlertSuccess } from "../../../swal2/swal2";
import { updateEvaluateById } from "../../../apis/evaluateApi";

function EvaluateModal13({ show, handleClose, student, setStudent }) {
  const [validated, setValidated] = useState(false);
  console.log(student);

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
            fcn13Point:
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
              score?.score13 +
              score?.score14 +
              score?.score15 +
              score2?.score1 +
              score2?.score2 +
              score2?.score3 +
              score2?.score4 +
              score2?.score5 +
              score2?.score6 +
              score2?.score7 +
              score2?.score8 +
              score2?.score9 +
              score2?.score10 +
              score2?.score11 +
              score2?.score12 +
              score2?.score13 +
              score2?.score14 +
              score2?.score15,

            fcn13Comment: score?.fcn13Comment,
          });

          if (done) {
            sweetAlertSuccess("ประเมินนักศึกษาเสร็จสิ้น");
          }
        }
      });

      event.preventDefault();
    }
    setValidated(true);
  };

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
    score15: 0,
    sumpoint: 0,
  });

  const [score2, setScore2] = useState({
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
    score15: 0,
    sumpoint: 0,
  });

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>FCn 13</Modal.Title>
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
                  onChange={(e) =>
                    setScore({ ...score, score1: parseInt(e?.target.value) })
                  }
                />
                <Form.Control
                  onChange={(e) =>
                    setScore2({ ...score2, score1: parseInt(e?.target.value) })
                  }
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
                  onChange={(e) =>
                    setScore({ ...score, score2: parseInt(e?.target.value) })
                  }
                  type="number"
                  required
                />
                <Form.Control
                  onChange={(e) =>
                    setScore2({ ...score2, score2: parseInt(e?.target.value) })
                  }
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
                  onChange={(e) =>
                    setScore({ ...score, score3: parseInt(e?.target.value) })
                  }
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  onChange={(e) =>
                    setScore2({ ...score2, score3: parseInt(e?.target.value) })
                  }
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
                  onChange={(e) =>
                    setScore({ ...score, score4: parseInt(e?.target.value) })
                  }
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  onChange={(e) =>
                    setScore2({ ...score2, score4: parseInt(e?.target.value) })
                  }
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
                  onChange={(e) =>
                    setScore({ ...score, score5: parseInt(e?.target.value) })
                  }
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  onChange={(e) =>
                    setScore2({ ...score2, score5: parseInt(e?.target.value) })
                  }
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
                  onChange={(e) =>
                    setScore({ ...score, score6: parseInt(e?.target.value) })
                  }
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  onChange={(e) =>
                    setScore2({ ...score2, score6: parseInt(e?.target.value) })
                  }
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
                  onChange={(e) =>
                    setScore({ ...score, score7: parseInt(e?.target.value) })
                  }
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  onChange={(e) =>
                    setScore2({ ...score2, score7: parseInt(e?.target.value) })
                  }
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
                  onChange={(e) =>
                    setScore({ ...score, score8: parseInt(e?.target.value) })
                  }
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  onChange={(e) =>
                    setScore2({ ...score2, score8: parseInt(e?.target.value) })
                  }
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
                  onChange={(e) =>
                    setScore({ ...score, score9: parseInt(e?.target.value) })
                  }
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  onChange={(e) =>
                    setScore2({ ...score2, score9: parseInt(e?.target.value) })
                  }
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
                  onChange={(e) =>
                    setScore({ ...score, score10: parseInt(e?.target.value) })
                  }
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  onChange={(e) =>
                    setScore2({ ...score2, score10: parseInt(e?.target.value) })
                  }
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
                  onChange={(e) =>
                    setScore({ ...score, score11: parseInt(e?.target.value) })
                  }
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  onChange={(e) =>
                    setScore2({ ...score2, score11: parseInt(e?.target.value) })
                  }
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
                  onChange={(e) =>
                    setScore({ ...score, score12: parseInt(e?.target.value) })
                  }
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  onChange={(e) =>
                    setScore2({ ...score2, score12: parseInt(e?.target.value) })
                  }
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
                  onChange={(e) =>
                    setScore({ ...score, score13: parseInt(e?.target.value) })
                  }
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  onChange={(e) =>
                    setScore2({ ...score2, score13: parseInt(e?.target.value) })
                  }
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
                  onChange={(e) =>
                    setScore({ ...score, score14: parseInt(e?.target.value) })
                  }
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  onChange={(e) =>
                    setScore2({ ...score2, score14: parseInt(e?.target.value) })
                  }
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
                  onChange={(e) =>
                    setScore({ ...score, score15: parseInt(e?.target.value) })
                  }
                  placeholder="ครั้งที่ 1"
                  min={0}
                  max={5}
                  type="number"
                  required
                />
                <Form.Control
                  onChange={(e) =>
                    setScore2({ ...score2, score15: parseInt(e?.target.value) })
                  }
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
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                6. สรุปคุณภาพโดยรวมของสถานประกอบการแห่งนี
              </Form.Label>
              <Col sm={5} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap", fontWeight: "bold" }}
                >
                  คะแนนรวม :{" "}
                  {score?.score1 +
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
                    score?.score13 +
                    score?.score14 +
                    score?.score15}
                </Form.Label>
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap", fontWeight: "bold" }}
                >
                  คะแนนรวม :{" "}
                  {score2?.score1 +
                    score2?.score2 +
                    score2?.score3 +
                    score2?.score4 +
                    score2?.score5 +
                    score2?.score6 +
                    score2?.score7 +
                    score2?.score8 +
                    score2?.score9 +
                    score2?.score10 +
                    score2?.score11 +
                    score2?.score12 +
                    score2?.score13 +
                    score2?.score14 +
                    score2?.score15}
                </Form.Label>
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                ข้อคิดเห็นเพิ่มเติม/Other comments
              </Form.Label>
              <Form.Control
                as="textarea"
                onChange={(e) => {
                  setScore({ ...score, fcn13Comment: e?.target?.value });
                }}
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
