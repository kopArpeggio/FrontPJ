import React from "react";
import { Button, Modal } from "react-bootstrap";
import { AiOutlineUpload } from "react-icons/ai";
import { uploadXlsxTeacherFile } from "../../../apis/uploadApi";
import { sweetAlertSuccess } from "../../../swal2/swal2";

function AdminImportTeacherModal({
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
                        อัดโหลดอาจารย์
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
                        หากต้องการที่จะอัพโหลดอาจารย์เข้าระบบ โปรดใช้ Template Excel
                        ด้านล่างนี้
                    </p>
                    <label
                        class=" d-flex justify-content-start download-excel-template"
                        onClick={() => handleExportXLSX()}
                    >
                        ดาวโหลด Template Excel{" "}
                    </label>

                    <label class="btn btn-primary mt-2">
                        อัพโหลดอาจารย์ <AiOutlineUpload style={{ fontSize: "22px" }} />{" "}
                        <input type="file" hidden onChange={(e) => fileInputHandler(e)} />
                    </label>
                    <div className="mt-1">{file?.name}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={async () => {
                            const status = await uploadXlsxTeacherFile(file);
                            if (status) {
                                sweetAlertSuccess("Upload Teachers Succesful.").then((okay) => {
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

export default AdminImportTeacherModal;