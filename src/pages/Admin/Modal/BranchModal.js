import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Select, { createFilter } from "react-select";
import { createBranch, updateBranchById } from "../../../apis/branchAPi";
import { getCoordinatesFromGoogleMapURL } from "../../../utils/utils";
import { MenuList } from "../../User/Helper";

function BranchModal({
  show,
  faculty,
  setBranch,
  handleClose,
  createMode,
  branch,
  options,
}) {
  const [validated, setValidated] = useState(false);

  const onSeletedFaculty = (params) => {
    setBranch({
      ...branch,
      facultyId: faculty[params.value]?.id,
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
        await createBranch(branch);
        handleClose();
      }
      if (!createMode) {
        await updateBranchById(branch);
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
                ชื่อสาขา
              </Form.Label>
              <Form.Control
                value={branch?.branchName}
                onChange={(event) =>
                  setBranch({
                    ...branch,
                    branchName: event?.target?.value,
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
              <Form.Label
                style={{ fontSize: 20, color: "" }}
                className="d-flex flex-row"
              >
                เลือกคณะ
              </Form.Label>
              <Select
                defaultValue={branch?.facultyName}
                filterOption={createFilter({ ignoreAccents: false })}
                components={{ MenuList }}
                options={options}
                value={options?.value}
                placeholder="กรอกชื่อคณะ"
                onChange={(e) => onSeletedFaculty(e)}
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

export default BranchModal;
