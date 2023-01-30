import axios from "axios";
import React, { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import TestNav from "../../components/TestNav";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Jobdesc() {
    const [company, setcompany] = useState([]);
    const [userinfo, setUserinfo] = useState('');
    const [companyadd, setcompanyadd] = useState({

        interviewname: "",
        Email: "",
        interviewpos: "",
        interviewdept: "",
        tel: "",

        position: "",
        descrip: "",
        benefit: "",

        bossname: "",
        bosspos: "",
        bossdept: "",

        company_id: "",
        user_id: ""


    });

    const getAddress = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getcompany')
            setcompany(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAddress();
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
                    axios.get(`http://localhost:3001/testrole/${data.decoded.username}`, {
                    })
                        .then(function (response) {
                           
                            setUserinfo(response.data.results)
                            console.log(response.data.results)

                        })
                        .catch(function (error) {
                            console.log(error);
                        })



                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }, [])

    const onChangedistrict = (value) => {

        setcompanyadd({
            ...companyadd, company: company[value.value].name_company,
            distri: company[value.value].district,
            amphoe: company[value.value].amphoe,
            province: company[value.value].province,
            subadd: company[value.value].subadd,
            company_id: company[value.value].company_id

        })
    }
    const save = () => {

        console.log(companyadd)

    }
    const options = [];
    for (var i = 0; i < company.length; i++) {

        var obj = {};
        obj['value'] = i;
        obj['label'] = company[i].name_company + ' >> ' + company[i].province + ' >> ' + company[i].amphoe + " >> " + company[i].district;
        options.push(obj);
    }
    return (
        <div>
            <Container>
                <TestNav />
                <h1 style={{ marginTop: 200, marginBottom: 50 }}>รายละเอียดงาน</h1>
                <Row className="mb-3 mt-5 ">
                    <Form.Group as={Col} sm='4' >
                        <Form.Label>ชื่อตำแหน่งที่เข้าฝึกงาน</Form.Label>
                        <Form.Control type="text" placeholder="Programmer"
                            //   value={jobData.position}
                            //     onChange={(event) =>
                            //       setjobData({ ...jobData, position: event.target.value })
                            //     }
                            value={companyadd.position}
                            onChange={(event) =>
                                setcompanyadd({ ...companyadd, position: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group as={Col} sm='8' >
                        <Form.Label>รายละเอียดลักษณะงาน</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="ถ่ายเอกสาร ถูพื้น ล้างจาน ตัดต่อวีดีโอ ตัดย่า"
                            value={companyadd.descrip}
                            onChange={(event) =>
                                setcompanyadd({ ...companyadd, descrip: event.target.value })
                            }
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3 mt-4 ">
                    <Form.Group as={Col} sm='12' >
                        <Form.Label>สวัสดิการจากสถานประกอบการที่ได้รับ (ถ้ามี)</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="เงิน ประกัน เบิกค่ารถ "
                            value={companyadd.benefit}
                            onChange={(event) =>
                                setcompanyadd({ ...companyadd, benefit: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Label className="col-form-label-lg">ผู้จัดการทั่วไป/ผู้จัดการโรงงาน/ผู้ได้รับมอบหมายให้ประสานงาน</Form.Label>
                    <Form.Group as={Col} sm='6' >
                        <Form.Label>ชื่อหัวหน้าหน่วยงาน</Form.Label>
                        <Form.Control placeholder="" value={companyadd.bossname}
                            onChange={(event) =>
                                setcompanyadd({ ...companyadd, bossname: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group as={Col} sm='4' >
                        <Form.Label>ตำแหน่ง</Form.Label>
                        <Form.Control placeholder="" value={companyadd.bosspos}
                            onChange={(event) =>
                                setcompanyadd({ ...companyadd, bosspos: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group as={Col} sm='2' >
                        <Form.Label>แผนก/ฝ่าย</Form.Label>
                        <Form.Control placeholder="" value={companyadd.bossdept}
                            onChange={(event) =>
                                setcompanyadd({ ...companyadd, bossdept: event.target.value })
                            }
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3 mt-5 ">
                    <Form.Group as={Col} sm='8' >
                        <Form.Label>ค้นหาหน่วยงาน</Form.Label>
                        <Select options={options} value={options.value} onChange={(e) => onChangedistrict(e)} />
                    </Form.Group>
                </Row>
                <Row className="mb-3 mt-5 ">
                    <Form.Group as={Col} sm='8' >
                        <Form.Label>ชื่อหน่วยงาน</Form.Label>
                        <Form.Control placeholder="" value={companyadd.company} disabled />
                    </Form.Group>
                    <Form.Group as={Col} sm='4' >
                        <Form.Label>บ้านเลขที่</Form.Label>
                        <Form.Control placeholder="" value={companyadd.subadd} disabled />
                    </Form.Group>

                </Row>

                <Row className="mb-3 mt-5 ">
                    <Row className=" ">
                    </Row>
                    <Form.Group as={Col} sm='3' >
                        <Form.Label>ตำบล</Form.Label>
                        <Form.Control type="text" disabled value={companyadd.distri} />
                    </Form.Group>
                    <Form.Group as={Col} sm='3' >
                        <Form.Label>อำเภอ</Form.Label>
                        <Form.Control type="text" disabled value={companyadd.amphoe} />
                    </Form.Group>
                    <Form.Group as={Col} sm='3' >
                        <Form.Label>จังหวัด</Form.Label>
                        <Form.Control type="text" disabled value={companyadd.province} />
                    </Form.Group>
                </Row>

                <Row className="mb-3 mt-4 ">

                    <Form.Label className="col-form-label-lg">บุคคลในสถานประกอบการที่นักศึกษาติดต่อสำหรับการปฏิบัติงานสหกิจศึกษา</Form.Label>
                    <Form.Group as={Col} sm='6' >
                        <Form.Label>ชื่อ-สกุล</Form.Label>
                        <Form.Control placeholder=""
                            value={companyadd.interviewname}
                            onChange={(event) =>
                                setcompanyadd({ ...companyadd, interviewname: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group as={Col} sm='4' >
                        <Form.Label>ตำแหน่ง</Form.Label>
                        <Form.Control placeholder=""
                            value={companyadd.interviewpos}
                            onChange={(event) =>
                                setcompanyadd({ ...companyadd, interviewpos: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group as={Col} sm='2' >
                        <Form.Label>แผนก/ฝ่าย</Form.Label>
                        <Form.Control placeholder=""
                            value={companyadd.interviewdept}
                            onChange={(event) =>
                                setcompanyadd({ ...companyadd, interviewdept: event.target.value })
                            }
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3 mt-4 ">
                    <Form.Group as={Col} sm='4' >
                        <Form.Label>โทรศัพท์</Form.Label>
                        <Form.Control placeholder=""
                            value={companyadd.tel}
                            onChange={(event) =>
                                setcompanyadd({ ...companyadd, tel: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group as={Col} sm='8' >
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control placeholder=""
                            value={companyadd.Email}
                            onChange={(event) =>
                                setcompanyadd({ ...companyadd, Email: event.target.value })
                            }
                        />
                    </Form.Group>
                </Row>

                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="มีการติดต่อและได้รับการตอบกลับ"
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                        />
                        <Form.Check
                            inline
                            label="มีการติดต่อและอยู่ระหว่างรอการตอบกลับ"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                        />
                        <Form.Check
                            inline
                            label="ยังไม่ได้ติดต่อ"
                            name="group1"
                            type={type}
                            id={`inline-${type}-3`}
                        />
                    </div>
                ))}
                <Button variant="success" onClick={save} style={{ marginBottom: 80 }} >บันทึกข้อมูล</Button>
            </Container>
        </div>
    )
}

export default Jobdesc