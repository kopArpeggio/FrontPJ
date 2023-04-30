import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select, { createFilter } from "react-select";
import { MenuList } from "../../User/Helper";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { updateStudentById } from "../../../apis/studentApi";

function Fcn9_2({ show, handleClose, student, setStudent }) {
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
          <Modal.Title>FCn 9.2</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Label>
              โปรดบันทึกหมาย 5, 4, 3, 2, 1 หรือ 0
              ตามความเห็นของท่านในแต่ละหัวข้อการประเมิน โดยใช้เกณฑ์การประเมิน
              ค่าสำหรับระดับความคิดเห็น ดังนี้
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
                1. ปริมาณงาน (Quantity of Work)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                1.1
                ปฏิบัติงานสำเร็จตามหน้าที่หรือตามที่ได้รับมอบหมาย(ในระดับที่นักศึกษา
                จะปฏิบัติได้) และเทียบกับนักศึกษาทั่ว ๆ ไป
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                1.2
                ปฏิบัติงานสำเร็จตามหน้าที่หรือตามที่ได้รับมอบหมายภายในระยะเวลาที่
                กำหนด
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                2. คุณภาพงาน (Quality of Work)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label column sm={9} className="align-self-start">
                2.1 ทำงานได้ถูกต้องครบถ้วนสมบูรณ์ตามที่ได้รับมอบหมาย
              </Form.Label>
              <Col
                sm={3}
                className="d-flex justify-content-start text-align-left"
              >
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                2.2 ผลงานแสดงความประณีตเรียบร้อย และรอบคอบ
                ทำให้ไม่เกิดปัญหาติดตามมา
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                3. ความรู้ความสามารถทางวิชาการ (Academic Ability)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                3.1 มีความรู้ทางวิชาการเพียงพอ ที่จะทำงานตามที่ได้รับมอบหมาย
                (ในระดับที่นักศึกษาจะปฏิบัติได้)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                4. ความสามารถในการเรียนรู้และประยุกต์วิชาการ (Ability to Learn
                and Apply Knowledge)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                4.1 สามารถเรียนรู้ได้อย่างรวดเร็ว
                ตลอดจนการนำความรู้ไปประยุกต์ใช้งาน
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                5. ความรู้ความชำนาญด้านปฏิบัติการ (Practical Ability)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                5.1 มีความชำนาญด้านการปฏิบัติการ การปฏิบัติงานในภาคสนาม ใน
                ห้องปฏิบัติการ
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                6. วิจารณญาณและการตัดสินใจ (Judgement and Dicision Making)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Row}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                6.1 มีการตัดสินใจได้ดี ถูกต้อง รวดเร็ว
                รวมทั้งมีความรับผิดชอบในการวิเคราะห์ ข้อมูลและการแก้ปัญหาต่างๆ
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                7. การจัดการและวางแผน (Organization and Planning)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Row}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                7.1 สามารถจัดการวางแผนการปฏิบัติหน้าที่ที่ได้รับมอบหมาย
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                8. ทักษะการสื่อสาร (Communication Skills)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Row}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start "
              >
                8.1 ความสามารถในการติดต่อสื่อสาร พูด เขียน และนำเสนอ
                (Presentation) สามารถสื่อให้เข้าใจได้ง่าย ชัดเจน ถูกต้อง รัดกุม
                มีลำดับขั้นตอนที่ดีไม่ก่อให้เกิดความ สับสนต่อการทำงาน
                รู้จักสอบถาม รู้จักชี้แจงผลการปฏิบัติงานและข้อขัดข้องให้ทราบ
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group
              className="mb-3"
              as={Row}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                8.2 ความสามารถในการติดต่อสื่อสาร พูด เขียน และนำเสนอ
                (Presentation) โดยใช้ภาษาอังกฤษ
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                9. ความเหมาะสมต่อตำแหน่งงานที่ได้รับมอบหมาย (Suitability for Job
                Position)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Row}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                9.1 สามารถพัฒนาตนเองให้ปฏิบัติงานตาม Job Position และ Job
                Description ที่มอบหมายได้อย่างเหมาะสม
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                10. ความรับผิดชอบและเป็นผู้ที่ไว้วางใจได้ (Resposibility and
                Dependability)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Row}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                10.1 สามารถดำเนินงานให้สำเร็จลุล่วงโดยคำนึงถึงเป้าหมาย
                และความสำเร็จของ งานเป็นหลัก
                ยอมรับผลที่เกิดจากการทำงานอย่างมีเหตุผล และไว้วางให้รับผิดชอบงาน
                ประจำและงานอื่นๆ
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                11. ความสนใจ อุตสาหะในการทำงาน (Interest in Work)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Row}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                11.1 มีความสนใจและความกระตือรือร้นในการทำงาน มีความอุตสาหะ
                ความพยายามความตั้งใจที่จะทำงานได้สำเร็จ โดยไม่ย่อท้อต่ออุปสรรค
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                12. ความสามารถเริ่มต้นทำงานได้ด้วยตนเอง (Initiative or Self
                Starter)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Row}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                12.1 สามารถเริ่มทำงานได้เอง โดยไม่ต้องรอคำสั่ง (กรณีงานประจำ)
                เสนอตัวเข้าช่วยงานแทบทุกอย่างมาขอรับงานใหม่ ๆ ไปทำ
                ไม่ปล่อยเวลาว่าง ให้ล่วงเลยไปโดยเปล่าประโยชน์
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                13. การตอบสนองต่อการสั่งการ (Response to Supervision)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Row}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                13.1 ยินดีรับคำสั่ง คำแนะนำ คำวิจารณ์ ไม่แสดงความอึดอัดใจ
                เมื่อได้รับคำติเตือน ความรวดเร็วในการปฏิบัติงานตามคำสั่ง
                การปรับตัวปฏิบัติตามคำแนะนำ ข้อเสนอแนะ และวิจารณ์
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                14. บุคลิกภาพและการวางแผน (Personality)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Row}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                14.1 มีบุคลิกภาพและวางตัวได้เหมาะสม เช่น ทัศนคติ วุฒิภาวะ
                ความอ่อนน้อม ถ่อมตน การแต่งกาย กิริยาวาจา การตรงต่อเวลา และอื่น
                ๆ
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                15. มนุษยสัมพันธ์ (Interpersonal Skills)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Row}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                15.1 สามารถร่วมงานกับผู้อื่น การทำงานเป็นทีม
                สร้างมนุษยสัมพันธ์ได้ดี เป็นที่รักใคร่ของผู้ร่วมงาน
                เป็นผู้ที่ช่วยก่อให้เกิดความร่วมมือประสานงาน
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                16. ความมีระเบียบวินัย ปฏิบัติตามวัฒนธรรมขององค์กร (Discipline
                and Adaptability to Formal Organization)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Row}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                16.1 สนใจเรียนรู้ ศึกษา กฎระเบียบ นโยบายต่าง ๆ
                และปฏิบัติตามโดยเต็มใจ การปฏิบัติตามระเบียบบริหารงานบุคคล
                (การเข้างาน ลางาน) ปฏิบัติตามกฎ การรักษาความปลอดภัยในโรงงาน
                การควบคุมคุณภาพ 5 ส และอื่น ๆ
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
                style={{ fontSize: "2vh", fontWeight: "bold" }}
              >
                17. คุณธรรมและจริยธรรม (Ethics and Morality)
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start"></Col>
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Row}
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label
                column
                sm={9}
                className="d-flex justify-content-start"
              >
                17.1 มีความซื่อสัตย์ สุจริต มีจิตใจสะอาด รู้จักเสียสละ
                ไม่เห็นแก่ตัว เอื้อเฟื้อ ช่วยเหลือผู้อื่น
              </Form.Label>
              <Col sm={3} className="d-flex justify-content-start">
                <Form.Label
                  className="me-2"
                  column
                  style={{ whiteSpace: "nowrap" }}
                  required
                >
                  10 คะแนน
                </Form.Label>
                <Form.Control min={1} max={10} type="number" required />
              </Col>
            </Form.Group>

            <Form.Label
              column
              className="d-flex justify-content-start"
              style={{ fontSize: "2vh", fontWeight: "bold" }}
            >
              โปรดให้ข้อคิดเห็นที่เป็นประโยชน์แก่นักศึกษา / Please give comments
              on the student
            </Form.Label>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                จุดเด่นของนักศึกษา / Strength
              </Form.Label>
              <Form.Control
                as="textarea"
                required
                style={{ height: "100px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                ข้อควรปรับปรุงของนักศึกษา / Improvement
              </Form.Label>
              <Form.Control
                as="textarea"
                required
                style={{ height: "100px" }}
              />
            </Form.Group>

            <Form.Label
              column
              className="d-flex justify-content-start"
              style={{ fontSize: "2vh", fontWeight: "bold" }}
            >
              หากนักศึกษาผู้นี้สำเร็จการศึกษาแล้ว
              ท่านจะรับเข้าทำงานในสถานประกอบการนี้หรือไม่
            </Form.Label>

            <Row className="mb-3 mt-5  d-flex justify-content-center">
              <Form.Label
                className="col-form-label-lg"
                style={{ fontSize: 22, color: "", fontWeight: "bold" }}
              >
                <p> การติดต่อสถานประกอบการ เพื่อปฏิบัติงานของนักศึกษา</p>
              </Form.Label>
              <Form.Group
                as={Col}
                sm="8"
                className="d-flex justify-content-around"
              >
                <Form.Check
                  required
                  value={"3"}
                  inline
                  label=" รับ / Yes"
                  style={{ whiteSpace: "nowrap" }}
                  type="radio"
                  name="grouped"
                />
                <Form.Check
                  required
                  value={"2"}
                  inline
                  label="ไม่รับ / No "
                  style={{ whiteSpace: "nowrap" }}
                  type="radio"
                  name="grouped"
                />
                <Form.Check
                  required
                  value={"1"}
                  inline
                  label="อื่นๆ โปรดระบุ......................................................................."
                  style={{ whiteSpace: "nowrap" }}
                  type="radio"
                  name="grouped"
                />
              </Form.Group>
            </Row>

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

export default Fcn9_2;
