import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import React, { useState, useEffect } from "react";


function Actionform(){
    const [user,setUser] = useState("");
    const [firstname,setfirstname] = useState("");
    const [status_id,setstatus_id] = useState("");

    const getUser = async () => {
        axios.get(`http://localhost:3001/user`).then((response) => {
            setUser(response.data);
            
        })
    };

    console.log(user)


    const confirm = () => {
        setfirstname(user[0].fristname)
        setstatus_id(user[0].status)

        axios.put('http://localhost:3001/update', {
            id: user[0].id,
            status: 1
        })
    }
    const waiting = () => {
        setfirstname(user[0].fristname)
        setstatus_id(user[0].status)

        axios.put('http://localhost:3001/update', {
            id: user[0].id,
            status: 2
        })
    }
    const reject = () => {
        setfirstname(user[0].fristname)
        setstatus_id(user[0].status)

        axios.put('http://localhost:3001/update', {
            id: user[0].id,
            status: 3
        })
    }


    const check = <Button variant="success">ผ่าน</Button>
    const wrong = <Button variant="warning">ไม่ผ่าน</Button>
    const checking = <Button variant="danger">โปรดรอ</Button>
    
    


    useEffect(() => {
        getUser();
        
    }, [])
    
    return(
        <>
        <Container className='majin_top'>
                        <Form.Group controlId="formFileDisabled" className="mb-3  majin_status_top">
                                    <Form.Label>เพิ่มเอกสาร ที่ 1</Form.Label>
                                    <Form.Control type="file"/>
                                </Form.Group>
                        <Button variant="success"  onClick={confirm} >ผ่าน</Button>
                        <Button variant="warning" onClick={waiting}>โปรดรอการตรวจสอบ</Button>
                        <Button variant="danger" onClick={reject}>ไม่ผ่าน</Button>


                        <Form.Group controlId="formFileDisabled" className="mb-3 majin_status_top">
                                    <Form.Label>เพิ่มเอกสาร ที่ 2</Form.Label>
                                    <Form.Control type="file"/>
                                </Form.Group>
                        <Button variant="success">Allow</Button>{' '}
                        <Button variant="warning">Wait</Button>{' '}
                        <Button variant="danger">Not pass</Button>{' '}

                        <Form.Group controlId="formFileDisabled" className="mb-3 majin_status_top">
                                    <Form.Label>เพิ่มเอกสาร ที่ 3</Form.Label>
                                    <Form.Control type="file"/>
                                </Form.Group>
                        <Button variant="success">Allow</Button>{' '}
                        <Button variant="warning">Wait</Button>{' '}
                        <Button variant="danger">Not pass</Button>{' '}

                        <Form.Group controlId="formFileDisabled" className="mb-3 majin_status_top">
                                    <Form.Label>เพิ่มเอกสาร ที่ 4</Form.Label>
                                    <Form.Control type="file"/>
                                </Form.Group>
                        <Button variant="success">Allow</Button>{' '}
                        <Button variant="warning">Wait</Button>{' '}
                        <Button variant="danger">Not pass</Button>{' '}
                
        </Container>        
        </>
        
    )
}

export default Actionform;