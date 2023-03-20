import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import {
  faPenToSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Form, Image, Row } from "react-bootstrap";
import { getAllFacultyByStatus } from "../../apis/facultyApi";
import {
  deleteBranchById,
  getAllBranch,
  updateBranchById,
} from "../../apis/branchAPi";
import { getAllStudentByCompany } from "../../apis/studentApi";
import { getImageUrl } from "../../utils/utils";

function StudentListCompany() {
  const [branch, setBranch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalBranch, setModalBranch] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [show, setShow] = useState(false);
  const [faculty, setFaculty] = useState([]);

  const handleShow = (param) => {
    setShow(true);
    setModalBranch(param);
  };

  const handleClose = () => {
    setShow(false);
    setCreateMode(false);
    getBranch();
  };

  const [q, SetQ] = useState("");
  const [params, setParams] = useState({
    status: "2",
    year: "",
  });

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

  const getBranch = async () => {
    await getAllStudentByCompany(params).then((res) => {
      setLoading(true);
      setBranch(res?.data);
      setLoading(false);
    });
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
      center: true,
    },
    {
      name: "นามสกุล",
      selector: (row) => row?.lastname,
      sortable: true,
      center: true,
    },

    {
      name: "ตรวจสอบ",
      center: true,
      cell: (row) => (
        <Button variant="primary" size="sm">
          ตรวจสอบ
        </Button>
      ),
    },
  ];

  // Change Status Logic

  const getFaculty = async () => {
    getAllFacultyByStatus().then((res) => {
      setFaculty(res?.data);
    });
  };

  useEffect(() => {
    getFaculty();
    getBranch();
  }, [params]);

  const Searchtest = (rows) => {
    return rows?.filter(
      (row) =>
        `${row?.firstname} ${row?.lastname}`.toLowerCase().indexOf(q) > -1
    );
  };

  return (
    <div>
      {" "}
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
          title="จัดการนักศึกษาฝึกงาน"
          columns={columns}
          data={Searchtest(branch)}
          // expandableRows
          // expandableRowsComponent={(value) => <pre>{value.data.firstname}</pre>}
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
                  sm={5}
                >
                  <div className="me-1">สถานะ : </div>
                  <Form.Select
                    title="สถานะ"
                    defaultValue="2"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setParams({ ...params, status: e?.target?.value });
                    }}
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="0">สำเร็จ</option>
                    <option value="1">ไม่ผ่าน</option>
                    <option value="2">รอการตอบรับ</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              {/* <div>
                <Button
                  className="button-t"
                  onClick={() => {
                    setCreateMode(true);
                    handleShow();
                  }}
                >
                  {create} เพิ่มสาขา
                </Button>
              </div> */}
            </>
          }
        />
      </Container>
    </div>
  );
}

export default StudentListCompany;
