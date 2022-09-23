import React from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Subregform3({jobData, setjobData}) {
  return (
    <div>
      <Row className="mb-3 mt-5 ">
        <Form.Group as={Col} sm='4' >
          <Form.Label>ชื่อตำแหน่งที่เข้าฝึกงาน</Form.Label>
          <Form.Control type="text" placeholder="Programmer" value={jobData.position}
            onChange={(event) =>
              setjobData({ ...jobData, position: event.target.value })
            }/>
        </Form.Group>
        <Form.Group as={Col} sm='8' >
          <Form.Label>รายละเอียดลักษณะงาน</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="ถ่ายเอกสาร ถูพื้น ล้างจาน ตัดต่อวีดีโอ ตัดย่า" value={jobData.jobDescription}
            onChange={(event) =>
              setjobData({ ...jobData, jobDescription: event.target.value })
            }
           
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 mt-4 ">
        <Form.Group as={Col} sm='12' >
          <Form.Label>สวัสดิการจากสถานประกอบการที่ได้รับ (ถ้ามี)</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="เงิน ประกัน เบิกค่ารถ " value={jobData.welfare}
            onChange={(event) =>
              setjobData({ ...jobData, welfare: event.target.value })
            }
          
          />
        </Form.Group>
      </Row>

    </div>
  )
}

export default Subregform3