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
function TestNav() {
  const [userinfo, setUserinfo] = useState("");
  const [role, setRole] = useState([]);
  const navigate = useNavigate();
  // const user = 'just_user'
  const admin = "justadmin";
  const user = [
    { name: "Home", path: "/user" },
    { name: "ข้อมูลนักศึกษา", path: "/userinfo" },
    { name: "รายละเอียดงาน", path: "/jobdesc" },
  ];
  const useraction = [
    { name: "aa", path: "/" },
    { name: "aaa", path: "/" },
  ];
  // const admin = [user[0], { name: "apple", path: "/apple", element: <ApplePage /> }];
  const getUser = async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/testrole/${data.decoded.username}`
      );
      setUserinfo(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getUser()

    const token = localStorage.getItem("token");
    fetch("http://localhost:3001/authen", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "ok") {
          axios
            .get(`http://localhost:3001/testrole/${data.decoded.username}`, {})
            .then(function (response) {
              setRole(response.data.results);
              console.log(response.data);
              setUserinfo(response.data.results);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    // <BrowserRouter>
    //     <div>
    //         {roleUser[getRoleUser].map((item) => (
    //             <Link className="link" to={item.path}>
    //                 {item.name}
    //             </Link>
    //         ))}
    //     </div>
    //     <Routes>
    //         {roleUser[getRoleUser].map((item) => (
    //             <Route path={item.path} element={item.element} />
    //         ))}
    //     </Routes>
    // </BrowserRouter>
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
              {role.map((item, index) => (
                <div key={index}>
                  {item.role_id == 1 ? (
                    <div>
                      <Nav className="me-auto">
                        {user.map((item, index) => (
                          <Navbar.Text className=" " key={index}>
                            <Link
                              className="navlink d-flex flex-row"
                              to={item.path}
                            >
                              <li>{item.name}</li>
                            </Link>
                          </Navbar.Text>
                        ))}
                        {/* <NavDropdown className="navlink" title={<span className="nav-text2">จัดการเอกสาร</span>}>
                                                <DropdownSubmenu title="จัดการเอกสาร">
                                                    {userinfo.map((item, index) => (
                                                        <div key={index}>
                                                            {item.status_id <= 1
                                                                ? <div>
                                                                    <NavDropdown.Item as={Link} to="/userinfo" >ข้อมูลนักศึกษา</NavDropdown.Item>
                                                                    <NavDropdown.Item as={Link} to="/jobdesc" disabled>รายละเอียดงาน</NavDropdown.Item>
                                                                    <NavDropdown.Item as={Link} to="/testform" disabled>พิมพ์ใบสมัคร</NavDropdown.Item>
                                                                    <NavDropdown.Item as={Link} to="/testform" disabled>แนบหนังสือตอบรับ</NavDropdown.Item>
                                                                    <NavDropdown.Item as={Link} to="/testform" disabled>ส่งเอกสารฝึกเสร็จ</NavDropdown.Item>
                                                                </div>
                                                                : (item.status_id <= 2)
                                                                    ? <div>
                                                                        <NavDropdown.Item as={Link} to="/userinfo" >ข้อมูลนักศึกษา</NavDropdown.Item>
                                                                        <NavDropdown.Item as={Link} to="/jobdesc" >รายละเอียดงาน</NavDropdown.Item>
                                                                        <NavDropdown.Item as={Link} to="/testform" disabled>พิมพ์ใบสมัคร</NavDropdown.Item>
                                                                        <NavDropdown.Item as={Link} to="/testform" disabled>แนบหนังสือตอบรับ</NavDropdown.Item>
                                                                        <NavDropdown.Item as={Link} to="/testform" disabled>ส่งเอกสารฝึกเสร็จ</NavDropdown.Item>
                                                                    </div>
                                                                    : (item.status_id <= 3)
                                                                        ? <div>
                                                                            <NavDropdown.Item as={Link} to="/userinfo" >ข้อมูลนักศึกษา</NavDropdown.Item>
                                                                            <NavDropdown.Item as={Link} to="/jobdesc" >รายละเอียดงาน</NavDropdown.Item>
                                                                            <NavDropdown.Item as={Link} to="/testform" >พิมพ์ใบสมัคร</NavDropdown.Item>
                                                                            <NavDropdown.Item as={Link} to="/testform" disabled>แนบหนังสือตอบรับ</NavDropdown.Item>
                                                                            <NavDropdown.Item as={Link} to="/testform" disabled>ส่งเอกสารฝึกเสร็จ</NavDropdown.Item>
                                                                        </div>
                                                                        : (item.status_id >= 4)
                                                                            ? <div>
                                                                                <NavDropdown.Item as={Link} to="/userinfo" >ข้อมูลนักศึกษา</NavDropdown.Item>
                                                                                <NavDropdown.Item as={Link} to="/jobdesc" >รายละเอียดงาน</NavDropdown.Item>
                                                                                <NavDropdown.Item as={Link} to="/testform" >พิมพ์ใบสมัคร</NavDropdown.Item>
                                                                                <NavDropdown.Item as={Link} to="/testform" >แนบหนังสือตอบรับ</NavDropdown.Item>
                                                                                <NavDropdown.Item as={Link} to="/testform" disabled>ส่งเอกสารฝึกเสร็จ</NavDropdown.Item>
                                                                            </div>
                                                                            : <div>
                                                                                <NavDropdown.Item as={Link} to="/userinfo" >ข้อมูลนักศึกษา</NavDropdown.Item>
                                                                                <NavDropdown.Item as={Link} to="/jobdesc" >รายละเอียดงาน</NavDropdown.Item>
                                                                                <NavDropdown.Item as={Link} to="/testform" >พิมพ์ใบสมัคร</NavDropdown.Item>
                                                                                <NavDropdown.Item as={Link} to="/testform" >แนบหนังสือตอบรับ</NavDropdown.Item>
                                                                                <NavDropdown.Item as={Link} to="/testform" >ส่งเอกสารฝึกเสร็จ</NavDropdown.Item>
                                                                            </div>
                                                            }

                                                        </div>
                                                    ))}
                                                    <NavDropdown.Item as={Link} to="/userinfo" >ข้อมูลนักศึกษา</NavDropdown.Item>
                                                    <NavDropdown.Item as={Link} to="/jobdesc" >รายละเอียดงาน</NavDropdown.Item>
                                                    <NavDropdown.Item as={Link} to="/testform" >พิมพ์ใบสมัคร</NavDropdown.Item>
                                                    <NavDropdown.Item as={Link} to="/testform" >แนบหนังสือตอบรับ</NavDropdown.Item>
                                                    <NavDropdown.Item as={Link} to="/testform" >ส่งเอกสารฝึกเสร็จ</NavDropdown.Item>

                                                </DropdownSubmenu>
                                                <NavDropdown.Item >
                                                    จัดการอาจารย์
                                                </NavDropdown.Item>
                                                <NavDropdown.Item as={Link} to="/testform">สมัครสหกิจ</NavDropdown.Item>

                                            </NavDropdown> */}
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
              ))}
            </div>
            {/* <Button variant="primary" className='button-t '> เข้าสู่ระบบ
                            <FontAwesomeIcon icon={faIdCard} className="icon-t ms-2"></FontAwesomeIcon>
                        </Button> */}
            <NavDropdown
              className="navlink mt-4 me-5 "
              title={role.map((item, index) => (
                <div key={index}>
                  {item.role_id == 1 ? (
                    <div>
                      นักศึกษา {item.firstname} {item.lastname}
                    </div>
                  ) : (
                    <div>อาจารย์ {item.tech_name}</div>
                  )}
                </div>
              ))}
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
