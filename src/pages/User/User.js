import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Function that use for Check roles

export default function User() {
  const navigate = useNavigate();

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Container>
        <h3 className="mt-3">ปฏิทิน</h3>
        <Row
          style={{ fontSize: 18, background: "#D5DADC" }}
          className="mb-4 mt-5"
        >
          <h3 className="mt-3">ข่าวสาร</h3>
          <Col style={{ margin: "auto" }}>
            หากมีข้อสงสัย สามารถสอบถามรายละเอียดได้ที่ Line Chatbot
          </Col>
          <Col className="mb-5">
            {
              <img
                style={{ width: 150 }}
                src="/asset/img/lineChatBot.jpg"
                alt="Line@"
              ></img>
            }
          </Col>
        </Row>
        <Row
          style={{ fontSize: 18, background: "#D5DADC" }}
          className="mb-4 mt-2"
        >
          <h3 className="mb-5 mt-2">
            วีดีโออธิบายเกี่ยวกับการทำงานของสหกิจ และ การใช้งาน
          </h3>
          <Col style={{ margin: "auto", textAlign: "end" }}>
            ความเป็นมา และ ที่มาของสหกิจ
          </Col>
          <Col>
            {
              <iframe
                width="450"
                height="250"
                src="https://www.youtube.com/embed/w7x_lWJNnNg"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            }
          </Col>
        </Row>
        <Row
          style={{ fontSize: 18, background: "#D5DADC" }}
          className="mb-4 mt-2"
        >
          <Col style={{ margin: "auto", textAlign: "end" }}>
            ชั้นตอนการปฏิบัติ สหกิจ
          </Col>
          <Col>
            {
              <iframe
                width="450"
                height="250"
                src="https://www.youtube.com/embed/w7x_lWJNnNg"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            }
          </Col>
        </Row>
        <iframe
          src="/pdf/test.pdf"
          width="450"
          height="250"
          title="pdf"
        ></iframe>

        {/* <img src="/pdf/HOHO.jpg" alt="image" /> */}
      </Container>
    </div>
  );
}
