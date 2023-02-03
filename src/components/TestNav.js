import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logo from "./logo/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";

function TestNav({ user, role }) {
  const [userinfo, setUserinfo] = useState("");

  const navigate = useNavigate();
  // const user = 'just_user'
  const userMenu = [
    { name: "Home", path: "/user" },
    { name: "ข้อมูลนักศึกษา", path: "/userinfo" },
    { name: "รายละเอียดงาน", path: "/jobdesc" },
  ];


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  };

  return (
    <div>
      <Navbar className="nav-color " expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand>
            <Link className="navlink" to="/">
              <img src={logo} height="90" alt="logo" className="test-logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse className="justify-content-end me-5 ">
            <div className="content-nav">
              {role === "student" ? (
                <div>
                  <Nav className="me-auto">
                    {userMenu.map((item, index) => (
                      <Navbar.Text className=" " key={index}>
                        <Link
                          className="navlink d-flex flex-row"
                          to={item.path}
                        >
                          <li>{item.name}</li>
                        </Link>
                      </Navbar.Text>
                    ))}
                  </Nav>
                </div>
              ) : (
                <div>
                  <Navbar.Text
                    className="navlink "
                    style={{ color: "black" }}
                    onClick={logout}
                  >
                    ออกจากระบบ
                  </Navbar.Text>
                  {/* <Link style={{ color: "black" }} className="navlink" to="/" ></Link> */}
                </div>
              )}
            </div>
            {/* <Button variant="primary" className='button-t '> เข้าสู่ระบบ
                            <FontAwesomeIcon icon={faIdCard} className="icon-t ms-2"></FontAwesomeIcon>
                        </Button> */}
            <NavDropdown
              className="navlink mt-4 me-5 "
              title={
                role === "student" ? (
                  <div>
                    นักศึกษา {user.firstname} {user.lastname}
                  </div>
                ) : role === "teacher" ? (
                  <div>
                    อาจารย์ {user.firstname} {user.lastname}
                  </div>
                ) : (
                  <div>บริษัท {user.companyName}</div>
                )
              }
            >
              <NavDropdown.Item onClick={logout} className="usernav">
                ออกจากระบบ
              </NavDropdown.Item>
            </NavDropdown>

            {/* <Button variant="danger" className='justify-content-end signout' onClick={logout}>
                            ออกจากระบบ
                        </Button> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default TestNav;
