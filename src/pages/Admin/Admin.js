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
import { AiOutlineDownload, AiOutlineUpload } from "react-icons/ai";

import {
  faPenToSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import AdminModal from "./Modal/AdminModal";
import { Form, Image } from "react-bootstrap";
import { getImageUrl } from "../../utils/utils";
import {
  deleteStudent,
  getAllStudentByYear,
  getAllYearStudent,
} from "../../apis/studentApi";
import { getAllBranch, getAllBranchByStatus } from "../../apis/branchAPi";
import { uploadCsvStudentFile } from "../../apis/uploadApi";
import { sweetAlertSubmit } from "../../swal2/swal2";
import Swal from "sweetalert2";
import AdminUploadfileModal from "./Modal/AdminUploadfileModal";

export default function Admin() {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalStudent, setModalStudent] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [show, setShow] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [branch, setBranch] = useState([]);
  const [branchForExcel, setBranchForExcel] = useState();
  const [file, setFile] = useState();
  const [studentYear, setStudentYear] = useState([]);
  const [params, setParams] = useState({
    year: "",
  });

  const handleShow = (param) => {
    setShow(true);
    setModalStudent(param);
  };

  const handleShowUploadModal = (param) => {
    setShowUploadModal(true);
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

  const create = <FontAwesomeIcon icon={faPlus} className="correct" />;

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
    setLoading(true);
    if (!params) {
      getAllStudentByYear(params).then((res) => {
        setStudent(res?.data);
        setLoading(false);
      });
    } else {
      getAllStudentByYear(params).then((res) => {
        setStudent(res?.data);
        setLoading(false);
      });
    }
  };

  const handleClose = () => {
    setShow(false);
    setCreateMode(false);
    setShowUploadModal(false);
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
      setBranchForExcel(
        res?.data.map((obj) => `${obj.id} : สาขาวิชา${obj.branchName}`)
      );
    });

    getAllYearStudent().then((res) => {
      setStudentYear(res?.data);
    });
  }, [params]);

  const Searchtest = (rows) => {
    const filtered = rows?.filter(
      (row) =>
        row?.firstname.toLowerCase().indexOf(q) > -1 ||
        row?.lastname.toLowerCase().indexOf(q) > -1 ||
        row?.stuNo.toLowerCase().indexOf(q) > -1 ||
        `${row?.firstname} ${row?.lastname}`.toLowerCase().indexOf(q) > -1
    );

    return filtered;
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

  const handleExportXLSX = (users, isExport) => {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    // Add a new worksheet to the workbook
    const worksheet = workbook.addWorksheet("Students");

    // Set the width of column A to 20
    const columns = ["B", "C", "D", "E", "F", "G", "H", "I"];
    columns.forEach((col) => {
      const column = worksheet.getColumn(col);
      column.width = 20;
    });

    // Define the validation list values
    const validationListValues = branchForExcel;

    // Define the validation rule
    const validationRule = {
      type: "list",
      allowBlank: false,
      formulae: [`"${validationListValues.join(",")}"`],
      showErrorMessage: true,
      errorStyle: "error",
      errorTitle: "ข้อมูลผิดพลาด",
      error: "โปรดเลือกจาก Select List เท่านั้น",
    };

    if (isExport) {
      worksheet.addRow([
        "id",
        "firstname",
        "lastname",
        "major",
        "stu_no",
        "gpa",
        "boss_firstname",
        "boss_lastname",
        // "id_card_number",
      ]).font = { bold: true, color: "FFCCFFCC" };

      const firstRow = worksheet.getRow(1);

      firstRow.height = 30;

      firstRow.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      firstRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFC0C0C0" }, // set the color to light gray
      };

      firstRow.alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
      columns.forEach((col) => {
        const column = worksheet.getColumn(col);
        column.border = {
          top: { style: "thin" },
          left: { style: "thin", color: { argb: "black" } },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // Loop through the users and add them to the worksheet
      users.forEach((user) => {
        const row = [
          user?.id,
          user?.firstname,
          user?.lastname,
          user?.gender,
          `${user?.stuNo}`,
          numeral(user?.gpa).format("0.00"),
          `'${user?.phoneNumber}`,
          user?.email,
          // `${user?.idCardNumber}`,
        ];

        worksheet.addRow(row);
      });
    } else {
      worksheet.addRow([
        "id",
        "firstname",
        "lastname",
        "major",
        "stu_no",
        "gpa",
        "phone_number",
        "email",
        "id_card_number",
      ]).font = { bold: true };

      const firstRow = worksheet.getRow(1);

      firstRow.height = 30;

      firstRow.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      firstRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFC0C0C0" }, // set the color to light gray
      };

      firstRow.alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
      columns.forEach((col) => {
        const column = worksheet.getColumn(col);
        column.border = {
          top: { style: "thin" },
          left: { style: "thin", color: { argb: "black" } },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    }

    for (let i = 2; i <= 100; i++) {
      const cell = worksheet.getCell(`D${i}`);
      cell.dataValidation = validationRule;
    }
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
    setFile(files[0]);
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

        <AdminUploadfileModal
          show={showUploadModal}
          handleClose={handleClose}
          handleExportXLSX={handleExportXLSX}
          fileInputHandler={fileInputHandler}
          file={file}
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
          // expandableRows
          // expandableRowsComponent={(value) => <pre>{value.data.firstname}</pre>}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="80vh"
          // selectableRows
          responsive
          highlightOnHover
          subHeader
          subHeaderAlign={"left"}
          subHeaderComponent={
            <>
              <div
                style={{ justifyContent: "space-between" }}
                className="d-flex justify-content-column"
              >
                <input
                  type="text"
                  placeholder="ค้นหานักศึกษา"
                  className="w-100 form-control"
                  value={q}
                  onChange={(e) => SetQ(e.target.value)}
                />

                <Form.Select
                  defaultValue="3"
                  aria-label="Default select example"
                  style={{ justifyContent: "space-between", width: "50%" }}
                  onChange={(e) => {
                    setParams({ ...params, year: e?.target?.value });
                  }}
                >
                  <option value={""}>ปีการศึกษา</option>
                  {studentYear.map((val, index) => (
                    <option key={index} value={val?.year}>
                      {val?.year}
                    </option>
                  ))}
                </Form.Select>
              </div>

              {/* <Form.Control type="text" className="" /> */}
              <div className="d-flex flex-xl-row">
                <Button
                  className="button-data-table "
                  onClick={() => {
                    setCreateMode(true);
                    handleShow();
                  }}
                >
                  {create} เพิ่มนักศึกษา
                </Button>
                <Button
                  className="button-data-table"
                  onClick={() => handleExportXLSX(Searchtest(student), true)}
                >
                  <AiOutlineDownload className="correct" /> Export
                </Button>
                <Button
                  className="button-data-table"
                  onClick={() => {
                    handleShowUploadModal();
                  }}
                >
                  <AiOutlineUpload className="correct" /> Import
                </Button>
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
        {/* <iframe src="/pdf/Hi.pdf" width="450" height="250" title="pdf"></iframe> */}
      </Container>
    </div>
  );
}
