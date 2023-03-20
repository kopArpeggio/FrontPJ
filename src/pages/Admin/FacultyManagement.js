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

import { Form } from "react-bootstrap";
import {
  deleteFacultyById,
  getAllFaculty,
  updateFacultyById,
} from "../../apis/facultyApi";
import FacultyModal from "./Modal/FacultyModal";
import { sweetAlertSubmit, sweetAlertSuccess } from "../../swal2/swal2";

function FacultyManagement() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalFaculty, setModalFaculty] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = (param) => {
    setShow(true);
    setModalFaculty(param);
  };

  const handleClose = () => {
    setShow(false);
    setCreateMode(false);
    getFaculty();
  };

  // Delete Logic
  const handleDelete = async (params) => {
    // Logic Here and call function
    sweetAlertSubmit(null, "ต้องการลบคณะหรือไม่ !").then(async (result) => {
      if (result?.isConfirmed) {
        setLoading(true);
        const done = await deleteFacultyById(params.id);
        if (done) {
          sweetAlertSuccess("ลบคณะสำเร็จ !")
          getFaculty();
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

  const getFaculty = async () => {
    await getAllFaculty().then((res) => {
      setLoading(true);
      setFaculty(res?.data);
      setLoading(false);
    });
  };

  const columns = [
    {
      name: "ชื่อคณะ",
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
          {/* {row.status_id === 2 ? check : row.status_id === 1 ? wrong : checking} */}
          <Form.Check
            type="switch"
            onChange={(event) => handleStatus(event?.target?.checked, row)}
            checked={row?.status}
          />
        </div>
      ),
    },
  ];

  // Change Status Logic
  const handleStatus = async (status, faculty) => {
    const statusBody = {
      ...faculty,
      status,
    };
    await updateFacultyById(statusBody);
    getFaculty();
  };

  useEffect(() => {
    getFaculty();
  }, []);

  const Searchtest = (rows) => {
    return rows?.filter(
      (row) => row?.facultyName.toLowerCase().indexOf(q) > -1
    );
  };

  return (
    <div>
      <FacultyModal
        show={show}
        faculty={modalFaculty}
        setFaculty={setModalFaculty}
        handleClose={handleClose}
        createMode={createMode}
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
          title="การจัดข้อมูลคณะ"
          columns={columns}
          data={Searchtest(faculty)}
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
              <div style={{ justifyContent: "space-between" }}>
                <input
                  type="text"
                  placeholder="ค้นหาคณะ"
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
                  {create} เพิ่มคณะ
                </Button>
              </div>
            </>
          }
        />
      </Container>
    </div>
  );
}

export default FacultyManagement;
