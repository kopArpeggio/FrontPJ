import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

import { HiOutlineXMark } from "react-icons/hi";

import {
  faPenToSquare,
  faTrash,
  faPlus,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  deleteWorkplaceById,
  getAllWorkplace,
  getAllWorkplaceByApprove,
  updateWorkplaceById,
} from "../../apis/workplaceApi";
import { Form } from "react-bootstrap";
import CompanyManagementTeacherModal from "./Modal/CompanyManagementTeacherModal";
import CompanyApproveModalTeacher from "./Modal/CompanyApproveModalTeacher";
import { getStudentByApproveCompany } from "../../apis/studentApi";
function ApproveCompanyTeacher() {
  const [company, setCompany] = useState([]);
  const [companyModal, setCompanyModal] = useState();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [student, setStudent] = useState();

  const handleShow = (param) => {
    setShow(true);
    setCompanyModal(param);
    getStudentByApproveCompany(param?.id).then((res) => setStudent(res?.data));
  };

  const nrru = {
    latitude: 14.9846414,
    longtitude: 102.1126068,
  };

  const generateEmbedGoogleMapDirectionURL = (
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude
  ) => {
    return `https://maps.google.com/maps?saddr=${startLatitude},${startLongitude}&daddr=${endLatitude},${endLongitude}&output=embed`;
  };

  // Delete Logic
  const handleDelete = async (params) => {
    setLoading(true);

    // Logic Here and call function
    await deleteWorkplaceById(params);

    getWorkplace();
  };

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

  const check = (workplace) => (
    <FontAwesomeIcon
      icon={faCheck}
      style={{ fontSize: "3vh" }}
      className="corret-mark"
      onClick={() => handleShow(workplace)}
    />
  );

  const wrong = (workplace) => (
    <FontAwesomeIcon
      icon={faXmark}
      style={{ fontSize: "3vh" }}
      onClick={() => handleDelete(workplace?.id)}
      className="Wrong"
    />
  );

  const cancel = {};

  const getWorkplace = async () => {
    await getAllWorkplaceByApprove().then((res) => {
      setLoading(true);
      setCompany(res?.data);
      setLoading(false);
    });
  };

  const columns = [
    {
      name: "ชื่อบริษัท",
      selector: (row) => row?.companyName,
      style: { textAlign: "left" },
      sortable: true,
    },
    {
      name: "จังหวัด",
      selector: (row) => row?.province,
      sortable: true,
    },
    {
      // sortable: true,
      name: "อำเภอ",
      selector: (row) => row?.amphoe,
      sortable: true,
    },

    {
      // sortable: true,
      name: "ตำบล",
      selector: (row) => row?.district,
      sortable: true,
    },
    {
      name: "อนุมัติ / ยกเลิก",
      center: true,
      cell: (row) => (
        <div>
          {check(row)} {wrong(row)}
        </div>
      ),
    },
  ];

  const handleClose = () => {
    setShow(false);
    getWorkplace();
  };

  useEffect(() => {
    getWorkplace();
  }, []);

  return (
    <div>
      <CompanyApproveModalTeacher
        company={companyModal}
        setCompany={setCompanyModal}
        show={show}
        handleClose={handleClose}
        student={student}
        setStudent={setStudent}
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
          title="ระบบจัดการสภานประกอบการ"
          columns={columns}
          data={company}
          expandableRows
          expandableRowsComponent={(value) =>
            value?.data?.latitude && value?.data?.longtitude ? (
              <iframe
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
            ) : (
              <div>คุณยังไม่ได้ใส่ GoogleMap Url</div>
            )
          }
          fixedHeader
          fixedHeaderScrollHeight="80vh"
          //selectableRows
          responsive
          highlightOnHover
          subHeader
          subHeaderAlign={"left"}
          subHeaderComponent={
            <>
              {/* <div style={{ justifyContent: "space-between" }}>
                <input
                  type="text"
                  placeholder="ค้นหาสถานประกอบการ"
                  className="w-100 form-control"
                  value={q}
                  onChange={(e) => SetQ(e.target.value)}
                />
              </div> */}
              {/* <Form.Control type="text" className="" /> */}
              <div>
                {/* <Button
                  className="button-t"
                  onClick={() => {
                    setCreateMode(true);
                    handleShow();
                  }}
                >
                  {create} เพิ่มบริษัท
                </Button> */}
              </div>
            </>
          }
        />
      </Container>
    </div>
  );
}

export default ApproveCompanyTeacher;
