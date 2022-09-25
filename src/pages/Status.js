import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faAddressCard,faRotateRight,faXmark} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import React, { useState, useEffect } from "react";



function Status(){
    const [user,setUser] = useState();
    const [test1,setTest] = useState(""); 

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:3001/testsingleuser')
            setUser(response.data);
        } catch (error) {
            console.log(error);

        }

    };

    useEffect(() => {
        getUser();
    }, [])
    
    
    console.log(user)
   

    const userstatus = () =>{
        if(user.Status === "2"){
            icon : <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
            

        }else{}
    }

    const icon1 = <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
    const icon2 = <FontAwesomeIcon icon={faRotateRight}></FontAwesomeIcon>
    const icon3 = <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>

    const text1 = "ดำเนินการเสร็จสิ้น"
    const text2 = "รออนุมัติ"
    const text3 = "ไม่ผ่าน"


    return(
     <center> 
        
            <Container className='majin_status_top'>   
            <>
            <div className='frame_status'>
                    <div className='majin_top_name'>
                        <h1>แสดงสถานะเอกสาร</h1>
                    </div>
            <Row>
                    <Col>
                            <div className='status_box  majin_statusbox_top'>
                                <div className="flex flex-col items-center justify-center min-h-screen py-2  fa-solid fa-coffee fa-2xl  ">     
                                        <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>  
                                </div>

                                <div>
                                    <h5>เอกสารที่ 1</h5>
                                </div>

                                <div className='flex flex-col items-center justify-center min-h-screen py-2  fa-solid fa-coffee fa-2xl'>
                                     <div style={{color: "green"}}>
                                                        {/* {
                                                        user.status === 1 
                                                        ? icon1
                                                        :(user.status === 2)
                                                        ? icon2
                                                        :icon3
                                                        } */}
                                    </div>
                                </div>

                                <div>
                                    <h5>{text2}</h5>
                                </div>    
                            </div>

                    </Col>

                    <Col>
                            <div className="status_box majin_statusbox_top">
                                <div className="flex flex-col items-center justify-center min-h-screen py-2  fa-solid fa-coffee fa-2xl">
                                        <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>    
                                </div>

                                <div>
                                    <h5>เอกสารที่ 2</h5>
                                </div>

                                <div className='flex flex-col items-center justify-center min-h-screen py-2 fa-solid fa-coffee fa-2xl'>
                                    <div style={{color: "red"}}>
                                        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                                    </div>
                                </div>

                                <div>
                                    <h5>ไม่อนุมัติ</h5>
                                </div>    
                            </div>

                    </Col>
            </Row>

            <Row>
                    <Col>
                        <div className="status_box majin_statusbox_top">
                                <div className="flex flex-col items-center justify-center min-h-screen py-2 fa-solid fa-coffee fa-2xl">
                                    <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>    
                                </div>

                                <div>
                                    <h5>เอกสารที่ 3</h5>
                                </div>

                                <div className='flex flex-col items-center justify-center min-h-screen py-2 fa-solid fa-coffee fa-2xl '>
                                    <div style={{color: "orange"}}>
                                        <FontAwesomeIcon icon={faRotateRight}></FontAwesomeIcon>
                                    </div>
                                </div>

                                <div>
                                    <h5>รอดำเนินการ</h5>
                                </div>    
                        </div>

                    </Col>

                    <Col>

                            <div className="status_box majin_statusbox_top">
                                    <div className="flex flex-col items-center justify-center min-h-screen py-2 fa-solid fa-coffee fa-2xl">
                                        <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>    
                                    </div>

                                    <div>
                                        <h5>เอกสารที่ 4</h5>
                                    </div>

                                    <div className='flex flex-col items-center justify-center min-h-screen py-2  fa-solid fa-coffee fa-2xl'>
                                        <div style={{color: "green"}}>
                                            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                                        </div>   
                                    </div>

                                    <div>
                                        <h5>ดำเนินการเสร็จสิ้น</h5>
                                    </div>    
                            </div>

                    </Col>
              </Row>
          </div>               
            </>
            </Container>
    </center>  
    )   
}
export default Status;