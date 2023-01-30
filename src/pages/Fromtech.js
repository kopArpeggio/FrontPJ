import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Fromtech() {
    return (
        <Container>
            <div>

                <center>
                    <div className='majin_top'>
                        <h2>ข้อมูลนักศึกษา</h2>
                    </div>
                </center>

                <Row className="mb-3 majin_fromstimate">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>ชื่อ-นามสกุล</Form.Label>
                        <Form.Control type="email" placeholder="ชื่อ-นามสกุล" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>รหัสนักศึกษา</Form.Label>
                        <Form.Control type="password" placeholder="รหัสนักศึกษา" />
                    </Form.Group>
                </Row>

                <Row className="mb-3 majin_fromstimate">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>เลขประจำตัวนักศึกษา</Form.Label>
                        <Form.Control type="email" placeholder="เลขประจำตัวนักศึกษา" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>สาขาวิชา</Form.Label>
                        <Form.Control type="password" placeholder="สาขาวิชา" />
                    </Form.Group>
                </Row>

                <Row className="mb-3 majin_fromstimate">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>คณะ</Form.Label>
                        <Form.Control type="email" placeholder="คณะ" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>เกรดเฉลี่ยสะสม</Form.Label>
                        <Form.Control type="password" placeholder="เกรดเฉลี่ยสะสม" />
                    </Form.Group>
                </Row>

                <Row className="mb-3 majin_fromstimate">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>เบอร์โทรศัพท์</Form.Label>
                        <Form.Control type="email" placeholder="เบอร์โทรศัพท์" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control type="password" placeholder="E-Mail" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>อาจารย์ที่ปรึกษา</Form.Label>
                    <Form.Control placeholder="อาจารย์ที่ปรึกษา" />
                </Form.Group>

                <Row className="mb-3 majin_fromstimate">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>สถานที่เกิด</Form.Label>
                        <Form.Control type="email" placeholder="สถานที่เกิด" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>เกิดวันที่</Form.Label>
                        <Form.Control type="password" placeholder="เกิดวันที่" />
                    </Form.Group>
                </Row>

                <Row className="mb-3 majin_fromstimate">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>อายุ</Form.Label>
                        <Form.Control type="email" placeholder="อายุ" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>หมู่โลหิต</Form.Label>
                        <Form.Control type="password" placeholder="หมู่โลหิต" />
                    </Form.Group>
                </Row>

                <Row className="mb-3 majin_fromstimate">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>ส่วนสูง</Form.Label>
                        <Form.Control type="email" placeholder="ส่วนสูง" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>น้ำหนัก</Form.Label>
                        <Form.Control type="password" placeholder="น้ำหนัก" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>เชื้อชาติ</Form.Label>
                        <Form.Control type="password" placeholder="เชื้อชาติ" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>ศาสนา</Form.Label>
                        <Form.Control type="password" placeholder="ศาสนา" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>เลขที่บัตรประชาชน</Form.Label>
                    <Form.Control placeholder="เลขที่บัตรประชาชน" />
                </Form.Group>

                <Row className="mb-3 majin_fromstimate">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>ชื่อ - สกุลบิดา</Form.Label>
                        <Form.Control type="email" placeholder="ชื่อ - สกุลบิดา" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>อาชีพ</Form.Label>
                        <Form.Control type="password" placeholder="อาชีพ" />
                    </Form.Group>
                </Row>

                <Row className="mb-3 majin_fromstimate">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>ชื่อ - มารดา</Form.Label>
                        <Form.Control type="email" placeholder="ชื่อ - สกุลบิดา" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>อาชีพ</Form.Label>
                        <Form.Control type="password" placeholder="อาชีพ" />
                    </Form.Group>
                </Row>

                <Row className="mb-3 majin_fromstimate">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>ที่อยู่ตามทะเบียนบ้าน เลขที่</Form.Label>
                        <Form.Control type="email" placeholder="ชื่อ - สกุลบิดา" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>หมู่</Form.Label>
                        <Form.Control type="password" placeholder="หมู่" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>ตำบล</Form.Label>
                        <Form.Control type="password" placeholder="ตำบล" />
                    </Form.Group>
                </Row>


                <Row className="mb-3 majin_fromstimate">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>อำเภอ</Form.Label>
                        <Form.Control type="email" placeholder="อำเภอ" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>จังหวัด</Form.Label>
                        <Form.Control type="password" placeholder="จังหวัด" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>รหัสไปรษณีย์</Form.Label>
                        <Form.Control type="password" placeholder="รหัสไปรษณีย์." />
                    </Form.Group>
                </Row>


                <Row className="mb-3 majin_fromstimate">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>ที่อยู่ที่ติดต่อได้สะดวก เลขที่</Form.Label>
                        <Form.Control type="email" placeholder="ชื่อ - สกุลบิดา" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>หมู่</Form.Label>
                        <Form.Control type="password" placeholder="หมู่" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>ตำบล</Form.Label>
                        <Form.Control type="password" placeholder="ตำบล" />
                    </Form.Group>
                </Row>

                <Row className="mb-3 majin_fromstimate">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>อำเภอ</Form.Label>
                        <Form.Control type="email" placeholder="อำเภอ" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>จังหวัด</Form.Label>
                        <Form.Control type="password" placeholder="จังหวัด" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>รหัสไปรษณีย์</Form.Label>
                        <Form.Control type="password" placeholder="รหัสไปรษณีย์." />
                    </Form.Group>
                </Row>

                <center>
                    <div className='majin_top'>
                        <h2>รายละเอียดงานที่ไปปฏิบัติ</h2>
                    </div>
                </center>

                <Row className="mb-3 majin_fromstimate">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>ชื่อตำแหน่งที่เข้าฝึกงาน</Form.Label>
                        <Form.Control type="email" placeholder="ชื่อ-นามสกุล" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>รายละเอียดลักษณะงาน</Form.Label>
                        <Form.Control type="password" placeholder="รหัสนักศึกษา" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>สวัสดิการจากสถานประกอบการที่ได้รับ (ถ้ามี)</Form.Label>
                        <Form.Control type="password" placeholder="สวัสดิการจากสถานประกอบการที่ได้รับ" />
                    </Form.Group>


                </Row>

            </div>
        </Container>
    )
}

export default Fromtech