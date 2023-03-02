import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
  useOutletContext,
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
  const navigate = useNavigate();

  const userMenu = [
    { name: "Home", path: "/user/dashboard" },
    { name: "ข้อมูลนักศึกษา", path: "/user/user-info" },
    { name: "รายละเอียดงาน", path: "/user/user-job-description" },
  ];

  const adminMenu = [{ name: "Home", path: "/admin/dashboard" }];

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <Navbar className="nav-color " expand="lg" fixed="top">
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
                      <Link className="navlink d-flex flex-row" to={item.path}>
                        <li>{item.name}</li>
                      </Link>
                    </Navbar.Text>
                  ))}
                </Nav>
              </div>
            ) : (
              <div>
                <Nav className="me-auto">
                  {adminMenu.map((item, index) => (
                    <div className="d-flex flex-row">
                      <Navbar.Text className=" " key={index}>
                        <Link className="navlink d-flex " to={item.path}>
                          <li>{item.name}</li>
                        </Link>
                      </Navbar.Text>
                      <NavDropdown
                        className="navlink  me-5 "
                        title={"Master Data"}
                      >
                        <NavDropdown.Item className="masterData">
                          Student Management
                        </NavDropdown.Item>
                        <NavDropdown.Item className="masterData">
                          Company Management
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  ))}
                </Nav>
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
      </Navbar>
      <div style={{ marginBottom: "40vh" }}></div>
    </div>
  );
}

export default TestNav;
