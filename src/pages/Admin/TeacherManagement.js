import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { AiOutlineDownload, AiOutlineUpload } from "react-icons/ai";
import { saveAs } from "file-saver";

import numeral from "numeral";


import {
  faPenToSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { deleteTeacherById, getAllTeacher } from "../../apis/teacherApi";
import TeacherModal from "./Modal/TeacherModal";
import { getAllBranchByStatus } from "../../apis/branchAPi";
import { sweetAlertSubmit, sweetAlertSuccess } from "../../swal2/swal2";
import AdminUploadfileModal from "./Modal/AdminUploadfileModal";
import AdminImportTeacherModal from "./Modal/AdminImportTeacherModal";

function TeacherManagement() {
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalTeacher, setModalTeacher] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [show, setShow] = useState(false);
  const [branch, setBranch] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [file, setFile] = useState();
  const [branchForExcel, setBranchForExcel] = useState();




  const handleShow = (param) => {
    setShow(true);
    setModalTeacher(param);
  };

  const handleClose = () => {
    setShow(false);
    setCreateMode(false);
    setShowUploadModal(false)
    getTeacher();
  };

  // Delete Logic
  const handleDelete = async (params) => {
    // Logic Here and call function
    sweetAlertSubmit().then(async (result) => {
      if (result?.isConfirmed) {
        setLoading(true);
        const done = await deleteTeacherById(params?.id);
        if (done) {
          sweetAlertSuccess("ลบอาจารย์สำเร็จ !");
          getTeacher();
        }
      }
    });
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

  const getTeacher = async () => {
    await getAllTeacher().then((res) => {
      setLoading(true);
      setTeacher(res?.data);
      setLoading(false);
    });
  };

  const columns = [
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
      name: "สาขา",
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

  useEffect(() => {
    getTeacher();

    getAllBranchByStatus().then((res) => {
      setBranch(res?.data);
    });

    getAllBranchByStatus().then((res) => {
      setBranch(res?.data);
      setBranchForExcel(
        res?.data.map((obj) => `${obj.id} : สาขาวิชา${obj.branchName}`)
      );
    });
  }, []);

  const Searchtest = (rows) => {
    return rows?.filter(
      (row) =>
        row?.firstname.toLowerCase().indexOf(q) > -1 ||
        row?.lastname.toLowerCase().indexOf(q) > -1
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
        "username",
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
        "username",
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

      <AdminImportTeacherModal
        show={showUploadModal}
        handleClose={handleClose}
        handleExportXLSX={handleExportXLSX}
        fileInputHandler={fileInputHandler}
        file={file}
      />

      <TeacherModal
        show={show}
        teacher={modalTeacher}
        setTeacher={setModalTeacher}
        createMode={createMode}
        setCreateMode={setCreateMode}
        handleClose={handleClose}
        options={options}
        branch={branch}
      />

      <Container className="tablecustom">
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
          title="จัดการอาจารย์"
          columns={columns}
          data={Searchtest(teacher)}
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
                  placeholder="ค้นหาอาจารย์"
                  className="w-100 form-control"
                  value={q}
                  onChange={(e) => SetQ(e.target.value)}
                />
              </div>
              {/* <Form.Control type="text" className="" /> */}
              {/* <div>
                <Button
                  className="button-t"
                  onClick={() => {
                    setCreateMode(true);
                    handleShow();
                  }}
                >
                  {create} เพิ่มอาจารย์
                </Button>
              </div> */}

              <div className="d-flex flex-xl-row">
                <Button
                  className="button-data-table "
                  onClick={() => {
                    setCreateMode(true);
                    handleShow();
                  }}
                >
                  {create} เพิ่มอาจารย์
                </Button>
           
                <Button
                  className="button-data-table"
                  onClick={() => {
                    // handleShowUploadModal();
                    setShowUploadModal(true)
                    
                  }}
                >
                  <AiOutlineUpload className="correct" /> Import
                </Button>
              </div>
            </>
          }
        />
      </Container>
    </div>
  );
}

export default TeacherManagement;
