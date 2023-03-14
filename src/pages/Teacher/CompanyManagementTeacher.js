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
import {
  deleteWorkplaceById,
  getAllWorkplace,
  updateWorkplaceById,
} from "../../apis/workplaceApi";
import { Form } from "react-bootstrap";
import CompanyManagementTeacherModal from "./Modal/CompanyManagementTeacherModal"; 

function CompanyManagementTeacher() {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalCompany, setModalCompany] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState([]);

  const handleShow = (param) => {
    setShow(true);
    setModalCompany(param);
  };

  const handleClose = () => {
    setShow(false);
    setCreateMode(false);
    getWorkplace();
  };

  // Delete Logic
  const handleDelete = async (params) => {
    setLoading(true);

    // Logic Here and call function
    await deleteWorkplaceById(params.id);

    getWorkplace();
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

  const getWorkplace = async () => {
    await getAllWorkplace().then((res) => {
      setLoading(true);
      setCompany(res?.data);
      setLoading(false);
    });
  };

  const columns = [
    {
      name: "ชื่อบริษัท",
      selector: (row) => row?.companyName,
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
  const handleStatus = async (status, company) => {
    const statusBody = {
      ...company,
      status,
    };
    await updateWorkplaceById(statusBody);
    getWorkplace();
  };

  const fetchAPI = async () => {
    await fetch(
      "https://gist.githubusercontent.com/ChaiyachetU/a72a3af3c6561b97883d7af935188c6b/raw/0e9389fa1fc06b532f9081793b3e36db31a1e1c6/thailand.json"
    )
      .then((response) => response.json())
      .then((result) => {
        setAddress(result);
      });
  };

  useEffect(() => {
    fetchAPI();
    getWorkplace();
  }, []);

  const options = [];
  for (var i = 0; i < address.length; i++) {
    var obj = {};
    obj["value"] = i;
    obj["label"] =
      address[i].district +
      " >> " +
      address[i].amphoe +
      " >> " +
      address[i].province;
    options.push(obj);
  }

  const Searchtest = (rows) => {
    return rows?.filter(
      (row) => row?.companyName.toLowerCase().indexOf(q) > -1
    );
  };

  return (
    <div>
      <CompanyManagementTeacherModal
        show={show}
        company={modalCompany}
        setCompany={setModalCompany}
        handleClose={handleClose}
        createMode={createMode}
        options={options}
        address={address}
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
          title="จัดการสภานประกอบการ"
          columns={columns}
          data={Searchtest(company)}
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
                  {create} เพิ่มบริษัท
                </Button>
              </div>
            </>
          }
        />
      </Container>
    </div>
  );
}

export default CompanyManagementTeacher;
