import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Ratio,
  Row,
} from "react-bootstrap";
import { sweetAlertSubmit } from "../../../swal2/swal2";
import { updateStudentById } from "../../../apis/studentApi";
import Swal from "sweetalert2";
import { getPDFUrl } from "../../../utils/utils";

function ViewDocument({ show, setShow, student, handleClose }) {
  console.log(student);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    // setLoading(true);

    const form = event?.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      sweetAlertSubmit(event).then(async (result) => {
        if (result?.isConfirmed) {
          const status = await updateStudentById({
            stu: { id: student?.id, documentStatus: "0" },
          });
          if (status) {
            Swal.fire("บันทึกสำเร็จ !", "", "success").then(() => {
              handleClose();
            });
          }
        }
      });
      event?.preventDefault();
    }
    setValidated(true);
  };

  return (
    <div>
      <Modal show={show} fullscreen onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>ตรวจสอบเอกสาร </Modal.Title>
          <Button
            variant="success"
            className="btn btn-primary ms-5"
            onClick={() => handleClose()}
          >
            หน้าหลัก
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mt-5 d-flex flex-xl-row">
                <Form.Label
                  className="col-form-label-lg d-flex justify-content-center"
                  style={{ fontSize: 22, color: "", fontWeight: "bold" }}
                >
                  เอกสารสมบูรณ์{" "}
                  {student?.Pdffile?.pdfName4 ? (
                    ""
                  ) : (
                    <div style={{ color: "red" }}> (ยังไม่ได้ส่ง) </div>
                  )}
                </Form.Label>
              </Row>
              {student?.Pdffile?.pdfName4 ? (
                <Row className="mb-3 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8">
                    <div
                      style={{
                        width: "100%",
                        height: "auto",
                        boxShadow:
                          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                      }}
                    >
                      <Ratio aspectRatio="16x9">
                        <embed src={getPDFUrl(student?.Pdffile?.pdfName4)} />
                      </Ratio>
                    </div>
                  </Form.Group>
                </Row>
              ) : (
                ""
              )}
              <Row className="mt-5 d-flex flex-xl-row">
                <Form.Label
                  className="col-form-label-lg d-flex justify-content-center"
                  style={{ fontSize: 22, color: "", fontWeight: "bold" }}
                >
                  บทความ{" "}
                  {student?.Pdffile?.fcn1 ? (
                    ""
                  ) : (
                    <div style={{ color: "red" }}> (ยังไม่ได้ส่ง) </div>
                  )}
                </Form.Label>
              </Row>
              {student?.Pdffile?.fcn1 ? (
                <Row className="mb-3 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8">
                    <div
                      style={{
                        width: "100%",
                        height: "auto",
                        boxShadow:
                          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                      }}
                    >
                      <Ratio aspectRatio="16x9">
                        <embed src={getPDFUrl(student?.Pdffile?.fcn1)} />
                      </Ratio>
                    </div>
                  </Form.Group>
                </Row>
              ) : (
                ""
              )}
              <Row className="mt-5 d-flex flex-xl-row">
                <Form.Label
                  className="col-form-label-lg d-flex justify-content-center"
                  style={{ fontSize: 22, color: "", fontWeight: "bold" }}
                >
                  โปสเตอร์{" "}
                  {student?.Pdffile?.fcn2 ? (
                    ""
                  ) : (
                    <div style={{ color: "red" }}> (ยังไม่ได้ส่ง) </div>
                  )}
                </Form.Label>
              </Row>

              {student?.Pdffile?.fcn2 ? (
                <Row className="mb-3 justify-content-center d-flex flex-column flex-lg-row">
                  <Form.Group as={Col} sm="8">
                    <div
                      style={{
                        width: "100%",
                        height: "auto",
                        boxShadow:
                          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                      }}
                    >
                      <Ratio aspectRatio="16x9">
                        <embed src={getPDFUrl(student?.Pdffile?.fcn2)} />
                      </Ratio>
                    </div>
                  </Form.Group>
                </Row>
              ) : (
                ""
              )}

              <Modal.Footer className="d-flex flex-row justify-content-center">
                <Button
                  type="submit"
                  variant="success"
                  style={{ width: "30%" }}
                >
                  ผ่านการตรวจสอบ
                </Button>
              </Modal.Footer>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ViewDocument;
