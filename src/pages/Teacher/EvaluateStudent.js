import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import { Col, Form, Image, Row } from "react-bootstrap";
import { getImageUrl } from "../../utils/utils";
import {
  deleteStudent,
  getAllStudentByStatus,
  getAllYearStudent,
  getStudentByEvaluate,
} from "../../apis/studentApi";
import SupervisionStudentModal from "./Modal/SupervisionStudentModal";
import EvaluateModal from "./Modal/EvaluateModal14_1";
import SelectEvaluate from "./Modal/SelectEvaluate";
import { getData } from "../../apis/rootApi";

function EvaluateStudent() {
  const [student, setStudent] = useState([]);
  const [teacher, setTeacher] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalStudent, setModalStudent] = useState("");
  const [modalAddress, setModalAddress] = useState("");
  const [modalWorkplace, setModalWorkplace] = useState("");
  const [modalWork, setModalWork] = useState("");
  const [params, setParams] = useState({
    status: "0",
    year: "",
  });
  const [createMode, setCreateMode] = useState(false);
  const [show, setShow] = useState(false);
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
      getStudentByEvaluate(params).then((res) => {
        setStudent(res?.data);
        setLoading(false);
      });
    } else {
      getStudentByEvaluate(params).then((res) => {
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
      name: "ประเมินนักศึกษา",
      center: true,
      cell: (row) => <div>{edit(row)}</div>,
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
    getData().then((res) => {
      setTeacher(res?.data?.teacher);
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
      <SelectEvaluate
        show={show}
        handleClose={handleClose}
        setStudent={setModalStudent}
        student={modalStudent}
      />
      <Container className="tablecustom ">
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
          title="เลือกประเมินนักศึกษา"
          columns={columns}
          data={Searchtest(student)}
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
              <Row
                className="d-flex flex-column flex-lg-row "
                style={{ whiteSpace: "nowrap" }}
              >
                <Form.Group as={Col} sm={6}>
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
                  className="d-flex align-items-center"
                  as={Col}
                  sm={6}
                >
                  <div className="">ปีการศึกษา : </div>
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
              </Row>
            </>
          }
        />
      </Container>
    </div>
  );
}

export default EvaluateStudent;
