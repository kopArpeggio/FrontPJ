
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import { useNavigate } from "react-router-dom";
import TestNav from '../../components/TestNav';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// Function that use for Check roles


export default function User() {
  const navigate = useNavigate();



  const logout = () => {

    localStorage.removeItem("token");
    // localStorage.removeItem('role');
    navigate('/login')
  }

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
        if (data.status != "ok") {
          alert('โปรดเข้าสู่ระบบก่อน')
          window.location = '/login'
          localStorage.removeItem('token');
          localStorage.removeItem('role');

        }
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, []);
  return (
    <div>
      <TestNav />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Container>
        <h3 className='mt-3'>ปฏิทิน</h3>
        <Row style={{ fontSize: 18, background: '#D5DADC' }} className="mb-4 mt-5">
          <h3 className='mt-3'>ข่าวสาร</h3>
          <Col style={{ margin: 'auto' }}>หากมีข้อสงสัย สามารถสอบถามรายละเอียดได้ที่ Line Chatbot</Col>
          <Col className='mb-5'>{<img style={{ width: 150 }} src="https://sites.google.com/site/kittikornthammakitjawat/_/rsrc/1458360280559/line-id-qr-code/Line-QR.jpg" alt="Line@"></img>}</Col>
        </Row>
        <Row style={{ fontSize: 18, background: '#D5DADC' }} className="mb-4 mt-2">
          <h3 className='mb-5 mt-2'>วีดีโออธิบายเกี่ยวกับการทำงานของสหกิจ และ การใช้งาน</h3>
          <Col style={{ margin: 'auto', textAlign: 'end' }}>ความเป็นมา และ ที่มาของสหกิจ</Col>
          <Col>{<iframe width="450" height="250" src="https://www.youtube.com/embed/w7x_lWJNnNg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}</Col>
        </Row>
        <Row style={{ fontSize: 18, background: '#D5DADC' }} className="mb-4 mt-2">
          <Col style={{ margin: 'auto', textAlign: 'end' }}>ชั้นตอนการปฏิบัติ สหกิจ</Col>
          <Col>{<iframe width="450" height="250" src="https://www.youtube.com/embed/w7x_lWJNnNg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}</Col>
        </Row>
      </Container>

    </div>
  )
}
