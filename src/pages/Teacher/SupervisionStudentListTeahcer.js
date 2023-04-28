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
  GetAllStudentByEmptyTeacher,
  deleteStudent,
  getAllStudentByStatus,
  getAllYearStudent,
  updateStudentById,
} from "../../apis/studentApi";
import SupervisionStudentModal from "./Modal/SupervisionStudentModal";
import { getData } from "../../apis/rootApi";
import { sweetAlertSubmit, sweetAlertSuccess } from "../../swal2/swal2";

function SupervisionStudentListTeacher() {
  const [student, setStudent] = useState([]);
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
  const [teacher, setTeacher] = useState("");
  const [updateStudent, setUpdateStudent] = useState("");

  const handleShow = (param) => {
    setShow(true);
    setModalStudent(param);
    setModalAddress(param?.Work?.Workplace?.Address);
    setModalWork(param?.Work);
    setModalWorkplace(param?.Work?.Workplace);
  };

  const [q, SetQ] = useState("");

  const nrru = {
    latitude: 14.9846414,
    longtitude: 102.1126068,
  };

  const generateEmbedGoogleMapDirectionURL = (
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude
  ) =>
    `https://maps.google.com/maps?saddr=${startLatitude},${startLongitude}&daddr=${endLatitude},${endLongitude}&output=embed`;



  const edit = (param) => {
    return (
      <>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => {
            console.log(updateStudent);
            sweetAlertSubmit(
              undefined,
              "ท่านต้องการเลือกนิเทศนักศึกษาท่านนี้หรือไม่"
            ).then(async (results) => {
              if (results.isConfirmed) {
                const done = await updateStudentById({ stu: updateStudent });
                if (done) {
                  sweetAlertSuccess();
                  getStudent();
                }
              }
            });
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
      GetAllStudentByEmptyTeacher(params).then((res) => {
        setStudent(res?.data);
        setLoading(false);
        console.log(res?.data)

      });
    } else {
      GetAllStudentByEmptyTeacher(params).then((res) => {
        console.log(res?.data)
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
      name: "เลือกนิเทศ",
      center: true,
      cell: (row) => {
        setUpdateStudent({ id: row?.id, teacherId: teacher?.id });
        return <div>{edit(row)}</div>;
      },
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
      <SupervisionStudentModal
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
          title="เลือกนิเทศนักศึกษา"
          columns={columns}
          data={Searchtest(student)}
          expandableRows
          expandableRowsComponent={(value) => <div>
            <Row className="mb-3 mt-4 justify-content-center d-flex flex-column flex-lg-row">
              <Form.Group as={Col} sm="8">
                <Form.Label
                  className="d-flex flex-row"
                >
                  ชื่อจริง : {value?.data?.firstname}
                </Form.Label>
                <Form.Label
                  className="d-flex flex-row"
                >
                  นามสกุล : {value?.data?.lastname}
                </Form.Label>
                <Form.Label
                  className="d-flex flex-row"
                >
                  ชื่อตำแหน่งงานที่ไปทำ : {value?.data?.Work?.jobTitle}
                </Form.Label>
                <Form.Label
                  className="d-flex flex-row"
                >
                  รายละเอียดงานที่ไปทำ : {value?.data?.Work?.jobDetail}
                </Form.Label>
                <Form.Label
                  className="d-flex flex-row"
                >
                  ชื่อบริษัท : {value?.data?.Work?.Workplace?.companyName}
                </Form.Label>
                <Form.Label
                  className="d-flex flex-row"
                >
                  ที่ตั้ง บริษัท :  <iframe
                    title="googleMap"
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                      width: "80%",
                      height: "30vh",
                    }}
                    src={generateEmbedGoogleMapDirectionURL(
                      nrru?.latitude,
                      nrru?.longtitude,
                      // Work Location
                      value?.data?.latitude,
                      value?.data?.longtitude
                    )}
                    // style={{  }}
                    // width="400"
                    // height="300"
                    allowfullscreen=""
                    loading="lazy"
                    className="mb-3"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Form.Label>
              

              </Form.Group>
            </Row>
          </div>}
pagination
fixedHeader
fixedHeaderScrollHeight = "80vh"
//selectableRows
responsive
highlightOnHover
subHeader
subHeaderAlign = { "left"}
subHeaderComponent = {
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
      </Container >
    </div >
  );
}

export default SupervisionStudentListTeacher;
