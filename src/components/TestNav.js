import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import logo from "./logo/logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { Button, Collapse, Container, Image } from "react-bootstrap";
import { getImageUrl } from "../utils/utils";
import UploadProfileModal from "./Modal/UploadProfileModal";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

function TestNav({ user, role }) {
  const navigate = useNavigate();

  const userMenu = [
    { name: "หน้าหลัก", path: "/user/dashboard" },
    { name: "ข้อมูลนักศึกษา", path: "/user/user-info" },
    { name: "รายละเอียดงาน", path: "/user/user-job-description" },
  ];

  const adminMenu = [
    { name: "Home", path: "/admin/manage-student" },
    { name: "test", path: "/admin/manage-company" },
  ];

  // Upload Picture Modal/////////////////////////
  const [test, setTest] = useState(null);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleShow = (param) => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setImage(null);
    setPreviewImage(null);
  };
  // End Here/////////////////////////////////////

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    setTest(user?.profilePic);
  }, []);

  return (
    <div>
      <UploadProfileModal
        handleClose={handleClose}
        show={show}
        image={image}
        setImage={setImage}
        user={user}
        setPreviewImage={setPreviewImage}
        previewImage={previewImage}
        setTest={setTest}
        setShow={setShow}
        test={test}
      />
      {role ? (
        <Navbar className="nav-color " expand="xxl" fixed="top">
          <Navbar.Brand className="navbar-brand">
            <Link className="navlink d-flex flex-row " to="/">
              <Image
                src={logo}
                className="d-inline-block align-top icon"
                style={{ marginLeft: "70px" }}
                alt="Logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse className=" justify-content-end me-5 ">
            <div className="content-nav">
              {role === "student" ? (
                <div>
                  <Nav className="ms-auto justify-content-end">
                    {userMenu.map((item, index) => (
                      <Navbar.Text>
                        <Link
                          className="navlink d-flex flex-row "
                          to={item.path}
                        >
                          <ul className="navbar-nav">
                            <li className="nav-item" key={index}>
                              {item.name}
                            </li>
                          </ul>
                        </Link>
                      </Navbar.Text>
                    ))}
                  </Nav>
                </div>
              ) : role === "admin" ? (
                <div>
                  <Nav className="me-auto justify-content-end">
                    {adminMenu.map((item, index) => (
                      <div className=" d-flex flex-row">
                        <Navbar.Text>
                          <Link
                            className="navlink d-flex flex-row "
                            to={item.path}
                          >
                            <ul className="navbar-nav">
                              <li className="nav-item" key={index}>
                                {item.name}
                              </li>
                            </ul>
                          </Link>
                        </Navbar.Text>
                        <br></br>
                      </div>
                    ))}
                    <Navbar.Text className="d-flex flex-row">
                      <NavDropdown
                        className="profile-nav mt-2 ms-3 "
                        title={"Master Data"}
                      >
                        <NavDropdown.Item className="masterData">
                          <Link to={"/admin/manage-student"}>
                            Student Management
                          </Link>
                        </NavDropdown.Item>

                        <NavDropdown.Item className="masterData">
                          <Link to={"/admin/manage-company"}>
                            Company Management
                          </Link>
                        </NavDropdown.Item>

                        <NavDropdown.Item className="masterData">
                          <Link to={"/admin/manage-teacher"}>
                            Teacher Management
                          </Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Navbar.Text>
                  </Nav>
                </div>
              ) : (
                ""
              )}
            </div>

            <NavDropdown
              className="mt-3 me-5 profile-nav "
              title={
                role === "student" ? (
                  <div>
                    <Image
                      width={"35px"}
                      height={"35px"}
                      roundedCircle
                      src={test ? getImageUrl(test) : "/asset/img/noAvatar.jpg"}
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                      }}
                      className="me-2"
                    />
                    นักศึกษา {user?.firstname} {user?.lastname}
                  </div>
                ) : role === "teacher" ? (
                  <div>
                    อาจารย์ {user?.firstname} {user?.lastname}
                  </div>
                ) : role === "company" ? (
                  <div>บริษัท {user?.companyName}</div>
                ) : role === "admin" ? (
                  <div>
                    แอดมิน {user?.firstname} {user?.lastname}
                  </div>
                ) : (
                  ""
                )
              }
              id="nav-dropdown"
            >
              {role === "student" ? (
                <NavDropdown.Item onClick={handleShow} className="usernav">
                  <CgProfile style={{ fontSize: "20" }} /> อัพโหลดรูป Profile
                </NavDropdown.Item>
              ) : (
                ""
              )}

              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout} className="usernav">
                <FiLogOut style={{ fontSize: "20" }} /> ออกจากระบบ
              </NavDropdown.Item>
            </NavDropdown>

            {/* <Button variant="danger" className='justify-content-end signout' onClick={logout}>
                            ออกจากระบบ
                        </Button> */}
          </Navbar.Collapse>
        </Navbar>
      ) : (
        ""
      )}
      <div style={{ marginBottom: "40vh" }}></div>
    </div>
  );
}

export default TestNav;
