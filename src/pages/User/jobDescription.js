import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select, { createFilter } from "react-select";
import { getData } from "../../apis/rootApi";
import { updateStudentById } from "../../apis/studentApi";
import ReactLoading from "react-loading";

import {
  getAllWorkplaceWithStatus,
  getWorkplaceById,
} from "../../apis/workplaceApi";
import { MenuList } from "../../utils/utils";
import Swal from "sweetalert2";

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
    contactorsFirstname: undefined || "",
    contactorsLastname: undefined || "",
    contactorsPosition: undefined || "",
    contactorsDepartment: undefined || "",
    contactorsPhoneNumber: undefined || "",
    contactorsEmail: undefined || "",
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
    zipCode: undefined || "",
    googleMapUrl: undefined || "",
    latitude: undefined || "",
    longtitude: undefined || "",
  });

  const [validated, setValidated] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [stu, setStu] = useState({});

  const onChangedistrict = (value) => {
    setFinalWorkplace({
      ...finalWorkplace,

      id: workplace[value.value].id,
      companyName: workplace[value.value].companyName,
      district: workplace[value.value].district,
      amphoe: workplace[value.value].amphoe,
      province: workplace[value.value].province,
      houseNumber: workplace[value.value].houseNumber,
      zipCode: workplace[value.value].zipCode,
      latitude: workplace[value.value].latitude,
      longtitude: workplace[value.value].longtitude,
    });
  };

  useEffect(() => {
    setIsLoading(false);
    getAllWorkplaceWithStatus().then((res) => {
      setWorkplace(res.data);
    });
    getData().then((res) => {
      setWork(res?.data?.student?.Work);
      setStu(res?.data?.student);
      // get workplace
      getWorkplaceById(res?.data?.student?.Work?.Workplace?.id).then(
        (workplace) => {
          setFinalWorkplace(workplace?.data);
          setIsLoading(true);
        }
      );
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

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      Swal.fire({
        icon: "warning",
        title: "บันทึกหรือไม่ ?",
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then((result) => {
        if (result?.isConfirmed) {
          const finalAddress = finalWorkplace;
          updateStudentById({ stu, finalAddress, work });
          Swal.fire("Saved!", "", "success");
        }
      });
    }
    setValidated(true);
  };

  return (
    <div>
      {isLoading ? (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3 mt-5 d-flex flex-xl-row">
            <Form.Label
              className="col-form-label-lg"
              style={{ fontSize: 22, color: "", fontWeight: "bold" }}
            >
              รายละเอียดงานที่ไปปฎิบัติ
            </Form.Label>
            <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
              <Form.Group as={Col} sm="8">
                <Form.Label
                  style={{ fontSize: 20, color: "" }}
                  className="d-flex flex-row"
                >
                  ตำแหน่งงาน
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Programmer"
                  value={work?.jobTitle}
                  onChange={(event) =>
                    setWork({ ...work, jobTitle: event.target.value })
                  }
                />
              </Form.Group>
            </Row>
          </Row>

          <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
            <Form.Group as={Col} sm="8">
              <Form.Label
                style={{ fontSize: 20, color: "" }}
                className="d-flex flex-row"
              >
                รายละเอียดลักษณะงาน
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="ถ่ายเอกสาร ถูพื้น ล้างจาน ตัดต่อวีดีโอ ตัดย่า"
                value={work?.jobDetail}
                onChange={(event) =>
                  setWork({ ...work, jobDetail: event.target.value })
                }
              />
            </Form.Group>

          </Row>

          <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
            <Form.Group as={Col} sm="8">
              <Form.Label
                style={{ fontSize: 20, color: "" }}
                className="d-flex flex-row"
              >
                สวัสดิการจากสถานประกอบการที่ได้รับ (ถ้ามี)
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="เงิน ประกัน เบิกค่ารถ "
                value={work?.benefit}
                onChange={(event) =>
                  setWork({ ...work, benefit: event.target.value })
                }
              />
            </Form.Group>
          </Row>


          <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
            <Form.Label
              className="col-form-label-lg"
              style={{ fontSize: 22, color: "", fontWeight: "bold" }}
            >
              สถานประกอบการที่ต้องการไปปฏิบัติสหกิจศึกษา
            </Form.Label>
          
            <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
              <Form.Group as={Col} sm="8">
                <Form.Label
                  style={{ fontSize: 20, color: "" }}
                  className="d-flex flex-row"
                >
                  ชื่อหัวหน้าหน่วยงาน
                </Form.Label>
                <Form.Control
                  required
                  placeholder=""
                  value={work?.bossFirstname}
                  onChange={(event) =>
                    setWork({ ...work, bossFirstname: event.target.value })
                  }
                />
              </Form.Group>

            </Row>

            <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
              <Form.Group as={Col} sm="8">
                <Form.Label
                  style={{ fontSize: 20, color: "" }}
                  className="d-flex flex-row"
                >
                  นามสกุล
                </Form.Label>
                <Form.Control
                  required
                  placeholder=""
                  value={work?.bossLastname}
                  onChange={(event) =>
                    setWork({ ...work, bossLastname: event.target.value })
                  }
                />
              </Form.Group>


            </Row>

            <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
              <Form.Group as={Col} sm="8">
                <Form.Label
                  style={{ fontSize: 20, color: "" }}
                  className="d-flex flex-row"
                >
                  ตำแหน่ง
                </Form.Label>
                <Form.Control
                  required
                  placeholder=""
                  value={work?.bossPosition}
                  onChange={(event) =>
                    setWork({ ...work, bossPosition: event.target.value })
                  }
                />
              </Form.Group>

            </Row>

            <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
              <Form.Group as={Col} sm="8">
                <Form.Label
                  style={{ fontSize: 20, color: "" }}
                  className="d-flex flex-row"
                >
                  แผนก/ฝ่าย
                </Form.Label>
                <Form.Control
                  required
                  placeholder=""
                  value={work?.bossDepartment}
                  onChange={(event) =>
                    setWork({ ...work, bossDepartment: event.target.value })
                  }
                />
              </Form.Group>

            </Row>
            
            
          </Row>

          {/* <Row className="mb-3 mt-5 ">
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
                disabled={finalWorkplace?.latitude && finalWorkplace.longtitude}
                value={finalWorkplace?.googleMapUrl}
                onChange={(event) =>
                  setFinalWorkplace({
                    ...finalWorkplace,
                    googleMapUrl: event.target.value,
                  })
                }
              />
            </Form.Group>
          </Row> */}

          <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
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
                value={options?.value}
                onChange={(e) => onChangedistrict(e)}
                components={{ MenuList }}
                placeholder="กรอกชื่อหน่วยงาน"
              />
            </Form.Group>
          </Row>
          
          <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
            <Form.Group as={Col} sm="8">
              <Form.Label
                style={{ fontSize: 20, color: "" }}
                className="d-flex flex-row"
              >
                ชื่อหน่วยงาน
              </Form.Label>
              <Form.Control
                required
                placeholder=""
                value={finalWorkplace?.companyName}
                disabled
              />
            </Form.Group>

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
                placeholder=""
                value={finalWorkplace?.houseNumber}
                disabled
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
                required
                type="text"
                disabled
                value={finalWorkplace?.district}
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
                required
                type="text"
                disabled
                value={finalWorkplace?.amphoe}
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
                required
                type="text"
                disabled
                value={finalWorkplace?.province}
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
                required
                type="search"
                disabled
                value={finalWorkplace?.zipCode}
              />
            </Form.Group>

          </Row>

          <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
            <Form.Group as={Col} sm="8">
              <Form.Label
                style={{ fontSize: 20, color: "" }}
                className="d-flex flex-row"
              >
                โทรศัพท์
              </Form.Label>
              <Form.Control
                required
                placeholder=""
                value={work?.phoneNumber}
                onChange={(event) =>
                  setWork({
                    ...work,
                    phoneNumber: event.target.value,
                  })
                }
                maxLength="10"
              />
            </Form.Group>

          </Row>
          <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">

            <Form.Group as={Col} sm="8">
              <Form.Label
                style={{ fontSize: 20, color: "" }}
                className="d-flex flex-row"
              >
                E-mail
              </Form.Label>
              <Form.Control
                required
                type="email"
                placeholder=""
                value={work?.email}
                onChange={(event) =>
                  setWork({ ...work, email: event.target.value })
                }
              />
            </Form.Group>
          </Row>


          <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
            <Form.Group as={Col} sm="8">
              <Form.Label
                style={{ fontSize: 20, color: "" }}
                className="d-flex flex-row"
              >
                ชื่อจริง
              </Form.Label>
              <Form.Control
                required
                placeholder=""
                value={work?.contactorsFirstname}
                onChange={(event) =>
                  setWork({
                    ...work,
                    contactorsFirstname: event.target.value,
                  })
                }
              />
            </Form.Group>

          </Row>
          

          <Row className="mb-3 mt-5 ">
           
           
           
            
            <Row className="mb-3 mt-5 ">
              <Form.Label
                className="col-form-label-lg"
                style={{ fontSize: 22, color: "", fontWeight: "bold" }}
              >
                บุลคลในสถานประกอบการที่นักศึกษาติดต่อสำหรับการปฏิบัติงานสหกิจศึกษา
              </Form.Label>


              <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                <Form.Group as={Col} sm="8">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    นามสกุล
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder=""
                    value={work?.contactorsLastname}
                    onChange={(event) =>
                      setWork({ ...work, contactorsLastname: event.target.value })
                    }
                  />
                </Form.Group>

              </Row>

              <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                <Form.Group as={Col} sm="8">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    ตำแหน่ง
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder=""
                    value={work?.contactorsPosition}
                    onChange={(event) =>
                      setWork({ ...work, contactorsPosition: event.target.value })
                    }
                  />
                </Form.Group>

              </Row>
              <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                <Form.Group as={Col} sm="8">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    ตำแหน่ง
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder=""
                    value={work?.contactorsPosition}
                    onChange={(event) =>
                      setWork({ ...work, contactorsPosition: event.target.value })
                    }
                  />
                </Form.Group>

              </Row>

              <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
                <Form.Group as={Col} sm="8">
                  <Form.Label
                    style={{ fontSize: 20, color: "" }}
                    className="d-flex flex-row"
                  >
                    แผนก/ฝ่าย
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder=""
                    value={work?.contactorsDepartment}
                    onChange={(event) =>
                      setWork({
                        ...work,
                        contactorsDepartment: event.target.value,
                      })
                    }
                  />
                </Form.Group>

              </Row>
              
             
              
             
            </Row>
            
            <Row>
              
            </Row>

            <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
              <Form.Group as={Col} sm="8">
                <Form.Label
                  style={{ fontSize: 20, color: "" }}
                  className="d-flex flex-row"
                >
                  โทรศัพท์
                </Form.Label>
                <Form.Control
                  required
                  placeholder=""
                  value={work?.contactorsPhoneNumber}
                  onChange={(event) =>
                    setWork({
                      ...work,
                      contactorsPhoneNumber: event.target.value,
                    })
                  }
                  maxLength="10"
                />
              </Form.Group>
              
            </Row>

            <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
              <Form.Group as={Col} sm="8">
                <Form.Label
                  style={{ fontSize: 20, color: "" }}
                  className="d-flex flex-row"
                >
                  E-mail
                </Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder=""
                  value={work?.contactorsEmail}
                  onChange={(event) =>
                    setWork({ ...work, contactorsEmail: event.target.value })
                  }
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
                  checked={work?.contactStatus === "3"}
                  label="มีการติดต่อและได้รับการตอบรับ"
                  type="radio"
                  name="grouped"
                  onClick={(e) => {
                    setWork({ ...work, contactStatus: e?.target?.value });
                  }}
                />
                <Form.Check
                  required
                  value={"2"}
                  checked={work?.contactStatus === "2"}
                  inline
                  label="มีการติดต่อและอยู่ระหว่างรอการตอบรับ"
                  type="radio"
                  name="grouped"
                  onClick={(e) => {
                    setWork({ ...work, contactStatus: e?.target?.value });
                  }}
                />
                <Form.Check
                  required
                  value={"1"}
                  checked={work?.contactStatus === "1"}
                  inline
                  label="ยังไม่ได้ติดต่อ"
                  type="radio"
                  name="grouped"
                  onClick={(e) => {
                    setWork({ ...work, contactStatus: e?.target?.value });
                  }}
                />
              </Form.Group>
            </Row>
            

            <Row>
              <Form.Group
                className="mb-3 d-flex flex-row"
                controlId="formBasicCheckbox"
              >
                <Form.Check
                  type="checkbox"
                  label={
                    <p>ข้าพเจ้าขอรับรองว่าได้ให้ข้อมูลตามความเป็นจริงทุกประการ</p>
                  }
                  required
                  onChange={(e) => {
                    setIsConfirm(e?.target?.checked);
                    if (stu?.documentStatus === "4") {
                      setStu({ ...stu, documentStatus: "3" });
                    }
                  }}
                />
              </Form.Group>

            </Row>
            
          <Row>
              <Form.Group className="d-flex flex-row justify-content-center">
                <Button
                  as="input"
                  type="submit"
                  value="ยืนยัน"
                  disabled={
                    !isConfirm ||
                    stu?.documentStatus !== "1" ||
                    stu?.documentStatus !== "4"
                  }
                  style={{ width: "20%" }}
                />
              </Form.Group>
            </Row>

          </Row>
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

export default Jobdescription;