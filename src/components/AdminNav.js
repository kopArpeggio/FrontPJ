import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './logo/logo.png';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function AdminNav() {

    const [adminname, setadminName] = useState([]);
    const navigate = useNavigate();

    const Goto_login = () => {
        navigate('/login')
    }
    const Goto_home = () => {
        navigate('/home')
    }

    const logout = () => {
        localStorage.removeItem('role')
        localStorage.removeItem('token')
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
                if (data.status == "ok") {
                    setadminName(data.decoded.username)
                }
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }, []);
    return (
        <Navbar className='nav-color mb-1'>
            <Container>
                <Navbar.Brand className='nav-text'>

                    <img className='logo' src={logo} alt='logo' />
                    <Navbar.Text className='nav-text2 navlink' >
                       
                        หน้าแรก
                    </Navbar.Text>

                    <NavDropdown className="justify-content-end nav-text2 navlink" title={adminname}>

                        <NavDropdown.Item href="#action/3.1">จัดการนักศึกษา</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            จัดการอาจารย์
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">จัดการสถานประกอบการ</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            ตรวจสอบเอกสาร
                        </NavDropdown.Item>
                    </NavDropdown>

                    <Button variant="danger" className='justify-content-end test' onClick={logout}>
                        ออกจากระบบ

                    </Button>

                </Navbar.Brand>
                <Navbar.Toggle />

            </Container>
        </Navbar>
    );
}

export default AdminNav;