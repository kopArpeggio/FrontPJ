import React, { useState, useEffect } from 'react'
import Form2 from "./Subregform2";
import Form3 from "./Subregform3";
import Form4 from "./Subregform4";
import Form1 from "./Subregform1";
import Form5 from "./Subregform5";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from '../ContextStudent'


export default function Regform() {

    // console.log(useContext(UserContext))

    // const { user } = useContext(UserContext);

    const [user, setUser] = useState('');
    const [page, setPage] = useState(0);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phoneNum: "",
        email: "",
        fathername: "",
        fatherjob: "",
        mothername: "",
        motherjob: "",
        district: "",
        amphoe: "",
        province: "",
        zipcode: "",
        weight: "",
        height: ""

    });
    const [jobData, setjobData] = useState({
        position: "",
        jobDescription: "",
        welfare: ""

    });
    const [houseregis, sethouseregis] = useState({
        distri: "",
        amphoe: "",
        province: "",
        zipcode: ""

    });
    const [companyadd, setcompanyadd] = useState({
        distri: "",
        amphoe: "",
        province: "",
        company: "",
        subadd: ""

    });

    const FormTitles = ["หน้าแรก", "ใบสมัครโครงการสหกิจศึกษามหาวิทยาลัยราชภัฏนครราชสีมา", "รายละเอียดงานที่ไปปฏิบัติ", "สถานประกอบการที่ต้องการไปปฏิบัติสหกิจศึกษา", ""];


    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:3001/authen', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == "ok") {
                    axios.get(`http://localhost:3001/test3/${data.decoded.username}`, { 
                    })
                        .then(function (response) {
                            setUser(response.data)
                        })
                        .catch(function (error) {
                            console.log(error);
                        })

                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }, []);



    return (
        <div>



            <div className="header">
                <h1>{FormTitles[page]}</h1>
            </div>
            <div className="body">
                <Container>
                    <Form>
                        {page === 0
                            ? <Form1 formData={formData} setFormData={setFormData} />
                            : (page === 1)
                                ? <Form2 formData={formData} setFormData={setFormData} sethouseregis={sethouseregis} houseregis={houseregis} />
                                : (page === 2)
                                    ? <Form3 jobData={jobData} setjobData={setjobData} />
                                    : (page === 3)
                                        ? <Form4 formData={formData} setFormData={setFormData} setcompanyadd={setcompanyadd} companyadd={companyadd} />
                                        : <Form5 formData={formData} houseregis={houseregis} />
                        }
                    </Form>
                </Container>
            </div>
            <div className="footer">

                <Button disabled={page == 0 || page == 1}
                    onClick={() => {
                        setPage((currPage) => currPage - 1);
                    }}>
                    ย้อนกลับ
                </Button>

                <Button className="mt-5 mb-5" onClick={() => {
                    if (page === FormTitles.length - 1) {
                        alert("เอาไว้ก่อน");
                        console.log(formData);
                    } else if (page === 0) {
                        setFormData({ ...formData, firstname: user[0].username, lastname: user[0].user_id })
                        console.log('yes')
                        setPage((currPage) => currPage + 1);
                    }
                    else {
                        setPage((currPage) => currPage + 1);
                    }
                }}>

                    {page === FormTitles.length - 1 ? "ยืนยัน" : "ต่อไป"}
                </Button>


            </div>

        </div>
    );
}