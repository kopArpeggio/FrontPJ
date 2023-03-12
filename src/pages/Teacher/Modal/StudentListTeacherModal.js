import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import { Button, Col, Container, Form, Row } from "react-bootstrap";

function StudentListTeacherModal({
  show,
  setShow,
  student,
  address,
  workplace,
}) {
  const nrru = {
    latitude: 14.9846414,
    longtitude: 102.1126068,
  };

  const generateEmbedGoogleMapDirectionURL = (
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude
  ) => {
    return `https://maps.google.com/maps?saddr=${startLatitude},${startLongitude}&daddr=${endLatitude},${endLongitude}&output=embed`;
  };

  console.log(address);
  const { Work } = student;
  // const { Workplace } = student?.Work;
  return (
    <div>
      <Modal show={show} fullscreen onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Job Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {/* <iframe
            src="/pdf/Hi.pdf"
            style={{ height: "80vh", width: "50%", marginBottom: "5vh" }}
            title="pdf"
          ></iframe> */}

            <Form noValidate>
              <Row className="mb-3 mt-5 d-flex flex-xl-row">
                <Form.Label
                  className="col-form-label-lg"
                  style={{ fontSize: 22, color: "", fontWeight: "bold" }}
                >
                  รายระเอียดงานที่ไปปฎิบัติ
                </Form.Label>
                <Form.Group as={Col} sm="4">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    รายระเอียดงานที่ไปปฎิบัติ
                  </Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder="Programmer"
                    value={Work?.jobTitle}
                  />
                </Form.Group>
                <Form.Group as={Col} sm="8">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    รายละเอียดลักษณะงาน
                  </Form.Label>
                  <Form.Control
                    disabled
                    as="textarea"
                    rows={3}
                    placeholder="ถ่ายเอกสาร ถูพื้น ล้างจาน ตัดต่อวีดีโอ ตัดย่า"
                    value={Work?.jobDetail}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3 mt-4 ">
                <Form.Group as={Col} sm="12">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    สวัสดิการจากสถานประกอบการที่ได้รับ (ถ้ามี)
                  </Form.Label>
                  <Form.Control
                    disabled
                    as="textarea"
                    rows={3}
                    placeholder="เงิน ประกัน เบิกค่ารถ "
                    value={Work?.benefit}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3 mt-5 ">
                <Form.Label
                  className="col-form-label-lg"
                  style={{ fontSize: 22, color: "", fontWeight: "bold" }}
                >
                  สถานประกอบการที่ต้องการไปปฏิบัติสหกิจศึกษา
                </Form.Label>
                <Form.Group as={Col} sm="3">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    ชื่อหัวหน้าหน่วยงาน
                  </Form.Label>
                  <Form.Control
                    disabled
                    placeholder=""
                    value={Work?.bossFirstname}
                  />
                </Form.Group>
                <Form.Group as={Col} sm="3">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    นามสกุล
                  </Form.Label>
                  <Form.Control
                    disabled
                    placeholder=""
                    value={Work?.bossLastname}
                  />
                </Form.Group>
                <Form.Group as={Col} sm="4">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    ตำแหน่ง
                  </Form.Label>
                  <Form.Control
                    disabled
                    placeholder=""
                    value={Work?.bossPosition}
                  />
                </Form.Group>
                <Form.Group as={Col} sm="2">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    แผนก/ฝ่าย
                  </Form.Label>
                  <Form.Control
                    disabled
                    placeholder=""
                    value={Work?.bossDepartment}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3 mt-5 ">
                <Form.Group as={Col} sm="8">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    ชื่อหน่วยงาน
                  </Form.Label>
                  <Form.Control
                    disabled
                    placeholder=""
                    value={workplace?.companyName}
                  />
                </Form.Group>
                <Form.Group as={Col} sm="4">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    บ้านเลขที่
                  </Form.Label>
                  <Form.Control
                    disabled
                    placeholder=""
                    value={address?.houseNumber}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3 mt-5 ">
                <Row className=" "></Row>
                <Form.Group as={Col} sm="3">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    ตำบล
                  </Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    value={address?.district}
                  />
                </Form.Group>
                <Form.Group as={Col} sm="3">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    อำเภอ
                  </Form.Label>
                  <Form.Control disabled type="text" value={address?.amphoe} />
                </Form.Group>
                <Form.Group as={Col} sm="3">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    จังหวัด
                  </Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    value={address?.province}
                  />
                </Form.Group>
                <Form.Group as={Col} sm="3">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    รหัสไปรษณีย์
                  </Form.Label>
                  <Form.Control
                    disabled
                    type="search"
                    value={address?.zipCode}
                  />
                </Form.Group>
                <Row className="mb-3 mt-3 ">
                  <Form.Group as={Col} sm="4">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      โทรศัพท์
                    </Form.Label>
                    <Form.Control
                      disabled
                      placeholder=""
                      value={Work?.phoneNumber}
                      maxLength="10"
                    />
                  </Form.Group>
                  <Form.Group as={Col} sm="8">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      E-mail
                    </Form.Label>
                    <Form.Control
                      disabled
                      type="email"
                      placeholder=""
                      value={Work?.email}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-5 ">
                  <Form.Label
                    className="col-form-label-lg"
                    style={{ fontSize: 22, color: "", fontWeight: "bold" }}
                  >
                    บุลคลในสถานประกอบการที่นักศึกษาติดต่อสำหรับการปฏิบัติงานสหกิจศึกษา
                  </Form.Label>
                  <Form.Group as={Col} sm="3">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      ชื่อจริง
                    </Form.Label>
                    <Form.Control
                      disabled
                      placeholder=""
                      value={Work?.contactorsFirstname}
                    />
                  </Form.Group>
                  <Form.Group as={Col} sm="3">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      นามสกุล
                    </Form.Label>
                    <Form.Control
                      disabled
                      placeholder=""
                      value={Work?.contactorsLastname}
                    />
                  </Form.Group>
                  <Form.Group as={Col} sm="4">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      ตำแหน่ง
                    </Form.Label>
                    <Form.Control
                      disabled
                      placeholder=""
                      value={Work?.contactorsPosition}
                    />
                  </Form.Group>
                  <Form.Group as={Col} sm="2">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      แผนก/ฝ่าย
                    </Form.Label>
                    <Form.Control
                      disabled
                      placeholder=""
                      value={Work?.contactorsDepartment}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-3 ">
                  <Form.Group as={Col} sm="4">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      โทรศัพท์
                    </Form.Label>
                    <Form.Control
                      disabled
                      placeholder=""
                      value={Work?.contactorsPhoneNumber}
                      maxLength="10"
                    />
                  </Form.Group>
                  <Form.Group as={Col} sm="8">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      E-mail
                    </Form.Label>
                    <Form.Control
                      disabled
                      type="email"
                      placeholder=""
                      value={Work?.contactorsEmail}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-5 ">
                  <Form.Label
                    className="col-form-label-lg"
                    style={{ fontSize: 22, color: "", fontWeight: "bold" }}
                  >
                    <p> การติดต่อสถานประกอบการ เพื่อปฏิบัติงานของนักศึกษา</p>
                  </Form.Label>
                  <Form.Group
                    as={Col}
                    sm="12"
                    className="d-flex justify-content-around"
                  >
                    <Form.Check
                      required
                      value={"3"}
                      inline
                      checked={Work?.contactStatus === "3"}
                      label="มีการติดต่อและได้รับการตอบรับ"
                      type="radio"
                      name="grouped"
                    />
                    <Form.Check
                      required
                      value={"2"}
                      checked={Work?.contactStatus === "2"}
                      inline
                      label="มีการติดต่อและอยู่ระหว่างรอการตอบรับ"
                      type="radio"
                      name="grouped"
                    />
                    <Form.Check
                      required
                      value={"1"}
                      checked={Work?.contactStatus === "1"}
                      inline
                      label="ยังไม่ได้ติดต่อ"
                      type="radio"
                      name="grouped"
                    />
                  </Form.Group>
                </Row>
              </Row>
            </Form>

            {address?.latitude && address?.longtitude ? (
              <div>
                <Form.Label
                  className="col-form-label-lg"
                  style={{ fontSize: 22, color: "", fontWeight: "bold" }}
                >
                  <p> แผนที่ Google Map</p>
                </Form.Label>
                <div>
                  <iframe
                    title="googleMap"
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                    }}
                    src={generateEmbedGoogleMapDirectionURL(
                      nrru?.latitude,
                      nrru?.longtitude,
                      // Work Location
                      address?.latitude,
                      address?.longtitude
                    )}
                    width="600"
                    height="450"
                    allowfullscreen=""
                    loading="lazy"
                    className="mb-3"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            ) : (
              ""
            )}

            <Modal.Footer className="d-flex flex-row justify-content-center">
              <Button
                variant="danger"
                className="btn btn-primary "
                //   onClick={handleClose}
              >
                ไม่อนุมัติ
              </Button>

              <Button variant="success" type="submit">
                อนุมัติ
              </Button>
            </Modal.Footer>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default StudentListTeacherModal;
