import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

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
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { getAllWorkplace } from "../../apis/workplaceApi";
import { Col, Form, Image, Row } from "react-bootstrap";
import { getImageUrl } from "../../utils/utils";
import {
  deleteStudent,
  getAllStudent,
  getAllStudentByStatus,
} from "../../apis/studentApi";
import { getAllBranchByStatus } from "../../apis/branchAPi";
import StudentListTeacherModal from "./Modal/StudentListTeacherModal";

function StudentListTeacher() {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalStudent, setModalStudent] = useState("");
  const [modalAddress, setModalAddress] = useState("");
  const [modalWorkplace, setModalWorkplace] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [show, setShow] = useState(false);
  const [branch, setBranch] = useState([]);

  const handleShow = (param) => {
    setShow(true);
    setModalStudent(param);
    setModalAddress(param?.Work?.Workplace?.Address);
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

  const getStudent = async (params) => {
    setLoading(true);
    if (!params) {
      getAllStudent().then((res) => {
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
      name: "Index",
      center: true,
      selector: (row) => {
        return <div>{(i += 1)}</div>;
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
    getStudent("3");

    getAllBranchByStatus().then((res) => {
      setBranch(res?.data);
    });
  }, []);

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
              <Row>
                <div className="d-flex flex-row">
                  <div style={{ justifyContent: "space-between" }}>
                    <input
                      type="text"
                      placeholder={`ค้นหานักศึกษา`}
                      className="w-100 form-control"
                      value={q}
                      onChange={(e) => SetQ(e.target.value)}
                    />
                  </div>
                  <div className="ms-3">
                    <Form.Group as={Col} sm={12}>
                      <Form.Select
                        defaultValue="3"
                        aria-label="Default select example"
                        onChange={(e) => getStudent(e?.target?.value)}
                      >
                        <option value="">ทั้งหมด</option>
                        <option value="3">กำลังรอ</option>
                        <option value="2">สำเร็จ</option>
                        <option value="1">ไม่ผ่าน</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>
              </Row>

              {/* <Form.Control type="text" className="" /> */}
              <div className="d-flex flex-row">
                <Button
                  className="button-t"
                  onClick={() => {
                    setCreateMode(true);
                    handleShow();
                  }}
                >
                  {create} เพิ่มนักศึกษา
                </Button>
              </div>
            </>
          }
        />
      </Container>
    </div>
  );
}

export default StudentListTeacher;
