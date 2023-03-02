import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import React, { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {
  faCheck,
  faRotate,
  faXmark,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { getAllWorkplace } from "../../apis/workplaceApi";
import AdminModal from "./Modal/AdminModal";

export default function Admin() {
  const [company, setcompany] = useState([]);

  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalStudent, setModalStudent] = useState("");
  const [show, setShow] = useState(false);

  const handleShow = (param) => {
    setShow(true);
    setModalStudent(param);
    console.log(param);
  };

  const handleClose = () => setShow(false);

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
            handleShow(param);
          }}
          className="tableAction"
        />
      </>
    );
  };
  const check = <FontAwesomeIcon icon={faCheck} className="correct" />;
  const wrong = <FontAwesomeIcon icon={faXmark} className="Wrong" />;
  const checking = <FontAwesomeIcon icon={faRotate} className="Checking" />;

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
  };

  const getStudent = async () => {
    const api = "http://localhost:3001/api/";
    try {
      const res = await axios.get(`${api}/student/get-all-student`);
      console.log(res.data.data);
      setStudent(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "ชื่อจริง",
      selector: (row) => row.firstname,
      sortable: true,
      center: true,
    },
    {
      name: "นามสกุล",
      selector: (row) => row.lastname,
      sortable: true,
      center: true,
    },
    {
      name: "สาขาวิชา",
      selector: (row) => row.faculty,
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
          {row.status_id === 2 ? check : row.status_id === 1 ? wrong : checking}

          {/* {role.role == 'Admin' 
            ? (<Admin />) 
            :  role.role =='User'
            ? (<User/>)
            : <User/>
            } */}
        </div>
      ),
    },
  ];

  // const onDocumentLoadSuccess = (numPages) => {
  //   setNumPages(numPages);
  // };

  useEffect(() => {
    getStudent();
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
    getAllWorkplace().then((res) => {
      console.log(res);
    });
  }, []);

  function Searchtest(rows) {
    return rows.filter(
      (row) =>
        row.firstname.toLowerCase().indexOf(q) > -1 ||
        row.lastname.toLowerCase().indexOf(q) > -1
    );
  }

  return (
    <div>
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
          title="จัดการนักศึกษา"
          className=" "
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
          subHeaderComponent={
            <input
              type="text"
              placeholder="ค้นหานักศึกษา"
              className="w-25 form-control "
              value={q}
              onChange={(e) => SetQ(e.target.value)}
            />
          }
          subHeaderAlign="left"
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
        <AdminModal show={show} handleClose={handleClose} />
      </Container>
    </div>
  );
}
