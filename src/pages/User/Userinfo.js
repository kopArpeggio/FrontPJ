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

function Userinfo() {
    const [user, setUser] = useState('');
    const [address, setAddress] = useState([]);
    const getAddress = async () => {
        try {
            const response = await axios.get('https://gist.githubusercontent.com/ChaiyachetU/a72a3af3c6561b97883d7af935188c6b/raw/0e9389fa1fc06b532f9081793b3e36db31a1e1c6/thailand.json')
            setAddress(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const options = [];
    for (var i = 0; i < address.length; i++) {

        var obj = {};
        obj['value'] = i;
        obj['label'] = address[i].district + " >> " + address[i].amphoe + " >> " + address[i].province;
        options.push(obj);
    }
    const getUser = () => {
        axios.get(`http://localhost:3001/testsingleuser`, {
        })
            .then(function (response) {
                Setprofile({
                    ...profile, phonenumber: response.data.results[0].tel,
                    weight: response.data.results[0].weight,
                    height: response.data.results[0].height,
                    Email: response.data.results[0].Email,
                    activitie: response.data.results[0].activitie
                })
                setUser(response.data.results[0])
                console.log(response.data.results[0])
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const onChangedistrict = (district) => {
        sethouseregis({
            ...houseregis, distri: address[district.value].district,
            amphoe: address[district.value].amphoe,
            province: address[district.value].province,
            zipcode: address[district.value].zipcode

        })
    }

    const Update = () => {
        console.log(profile.phonenumber, profile.Email, profile.height, profile.weight, profile.activitie)
        axios.put('http://localhost:3001/profile', {
            phonenumber: profile.phonenumber,
            Email: profile.Email,
            height: profile.height,
            weight: profile.weight,
            username: user.user_id,
            activitie: profile.activitie
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const [houseregis, sethouseregis] = useState({
        distri: "",
        amphoe: "",
        province: "",
        zipcode: ""
    });
    const [profile, Setprofile] = useState({
        phonenumber: "",
        Email: "",
        height: "",
        weight: "",
        activitie: ""
    });




    useEffect(() => {
        getAddress();
        getUser();

    }, [])

    return (

        <div>
            <Container>
                <TestNav />
                <h1 style={{ marginTop: 200, marginBottom: 50 }}>ข้อมูลส่วนตัว</h1>
                <Row className="mb-3 mt-5" >

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>ชื่อจริง</Form.Label>
                        <Form.Control type="text" placeholder="ชื่อจริง" value={user.firstname} disabled
                        //   value={formData.firstname}
                        //     onChange={(event) =>
                        //       setFormData({ ...formData, firstname: event.target.value })
                        //     }

                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>นามสกุล</Form.Label>
                        <Form.Control type="text" placeholder="นามสกุล" value={user.lastname} disabled />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>เลขประจำตัวนักศึกษา</Form.Label>
                        <Form.Control type="text" disabled placeholder="6240207512" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>สาขาวิชา</Form.Label>
                        <Form.Control type="text" disabled placeholder="วิทยาการคอมพิวเตอร์" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>คณะ</Form.Label>
                        <Form.Control type="text" disabled placeholder="วิทยาศาสตร์" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>เกรดเฉลี่ยสะสม</Form.Label>
                        <Form.Control type="text" disabled placeholder="4.00" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>เบอร์โทรศัพท์</Form.Label>
                        <Form.Control type="tel" maxLength="10" value={profile.phonenumber}
                            onChange={(event) =>
                                Setprofile({ ...profile, phonenumber: event.target.value })
                            } />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" placeholder="@nrru.ac.th" value={profile.Email}
                            onChange={(event) =>
                                Setprofile({ ...profile, Email: event.target.value })
                            } />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} sm='6' controlId="formGridPassword">
                        <Form.Label>อาจารย์ที่ปรึกษา</Form.Label>
                        <Form.Control type="text" disabled placeholder="ชื่ออาจารย์" />
                    </Form.Group>

                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>สถานที่เกิด</Form.Label>
                        <Form.Control type="text" placeholder="โรงพยาบาล" disabled />


                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>วันที่เกิด</Form.Label>
                        <Form.Control type="date" disabled />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>อายุ</Form.Label>
                        <Form.Control type="text" placeholder="21" disabled />
                    </Form.Group>
                    <Form.Group as={Col} sm='1' controlId="formGridEmail">
                        <Form.Label>กรุ๊ปเลือด</Form.Label>
                        <Form.Select disabled>
                            <option value="O">O</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="AB">AB</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>ส่วนสูง</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="number" value={profile.height}
                                onChange={(event) =>
                                    Setprofile({ ...profile, height: event.target.value })
                                }
                            />
                            <InputGroup.Text id="inputGroup-sizing-sm">ซม.</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>น้ำหนัก</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="number" value={profile.weight}
                                onChange={(event) =>
                                    Setprofile({ ...profile, weight: event.target.value })
                                }
                            />
                            <InputGroup.Text id="inputGroup-sizing-sm">กก.</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>เชื้อชาติ</Form.Label>
                        <Form.Control type="text" placeholder="ไทย" disabled />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>สัญชาติ</Form.Label>
                        <Form.Control type="text" placeholder="ไทย" disabled />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>ศาสนา</Form.Label>
                        <Form.Control type="text" placeholder="พุธ" disabled />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} sm='3' controlId="formGridEmail">
                        <Form.Label>เลขที่บัตรประชาชน</Form.Label>
                        <Form.Control type="text" placeholder="1309801388086" disabled />
                    </Form.Group>
                </Row>

                <Row className="mb-3 ">
                    <Form.Group as={Col} sm='5' controlId="formGridEmail">
                        <Form.Label>ชื่อ - สกุลบิดา</Form.Label>
                        <Form.Control type="text" placeholder="ชื่อจริง" disabled />
                    </Form.Group>

                    <Form.Group as={Col} sm='2' controlId="formGridPassword">
                        <Form.Label>อาชีพ</Form.Label>
                        <Form.Control type="text" placeholder="เกษตกร" disabled />
                    </Form.Group>
                </Row>

                <Row className="mb-3 ">
                    <Form.Group as={Col} sm='5' controlId="formGridEmail" >
                        <Form.Label>ชื่อ - สกุลมารดา</Form.Label>
                        <Form.Control type="text" placeholder="ชื่อจริง" disabled />
                    </Form.Group>

                    <Form.Group as={Col} sm='2' controlId="formGridPassword">
                        <Form.Label>อาชีพ</Form.Label>
                        <Form.Control type="search" placeholder="ข้าราชการครู" disabled />
                    </Form.Group>
                </Row>


                <Row className="mb-3 ">
                    <Form.Label className="mt-2 col-form-label-lg">ที่อยู่ตามทะเบียนบ้าน</Form.Label>
                    <Form.Group as={Col} sm='3' >

                        <Form.Label>ตำบล</Form.Label>
                        <Form.Control type="text" disabled />
                    </Form.Group>
                    <Form.Group as={Col} sm='3' >
                        <Form.Label>อำเภอ</Form.Label>
                        <Form.Control type="text" disabled />
                    </Form.Group>
                    <Form.Group as={Col} sm='3' >
                        <Form.Label>จังหวัด</Form.Label>
                        <Form.Control type="text" disabled />
                    </Form.Group>
                    <Form.Group as={Col} sm='3' >
                        <Form.Label>รหัสไปรษณีย์</Form.Label>
                        <Form.Control type="text" disabled />
                    </Form.Group>
                </Row>
                <Row className="mb-3 ">
                    <Form.Group as={Col} sm='8' >
                        <Form.Label>บ้านเลขที่</Form.Label>
                        <Form.Control type="text" disabled />
                    </Form.Group>
                </Row>





                <Row className="mb-3 mt-5 ">
                    <Form.Label className="col-form-label-lg">ที่อยู่ที่ติดต่อได้สะดวก</Form.Label>
                    <Row className=" ">

                        <Form.Group as={Col} className="mb-3" sm='4' controlId="formGridPassword">
                            {/* <Form.Label>อาชีพ</Form.Label>
      <Form.Select aria-label="Default select example">
        {address.map((item, index) =>
          <option key={index}> {item.district} </option>
        )}
      </Form.Select> */}
                            <Form.Label className="mt-2">โปลดเลือกตำบล</Form.Label>
                            <Select options={options} value={options.value} placeholder="กรอกชื่อตำบล" onChange={(e) => onChangedistrict(e)} />
                        </Form.Group>
                    </Row>
                    <Form.Group as={Col} sm='3' >
                        <Form.Label>ตำบล</Form.Label>
                        <Form.Control type="search" disabled value={houseregis.distri} />
                    </Form.Group>
                    <Form.Group as={Col} sm='3' >
                        <Form.Label>อำเภอ</Form.Label>
                        <Form.Control type="search" disabled value={houseregis.amphoe} />
                    </Form.Group>
                    <Form.Group as={Col} sm='3' >
                        <Form.Label>จังหวัด</Form.Label>
                        <Form.Control type="search" disabled value={houseregis.province} />
                    </Form.Group>
                    <Form.Group as={Col} sm='3' >
                        <Form.Label>รหัสไปรษณีย์</Form.Label>
                        <Form.Control type="search" disabled value={houseregis.zipcode} />
                    </Form.Group>
                </Row>

                <Row className="mb-3 ">
                    <Form.Group as={Col} sm='8' >
                        <Form.Label>บ้านเลขที่</Form.Label>
                        <Form.Control type="text" placeholder="5/1 หมู่ 2 ถนน" />
                    </Form.Group>
                </Row>
                <Form.Label className="col-form-label-lg">กิจกรรมที่ทำระหว่างเรียนอุดมศึกษา</Form.Label>
                <Row className="mb-3 ">
                    <Form.Group sm='8' >
                        <Form.Control as="textarea" rows={3} value={profile.activitie} onChange={(event) =>
                            Setprofile({ ...profile, activitie: event.target.value })
                        } />
                    </Form.Group>
                </Row>

                <br></br>
                <Button variant="success" style={{ marginBottom: 80 }} onClick={Update}>บันทึกข้อมูล</Button>
            </Container>
        </div>
    )
}

export default Userinfo