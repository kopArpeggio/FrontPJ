import axios from "axios";
import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Select from "react-select";

function Autocomp({ user, formData, setFormData, sethouseregis, houseregis }) {
  const [address, setAddress] = useState([]);

  const getAddress = async () => {
    try {
      const response = await axios.get(
        "https://gist.githubusercontent.com/ChaiyachetU/a72a3af3c6561b97883d7af935188c6b/raw/0e9389fa1fc06b532f9081793b3e36db31a1e1c6/thailand.json"
      );
      setAddress(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    getAddress();
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
          <Form.Label>ชื่อจริง</Form.Label>
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
          <Form.Label>นามสกุล</Form.Label>
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
          <Form.Label>เลขประจำตัวนักศึกษา</Form.Label>
          <Form.Control type="text" disabled placeholder="6240207512" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>สาขาวิชา</Form.Label>
          <Form.Control
            type="text"
            disabled
            placeholder="วิทยาการคอมพิวเตอร์"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>คณะ</Form.Label>
          <Form.Control type="text" disabled placeholder="วิทยาศาสตร์" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>เกรดเฉลี่ยสะสม</Form.Label>
          <Form.Control type="text" disabled placeholder="4.00" />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>เบอร์โทรศัพท์</Form.Label>
          <Form.Control
            type="tel"
            maxLength="10"
            value={formData.phoneNum}
            onChange={(event) =>
              setFormData({ ...formData, phoneNum: event.target.value })
            }
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>E-mail</Form.Label>
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
          <Form.Label>อาจารย์ที่ปรึกษา</Form.Label>
          <Form.Control type="text" disabled placeholder="ชื่ออาจารย์" />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>สถานที่เกิด</Form.Label>
          <Form.Control type="text" placeholder="โรงพยาบาล" disabled />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>วันที่เกิด</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>อายุ</Form.Label>
          <Form.Control type="text" placeholder="21" />
        </Form.Group>
        <Form.Group as={Col} sm="1" controlId="formGridEmail">
          <Form.Label>กรุ๊ปเลือด</Form.Label>
          <Form.Select>
            <option value="O">O</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>ส่วนสูง</Form.Label>
          <Form.Control
            type="text"
            placeholder="ซม."
            value={formData.height}
            onChange={(event) =>
              setFormData({ ...formData, height: event.target.value })
            }
          />
          <InputGroup.Text>ซม.</InputGroup.Text>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>น้ำหนัก</Form.Label>
          <Form.Control
            type="text"
            placeholder="กก."
            value={formData.weight}
            onChange={(event) =>
              setFormData({ ...formData, weight: event.target.value })
            }
          />
          <InputGroup.Text>กก.</InputGroup.Text>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>เชื้อชาติ</Form.Label>
          <Form.Control type="text" placeholder="ไทย" disabled />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>สัญชาติ</Form.Label>
          <Form.Control type="text" placeholder="ไทย" disabled />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>ศาสนา</Form.Label>
          <Form.Control type="text" placeholder="พุธ" disabled />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} sm="3" controlId="formGridEmail">
          <Form.Label>เลขที่บัตรประชาชน</Form.Label>
          <Form.Control type="text" placeholder="1309801388086" disabled />
        </Form.Group>
      </Row>

      <Row className="mb-3 ">
        <Form.Group as={Col} sm="5" controlId="formGridEmail">
          <Form.Label>ชื่อ - สกุลบิดา</Form.Label>
          <Form.Control
            type="text"
            placeholder="ชื่อจริง"
            value={formData.fathername}
            onChange={(event) =>
              setFormData({ ...formData, fathername: event.target.value })
            }
          />
        </Form.Group>

        <Form.Group as={Col} sm="2" controlId="formGridPassword">
          <Form.Label>อาชีพ</Form.Label>
          <Form.Control
            type="text"
            placeholder="เกษตกร"
            value={formData.fatherjob}
            onChange={(event) =>
              setFormData({ ...formData, fatherjob: event.target.value })
            }
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 ">
        <Form.Group as={Col} sm="5" controlId="formGridEmail">
          <Form.Label>ชื่อ - สกุลมารดา</Form.Label>
          <Form.Control
            type="text"
            placeholder="ชื่อจริง"
            value={formData.mothername}
            onChange={(event) =>
              setFormData({ ...formData, mothername: event.target.value })
            }
          />
        </Form.Group>

        <Form.Group as={Col} sm="2" controlId="formGridPassword">
          <Form.Label>อาชีพ</Form.Label>
          <Form.Control
            type="search"
            placeholder="ข้าราชการครู"
            value={formData.motherjob}
            onChange={(event) =>
              setFormData({ ...formData, motherjob: event.target.value })
            }
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 ">
        <Form.Label className="mt-2">ที่อยู่ตามทะเบียนบ้าน</Form.Label>
        <Form.Group as={Col} sm="3">
          <Form.Label>ตำบล</Form.Label>
          <Form.Control type="text" disabled />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label>อำเภอ</Form.Label>
          <Form.Control type="text" disabled />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label>จังหวัด</Form.Label>
          <Form.Control type="text" disabled />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label>รหัสไปรษณีย์</Form.Label>
          <Form.Control type="text" disabled />
        </Form.Group>
      </Row>
      <Row className="mb-3 ">
        <Form.Group as={Col} sm="8">
          <Form.Label>บ้านเลขที่</Form.Label>
          <Form.Control type="text" disabled />
        </Form.Group>
      </Row>

      <Row className="mb-3 mt-5 ">
        <Form.Label className="col-form-label-lg">
          ที่อยู่ที่ติดต่อได้สะดวก
        </Form.Label>
        <Row className=" ">
          <Form.Group
            as={Col}
            className="mb-3"
            sm="4"
            controlId="formGridPassword"
          >
            {/* <Form.Label>อาชีพ</Form.Label>
      <Form.Select aria-label="Default select example">
        {address.map((item, index) =>
          <option key={index}> {item.district} </option>
        )}
      </Form.Select> */}
            <Form.Label className="mt-2">โปลดเลือกตำบล</Form.Label>
            <Select
              options={options}
              value={options.value}
              placeholder="กรอกชื่อตำบล"
              onChange={(e) => onChangedistrict(e)}
            />
          </Form.Group>
        </Row>
        <Form.Group as={Col} sm="3">
          <Form.Label>ตำบล</Form.Label>
          <Form.Control type="search" disabled value={houseregis.distri} />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label>อำเภอ</Form.Label>
          <Form.Control type="search" disabled value={houseregis.amphoe} />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label>จังหวัด</Form.Label>
          <Form.Control type="search" disabled value={houseregis.province} />
        </Form.Group>
        <Form.Group as={Col} sm="3">
          <Form.Label>รหัสไปรษณีย์</Form.Label>
          <Form.Control type="search" disabled value={houseregis.zipcode} />
        </Form.Group>
      </Row>

      <Row className="mb-3 ">
        <Form.Group as={Col} sm="8">
          <Form.Label>บ้านเลขที่</Form.Label>
          <Form.Control type="text" placeholder="5/1 หมู่ 2 ถนน" />
        </Form.Group>
      </Row>
    </div>
  );
}
export default Autocomp;
