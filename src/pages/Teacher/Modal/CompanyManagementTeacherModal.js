import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Select, { createFilter } from "react-select";
import {
  createWorkplace,
  updateWorkplaceById,
} from "../../../apis/workplaceApi";
import { getCoordinatesFromGoogleMapURL } from "../../../utils/utils";
import { MenuList } from "../../User/Helper";

function CompanyManagementTeacherModal({
  show,
  company,
  setCompany,
  handleClose,
  createMode,
  options,
  address,
}) {
  const [validated, setValidated] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const onChangedistrict = (district) => {
    setCompany({
      ...company,
      district: address[district.value].district,
      amphoe: address[district.value].amphoe,
      province: address[district.value].province,
      zipCode: address[district.value].zipcode,
    });
  };

  const handleSubmit = async (event) => {
    const form = event?.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      if (createMode) {
        await createWorkplace(company);
        handleClose();
      }
      if (!createMode) {
        await updateWorkplaceById(company);
        handleClose();
      }
    }
    setValidated(true);
  };

  return (
    <div>
      {" "}
      <Modal show={show} scrollable onHide={handleClose} className={"modal"}>
        <Modal.Header closeButton>
          {/* Change Title By Modal Mode */}
          <Modal.Title>
            {createMode ? "เพิ่มสถานประกอบการ" : "แก้ไขสถานประกอบการ"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                ชื่อสถานประกอบการ
              </Form.Label>
              <Form.Control
                value={company?.companyName}
                onChange={(event) =>
                  setCompany({
                    ...company,
                    companyName: event?.target?.value,
                  })
                }
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                Username
              </Form.Label>
              <Form.Control
                value={company?.username}
                onChange={(event) =>
                  setCompany({
                    ...company,
                    username: event?.target?.value,
                  })
                }
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel ">
                Password
                {createMode ? (
                  ""
                ) : (
                  <Form.Check
                    className="ms-3"
                    type="checkbox"
                    label={"(แก้ไขรหัสผ่าน)"}
                    onChange={(e) => {
                      setIsConfirm(e?.target?.checked);
                    }}
                  />
                )}
              </Form.Label>
              {createMode ? (
                <Form.Control
                  value={company?.password}
                  onChange={(event) =>
                    setCompany({
                      ...company,
                      password: event?.target?.value,
                    })
                  }
                  type="text"
                  required={createMode}
                />
              ) : (
                <Form.Control
                  value={company?.password}
                  disabled={!isConfirm}
                  onChange={(event) =>
                    setCompany({
                      ...company,
                      password: event?.target?.value,
                    })
                  }
                  type="text"
                  required={createMode}
                />
              )}
            </Form.Group>

            <Form.Group
              as={Col}
              className="mb-3"
              sm="12"
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

            <Row>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                as={Col}
                sm={"6"}
              >
                <Form.Label className="d-flex flex-row modalLabel">
                  ตำบล
                </Form.Label>
                <Form.Control
                  disabled
                  value={company?.district}
                  onChange={(event) =>
                    setCompany({
                      ...company,
                      district: event?.target?.value,
                    })
                  }
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                as={Col}
                sm={"6"}
              >
                <Form.Label className="d-flex flex-row modalLabel">
                  อำเภอ
                </Form.Label>
                <Form.Control
                  disabled
                  value={company?.amphoe}
                  onChange={(event) =>
                    setCompany({
                      ...company,
                      amphoe: event?.target?.value,
                    })
                  }
                  type="text"
                  required
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                as={Col}
                sm={"6"}
              >
                <Form.Label className="d-flex flex-row modalLabel">
                  จังหวัด
                </Form.Label>
                <Form.Control
                  disabled
                  value={company?.province}
                  onChange={(event) =>
                    setCompany({
                      ...company,
                      province: event?.target?.value,
                    })
                  }
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                as={Col}
                sm={"6"}
              >
                <Form.Label className="d-flex flex-row modalLabel">
                  รหัสไปรษณีย์
                </Form.Label>
                <Form.Control
                  disabled
                  value={company?.zipCode}
                  onChange={(event) =>
                    setCompany({
                      ...company,
                      zipCode: event?.target?.value,
                    })
                  }
                  type="text"
                  required
                />
              </Form.Group>
            </Row>

            <Form.Group as={Col} sm="12">
              <Form.Label className="d-flex flex-row modalLabel">
                บ้านเลขที่
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                placeholder=""
                // disabled={company?.latitude && company?.longtitude}
                value={company?.houseNumber}
                onChange={(event) => {
                  setCompany({
                    ...company,
                    houseNumber: event?.target?.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group as={Col} sm="12">
              <Form.Label className="d-flex flex-row modalLabel">
                Url Google Map
              </Form.Label>
              <Form.Control
                required={createMode}
                as="textarea"
                placeholder=""
                // disabled={company?.latitude && company?.longtitude}
                value={company?.googleMapUrl}
                onChange={(event) => {
                  const latlong = getCoordinatesFromGoogleMapURL(
                    event?.target?.value
                  );

                  setCompany({
                    ...company,
                    googleMapUrl: event?.target?.value,
                    latitude: latlong?.latitude,
                    longtitude: latlong?.longtitude,
                  });
                }}
              />
            </Form.Group>

            <Modal.Footer>
              <Button
                variant="secondary"
                className="btn btn-primary "
                onClick={handleClose}
              >
                ยกเลิก
              </Button>

              <Button type="submit">ยืนยัน</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CompanyManagementTeacherModal;
