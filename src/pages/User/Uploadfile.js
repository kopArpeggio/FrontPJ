import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { Accordion, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import TestNav from "../../components/TestNav";
import "./../../upload.css";
import { sweetAlertSubmit, sweetAlertSuccess } from "../../swal2/swal2";
import { uploadStudentDocumentFile } from "../../apis/uploadApi";
import { getData } from "../../apis/rootApi";
import { updateStudentById } from "../../apis/studentApi";

export default function Uploadfile() {
  const [files, setFiles] = useState({
    fcn1: "",
    fcn2: "",
    file4: "",
    regis: "",
  });
  const [isLoading, setLoading] = useState();
  const [user, setUser] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    sweetAlertSubmit().then(async (result) => {
      if (result?.isConfirmed) {
        setLoading(true);

        const filesPath = await uploadStudentDocumentFile(files);
        filesPath.id = files?.id;
        if (filesPath) {
          const stu = {
            id: user?.id,
          };
          const { status } = await updateStudentById({
            stu,
            pdfFile: filesPath,
          });
          if (status) {
            sweetAlertSuccess();
          }
        }
      }
    });
  };

  useEffect(() => {
    getData().then((res) => {
      setUser(res?.data?.student);
      setFiles(res?.data?.student?.Pdffile);
      console.log(res?.data?.student?.Pdffile);
    });
  }, []);

  return (
    <div>
      <h3 className="mb-3">โปรดอัพโหลดเอกสารตามที่ระบุ</h3>

      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Accordion defaultActiveKey={["0", "1", "2", "3"]} alwaysOpen>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              แบบสำรวจการคัดกรองข้อมูลสหกิจศึกษา
            </Accordion.Header>
            <Accordion.Body>
              <Form.Group className="mb-5 text box " style={{ width: "80%" }}>
                <Form.Label
                  as={Col}
                  style={{ fontSize: "3vh" }}
                  className="mb-3"
                >
                  แบบสำรวจการคัดกรองข้อมูลสหกิจศึกษา{" "}
                </Form.Label>
                <div className="flex">
                  <Form.Control
                    type="file"
                    size="lg"
                    accept=".pdf"
                    className=""
                    disabled={
                      user?.documentStatus === "0"
                        ? true
                        : user?.documentStatus === "8"
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      setFiles({ ...files, file4: e?.target?.files[0] })
                    }
                  />
                </div>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              FCn 1 แบบแจ้งรายละเอียดที่พักระหว่างการปฏิบัติงานสหกิจศึกษา
            </Accordion.Header>
            <Accordion.Body>
              <Form.Group className="mb-5 text box " style={{ width: "80%" }}>
                <Form.Label
                  as={Col}
                  style={{ fontSize: "3vh" }}
                  className="mb-3"
                >
                  FCn 1 แบบแจ้งรายละเอียดที่พักระหว่างการปฏิบัติงานสหกิจศึกษา{" "}
                </Form.Label>
                <div className="flex">
                  <Form.Control
                    type="file"
                    size="lg"
                    accept=".pdf"
                    className=""
                    disabled={
                      user?.documentStatus === "0"
                        ? true
                        : user?.documentStatus === "8"
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      setFiles({ ...files, fcn1: e?.target?.files[0] })
                    }
                  />
                </div>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              FCn 2 แบบแจ้งโครงร่างรายงานการปฏิบัติงาน
            </Accordion.Header>
            <Accordion.Body>
              <Form.Group className="mb-5 text box " style={{ width: "80%" }}>
                <Form.Label
                  as={Col}
                  style={{ fontSize: "3vh" }}
                  className="mb-3"
                >
                  FCn 2 แบบแจ้งโครงร่างรายงานการปฏิบัติงาน{" "}
                </Form.Label>
                <div className="flex">
                  <Form.Control
                    type="file"
                    size="lg"
                    accept=".pdf"
                    className=""
                    disabled={
                      user?.documentStatus === "0"
                        ? true
                        : user?.documentStatus === "8"
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      setFiles({ ...files, fcn2: e?.target?.files[0] })
                    }
                  />
                </div>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Button
          className="mt-5"
          size="lg"
          as="input"
          type="submit"
          value="อัพโหลดเอกสาร"
        />
      </Form>
    </div>
  );
}
