import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Select, { createFilter } from "react-select";
import { MenuList } from "./Helper";
import ReactLoading from "react-loading";

import axios from "axios";
import { Accordion, Button, Toast } from "react-bootstrap";
import { updateStudentById } from "../../apis/studentApi";
import { sweetAlertSubmit, sweetAlertSuccess } from "../../swal2/swal2";
import { uploadImageFile } from "../../apis/uploadApi";

function Userinfo() {
  const [address, setAddress] = useState([]);

  const [formData, setFormData] = useState({
    firstname: undefined || "",
    lastname: undefined || "",
    phoneNumber: undefined || "",
    email: undefined || "",
    weight: undefined || "",
    height: undefined || "",
    idCardNumber: undefined || "",
    latitude: undefined || "",
    longtitude: undefined || "",
  });

  const [regPic, setRegPic] = useState("");

  const [newAddress, setNewAddress] = useState({
    district: undefined || "",
    amphoe: undefined || "",
    province: undefined || "",
    zipCode: undefined || "",
    houseNumber: undefined || "",
  });

  const [father, setFather] = useState({
    firstname: undefined || "",
    lastname: undefined || "",
    job: undefined || "",
  });

  const [mother, setMother] = useState({
    firstname: undefined || "",
    lastname: undefined || "",
    job: undefined || "",
  });

  const [birthData, setBirthData] = useState({
    age: undefined || "",
    birthDay: undefined || "",
    bloodTypes: undefined || "",
    ethnicity: undefined || "",
    height: undefined || "",
    weight: undefined || "",
    nationality: undefined || "",
    placeOfBirth: undefined || "",
    religion: undefined || "",
  });

  const [oldAddress, setOldAddress] = useState({
    district: undefined || "",
    amphoe: undefined || "",
    province: undefined || "",
    zipCode: undefined || "",
    houseNumber: undefined || "",
  });

  const [isConfirm, setIsConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAlert, setIsAlert] = useState(true);

  // Manage Address Auto Complete *********************************
  const onChangedistrict = (district) => {
    setNewAddress({
      ...newAddress,
      district: address[district.value].district,
      amphoe: address[district.value].amphoe,
      province: address[district.value].province,
      zipCode: address[district.value].zipcode,
    });
  };
  const onChangedistrictOld = (district) => {
    setOldAddress({
      ...oldAddress,
      district: address[district.value].district,
      amphoe: address[district.value].amphoe,
      province: address[district.value].province,
      zipCode: address[district.value].zipcode,
    });
  };

  const fetchAPI = async () => {
    await fetch(
      "https://gist.githubusercontent.com/ChaiyachetU/a72a3af3c6561b97883d7af935188c6b/raw/0e9389fa1fc06b532f9081793b3e36db31a1e1c6/thailand.json"
    )
      .then((response) => response.json())
      .then((result) => {
        setAddress(result);
      });
  };
  // **************************************************************

  const api = "http://localhost:3001/api/";

  const getUser = async () => {
    try {
      setIsLoading(false);
      await axios.get(`${api}`).then(function (res) {
        if (res.data.data.student) {
          setFormData(res.data.data.student);
          setBirthData(res.data.data.student.Birth);
          setFather(res.data.data.student.Father);
          setMother(res.data.data.student.Mother);
          setOldAddress(res.data.data.student.oldAddress);
          setNewAddress(res?.data?.data?.student?.newAddress);
        }
      });
      setIsLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAPI();
    getUser();
  }, []);

  //Manage Address
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

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setIsAlert(false);
    } else {
      sweetAlertSubmit(event).then(async (result) => {
        if (result.isConfirmed) {
          if (regPic) {
            await uploadImageFile(regPic).then(async (pictureName) => {
              console.log(pictureName);
              setFormData({ ...formData, profileReg: pictureName });
            });
          }
          setIsAlert(true);
          const stu = formData;
          const done = await updateStudentById({
            stu,
            newAddress,
            oldAddress,
            birthData,
            father,
            mother,
          });
          if (done) {
            sweetAlertSuccess();
          }
        }
      });
    }
    setValidated(true);
  };

  return (
    <div>
      {isLoading ? (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h3>ใบสมัครสหกิจ</h3>
          <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
            <Accordion.Item eventKey="0" style={{ marginBottom: "3vh" }}>
              <Accordion.Header>
                <div>ข้อมูลที่ต้องกรอก</div>
                {!isAlert ? (
                  <div className="ms-5" style={{ color: "red" }}>
                    ท่านยังกรอกข้อมูลไม่ครบ
                  </div>
                ) : (
                  ""
                )}
              </Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridPassword">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      เกรดเฉลี่ยสะสม
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="4.00"
                      value={formData?.gpa}
                      onChange={(event) =>
                        setFormData({ ...formData, gpa: event?.target?.value })
                      }
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridEmail">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      เบอร์โทรศัพท์
                    </Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      maxLength={10}
                      value={formData?.phoneNumber}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          phoneNumber: event?.target?.value,
                        })
                      }
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridPassword">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      E-mail
                    </Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="@nrru.ac.th"
                      value={formData?.email}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          email: event?.target?.value,
                        })
                      }
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridEmail">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      ส่วนสูง
                    </Form.Label>

                    <InputGroup className="mb-2">
                      <Form.Control
                        required
                        type="text"
                        placeholder="ซม."
                        className=""
                        value={birthData?.height}
                        onChange={(event) => {
                          setBirthData({
                            ...birthData,
                            height: event?.target?.value,
                          });
                        }}
                      />

                      <InputGroup.Text>ซม.</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridPassword">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      น้ำหนัก
                    </Form.Label>
                    <InputGroup className="mb-2">
                      <Form.Control
                        required
                        type="text"
                        placeholder="กก."
                        value={birthData?.weight}
                        onChange={(event) => {
                          setBirthData({
                            ...birthData,
                            weight: event?.target?.value,
                          });
                        }}
                      />
                      <InputGroup.Text>กก.</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8" controlId="formGridEmail">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      ชื่อบิดา
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="ชื่อจริง"
                      value={father?.firstname}
                      onChange={(event) =>
                        setFather({
                          ...father,
                          firstname: event?.target?.value,
                        })
                      }
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8" controlId="formGridEmail">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      นามสกุล
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="นามสกุล"
                      value={father?.lastname}
                      onChange={(event) =>
                        setFather({ ...father, lastname: event?.target?.value })
                      }
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8" controlId="formGridPassword">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      อาชีพ
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="เกษตกร"
                      value={father?.job}
                      onChange={(event) =>
                        setFather({ ...father, job: event?.target?.value })
                      }
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8" controlId="formGridEmail">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      ชื่อมารดา
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="ชื่อจริง"
                      value={mother?.firstname}
                      onChange={(event) =>
                        setMother({
                          ...mother,
                          firstname: event?.target?.value,
                        })
                      }
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8" controlId="formGridEmail">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      นามสกุล
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="นามสกุล"
                      value={mother?.lastname}
                      onChange={(event) =>
                        setMother({ ...mother, lastname: event?.target?.value })
                      }
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8" controlId="formGridPassword">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      อาชีพ
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="เกษตกร"
                      value={mother?.job}
                      onChange={(event) =>
                        setMother({ ...mother, job: event?.target?.value })
                      }
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3 ">
                  <Form.Label
                    className="mt-4 mb-3"
                    style={{ fontSize: 22, color: "", fontWeight: "bold" }}
                  >
                    ผู้รับผลประโยชน์
                  </Form.Label>
                </Row>

                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8" controlId="formGridEmail">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      ชื่อจริง
                    </Form.Label>
                    <Form.Control
                      required
                      value={formData?.beneficiaryFirstname}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          beneficiaryFirstname: e?.target?.value,
                        });
                      }}
                      type="text"
                      placeholder="ชื่อจริง"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8" controlId="formGridEmail">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      นามสกุล
                    </Form.Label>
                    <Form.Control
                      value={formData?.beneficiaryLastname}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          beneficiaryLastname: e?.target?.value,
                        });
                      }}
                      required
                      type="text"
                      placeholder="นามสกุล"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8" controlId="formGridEmail">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      เกี่ยวข้องเป็น
                    </Form.Label>
                    <Form.Control
                      value={formData?.beneficiaryRelevant}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          beneficiaryRelevant: e?.target?.value,
                        });
                      }}
                      required
                      type="text"
                      placeholder="นามสกุล"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8" controlId="formGridEmail">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      เบอร์โทรศัพท์
                    </Form.Label>
                    <Form.Control
                      value={formData?.beneficiaryPhoneNumber}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          beneficiaryPhoneNumber: e?.target?.value,
                        });
                      }}
                      required
                      type="text"
                      placeholder="09XXXXXXXX"
                      maxLength={10}
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
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      บ้านเลขที่
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={oldAddress?.houseNumber}
                      required
                      onChange={(e) => {
                        setOldAddress({
                          ...oldAddress,
                          houseNumber: e?.target?.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group
                    as={Col}
                    className="mb-3"
                    sm="8"
                    controlId="formGridPassword"
                  >
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      โปรดเลือกตำบล
                    </Form.Label>
                    <Select
                      filterOption={createFilter({ ignoreAccents: false })}
                      components={{ MenuList }}
                      options={options}
                      value={options.value}
                      placeholder="กรอกชื่อตำบล"
                      onChange={(e) => onChangedistrictOld(e)}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      ตำบล
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={oldAddress?.district}
                      required
                      disabled
                      onChange={(e) => {
                        setOldAddress({
                          ...oldAddress,
                          district: e?.target?.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      อำเภอ
                    </Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      value={oldAddress?.amphoe}
                      required
                      onChange={(e) => {
                        setOldAddress({
                          ...oldAddress,
                          amphoe: e?.target?.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      จังหวัด
                    </Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      value={oldAddress?.province}
                      required
                      onChange={(e) => {
                        setOldAddress({
                          ...oldAddress,
                          province: e?.target?.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      รหัสไปรษณีย์
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      disabled
                      onChange={(e) => {
                        setOldAddress({
                          ...oldAddress,
                          zipCode: e?.target?.value,
                        });
                      }}
                      value={oldAddress?.zipCode}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Label
                    className="col-form-label-lg"
                    style={{ fontSize: 22, color: "", fontWeight: "bold" }}
                  >
                    ที่อยู่ที่ติดต่อได้สะดวก
                  </Form.Label>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      บ้านเลขที่
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="5/1 หมู่ 2 ถนน"
                      value={newAddress?.houseNumber}
                      onChange={(event) =>
                        setNewAddress({
                          ...newAddress,
                          houseNumber: event?.target?.value,
                        })
                      }
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group
                    as={Col}
                    className="mb-3"
                    sm="8"
                    controlId="formGridPassword"
                  >
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      โปรดเลือกตำบล
                    </Form.Label>
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

                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      ตำบล
                    </Form.Label>
                    <Form.Control
                      type="search"
                      disabled
                      value={newAddress?.district}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      อำเภอ
                    </Form.Label>
                    <Form.Control
                      type="search"
                      disabled
                      value={newAddress?.amphoe}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      จังหวัด
                    </Form.Label>
                    <Form.Control
                      type="search"
                      disabled
                      value={newAddress?.province}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      รหัสไปรษณีย์
                    </Form.Label>
                    <Form.Control
                      type="search"
                      disabled
                      value={newAddress?.zipCode}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      รูปถ่าย 1 นิ้ว
                    </Form.Label>
                    <Form.Control
                      type="file"
                      size="lg"
                      onChange={(e) => {
                        setRegPic(e?.target?.files[0]);
                      }}
                    />
                  </Form.Group>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>ข้อมูลที่ต้องตรวจสอบ</Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridEmail">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      ชื่อจริง
                    </Form.Label>
                    <Form.Control
                      disabled
                      required
                      type="text"
                      placeholder="ชื่อจริง"
                      value={formData?.firstname}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          firstname: event?.target?.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridPassword">
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
                      value={formData?.lastname}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridEmail">
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
                      value={formData?.stuNo}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          stuNo: event?.target?.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridPassword">
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
                      value={formData?.branch}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          branch: event?.target?.value,
                        })
                      }
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridEmail">
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
                      value={formData?.faculty}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          faculty: event?.target?.value,
                        })
                      }
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8" controlId="formGridPassword">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      อาจารย์ที่ปรึกษา
                    </Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      placeholder="ชื่ออาจารย์"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridEmail">
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
                        setFormData({
                          ...birthData,
                          placeOfBirth: event?.target?.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridPassword">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      วันที่เกิด
                    </Form.Label>
                    <Form.Control
                      disabled
                      required
                      type="date"
                      value={birthData?.birthDay}
                      onChange={(event) => {
                        setBirthData({
                          ...birthData,
                          birthDay: event?.target?.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridEmail">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      อายุ
                    </Form.Label>
                    <Form.Control
                      disabled
                      required
                      type="text"
                      placeholder="21"
                      value={birthData?.age}
                      onChange={(event) => {
                        setBirthData({
                          ...birthData,
                          age: event?.target?.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8" controlId="formGridEmail">
                    <Form.Label
                      style={{ fontSize: 20, color: "" }}
                      className="d-flex flex-row"
                    >
                      กลุ๊ปเลือด
                    </Form.Label>
                    <Form.Select
                      disabled
                      required
                      value={birthData?.bloodTypes}
                      onChange={(event) => {
                        setBirthData({
                          ...birthData,
                          bloodTypes: event?.target?.value,
                        });
                      }}
                    >
                      <option value="O">O</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="AB">AB</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridEmail">
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
                        setBirthData({
                          ...birthData,
                          ethnicity: event?.target?.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridEmail">
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
                        setBirthData({
                          ...birthData,
                          nationality: event?.target?.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm={"8"} controlId="formGridEmail">
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
                        setBirthData({
                          ...birthData,
                          religion: event?.target?.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8" controlId="formGridEmail">
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
                      value={formData?.idCardNumber}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          idCardNumber: event?.target?.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
            <Form.Group
              className="mt-4 mb-2 d-flex flex-row justify-content-center"
              controlId="formBasicCheckbox"
            >
              <Form.Check
                type="checkbox"
                label="ข้าพเจ้าขอรับรองว่าได้ให้ข้อมูลตามความเป็นจริงทุกประการ"
                required
                onChange={(e) => {
                  setIsConfirm(e?.target?.checked);
                  if (!formData?.documentStatus) {
                    setFormData({ ...formData, documentStatus: "4" });
                  }
                }}
              />
            </Form.Group>
          </Row>
          <Form.Group className="d-flex flex-row justify-content-center">
            <Button
              as="input"
              type="submit"
              value="ยืนยัน"
              disabled={!isConfirm}
              style={{ width: "20%" }}
            />
          </Form.Group>
        </Form>
      ) : (
        <ReactLoading
          type={"spin"}
          color={"green"}
          height={"10vh"}
          width={"100%"}
          className="d-flex flex-row justify-content-center "
        />
      )}
    </div>
  );
}

export default Userinfo;
