import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { getImageUrl } from "../../../utils/utils";

export const Accodian = ({ student, index }) => {
  console.log(student);
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey={index}>
        <Accordion.Header className="accordion-header">
          <Row className="d-flex flex-row flex-lg-row">
            <Col className="d-flex align-items-center">
              <Image
                width={"26px"}
                height={"26px"}
                roundedCircle
                src={
                  student?.profilePic
                    ? getImageUrl(student?.profilePic)
                    : "/asset/img/noAvatar.jpg"
                }
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                }}
                className="mb-2 "
              />
            </Col>
            <Col sm={9}>
              <div style={{ whiteSpace: "nowrap" }}>
                ขื่อ : {student?.firstname} {student?.lastname}
              </div>
              <div className="mt-1">ปีการศึกษา : {student?.year}</div>
            </Col>
          </Row>
        </Accordion.Header>
        <Accordion.Body>
          <Row className="d-flex flex-row flex-lg-row">
            <Col sm={6}>ตำแหน่ง : {student?.jobTitle}</Col>
            <Col sm={6}>รายละเอียดงาน : {student?.jobDetail}</Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
