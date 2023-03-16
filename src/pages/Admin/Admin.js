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
  var i = 0;
  const columns = [
    {
      name: "Index",
      center: true,
      sortable: true,
      selector: (row) => {
        return <div>{row?.id}</div>;
      },
    },
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
      name: "แก้ไข / ลบ",
      center: true,
      cell: (row) => (
        <div>
          {edit(row)} {deleteIcon(row)}
        </div>
      ),
    },
    {
      name: "สถานะ",
      center: true,
      cell: (row) => (
        <div>
          {/* Later */}
          {row?.status_id === 2
            ? check
            : row?.status_id === 1
            ? wrong
            : checking}
        </div>
      ),
    },
  ];

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

  const handleExportCSV = (user) => {
    const data = [
      [
        "id",
        "firstname",
        "lastname",
        "stu_no",
        "gpa",
        "phone_number",
        "email",
        "password",
        "id_card_number",
      ],
      ...user.map((val) => [
        val?.id,
        val?.firstname,
        val?.lastname,
        val?.stuNo,
        numeral(val?.gpa).format("0.00"), // format GPA to two decimal places
        `'${val?.phoneNumber}`,
        val?.email,
        "",
        val?.idCardNumber,
      ]),
    ];

    const csv = Papa.unparse(data);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "your-file-name.csv");
  };

  const fileInputHandler = (e) => {
    const files = e.target.files;
    const reader = new FileReader();
    console.log(files[0]);
    reader.readAsDataURL(files[0]);
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
                <Button onClick={() => handleExportCSV(student)}>
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
