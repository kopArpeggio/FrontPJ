import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { createStudent, updateStudentById } from "../../../apis/studentApi";
import Select, { createFilter } from "react-select";
import { MenuList } from "../../User/Helper";
import { sweetAlertSubmit, sweetAlertSuccess } from "../../../swal2/swal2";

function AdminModal({
  show,
  handleClose,
  student,
  setStudent,
  createMode,
  setLoading,
  options,
  branch,
}) {
  const [isConfirm, setIsConfirm] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      if (createMode) {
        const done = await createStudent(student);
        if (done) {
          sweetAlertSuccess("เพิ่มนักศึกษาสำเร็จ");
          handleClose();
        }
      }
      if (!createMode) {
        sweetAlertSubmit().then(async (result) => {
          if (result?.isConfirmed) {
            setLoading(true);

            const done = await updateStudentById({
              stu: student,
            });
            if (done) {
              sweetAlertSuccess();
              setIsConfirm(false);
              handleClose();
            }
          }
        });
      }
    }
    setValidated(true);
  };

  return (
    <div>
      <Modal show={show} scrollable onHide={handleClose} className={"modal"}>
        <Modal.Header closeButton>
          {/* Change Title By Modal Mode */}
          <Modal.Title>
            {createMode ? "เพิ่มนักศึกษา" : "แก้ไขนักศึกษา"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                ชื่อจริง
              </Form.Label>
              <Form.Control
                value={student?.firstname}
                onChange={(event) =>
                  setStudent({
                    ...student,
                    firstname: event?.target?.value,
                  })
                }
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                นามสกุล
              </Form.Label>
              <Form.Control
                value={student?.lastname}
                onChange={(event) =>
                  setStudent({
                    ...student,
                    lastname: event?.target?.value,
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
                  value={student?.password}
                  onChange={(event) =>
                    setStudent({
                      ...student,
                      password: event?.target?.value,
                    })
                  }
                  type="text"
                  required={createMode}
                />
              ) : (
                <Form.Control
                  value={student?.password}
                  disabled={!isConfirm}
                  onChange={(event) =>
                    setStudent({
                      ...student,
                      password: event?.target?.value,
                    })
                  }
                  type="text"
                  required={createMode}
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                รหัสนักศึกษา
              </Form.Label>
              <Form.Control
                maxLength={10}
                minLength={10}
                value={student?.stuNo}
                onChange={(event) =>
                  setStudent({
                    ...student,
                    stuNo: event?.target?.value,
                  })
                }
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                รหัสบัตรประจำตัวประชาชน
              </Form.Label>
              <Form.Control
                maxLength={13}
                minLength={13}
                value={student?.idCardNumber}
                onChange={(event) =>
                  setStudent({
                    ...student,
                    idCardNumber: event?.target?.value,
                  })
                }
                type="text"
                required
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className="mb-3"
              sm="12"
              controlId="formGridPassword"
            >
              <Form.Label className="d-flex flex-row modalLabel">
                เลือกสาขา
              </Form.Label>
              <Select
                filterOption={createFilter({ ignoreAccents: false })}
                components={{ MenuList }}
                options={options}
                value={options?.value}
                placeholder="เลือกสาขา"
                // onChange={(e) => onChangedistrict(e)}
                onChange={(e) => {
                  setStudent({
                    ...student,
                    branchId: branch[e.value]?.id,
                    facultyName: branch[e.value]?.facultyName,
                    branchName: branch[e.value]?.branchName,
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                คณะ
              </Form.Label>
              <Form.Control value={student?.facultyName} type="text" disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                สาขา
              </Form.Label>
              <Form.Control value={student?.branchName} type="text" disabled />
            </Form.Group>

            <Row>
              <Form.Group
                className="mb-3"
                as={Col}
                sm="4"
                controlId="ControlInput1"
              >
                <Form.Label className="d-flex flex-row modalLabel">
                  ชั้นปีที่
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="4"
                  maxLength={1}
                  value={student?.yearClass}
                  onChange={(event) =>
                    setStudent({
                      ...student,
                      yearClass: event?.target?.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                as={Col}
                sm="4"
                controlId="ControlInput1"
              >
                <Form.Label className="d-flex flex-row modalLabel">
                  ปีการศึกษา
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="2556"
                  minLength={4}
                  maxLength={4}
                  value={student?.year}
                  onChange={(event) =>
                    setStudent({
                      ...student,
                      year: event?.target?.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group as={Col} sm="4" controlId="ControlInput1">
                <Form.Label className="d-flex flex-row modalLabel">
                  เกรดเฉลี่ยสะสม
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="2.51"
                  minLength={4}
                  maxLength={4}
                  value={student?.gpa}
                  onChange={(event) =>
                    setStudent({
                      ...student,
                      gpa: event?.target?.value,
                    })
                  }
                />
              </Form.Group>
            </Row>

            <Modal.Footer>
              <Button
                variant="secondary"
                className="btn btn-primary "
                onClick={handleClose}
              >
                ยกเลิก
              </Button>

              <Button
                type="submit"
                // disabled={!student?.facultyName || !student?.branchName}
              >
                ยืนยัน
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminModal;
