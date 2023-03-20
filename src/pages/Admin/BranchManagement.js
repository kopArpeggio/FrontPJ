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
import { getAllFacultyByStatus } from "../../apis/facultyApi";
import {
  deleteBranchById,
  getAllBranch,
  updateBranchById,
} from "../../apis/branchAPi";
import BranchModal from "./Modal/BranchModal";
import { sweetAlertSubmit, sweetAlertSuccess } from "../../swal2/swal2";

function BranchManagement() {
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

  // Delete Logic
  const handleDelete = async (params) => {
    // Logic Here and call function
    sweetAlertSubmit(null, "ต้องการลบสาขาหรือไม่ !").then(async (result) => {
      if (result?.isConfirmed) {
        setLoading(true);
        const done = await deleteBranchById(params.id);
        if (done) {
          getBranch();
          sweetAlertSuccess("ลบสาขาสำเร็จ !");
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

  const getBranch = async () => {
    await getAllBranch().then((res) => {
      setLoading(true);
      setBranch(res?.data);
      setLoading(false);
    });
  };

  const columns = [
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
          {/* {row.status_id === 2 ? check : row.status_id === 1 ? wrong : checking} */}
          <Form.Check
            type="switch"
            onChange={(event) => handleStatus(event?.target?.checked, row)}
            checked={row.status}
          />
        </div>
      ),
    },
  ];

  // Change Status Logic
  const handleStatus = async (status, branch) => {
    const statusBody = {
      ...branch,
      status,
    };
    await updateBranchById(statusBody);
    getBranch();
  };

  const getFaculty = async () => {
    getAllFacultyByStatus().then((res) => {
      setFaculty(res?.data);
    });
  };

  useEffect(() => {
    getFaculty();
    getBranch();
  }, []);

  const Searchtest = (rows) => {
    return rows?.filter((row) => row?.branchName.toLowerCase().indexOf(q) > -1);
  };

  const options = [];
  for (var i = 0; i < faculty?.length; i++) {
    var obj = {};
    obj["value"] = i;
    obj["label"] = "คณะ : " + faculty[i]?.facultyName;
    options.push(obj);
  }

  return (
    <div>
      {/* <CompanyModal
        show={show}
        company={modalCompany}
        setCompany={setModalCompany}
        handleClose={handleClose}
        createMode={createMode}
        setCreateMode={setCreateMode}
        options={options}
        address={address}
      /> */}

      <BranchModal
        show={show}
        options={options}
        handleClose={handleClose}
        createMode={createMode}
        faculty={faculty}
        branch={modalBranch}
        setBranch={setModalBranch}
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
          title="การจัดการข้อมูลสาขาวิชา"
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
              <div style={{ justifyContent: "space-between" }}>
                <input
                  type="text"
                  placeholder="ค้นหาสาขา"
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
                  {create} เพิ่มสาขา
                </Button>
              </div>
            </>
          }
        />
      </Container>
    </div>
  );
}

export default BranchManagement;
