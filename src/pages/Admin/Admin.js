import axios from "axios";
import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { saveAs } from "file-saver";
import * as Papa from "papaparse";
import numeral from "numeral";

import {
  faCheck,
  faRotate,
  faXmark,
  faPenToSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import AdminModal from "./Modal/AdminModal";
import { Image } from "react-bootstrap";
import { getImageUrl } from "../../utils/utils";
import { deleteStudent } from "../../apis/studentApi";
import { getAllBranchByStatus } from "../../apis/branchAPi";
import { uploadCsvStudentFile } from "../../apis/uploadApi";
import { sweetAlertSubmit } from "../../swal2/swal2";
import Swal from "sweetalert2";

export default function Admin() {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalStudent, setModalStudent] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [show, setShow] = useState(false);
  const [branch, setBranch] = useState([]);

  const handleShow = (param) => {
    setShow(true);
    setModalStudent(param);
  };

  const [q, SetQ] = useState("");

  const edit = (param) => {
    return (
      <>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => {
            handleShow(param);
          }}
          className="tableAction"
        />
      </>
    );
  };

  const deleteIcon = (param) => {
    return (
      <>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => {
            handleDelete(param);
          }}
          className="tableAction"
        />
      </>
    );
  };

  const check = <FontAwesomeIcon icon={faCheck} className="correct" />;
  const create = <FontAwesomeIcon icon={faPlus} className="correct" />;
  const wrong = <FontAwesomeIcon icon={faXmark} className="Wrong" />;
  const checking = <FontAwesomeIcon icon={faRotate} className="Checking" />;

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
        fontSize: "14",
        fontWeight: "400",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const getStudent = async () => {
    const api = "http://localhost:3001/api/";
    try {
      const res = await axios.get(`${api}/student/get-all-student`);
      setStudent(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShow(false);
    setCreateMode(false);
    getStudent();
  };
  const columns = [
    {
      name: "โปรไฟล์",
      center: true,
      cell: (row) => (
        <div>
          <Image
            width={"35px"}
            height={"35px"}
            roundedCircle
            src={
              row?.profilePic
                ? getImageUrl(row?.profilePic)
                : "/asset/img/noAvatar.jpg"
            }
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
            className="me-2"
          />
        </div>
      ),
    },
    {
      name: "ชื่อจริง",
      selector: (row) => row?.firstname,
      sortable: true,
    },
    {
      name: "นามสกุล",
      selector: (row) => row?.lastname,
      sortable: true,
    },
    {
      name: "สาขาวิชา",
      selector: (row) => row?.branchName,
      sortable: true,
      center: true,
    },
    {
      name: "คณะ",
      selector: (row) => row?.facultyName,
      sortable: true,
      center: true,
    },

    {
      name: "แก้ไข / ลบ",
      center: true,
      cell: (row) => (
        <div>
          {edit(row)} {deleteIcon(row)}
        </div>
      ),
    },
  ];

  // Delete Logic
  const handleDelete = async (val) => {
    // Logic Here and call function
    sweetAlertSubmit(null, "ท่านต้องการจะลบนักศึกษาหรือไม่").then(
      async (result) => {
        if (result?.isConfirmed) {
          setLoading(true);
          const done = await deleteStudent(val?.id);
          if (done) {
            getStudent();
            Swal.fire("ลบนักศึกษาเรียบร้อยแล้ว !", "", "success");
          }
        }
      }
    );
  };

  useEffect(() => {
    getStudent();

    getAllBranchByStatus().then((res) => {
      setBranch(res?.data);
    });
  }, []);

  const Searchtest = (rows) => {
    return rows?.filter(
      (row) =>
        row?.firstname.toLowerCase().indexOf(q) > -1 ||
        row?.lastname.toLowerCase().indexOf(q) > -1 ||
        `${row?.firstname} ${row?.lastname}`.toLowerCase().indexOf(q) > -1
    );
  };

  const options = [];
  for (let i = 0; i < branch?.length; i++) {
    var obj = {};
    obj["value"] = i;
    obj["label"] =
      "สาขา : " +
      branch[i]?.branchName +
      "  |  " +
      "คณะ : " +
      branch[i]?.facultyName;
    options.push(obj);
  }

  const ExcelJS = require("exceljs");

  const handleExportXLSX = (users) => {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    // Add a new worksheet to the workbook
    const worksheet = workbook.addWorksheet("Students");

    // Define the validation list values
    const validationListValues = ["Male", "Female"];

    // Define the validation rule
    const validationRule = {
      type: "list",
      allowBlank: true,
      formulae: [`"${validationListValues.join(",")}"`],
    };

    // Add the header row to the worksheet
    worksheet.addRow([
      "id",
      "firstname",
      "lastname",
      "gender",
      "stu_no",
      "gpa",
      "phone_number",
      "email",
      "id_card_number",
    ]);

    // Loop through the users and add them to the worksheet
    users.forEach((user) => {
      const row = [
        user.id,
        user.firstname,
        user.lastname,
        user.gender,
        user.stuNo,
        numeral(user.gpa).format("0.00"),
        `'${user.phoneNumber}`,
        user.email,
        `${user.idCardNumber}`,
      ];

      // Add data validation to the gender column
      const cell = worksheet.getCell(`D${worksheet.lastRow.number}`);
      cell.dataValidation = validationRule;

      worksheet.addRow(row);
    });

    // Save the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(
        new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        "student.xlsx"
      );
    });
  };

  const fileInputHandler = async (e) => {
    const files = e?.target?.files;
    await uploadCsvStudentFile(files[0]);
  };

  return (
    <div>
      <Container className="tablecustom ">
        <AdminModal
          show={show}
          handleClose={handleClose}
          student={modalStudent}
          setStudent={setModalStudent}
          createMode={createMode}
          setCreateMode={setCreateMode}
          setLoading={setLoading}
          options={options}
          branch={branch}
        />
        <DataTable
          progressPending={loading}
          progressComponent={
            <ReactLoading
              type={"spin"}
              color={"green"}
              height={"3%"}
              width={"3%"}
            />
          }
          customStyles={customStyles}
          theme="solarized"
          title="จัดการนักศึกษา"
          columns={columns}
          data={Searchtest(student)}
          expandableRows
          expandableRowsComponent={(value) => <pre>{value.data.firstname}</pre>}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="80vh"
          //selectableRows
          responsive
          highlightOnHover
          subHeader
          subHeaderAlign={"left"}
          subHeaderComponent={
            <>
              <div style={{ justifyContent: "space-between" }}>
                <input
                  type="text"
                  placeholder="ค้นหานักศึกษา"
                  className="w-100 form-control"
                  value={q}
                  onChange={(e) => SetQ(e.target.value)}
                />
              </div>
              {/* <Form.Control type="text" className="" /> */}
              <div>
                <Button
                  className="button-t"
                  onClick={() => {
                    setCreateMode(true);
                    handleShow();
                  }}
                >
                  {create} เพิ่มนักศึกษา
                </Button>
                <Button onClick={() => handleExportXLSX(student)}>
                  Test Download
                </Button>

                <label class="btn btn-primary">
                  Choose File{" "}
                  <input
                    type="file"
                    hidden
                    onChange={(e) => fileInputHandler(e)}
                  />
                </label>
              </div>
            </>
          }
        />
        {/* <div>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div> */}
        <iframe src="/pdf/Hi.pdf" width="450" height="250" title="pdf"></iframe>
      </Container>
    </div>
  );
}
