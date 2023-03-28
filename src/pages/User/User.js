import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import { Form } from "react-bootstrap";
import { createFilter } from "react-select";
import { MenuList } from "./Helper";
import ReactLoading from "react-loading";
import {
  getAllWorkplaceWithStatus,
  getStudentInThatWorkplace,
} from "../../apis/workplaceApi";
import { Accodian } from "./component/Accordian";

// Function that use for Check roles

export default function User() {
  const [workplace, setWorkplace] = useState({
    companyName: undefined || "",
    amphoe: undefined || "",
    district: undefined || "",
    houseNumber: undefined || "",
    province: undefined || "",
    zipCode: undefined || "",
  });
  const [student, setStudent] = useState([]);
  const [studentIsLoading, setStudentIsLoading] = useState(false);

  useEffect(() => {
    getAllWorkplaceWithStatus().then((res) => {
      setWorkplace(res?.data);
    });
  }, []);

  const options = [];
  for (var i = 0; i < workplace.length; i++) {
    var obj = {};
    obj["value"] = i;
    obj["label"] =
      workplace[i].companyName +
      " >> " +
      workplace[i].province +
      " >> " +
      workplace[i].amphoe +
      " >> " +
      workplace[i].district;
    options.push(obj);
  }

  const handleChooseWorkplace = (id) => {
    setStudentIsLoading(true);
    getStudentInThatWorkplace(id).then((res) => {
      setStudent(res?.data);
      setStudentIsLoading(false);
    });
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>

      <Container>
        <Row className="mb-3 mt-5 d-flex justify-content-center ">
          <Form.Group as={Col} sm="12">
            <Form.Label
              style={{ fontSize: 20, color: "" }}
              className="d-flex flex-row"
            >
              ค้นหาสถานประกอบการ
            </Form.Label>
            <Select
              filterOption={createFilter({ ignoreAccents: false })}
              options={options}
              value={options?.value}
              onChange={(e) => handleChooseWorkplace(workplace[e?.value].id)}
              components={{ MenuList }}
              placeholder="กรอกชื่อหน่วยงาน"
            />
          </Form.Group>
          <Form.Group
            as={Col}
            sm="12"
            style={{ backgroundColor: "#D5DADC", borderRadius: "2vh" }}
          >
            {studentIsLoading ? (
              <ReactLoading
                type={"spin"}
                color={"green"}
                height={"3vh"}
                width={"100%"}
                className="d-flex flex-row justify-content-center "
              />
            ) : student?.length > 0 ? (
              student.map((val, index) => {
                return (
                  <div className="mt-2 mb-1" key={index}>
                    {/* {val?.firstname} {val?.lastname} */}
                    <Accodian index={index} student={val} />
                  </div>
                );
              })
            ) : (
              <div className="mt-2 mb-1">นักศึกษาที่เคยไปฝึกงาน</div>
            )}
            {/*           
            <div className="mt-2 mb-1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis
              sint hic vitae porro sapiente minus et doloribus assumenda, non
              nemo vero molestiae similique quibusdam saepe, quae expedita iste
              aliquid odit!
            </div>
            <div className="mt-2 mb-1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis
              sint hic vitae porro sapiente minus et doloribus assumenda, non
              nemo vero molestiae similique quibusdam saepe, quae expedita iste
              aliquid odit!
            </div> */}
          </Form.Group>
        </Row>
        {/* <h3 className="mt-3">ปฏิทิน</h3> */}
        <Row
          style={{ fontSize: 18, background: "#D5DADC", borderRadius: "2vh" }}
          // className="mb-4 mt-5"
        >
          <h3 className="mt-3">Line Chatbot</h3>
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
          style={{ fontSize: 18, background: "#D5DADC", borderRadius: "2vh" }}
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
          style={{ fontSize: 18, background: "#D5DADC", borderRadius: "2vh" }}
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
