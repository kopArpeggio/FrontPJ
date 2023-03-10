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

import { deleteTeacherById, getAllTeacher } from "../../apis/teacherApi";
import TeacherModal from "./Modal/TeacherModal";
import { getAllBranchByStatus } from "../../apis/branchAPi";

function TeacherManagement() {
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalTeacher, setModalTeacher] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [show, setShow] = useState(false);
  const [branch, setBranch] = useState([]);

  const handleShow = (param) => {
    setShow(true);
    setModalTeacher(param);
  };

  const handleClose = () => {
    setShow(false);
    setCreateMode(false);
    getTeacher();
  };

  // Delete Logic
  const handleDelete = async (params) => {
    setLoading(true);

    // Logic Here and call function
    await deleteTeacherById(params?.id);

    getTeacher();
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
      name: "????????????????????????",
      selector: (row) => row?.firstname,
      sortable: true,
      center: true,
    },
    {
      name: "?????????????????????",
      selector: (row) => row?.lastname,
      sortable: true,
      center: true,
    },

    {
      name: "????????????",
      selector: (row) => row?.branchName,
      sortable: true,
      center: true,
    },
    {
      name: "?????????",
      selector: (row) => row?.facultyName,
      sortable: true,
      center: true,
    },

    {
      name: "??????????????? / ??????",
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
      "???????????? : " +
      branch[i]?.branchName +
      "  |  " +
      "????????? : " +
      branch[i]?.facultyName;
    options.push(obj);
  }

  return (
    <div>
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
          title="???????????????????????????????????????"
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
                  placeholder="???????????????????????????????????????"
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
                  {create} ????????????????????????????????????
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
