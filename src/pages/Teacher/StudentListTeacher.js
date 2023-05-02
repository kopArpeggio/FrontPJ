import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { saveAs } from "file-saver";

import {
  faCheck,
  faRotate,
  faXmark,
  faPenToSquare,
  faTrash,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { AiOutlineDownload, AiOutlineUpload } from "react-icons/ai";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { getAllWorkplace } from "../../apis/workplaceApi";
import { Col, Form, Image, Row } from "react-bootstrap";
import { getImageUrl } from "../../utils/utils";
import {
  deleteStudent,
  getAllStudent,
  getAllStudentBranch,
  getAllStudentByStatus,
  getAllYearStudent,
  updateStudentById,
} from "../../apis/studentApi";
import { getAllBranchByStatus } from "../../apis/branchAPi";
import StudentListTeacherModal from "./Modal/StudentListTeacherModal";
import { sweetAlertSubmit, sweetAlertSuccess } from "../../swal2/swal2";

function StudentListTeacher() {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalStudent, setModalStudent] = useState("");
  const [modalAddress, setModalAddress] = useState("");
  const [modalWorkplace, setModalWorkplace] = useState("");
  const [modalWork, setModalWork] = useState("");
  const [branchForExcel, setBranchForExcel] = useState();
  const [params, setParams] = useState({
    status: "3",
    year: "",
  });
  const [createMode, setCreateMode] = useState(false);
  const [show, setShow] = useState(false);
  const [branch, setBranch] = useState([]);
  const [studentYear, setStudentYear] = useState([]);

  const handleShow = (param) => {
    setShow(true);
    setModalStudent(param);
    setModalAddress(param?.Work?.Workplace?.Address);
    setModalWork(param?.Work);
    setModalWorkplace(param?.Work?.Workplace);
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

  const updateStatus = (param) => {
    return (
      <>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="corret-mark"
          onClick={() => {
            param.documentStatus === "2"
              ? (param.documentStatus = "10")
              : param.documentStatus === "10"
                ? (param.documentStatus = "7")
                : (param.documentStatus = "2");
            sweetAlertSubmit(undefined, "อนุมัติหรือไม่ ?").then(
              async (results) => {
                if (results.isConfirmed) {
                  const done = await updateStudentById({ stu: param });
                  if (done) {
                    getStudent();
                    sweetAlertSuccess();
                  }
                }
              }
            );
          }}
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

  const ExcelJS = require("exceljs");

  const handleExportXLSX = (users, isExport) => {
    // console.log(users);
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    // Add a new worksheet to the workbook
    const worksheet = workbook.addWorksheet("Students");

    // Set the width of column A to 20
    const columns = ["A", "B", "C", "D", "E", "F", "G"];
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
        "stu_no",
        "firstname",
        "lastname",
        "major",
        "boss_firstname",
        "boss_lastname",
        "boss_position",
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

      const columns = ["A", "B", "C", "D", "E", "F", "G"];
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
        console.log(user);
        const row = [
          user?.stuNo,
          user?.firstname,
          user?.lastname,
          user?.branchName,
          user?.bossFirstname,
          user?.bossLastname,
          user?.bossPosition,
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

  const check = <FontAwesomeIcon icon={faCheck} className="corret-mark" />;
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
    setLoading(true);
    if (!params) {
      getAllStudentByStatus(params).then((res) => {
        setStudent(res?.data);
        setLoading(false);
      });
    } else {
      getAllStudentByStatus(params).then((res) => {
        setStudent(res?.data);
        setLoading(false);
      });
    }
  };

  const handleClose = () => {
    setShow(false);
    setCreateMode(false);
    getStudent();
  };
  var i = 0;
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
      center: true,
    },
    {
      name: "นามสกุล",
      selector: (row) => row?.lastname,
      sortable: true,
      center: true,
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
      name: "อนุมัติ",
      center: true,
      cell: (row) => (
        <div>
          {params?.status === "10" || params?.status === "2"
            ? updateStatus(row)
            : edit(row)}
        </div>
      ),
    },
  ];

  const columnsSuccess = [
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
      center: true,
    },
    {
      name: "นามสกุล",
      selector: (row) => row?.lastname,
      sortable: true,
      center: true,
    },
    {
      name: "สาขาวิชา",
      selector: (row) => row?.branchName,
      sortable: true,
      center: true,
    },
    {
      name: "คะแนน Fcn9.2",
      selector: (row) => console.log(row),
      sortable: true,
      center: true,
    },

    {
      name: "อนุมัติ",
      center: true,
      cell: (row) => (
        <div>
          {params?.status === "10" || params?.status === "2"
            ? updateStatus(row)
            : edit(row)}
        </div>
      ),
    },
  ];

  const test = () => {
    <FontAwesomeIcon icon={faPenToSquare} className="tableAction" />;
  };

  // Delete Logic
  const handleDelete = async (val) => {
    setLoading(true);

    // Logic Here and call function
    await deleteStudent(val.id);

    getStudent();
    setLoading(false);
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
    return rows?.filter(
      (row) =>
        row?.firstname.toLowerCase().indexOf(q) > -1 ||
        row?.lastname.toLowerCase().indexOf(q) > -1
    );
  };

  return (
    <div>
      <StudentListTeacherModal
        show={show}
        setShow={setShow}
        student={modalStudent}
        address={modalAddress}
        workplace={modalWorkplace}
        handleClose={handleClose}
        work={modalWork}
      />
      <Container className="tablecustom ">
        {/* <AdminModal
          show={show}
          handleClose={handleClose}
          student={modalStudent}
          setStudent={setModalStudent}
          createMode={createMode}
          setCreateMode={setCreateMode}
          setLoading={setLoading}
          options={options}
          branch={branch}
        /> */}

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
          title={
            params?.status === "10"
              ? "ระบบจัดการหนังสือส่งตัว"
              : params?.status === "2"
                ? "ระบบจัดการหนังสือขอความอนุเคราะห์"
                : "ระบบจัดการ Job Description"
          }
          columns={params?.status === "0" ? columnsSuccess : columns}
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
              <Form.Group as={Col} sm={3}>
                <div>
                  <input
                    type="text"
                    placeholder={`ค้นหานักศึกษา`}
                    className="w-100 form-control"
                    value={q}
                    onChange={(e) => SetQ(e.target.value)}
                  />
                </div>
              </Form.Group>

              <Form.Group
                className="d-flex align-items-center justify-content-start"
                as={Col}
                sm={3}
              >
                <div className="" style={{ whiteSpace: "nowrap" }}>
                  สถานะ :{" "}
                </div>
                <Form.Select
                  title="สถานะ"
                  defaultValue="3"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setParams({ ...params, status: e?.target?.value });
                  }}
                >
                  <option value="">ทั้งหมด</option>
                  <option value="4">ยังไม่ส่ง</option>
                  <option value="1">Job Description ไม่ผ่าน</option>
                  <option value="3">
                    กำลังรออาจารย์ตรวจสอบ Job Description
                  </option>
                  <option value="2">รอหนังสือขอความอนุเคราะห์</option>
                  <option value="10">รอหนังสือส่งตัว</option>
                  <option value="7">รอส่งเอกสาร</option>
                  <option value="0">สำเร็จ</option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="d-flex align-items-center justify-content-start"
                as={Col}
                sm={3}
              >
                <div className="" style={{ whiteSpace: "nowrap" }}>
                  ปีการศึกษา :{" "}
                </div>
                <Form.Select
                  defaultValue="3"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setParams({ ...params, year: e?.target?.value });
                  }}
                >
                  {studentYear.map((val, index) => (
                    <option key={index} value={val?.year}>
                      {val?.year}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="d-flex flex-xl-row">
                <Button
                  className="button-data-table"
                  hidden={
                    params?.status === "10"
                      ? false
                      : params?.status === "2"
                        ? false
                        : true
                  }
                  onClick={() => handleExportXLSX(Searchtest(student), true)}
                >
                  <AiOutlineUpload className="correct" /> Export
                </Button>
              </div>

              {/* <Form.Control type="text" className="" /> */}
              {/* <div className="d-flex flex-row">
                <Button
                  className="button-t"
                  onClick={() => {
                    setCreateMode(true);
                    handleShow();
                  }}
                >
                  {create} เพิ่มนักศึกษา
                </Button>
              </div> */}
            </>
          }
        />
      </Container>
    </div>
  );
}

export default StudentListTeacher;
