import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select, { createFilter } from "react-select";
import { MenuList } from "../../User/Helper";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { updateStudentById } from "../../../apis/studentApi";
import { updateEvaluateById } from "../../../apis/evaluateApi";
import { sweetAlertSubmit, sweetAlertSuccess } from "../../../swal2/swal2";

function EvaluateModal12({ show, handleClose, student, setStudent }) {
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
    score15: 0,
    score16: 0,
    score17: 0,
    score18: 0,
    score19: 0,
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
            fcn12Point:
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
              score?.score16 +
              score?.score17 +
              score?.score18 +
              score?.score19,
            fcn12Comment: score?.fcn12Comment,
          });

          if(done){
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
          <Modal.Title>FCn 12</Modal.Title>
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
                1. ความเข้าใจในปรัชญาของสหกิจศึกษา
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                1.1 เจ้าหน้าที่ระดับบริหารและฝ่ายบุคคล
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score1: parseInt(e?.target.value) })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                1.2 พนักงานที่ปรึกษา (Job Supervisor)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score2: parseInt(e?.target.value) })
                  }
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
                2. การจัดการ และสนับสนุน
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label column sm={9} className="align-self-start">
                2.1 การประสานงานด้านการจัดการดูแลนักศึกษา
                ภายในสถานประกอบการระหว่าง ฝ่ายบุคคล และพนักงานที่ปรึกษา
              </Form.Label>
              <Col
                sm={3}
                className="d-flex justify-content-start text-align-left"
              >
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score3: parseInt(e?.target.value) })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                2.2 การให้คำแนะนำดูแลนักศึกษาของฝ่ายบริหารบุคคล (การปฐมนิเทศ
                การแนะนำระเบียบวินัย การลางาน สวัสดิการ การจ่ายค่าตอบแทน)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score4: parseInt(e?.target.value) })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                2.3 บุคลากรในสถานประกอบการ ให้ความสนใจสนับสนุนและ
                ให้ความเป็นกันเองกับนักศึกษา
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score5: parseInt(e?.target.value) })
                  }
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
                3. ปริมาณงานที่นักศึกษาได้รับ
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                3.1 ปริมาณงานที่นักศึกษาได้รับมอบหมาย
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score6: parseInt(e?.target.value) })
                  }
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
                4. คุณภาพงาน
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                4.1 คุณลักษณะงาน
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score7: parseInt(e?.target.value) })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                4.2 งานที่ได้รับมอบหมาย ตรงกับสาขาวิชาของนักศึกษา
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score8: parseInt(e?.target.value) })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                4.3 งานที่ได้รับมอบหมายตรงกับที่บริษัทเสนอไว้
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score9: parseInt(e?.target.value) })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                4.4 งานที่ได้รับมอบหมายตรงกับความสนใจของนักศึกษา
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score10: parseInt(e?.target.value) })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                4.5 ความเหมาะสมของหัวข้อรายงานที่นักศึกษาได้รับ
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score11: parseInt(e?.target.value) })
                  }
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
                5. การมอบหมายงานและนิเทศ ของพนักงานที่ปรึกษา
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                5.1 มีพนักงานที่ปรึกษา ดูแลนักศึกษาตั้งแต่วันแรกที่เข้าทำงาน
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score12: parseInt(e?.target.value) })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                5.2 ความรู้และประสบการณ์วิชาชีพของพนักงานที่ปรึกษา
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score13: parseInt(e?.target.value) })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                5.3 เวลาที่พนักงานที่ปรึกษา ให้แก่นักศึกษาด้านการปฏิบัติงาน
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score14: parseInt(e?.target.value) })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                5.4 เวลาที่พนักงานที่ปรึกษา ให้แก่นักศึกษาด้านการเขียน รายงาน
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score15: parseInt(e?.target.value) })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                5.5 ความสนใจของพนักงานที่ปรึกษา ต่อการสอนงาน และ สั่งงาน
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score16: parseInt(e?.target.value) })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                5.6 การให้ความสำคัญต่อการประเมินผลการปฏิบัติงานและ
                เขียนรายงานของพนักงานที่ปรึกษา
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score17: parseInt(e?.target.value) })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                5.7 ความพร้อมของอุปกรณ์เครื่องมือสำหรับนักศึกษา
                (พิจารณาในกรณีนักศึกษาสหกิจศึกษา ซึ่งไปปฏิบัติงาน
                ชั่วคราวเท่านั้น)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score18: parseInt(e?.target.value) })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                5.8 การจัดทำแผนปฏิบัติงานตลอดระยะเวลาของการปฏิบัติงาน
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                >
                  5 คะแนน
                </Form.Label>
                <Form.Control
                  min={0}
                  max={5}
                  type="number"
                  defaultValue={0}
                  required
                  onChange={(e) =>
                    setScore({ ...score, score19: parseInt(e?.target.value) })
                  }
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
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
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
                    score?.score15 +
                    score?.score16 +
                    score?.score17 +
                    score?.score18 +
                    score?.score19}
                </Form.Label>
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                ข้อคิดเห็นเพิ่มเติม/Other comments
              </Form.Label>
              <Form.Control
                onChange={(e) =>
                  setScore({ ...score, fcn12Comment: e?.target.value })
                }
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

export default EvaluateModal12;
