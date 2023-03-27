import React from "react";
import { Button, Modal } from "react-bootstrap";
import { AiOutlineUpload } from "react-icons/ai";
import { uploadXlsxStudentFile } from "../../../apis/uploadApi";
import { sweetAlertSuccess } from "../../../swal2/swal2";

function AdminUploadfileModal({
  show,
  handleClose,
  handleExportXLSX,
  fileInputHandler,
  file,
}) {
  const extension = file?.name.split(".").pop();
  return (
    <div>
      <Modal
        show={show}
        scrollable
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            อัพโหลดนักศึกษา
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p
            style={{
              color: "red",
              fontSize: "2vh",
              //   textDecoration: "underline",
            }}
            className={"mt-3"}
          >
            หากต้องการที่จะอัพโหลดนักศึกษาเข้าระบบ โปรดใช้ Template Excel
            ด้านล่างนี้
          </p>
          <label
            class=" d-flex justify-content-start download-excel-template"
            onClick={() => handleExportXLSX()}
          >
            ดาวโหลด Template Excel{" "}
          </label>

          <label class="btn btn-primary mt-2">
            อัพโหลดนักศึกษา <AiOutlineUpload style={{ fontSize: "22px" }} />{" "}
            <input type="file" hidden onChange={(e) => fileInputHandler(e)} />
          </label>
          <div className="mt-1">{file?.name}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={async () => {
              const status = await uploadXlsxStudentFile(file);
              if (status) {
                sweetAlertSuccess("Upload Student Succesful.").then((okay) => {
                  if (okay) {
                    handleClose();
                  }
                });
              }
            }}
            disabled={extension !== "xlsx"}
          >
            Upload
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminUploadfileModal;
