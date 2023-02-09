import axios from "axios";
import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Select, { createFilter } from "react-select";
import { FixedSizeList as List } from "react-window";
import { MenuList } from "./Helper";

function Autocomp({
  formData,
  setFormData,
  sethouseregis,
  houseregis,
  setBirthData,
  birthData,
  father,
  mother,
}) {
  const [address, setAddress] = useState([]);
  // const getAddress = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://gist.githubusercontent.com/ChaiyachetU/a72a3af3c6561b97883d7af935188c6b/raw/0e9389fa1fc06b532f9081793b3e36db31a1e1c6/thailand.json"
  //     );
  //     setAddress(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchAPI = () => {
    fetch(
      "https://gist.githubusercontent.com/ChaiyachetU/a72a3af3c6561b97883d7af935188c6b/raw/0e9389fa1fc06b532f9081793b3e36db31a1e1c6/thailand.json"
    )
      .then((response) => response.json())
      .then((result) => {
        setAddress(result);
      });
  };

  // console.log(address[0].district)
  // var a = address.length
  // console.log(a)

  useEffect(() => {
    // getAddress();
    fetchAPI();
  }, []);

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]

  const onChangedistrict = (district) => {
    // setamphoe(address[district.value].amphoe)
    // setprovince(address[district.value].province)
    // setzipcode(address[district.value].zipcode)
    // setDistrict(address[district.value].district)
    sethouseregis({
      ...houseregis,
      distri: address[district.value].district,
      amphoe: address[district.value].amphoe,
      province: address[district.value].province,
      zipcode: address[district.value].zipcode,
    });
  };

  const options = [];
  for (var i = 0; i < address.length; i++) {
    var obj = {};
    obj["value"] = i;
    obj["label"] =
      address[i].district +
      " >> " +
      address[i].amphoe +
      " >> " +
      address[i].province;
    options.push(obj);
  }

  return (
    <div>
      <Row className="mb-3 mt-5">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            ชื่อจริง
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="ชื่อจริง"
            value={formData.firstname}
            onChange={(event) =>
              setFormData({ ...formData, firstname: event.target.value })
            }
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            นามสกุล
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="นามสกุล"
            disabled
            value={formData.lastname}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            เลขประจำตัวนักศึกษา
          </Form.Label>
          <Form.Control
            type="text"
            disabled
            placeholder="6240207512"
            value={formData.stuNo}
            onChange={(event) => {
              setFormData({ ...formData, stuNo: event.target.value });
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            สาขาวิชา
          </Form.Label>
          <Form.Control
            type="text"
            disabled
            placeholder="วิทยาการคอมพิวเตอร์"
            value={formData.branch}
            onChange={(event) =>
              setFormData({ ...formData, branch: event.target.value })
            }
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            คณะ
          </Form.Label>
          <Form.Control
            type="text"
            disabled
            placeholder="วิทยาศาสตร์"
            value={formData.faculty}
            onChange={(event) =>
              setFormData({ ...formData, faculty: event.target.value })
            }
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            เกรดเฉลี่ยสะสม
          </Form.Label>
          <Form.Control
            type="text"
            disabled
            placeholder="4.00"
            value={formData.gpa}
            onChange={(event) =>
              setFormData({ ...formData, gpa: event.target.value })
            }
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            เบอร์โทรศัพท์
          </Form.Label>
          <Form.Control
            type="tel"
            maxLength="10"
            value={formData.phoneNumber}
            onChange={(event) =>
              setFormData({ ...formData, phoneNumber: event.target.value })
            }
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            E-mail
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="@nrru.ac.th"
            value={formData.email}
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            }
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} sm="6" controlId="formGridPassword">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            อาจารย์ที่ปรึกษา
          </Form.Label>
          <Form.Control type="text" disabled placeholder="ชื่ออาจารย์" />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            สถานที่เกิด
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="โรงพยาบาล"
            disabled
            value={birthData?.placeOfBirth}
            onChange={(event) => {
              setFormData({ ...birthData, placeOfBirth: event.target.value });
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            วันที่เกิด
          </Form.Label>
          <Form.Control
            type="date"
            value={birthData?.birthDay}
            onChange={(event) => {
              setBirthData({ ...birthData, birthDay: event.target.value });
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            อายุ
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="21"
            value={birthData?.age}
            onChange={(event) => {
              setBirthData({ ...birthData, age: event.target.value });
            }}
          />
        </Form.Group>
        <Form.Group as={Col} sm="1" controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            กรุ๊ปเลือด
          </Form.Label>
          <Form.Select
            value={birthData?.bloodTypes}
            onChange={(event) => {
              setBirthData({ ...birthData, bloodTypes: event.target.value });
            }}
          >
            <option value="O">O</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            ส่วนสูง
          </Form.Label>

          <InputGroup className="mb-2">
            <Form.Control
              type="text"
              placeholder="ซม."
              value={birthData?.height}
              onChange={(event) => {
                setBirthData({ ...birthData, height: event.target.value });
              }}
            />

            <InputGroup.Text>ซม.</InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            น้ำหนัก
          </Form.Label>
          <InputGroup className="mb-2">
            <Form.Control
              type="text"
              placeholder="กก."
              value={birthData?.weight}
              onChange={(event) => {
                setBirthData({ ...birthData, weight: event.target.value });
              }}
            />
            <InputGroup.Text>กก.</InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            เชื้อชาติ
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="ไทย"
            disabled
            value={birthData?.ethnicity}
            onChange={(event) => {
              setBirthData({ ...birthData, ethnicity: event.target.value });
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            สัญชาติ
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="ไทย"
            disabled
            value={birthData?.nationality}
            onChange={(event) => {
              setBirthData({ ...birthData, nationality: event.target.value });
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            ศาสนา
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="พุธ"
            disabled
            value={birthData?.religion}
            onChange={(event) => {
              setBirthData({ ...birthData, religion: event.target.value });
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} sm="3" controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            เลขที่บัตรประชาชน
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="1301546744602"
            disabled
            value={formData.idCardNumber}
            onChange={(event) => {
              setFormData({ ...formData, idCardNumber: event.target.value });
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 ">
        <Form.Group as={Col} sm="4" controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            ชื่อบิดา
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="ชื่อจริง"
            value={father.firstname}
            onChange={(event) =>
              setFormData({ ...father, firstname: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group as={Col} sm="4" controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            นามสกุล
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="นามสกุล"
            value={father.firstname}
            onChange={(event) =>
              setFormData({ ...father, firstname: event.target.value })
            }
          />
        </Form.Group>

        <Form.Group as={Col} sm="2" controlId="formGridPassword">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            อาชีพ
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="เกษตกร"
            value={father.job}
            onChange={(event) =>
              setFormData({ ...father, job: event.target.value })
            }
          />
        </Form.Group>
      </Row>
      <Row className="mb-3 ">
        <Form.Group as={Col} sm="4" controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            ชื่อมารดา
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="ชื่อจริง"
            value={mother?.firstname}
            onChange={(event) =>
              setFormData({ ...mother, firstname: event.target.value })
            }
          />
        </Form.Group>
        <Form.Group as={Col} sm="4" controlId="formGridEmail">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            นามสกุล
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="นามสกุล"
            value={mother.lastname}
            onChange={(event) =>
              setFormData({ ...mother, lastname: event.target.value })
            }
          />
        </Form.Group>

        <Form.Group as={Col} sm="2" controlId="formGridPassword">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            อาชีพ
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="เกษตกร"
            value={mother.job}
            onChange={(event) =>
              setFormData({ ...mother, job: event.target.value })
            }
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 ">
        <Form.Label
          className="mt-4 mb-3"
          style={{ fontSize: 22, color: "", fontWeight: "bold" }}
        >
          ที่อยู่ตามทะเบียนบ้าน
        </Form.Label>
        <Form.Group as={Col} sm="3">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            ตำบล
          </Form.Label>
          <Form.Control type="text" disabled />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            อำเภอ
          </Form.Label>
          <Form.Control type="text" disabled />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            จังหวัด
          </Form.Label>
          <Form.Control type="text" disabled />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            รหัสไปรษณีย์
          </Form.Label>
          <Form.Control type="text" disabled />
        </Form.Group>
      </Row>
      <Row className="mb-3 ">
        <Form.Group as={Col} sm="8">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            บ้านเลขที่
          </Form.Label>
          <Form.Control type="text" disabled />
        </Form.Group>
      </Row>

      <Row className="mb-3 mt-5 ">
        <Form.Label
          className="col-form-label-lg"
          style={{ fontSize: 22, color: "", fontWeight: "bold" }}
        >
          ที่อยู่ที่ติดต่อได้สะดวก
        </Form.Label>
        <Row className=" ">
          <Form.Group
            as={Col}
            className="mb-3"
            sm="4"
            controlId="formGridPassword"
          >
            <Form.Label className="mt-2">โปรดเลือกตำบล</Form.Label>
            <Select
              filterOption={createFilter({ ignoreAccents: false })}
              components={{ MenuList }}
              options={options}
              value={options.value}
              placeholder="กรอกชื่อตำบล"
              onChange={(e) => onChangedistrict(e)}
            />
          </Form.Group>
        </Row>
        <Form.Group as={Col} sm="3">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            ตำบล
          </Form.Label>
          <Form.Control type="search" disabled value={houseregis.distri} />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            อำเภอ
          </Form.Label>
          <Form.Control type="search" disabled value={houseregis.amphoe} />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            จังหวัด
          </Form.Label>
          <Form.Control type="search" disabled value={houseregis.province} />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            รหัสไปรษณีย์
          </Form.Label>
          <Form.Control type="search" disabled value={houseregis.zipcode} />
        </Form.Group>
      </Row>

      <Row className="mb-3 ">
        <Form.Group as={Col} sm="8">
          <Form.Label
            style={{ fontSize: 20, color: "" }}
            className="d-flex flex-row"
          >
            บ้านเลขที่
          </Form.Label>
          <Form.Control type="text" placeholder="5/1 หมู่ 2 ถนน" />
        </Form.Group>
      </Row>
    </div>
  );
}
export default Autocomp;
