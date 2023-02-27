import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Select, { createFilter } from "react-select";
import { getAllWorkplace } from "../../apis/workplaceApi";
import { MenuList } from "../../utils/utils";

function Jobdescription() {
  const [work, setWork] = useState({
    jobTitle: undefined || "",
    jobDetail: undefined || "",
    benefit: undefined || "",
    bossFirstname: undefined || "",
    bossLastname: undefined || "",
    bossPosition: undefined || "",
    phoneNumber: undefined || "",
    email: undefined || "",
    advisorFirstname: undefined || "",
    advisorLastname: undefined || "",
    advisorDepartment: undefined || "",
    advisorPhoneNumber: undefined || "",
    advisorEmail: undefined || "",
    contactStatus: undefined || "",
    workingStatus: undefined || "",
    workplaceId: undefined || "",
    startAt: undefined || "",
    bossDepartment: undefined || "",
  });

  const [workplace, setWorkplace] = useState({
    companyName: undefined || "",
    amphoe: undefined || "",
    district: undefined || "",
    houseNumber: undefined || "",
    province: undefined || "",
    zipCode: undefined || "",
  });

  const [finalWorkplace, setFinalWorkplace] = useState({
    companyName: undefined || "",
    district: undefined || "",
    amphoe: undefined || "",
    province: undefined || "",
    houseNumber: undefined || "",
    googleMapUrl: undefined || "",
  });

  const onChangedistrict = (value) => {
    setFinalWorkplace({
      ...finalWorkplace,
      companyName: workplace[value.value].companyName,
      district: workplace[value.value].district,
      amphoe: workplace[value.value].amphoe,
      province: workplace[value.value].province,
      houseNumber: workplace[value.value].houseNumber,
    });
  };

  useEffect(() => {
    getAllWorkplace().then((res) => {
      setWorkplace(res.data);
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

  console.log(options);

  return (
    <div>
      <Row className="mb-3 mt-5 ">
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
            type="text"
            placeholder="Programmer"
            value={work.jobTitle}
            onChange={(event) =>
              setWork({ ...work, jobTitle: event.target.value })
            }
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
            as="textarea"
            rows={3}
            placeholder="ถ่ายเอกสาร ถูพื้น ล้างจาน ตัดต่อวีดีโอ ตัดย่า"
            value={work.jobDetail}
            onChange={(event) =>
              setWork({ ...work, jobDetail: event.target.value })
            }
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
            as="textarea"
            rows={3}
            placeholder="เงิน ประกัน เบิกค่ารถ "
            value={work.benefit}
            onChange={(event) =>
              setWork({ ...work, benefit: event.target.value })
            }
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
            placeholder=""
            value={work.bossFirstname}
            onChange={(event) =>
              setWork({ ...work, bossFirstname: event.target.value })
            }
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
            placeholder=""
            value={work.bossLastname}
            onChange={(event) =>
              setWork({ ...work, bossLastname: event.target.value })
            }
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
            placeholder=""
            value={work.bossPosition}
            onChange={(event) =>
              setWork({ ...work, bossPosition: event.target.value })
            }
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
            placeholder=""
            value={work.bossDepartment}
            onChange={(event) =>
              setWork({ ...work, bossDepartment: event.target.value })
            }
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 mt-5 ">
        <Form.Group as={Col} sm="12">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            Url Google Map
          </Form.Label>
          <Form.Control
            as="textarea"
            placeholder=""
            value={finalWorkplace?.googleMapUrl}
            onChange={(event) =>
              setFinalWorkplace({
                ...finalWorkplace,
                googleMapUrl: event.target.value,
              })
            }
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 mt-5 ">
        <Form.Group as={Col} sm="8">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            ค้นหาหน่วยงาน
          </Form.Label>
          <Select
            filterOption={createFilter({ ignoreAccents: false })}
            options={options}
            value={options.value}
            onChange={(e) => onChangedistrict(e)}
            components={{ MenuList }}
            placeholder="กรอกชื่อหน่วยงาน"
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
            placeholder=""
            value={finalWorkplace.companyName}
            disabled
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
            placeholder=""
            value={finalWorkplace.houseNumber}
            disabled
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
          <Form.Control type="text" disabled value={finalWorkplace.district} />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            อำเภอ
          </Form.Label>
          <Form.Control type="text" disabled value={finalWorkplace.amphoe} />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            จังหวัด
          </Form.Label>
          <Form.Control type="text" disabled value={finalWorkplace.province} />
        </Form.Group>
      </Row>
    </div>
  );
}

export default Jobdescription;
