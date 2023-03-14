import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Select, { createFilter } from "react-select";
import { MenuList } from "../../User/Helper";
import { createTeacher, updateTeacherById } from "../../../apis/teacherApi";

function TeacherModal({
  createMode,
  show,
  handleClose,
  teacher,
  setTeacher,
  options,
  branch,
}) {
  const [validated, setValidated] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const handleSubmit = async (event) => {
    const form = event?.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      if (createMode) {
        await createTeacher(teacher);
        handleClose();
      }
      if (!createMode) {
        await updateTeacherById(teacher);
        handleClose();
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
            {createMode ? "เพิ่มอาจารย์" : "แก้ไขอาจารย์"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                ชื่อจริง
              </Form.Label>
              <Form.Control
                value={teacher?.firstname}
                onChange={(event) =>
                  setTeacher({
                    ...teacher,
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
                value={teacher?.lastname}
                onChange={(event) =>
                  setTeacher({
                    ...teacher,
                    lastname: event?.target?.value,
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
                value={teacher?.username}
                onChange={(event) =>
                  setTeacher({
                    ...teacher,
                    username: event?.target?.value,
                  })
                }
                type="text"
                required={createMode}
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
                  value={teacher?.password}
                  onChange={(event) =>
                    setTeacher({
                      ...teacher,
                      password: event?.target?.value,
                    })
                  }
                  type="password"
                  required={createMode}
                />
              ) : (
                <Form.Control
                  value={teacher?.password}
                  disabled={!isConfirm}
                  onChange={(event) =>
                    setTeacher({
                      ...teacher,
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
                  setTeacher({
                    ...teacher,
                    branchId: branch[e.value]?.id,
                    facultyName: branch[e.value]?.facultyName,
                    branchName: branch[e.value]?.branchName,
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                สาขา
              </Form.Label>
              <Form.Control value={teacher?.branchName} type="text" disabled />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="d-flex flex-row modalLabel">
                คณะ
              </Form.Label>
              <Form.Control value={teacher?.facultyName} type="text" disabled />
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

export default TeacherModal;
