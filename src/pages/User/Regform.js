import React, { useState, useEffect } from "react";
import Form2 from "./Subregform2";
import Form3 from "./Subregform3";
import Form4 from "./Subregform4";
import Form1 from "./Subregform1";
import Form5 from "./Subregform5";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from "axios";
import TestNav from "../../components/TestNav";
import PDFFile from "../../components/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function Regform({ user }) {
  // console.log(useContext(UserContext))

  // const { user } = useContext(UserContext);

  const [page, setPage] = useState(0);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    weight: "",
    height: "",
    idCardNumber: "",
  });

  const [birthData, setBirthData] = useState({
    age: "",
    birthDay: "",
    bloodTypes: "",
    ethnicity: "",
    height: "",
    weight: "",
    nationality: "",
    placeOfBirth: "",
    religion: "",
  });

  const [father, setFather] = useState({
    firstname: "",
    lastname: "",
    job: "",
  });

  const [mother, setMother] = useState({
    firstname: "",
    lastname: "",
    job: "",
  });

  const [work, setWork] = useState({
    jobTitle: "",
    jobDetail: "",
    benefit: "",
    bossFirstname: "",
    bossLastname: "",
    bossPosition: "",
    phoneNumber: "",
    email: "",
    advisorFirstname: "",
    advisorLastname: "",
    advisorDepartment: "",
    advisorPhoneNumber: "",
    advisorEmail: "",
    contactStatus: "",
    workingStatus: "",
    workplaceId: "",
    startAt: "",
    bossDepartment: "",
  });

  const [workplace, setWorkplace] = useState({
    companyName: "",
  });

  const [workplaceAddress, setWorkplaceAddress] = useState({
    amphoe: "",
    district: "",
    houseNumber: "",
    latitude: "",
    longtitude: "",
    province: "",
    zipCode: "",
  });

  // IDK *****************************************************
  const [jobData, setjobData] = useState({
    position: "",
    jobDescription: "",
    welfare: "",
  });
  const [houseregis, sethouseregis] = useState({
    distri: "",
    amphoe: "",
    province: "",
    zipcode: "",
  });
  const [companyadd, setcompanyadd] = useState({
    bossname: "",
    position: "",
    department: "",
    distri: "",
    amphoe: "",
    province: "",
    company: "",
    subadd: "",
  });
  // IDK *****************************************************

  const FormTitles = [
    "หน้าแรก",
    "ใบสมัครโครงการสหกิจศึกษามหาวิทยาลัยราชภัฏนครราชสีมา",
    "รายละเอียดงานที่ไปปฏิบัติ",
    "สถานประกอบการที่ต้องการไปปฏิบัติสหกิจศึกษา",
    "",
  ];

  const api = "http://localhost:3001/api/";

  async function getUser() {
    try {
      await axios.get(`${api}`).then(function (res) {
        if (res.data.data.student) {
          console.log(res.data.data.student);
          setFormData(res.data.data.student);
          setBirthData(res.data.data.student.Birth);
          setFather(res.data.data.student.Father);
          setMother(res.data.data.student.Mother);
          setWork(res.data.data.student.Work);
          setWorkplace(res.data.data.student.Work.Workplace);
          setWorkplaceAddress(res.data.data.student.Work.Workplace.Address);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {/* <TestNav /> */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="header mt-5">
        <h1>{FormTitles[page]}</h1>
      </div>
      <div className="body">
        <Container>
          <Form>
            {page === 0 ? (
              <Form2
                user={user}
                formData={formData}
                setFormData={setFormData}
                sethouseregis={sethouseregis}
                houseregis={houseregis}
                setBirthData={setBirthData}
                birthData={birthData}
                father={father}
                setFather={setFather}
                mother={mother}
                setMother={setMother}
              />
            ) : page === 1 ? (
              <Form3
                work={work}
                setWork={setWork}
                workplace={workplace}
                workplaceAddress={workplaceAddress}
                setWorkplaceAddress={setWorkplaceAddress}
              />
            ) : page === 2 ? (
              <Form4
                formData={formData}
                setFormData={setFormData}
                setcompanyadd={setcompanyadd}
                companyadd={companyadd}
              />
            ) : (
              <Form5 formData={formData} houseregis={houseregis} />
            )}
          </Form>
        </Container>
      </div>
      <div className="footer">
        <Button
          // disabled={page == 0 || page == 1}
          disabled={page == 0}
          onClick={() => {
            setPage((currPage) => currPage - 1);
          }}
        >
          ย้อนกลับ
        </Button>

        <Button
          className="mt-5 mb-5"
          onClick={() => {
            if (page === FormTitles.length - 1) {
              alert("เอาไว้ก่อน");
              console.log(formData);
            } else if (page === 0) {
              setPage((currPage) => currPage + 1);
            } else {
              setPage((currPage) => currPage + 1);
            }
          }}
        >
          {page === FormTitles.length - 1 ? "ยืนยัน" : "ต่อไป"}
        </Button>

        {page === FormTitles.length - 1 ? (
          <div>
            <PDFDownloadLink document={<PDFFile />} fileName="FORM">
              {({ loading }) =>
                loading ? (
                  <button> Loading Document ...</button>
                ) : (
                  <Button>Download PDF</Button>
                )
              }
            </PDFDownloadLink>
          </div>
        ) : (
          ""
        )}

        {/* <Button onClick={() => {
                    <PDFDownloadLink document={<PDFFile />} fileName="FORM">
                        {({ loading }) => (loading ? <button> Loading Document ...</button> : 'Download')}
                    </PDFDownloadLink>
                }}>
                    {page === FormTitles.length - 1 ? "Download PDF" : console.log('')}
                </Button> */}
      </div>
    </div>
  );
}
