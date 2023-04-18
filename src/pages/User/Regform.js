import React, { useState, useEffect, useRef } from "react";
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
import { faTry } from "@fortawesome/free-solid-svg-icons";
import { getCoordinatesFromGoogleMapURL } from "../../utils/utils";

export default function Regform({ user }) {
  // console.log(useContext(UserContext))

  // const { user } = useContext(UserContext);
  const submitRef = useRef();
  const [page, setPage] = useState(0);

  const [formData, setFormData] = useState({
    firstname: undefined || "",
    lastname: undefined || "",
    phoneNumber: undefined || "",
    email: undefined || "",
    weight: undefined || "",
    height: undefined || "",
    idCardNumber: undefined || "",
    latitude: undefined || "",
    longtitude: undefined || "",
  });

  const [newAddress, setNewAddress] = useState({
    district: undefined || "",
    amphoe: undefined || "",
    province: undefined || "",
    zipCode: undefined || "",
    houseNumber: undefined || "",
  });
  const [oldAddress, setOldAddress] = useState({
    district: undefined || "",
    amphoe: undefined || "",
    province: undefined || "",
    zipCode: undefined || "",
    houseNumber: undefined || "",
  });

  const [birthData, setBirthData] = useState({
    age: undefined || "",
    birthDay: undefined || "",
    bloodTypes: undefined || "",
    ethnicity: undefined || "",
    height: undefined || "",
    weight: undefined || "",
    nationality: undefined || "",
    placeOfBirth: undefined || "",
    religion: undefined || "",
  });

  const [father, setFather] = useState({
    firstname: undefined || "",
    lastname: undefined || "",
    job: undefined || "",
  });

  const [mother, setMother] = useState({
    firstname: undefined || "",
    lastname: undefined || "",
    job: undefined || "",
  });

  const [work, setWork] = useState({
    jobTitle: undefined || "",
    jobDetail: undefined || "",
    benefit: undefined || "",
    bossFirstname: undefined || "",
    bossLastname: undefined || "",
    bossPosition: undefined || "",
    phoneNumber: undefined || "",
    email: undefined || "",
    advisorFirstname: undefined || "",
    advisorLastname: undefined || "",
    advisorDepartment: undefined || "",
    advisorPhoneNumber: undefined || "",
    advisorEmail: undefined || "",
    contactStatus: undefined || "",
    workingStatus: undefined || "",
    workplaceId: undefined || "",
    startAt: undefined || "",
    bossDepartment: undefined || "",
  });

  const [workplace, setWorkplace] = useState({
    companyName: undefined || "",
    amphoe: undefined || "",
    district: undefined || "",
    houseNumber: undefined || "",
    province: undefined || "",
    zipCode: undefined || "",
  });

  const [finalWorkplace, setFinalWorkplace] = useState({
    companyName: undefined || "",
    district: undefined || "",
    amphoe: undefined || "",
    province: undefined || "",
    houseNumber: undefined || "",
    googleMapUrl: undefined || "",
  });

  // IDK *****************************************************
  const [jobData, setjobData] = useState({
    position: undefined || "",
    jobDescription: undefined || "",
    welfare: undefined || "",
  });

  const [companyadd, setcompanyadd] = useState({
    bossname: undefined || undefined || "",
    position: undefined || undefined || "",
    department: undefined || undefined || "",
    distri: undefined || undefined || "",
    amphoe: undefined || "",
    province: undefined || "",
    company: undefined || "",
    subadd: undefined || "",
  });
  // IDK *****************************************************

  const FormTitles = [
    "ใบสมัครโครงการสหกิจศึกษามหาวิทยาลัยราชภัฏนครราชสีมา",
    "รายละเอียดงานที่ไปปฏิบัติ",
    "สถานประกอบการที่ต้องการไปปฏิบัติสหกิจศึกษา",
    undefined || "",
  ];

  // update logic
  const handleUpdateStudent = async () => {
    try {
      const { status } = await axios.put();
    } catch (error) {}
  };

  const api = `${process.env.REACT_APP_UPLOAD_HOST}/${process.env.REACT_APP_API_PATH}/`;

  const getUser = async () => {
    try {
      await axios.get(`${api}`).then(function (res) {
        if (res.data.data.student) {
          console.log(res.data.data.student);
          setFormData(res.data.data.student);
          setBirthData(res.data.data.student.Birth);
          setFather(res.data.data.student.Father);
          setMother(res.data.data.student.Mother);
          setWork(res.data.data.student.Work);
          setOldAddress(res.data.data.student.oldAddress);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getCompany = async (callback) => {
    try {
      const res = await axios.get(`${api}/workplace/get-all-workplace`);
      setWorkplace(res.data.data);
      if (callback) {
        callback(null, res.data.data);
      }
    } catch (error) {
      console.log(error);
      if (callback) {
        callback(error, null);
      }
    }
  };

  useEffect(() => {
    getUser();

    getCompany();
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
          <Form id="my-form" onSubmit={console.log("you Submit already")}>
            {page === 0 ? (
              <Form2
                user={user}
                formData={formData}
                setFormData={setFormData}
                setBirthData={setBirthData}
                birthData={birthData}
                father={father}
                setFather={setFather}
                mother={mother}
                setMother={setMother}
                setNewAddress={setNewAddress}
                newAddress={newAddress}
                oldAddress={oldAddress}
                setOldAddress={setOldAddress}
              />
            ) : page === 1 ? (
              <Form3
                work={work}
                setWork={setWork}
                workplace={workplace}
                finalWorkplace={finalWorkplace}
                setFinalWorkplace={setFinalWorkplace}
                setFormData={setFormData}
              />
            ) : page === 2 ? (
              <Form4
                formData={formData}
                setFormData={setFormData}
                setcompanyadd={setcompanyadd}
                companyadd={companyadd}
              />
            ) : (
              <Form5 formData={formData} submitRef={submitRef} />
            )}
          </Form>
        </Container>
      </div>
      <div className="footer">
        <Button
          // disabled={page == 0 || page == 1}
          disabled={page === 0}
          onClick={() => {
            setPage((currPage) => currPage - 1);
          }}
        >
          ย้อนกลับ
        </Button>

        {page === FormTitles.length - 1 ? (
          <Button onClick={() => submitRef.current.click()}>
            ยืนยันนนนนนนน
          </Button>
        ) : (
          <Button
            className="mt-5 mb-5"
            disabled={page === FormTitles.length - 1}
            onClick={() => {
              // if (page === FormTitles.length - 1) {
              //   if (
              //     formData &&
              //     work &&
              //     mother &&
              //     father &&
              //     birthData &&
              //     finalWorkplace &&
              //     newAddress
              //   )
              //     return console.log({
              //       stu: formData,
              //       work: work,
              //       mother: mother,
              //       father: father,
              //       birth: birthData,
              //       latlong: getCoordinatesFromGoogleMapURL(
              //         finalWorkplace?.googleMapUrl
              //       ),
              //       newAddress: newAddress,
              //     });
              //   console.log("Nah");}
              if (page === 0) {
                setPage((currPage) => currPage + 1);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "ยืนยัน" : "ต่อไป"}
          </Button>
        )}

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
