import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRotate, faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Document, Page, pdfjs } from "react-pdf";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import ReactLoading from "react-loading";
import Select from "react-select";
import { useNavigate, useOutletContext } from "react-router-dom";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function Admin() {
  const navigate = useNavigate();
  const [company, setcompany] = useState([]);
  const [add, setadd] = useState(false);
  const [sel, setsel] = useState("");
  const [student, setStudent] = useState("");
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState("/pdf/Hi.pdf");

  const insertcompany = () => {
    addcomp(compdetail);
    setadd(false);
  };
  const handleClose = () => {
    setadd(false);
  };

  const handleShow = () => {
    setadd(true);
  };

  const [removeComp, setremove] = useState(false);
  const rclose = () => {
    setremove(false);
  };
  const rclose2 = () => {
    setremove(false);
    del();
  };

  const editshow = () => seteditCommp(true);
  const [editCommp, seteditCommp] = useState(false);

  const editclose = () => {
    seteditCommp(false);
    console.log(company);
  };

  const rshow = () => setremove(true);
  const [q, SetQ] = useState("");

  const getAddress = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getcompany");
      setcompany(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [compdetail, setcompdetail] = useState({
    distri: "",
    amphoe: "",
    province: "",
    company: "",
    subadd: "",
    username: "",
    password: "",
    add_id: "",
  });

  const Update = () => {
    setadd(false);
    console.log(
      compdetail.distri,
      compdetail.amphoe,
      compdetail.province,
      compdetail.company,
      compdetail.subadd
    );
    axios
      .put("http://localhost:3001/editcompany", {
        district: compdetail.distri,
        amphoe: compdetail.amphoe,
        province: compdetail.province,
        company: compdetail.company,
        username: compdetail.username,
        password: compdetail.password,
        subadd: compdetail.subadd,
        add_id: sel,
      })
      .then((response) => {
        getAddress();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addcomp = (value) => {
    // [req.body.address_id, req.body.province, req.body.amphoe, req.body.district, req.body.zipcode, req.body.subadd]
    axios
      .post("http://localhost:3001/insertaddress", {
        companyname: value.company,
        distri: value.distri,
        amphoe: value.amphoe,
        province: value.province,
        subadd: value.subadd,
      })
      .then(function (response) {
        getAddress();
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(value);
  };

  const onChangedistrict = (selected) => {
    setsel(selected.value);
  };

  const onChangedistrict2 = (index) => {
    setsel(index.value);
    setcompdetail({
      ...compdetail,
      distri: company[index.index].district,
      amphoe: company[index.index].amphoe,
      province: company[index.index].province,
      company: company[index.index].name_company,
      subadd: company[index.index].subadd,
      username: company[index.index].username,
      password: company[index.index].password,
    });
  };

  const del = () => {
    console.log(sel);
    axios
      .delete(`http://localhost:3001/delcompany/${sel}`, {})
      .then(function (response) {
        getAddress();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const check = <FontAwesomeIcon icon={faCheck} className="correct" />;
  const wrong = <FontAwesomeIcon icon={faXmark} className="Wrong" />;
  const checking = <FontAwesomeIcon icon={faRotate} className="Checking" />;

  const options = [];
  for (var i = 0; i < company.length; i++) {
    var obj = {};
    obj["index"] = i;
    obj["value"] = company[i].add_id;
    obj["label"] =
      company[i].name_company +
      " >> " +
      company[i].province +
      " >> " +
      company[i].amphoe +
      " >> " +
      company[i].district;
    options.push(obj);
  }

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
      name: "แก้ไข",
      center: true,
      cell: (row) => (
        <button
          className="btn btn-primary editbutton"
          onClick={() => alert(row.alpha2Code)}
        >
          ตรวจสอบเอกสาร
        </button>
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

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    getAddress();
    getStudent();
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
    // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Container className="tablecustom ">
        <Button variant="primary" onClick={handleShow}>
          เพิ่มสถานประกอบการ
        </Button>
        <Button variant="danger" onClick={rshow}>
          ลบสถานประกอบการ
        </Button>
        <Button variant="success" onClick={editshow}>
          แก้ไข
        </Button>
        <Modal show={editCommp} onHide={editclose}>
          <Modal.Header closeButton>
            <Modal.Title>แก้ไขสถานประกอบการ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>ค้นหาหน่วยงาน</Form.Label>
                <Select
                  options={options}
                  value={options.index}
                  onChange={(e) => onChangedistrict2(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>ชื่อหน่วยงาน</Form.Label>
                <Form.Control
                  placeholder=""
                  value={compdetail.company}
                  onChange={(event) =>
                    setcompdetail({
                      ...compdetail,
                      company: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>บ้านเลขที่</Form.Label>
                <Form.Control
                  placeholder=""
                  value={compdetail.subadd}
                  onChange={(event) =>
                    setcompdetail({ ...compdetail, subadd: event.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>ตำบล</Form.Label>
                <Form.Control
                  type="text"
                  value={compdetail.distri}
                  onChange={(event) =>
                    setcompdetail({ ...compdetail, distri: event.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>อำเภอ</Form.Label>
                <Form.Control
                  type="text"
                  value={compdetail.amphoe}
                  onChange={(event) =>
                    setcompdetail({ ...compdetail, amphoe: event.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>จังหวัด</Form.Label>
                <Form.Control
                  type="text"
                  value={compdetail.province}
                  onChange={(event) =>
                    setcompdetail({
                      ...compdetail,
                      province: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={compdetail.username}
                  onChange={(event) =>
                    setcompdetail({
                      ...compdetail,
                      username: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  value={compdetail.password}
                  onChange={(event) =>
                    setcompdetail({
                      ...compdetail,
                      password: event.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              ยกเลิก
            </Button>
            <Button variant="success" onClick={Update}>
              แก้ไข
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={add} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>เพิ่มสถานประกอบการ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>ชื่อหน่วยงาน</Form.Label>
                <Form.Control
                  placeholder=""
                  value={compdetail.company}
                  onChange={(event) =>
                    setcompdetail({
                      ...compdetail,
                      company: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>ตำบล</Form.Label>
                <Form.Control
                  type="text"
                  value={compdetail.distri}
                  onChange={(event) =>
                    setcompdetail({ ...compdetail, distri: event.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>อำเภอ</Form.Label>
                <Form.Control
                  type="text"
                  value={compdetail.amphoe}
                  onChange={(event) =>
                    setcompdetail({ ...compdetail, amphoe: event.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>จังหวัด</Form.Label>
                <Form.Control
                  type="text"
                  value={compdetail.province}
                  onChange={(event) =>
                    setcompdetail({
                      ...compdetail,
                      province: event.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>บ้านเลขที่</Form.Label>
                <Form.Control
                  placeholder=""
                  value={compdetail.subadd}
                  onChange={(event) =>
                    setcompdetail({ ...compdetail, subadd: event.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              ยกเลิก
            </Button>
            <Button variant="success" onClick={insertcompany}>
              เพิ่ม
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={removeComp} onHide={rclose}>
          <Modal.Header closeButton>
            <Modal.Title>ลบสถานประกอบการ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>ค้นหาหน่วยงาน</Form.Label>
                <Select
                  options={options}
                  value={options.value}
                  onChange={(e) => onChangedistrict(e)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={rclose}>
              ยกเลิก
            </Button>
            <Button variant="warning" onClick={rclose2}>
              ลบ
            </Button>
          </Modal.Footer>
        </Modal>
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
          data={student}
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
        <iframe src="/pdf/Hi.pdf" width="450" height="250"></iframe>
      </Container>
    </div>
  );
}
