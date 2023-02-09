import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select, { createFilter } from "react-select";
import { MenuList } from "./Helper";

function Subregform3({
  work,
  setWork,
  workplace,
  finalWorkplace,
  setFinalWorkplace,
}) {
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

  console.log(workplace);
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
          <Form.Label>ชื่อตำแหน่งที่เข้าฝึกงาน</Form.Label>
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
          <Form.Label>รายละเอียดลักษณะงาน</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="ถ่ายเอกสาร ถูพื้น ล้างจาน ตัดต่อวีดีโอ ตัดย่า"
            value={work.jobDetail}
            onChange={(event) =>
              setWork({ ...work, jobDescription: event.target.value })
            }
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 mt-4 ">
        <Form.Group as={Col} sm="12">
          <Form.Label>สวัสดิการจากสถานประกอบการที่ได้รับ (ถ้ามี)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="เงิน ประกัน เบิกค่ารถ "
            value={work.benefit}
            onChange={(event) =>
              setWork({ ...work, welfare: event.target.value })
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
          <Form.Label>ชื่อหัวหน้าหน่วยงาน</Form.Label>
          <Form.Control
            placeholder=""
            value={work.bossFirstname}
            onChange={(event) =>
              setWork({ ...work, bossFirstname: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label>นามสกุล</Form.Label>
          <Form.Control
            placeholder=""
            value={work.bossLastname}
            onChange={(event) =>
              setWork({ ...work, bossLastname: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group as={Col} sm="4">
          <Form.Label>ตำแหน่ง</Form.Label>
          <Form.Control
            placeholder=""
            value={work.bossPosition}
            onChange={(event) =>
              setWork({ ...work, bossPosition: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group as={Col} sm="2">
          <Form.Label>แผนก/ฝ่าย</Form.Label>
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
        <Form.Group as={Col} sm="8">
          <Form.Label>ค้นหาหน่วยงาน</Form.Label>
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
          <Form.Label>ชื่อหน่วยงาน</Form.Label>
          <Form.Control
            placeholder=""
            value={finalWorkplace.companyName}
            disabled
          />
        </Form.Group>
        <Form.Group as={Col} sm="4">
          <Form.Label>บ้านเลขที่</Form.Label>
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
          <Form.Label>ตำบล</Form.Label>
          <Form.Control type="text" disabled value={finalWorkplace.district} />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label>อำเภอ</Form.Label>
          <Form.Control type="text" disabled value={finalWorkplace.amphoe} />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label>จังหวัด</Form.Label>
          <Form.Control type="text" disabled value={finalWorkplace.province} />
        </Form.Group>
      </Row>
    </div>
  );
}

export default Subregform3;
