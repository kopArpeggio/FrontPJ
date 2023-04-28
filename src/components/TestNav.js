import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import logo from "./logo/logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import {
  Button,
  Col,
  Collapse,
  Container,
  Form,
  Image,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { getImageUrl } from "../utils/utils";
import UploadProfileModal from "./Modal/UploadProfileModal";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRotate, faXmark } from "@fortawesome/free-solid-svg-icons";
import ChangePassword from "./Modal/ChangePassword";
import ChangePasswordTeahcer from "./Modal/ChangePasswordTeahcer";
import ChangePaswordAdmin from "./Modal/ChangePaswordAdmin";

function TestNav({ user, role }) {
  const navigate = useNavigate();

  const [use, setUse] = useState();

  const userMenu = [
    { name: "หน้าหลัก", path: "/user/dashboard" },
    { name: "ใบสมัครสหกิจ", path: "/user/user-info" },
    { name: "รายละเอียดงาน", path: "/user/user-job-description" },
    { name: "จัดการเอกสาร", path: "/user/document" },
  ];

  const check = (
    <FontAwesomeIcon
      icon={faCheck}
      style={{ fontSize: "4vh" }}
      className="corret-mark"
    />
  );

  const wrong = (
    <FontAwesomeIcon
      icon={faXmark}
      style={{ fontSize: "4vh" }}
      className="Wrong"
    />
  );

  const checking = (
    <FontAwesomeIcon
      icon={faRotate}
      className="Checking"
      style={{ fontSize: "4vh" }}
    />
  );

  const adminMenu = [
    { name: "หนัาหลัก", path: "/admin/manage-student" },
    // { name: "test", path: "/admin/manage-company" },
  ];

  const companyMenu = [
    { name: "ระบบจัดการนักศึกษา", path: "/company/student-list-company" },
    { name: "ประเมินนักศึกษา", path: "/company/evaluate-student-company" },
    // { name: "test", path: "/admin/manage-company" },
  ];
  const teacherMenu = [
    { name: "ระบบนักศึกษา", path: "/teacher/student-list" },
    { name: "ระบบสถานประกอบการ", path: "/teacher/company-management" },
    { name: "อนุมัติสถานประกอบการ", path: "/teacher/approve-company" },
    { name: "เลือกนิเทศนักศึกษา", path: "/teacher/supervision-management" },
    { name: "ประเมินนักศึกษา", path: "/teacher/evaluate-student" },
  ];
  // Upload Picture Modal/////////////////////////
  const [test, setTest] = useState(null);
  const [show, setShow] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangePasswordTeacher, setShowChangePasswordTeacher] =
    useState(false);
  const [showChangePasswordAdmin, setShowChangePasswordAdmin] = useState(false);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isAlert, setIsAlert] = useState(true);

  const handleShow = (param) => {
    setShow(true);
  };

  const handleShowChangePassword = () => {
    setShowChangePassword(true);
    setUse(user);
  };

  const handleShowChangePasswordTeacher = () => {
    setShowChangePasswordTeacher(true);
    setUse(user);
  };
  const handleShowChangePasswordAdmin = () => {
    setShowChangePasswordAdmin(true);
    setUse(user);
  };

  const handleClose = () => {
    setShow(false);
    setImage(null);
    setPreviewImage(null);
    setShowChangePassword(false);
    setShowChangePasswordTeacher(false);
    setShowChangePasswordAdmin(false);
  };
  // End Here/////////////////////////////////////

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const statusAlert = (status) => {
    return (
      <Row>
        <Col
          sm={"4"}
          className="d-flex justify-content-center align-items-center"
        >
          {status === "2" ||
          status === "3" ||
          status === "5" ||
          status === "6" ||
          status === "7" ||
          status === "8"
            ? checking
            : status === "1" || status === "9"
            ? wrong
            : status === "0"
            ? check
            : ""}
        </Col>
        <Col>
          <div style={{ fontSize: "2vh" }}>
            {" "}
            {status === "2" ? (
              <div>Job Description รอการตอบรับจากสถานประกอบการ</div>
            ) : status === "1" ? (
              <div> Job Description ของคุณไม่ผ่าน โปรดแก้ไข</div>
            ) : status === "0" ? (
              <div> เอกสารทั้งหมดเสร็จแล้ว </div>
            ) : status === "3" ? (
              <div> Job Description ของคุณกำลังรออาจารย์ตรวจสอบ</div>
            ) : status === "4" ? (
              <div>โปรดกรอก ใบสมัครสหกิจให้เรียบร้อย และ กรอกรายละเอียดงาน</div>
            ) : status === "5" ? (
              <div> รอการประเมินจากสถานประกอบการ</div>
            ) : status === "6" ? (
              <div>รอการประเมินจากอาจารย์</div>
            ) : status === "7" ? (
              <div> รอส่งเอกสาร</div>
            ) : status === "8" ? (
              <div> กำลังตรวจสอบเอกสาร</div>
            ) : status === "9" ? (
              <div>เอกสารไม่ผ่าน</div>
            ) : (
              ""
            )}
          </div>
        </Col>
      </Row>
    );
  };

  useEffect(() => {
    if (user?.profilePic) {
      setTest(user?.profilePic);
    }
  }, []);

  return (
    <div>
      {role ? (
        <Navbar className="nav-color" bg="light" expand="xxl" fixed="top">
          <Container fluid>
            <Navbar.Brand className="navbar-brand me-5">
              <Link className="navlink d-flex flex-row " to="/">
                <Image
                  src={logo}
                  className="d-inline-block align-top icon"
                  style={{ marginLeft: "70px" }}
                  alt="Logo"
                />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              {role === "student" ? (
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "200px" }}
                  navbarScroll
                >
                  <ToastContainer
                    position="top-end"
                    className="p-2 animate__bounceIn"
                  >
                    <Toast
                      bg="light"
                      show={isAlert}
                      onClose={() => setIsAlert(false)}
                    >
                      <Toast.Header>
                        <img
                          src="holder.js/20x20?text=%20"
                          className="rounded me-2"
                          alt=""
                        />
                        <strong className="me-auto">แจ้งเตือนสถานะ</strong>
                      </Toast.Header>
                      <Toast.Body>
                        {statusAlert(user?.documentStatus)}
                      </Toast.Body>
                    </Toast>
                  </ToastContainer>
                  {userMenu.map((item, index) => (
                    <Navbar.Text
                      className="d-flex justify-content-around me-3 ms-3"
                      key={index}
                    >
                      <Link className="navlink " to={item.path}>
                        <ul className="navbar-nav">
                          <li className="nav-item" key={index}>
                            {item.name}
                          </li>
                        </ul>
                      </Link>
                    </Navbar.Text>
                  ))}
                </Nav>
              ) : role === "admin" ? (
                <Nav
                  className="me-auto my-2 my-lg-0 ms-5"
                  style={{ maxHeight: "200px" }}
                  navbarScroll
                >
                  {adminMenu.map((item, index) => (
                    <Navbar.Text
                      className="d-flex justify-content-around me-3 ms-3"
                      key={index}
                    >
                      <Link className="navlink  " to={item.path}>
                        <ul className="navbar-nav">
                          <li className="nav-item">{item.name}</li>
                        </ul>
                      </Link>
                    </Navbar.Text>
                  ))}
                  <Navbar.Text className="d-flex justify-content-around me-3 ms-3 mt-2">
                    <NavDropdown
                      className="profile-nav  "
                      title={"จัดการข้อมูล"}
                    >
                      <NavDropdown.Item
                        as={Link}
                        to={"/admin/manage-student"}
                        className="masterData"
                      >
                        <Link className="" to={"/admin/manage-student"}>
                          ระบบจัดการนักศึกษา
                        </Link>
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        className="masterData"
                        as={Link}
                        to={"/admin/manage-company"}
                      >
                        <Link to={"/admin/manage-company"}>
                          ระบบจัดการสถานประกอบการ
                        </Link>
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        className="masterData"
                        as={Link}
                        to={"/admin/manage-teacher"}
                      >
                        <Link to={"/admin/manage-teacher"}>
                          ระบบจัดการอาจารย์
                        </Link>
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        className="masterData"
                        as={Link}
                        to={"/admin/manage-branch"}
                      >
                        <Link to={"/admin/manage-branch"}>ระบบจัดการสาขา</Link>
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        className="masterData"
                        as={Link}
                        to={"/admin/manage-faculty"}
                      >
                        <Link to={"/admin/manage-faculty"}>ระบบจัดการคณะ</Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Navbar.Text>
                </Nav>
              ) : role === "teacher" ? (
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "200px" }}
                  navbarScroll
                >
                  {teacherMenu.map((item, index) => (
                    <Navbar.Text className="me-3 ms-3 " key={index}>
                      <Link className="navlink " to={item.path}>
                        <ul className="navbar-nav">
                          <li className="nav-item" key={index}>
                            {item.name}
                          </li>
                        </ul>
                      </Link>
                    </Navbar.Text>
                  ))}
                </Nav>
              ) : role === "company" ? (
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "200px" }}
                  navbarScroll
                >
                  {companyMenu.map((item, index) => (
                    <Navbar.Text className="me-3 ms-3 " key={index}>
                      <Link className="navlink " to={item.path}>
                        <ul className="navbar-nav">
                          <li className="nav-item" key={index}>
                            {item.name}
                          </li>
                        </ul>
                      </Link>
                    </Navbar.Text>
                  ))}
                </Nav>
              ) : (
                ""
              )}
              <Nav
                className="ms-auto my-2 my-lg-0 mt-5 me-5"
                style={{ maxHeight: "200px" }}
                navbarScroll
              >
                {" "}
                <NavDropdown
                  className=" profile-nav "
                  title={
                    role === "student" ? (
                      <div>
                        <div className="mt-3" style={{ color: "#000000E6" }}>
                          <Image
                            width={"35px"}
                            height={"35px"}
                            roundedCircle
                            src={
                              test
                                ? getImageUrl(test)
                                : "/asset/img/noAvatar.jpg"
                            }
                            style={{
                              boxShadow:
                                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                            }}
                            className="me-2"
                          />
                          นักศึกษา {user?.firstname} {user?.lastname}
                        </div>
                      </div>
                    ) : role === "teacher" ? (
                      <div>
                        อาจารย์ {user?.firstname} {user?.lastname}
                      </div>
                    ) : role === "company" ? (
                      <div>บริษัท {user?.companyName}</div>
                    ) : role === "admin" ? (
                      <div className="">
                        แอดมิน {user?.firstname} {user?.lastname}
                      </div>
                    ) : (
                      ""
                    )
                  }
                  id="nav-dropdown"
                >
                  {role === "student" ? (
                    <div>
                      <NavDropdown.Item
                        onClick={handleShow}
                        className="upload-image"
                      >
                        <CgProfile style={{ fontSize: "20" }} /> อัพโหลดรูป
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="upload-image"
                        onClick={handleShowChangePassword}
                      >
                        <CgProfile style={{ fontSize: "20" }} /> เปลี่ยนรหัสผ่าน
                      </NavDropdown.Item>
                    </div>
                  ) : role === "teacher" ? (
                    <NavDropdown.Item
                      className="upload-image"
                      onClick={handleShowChangePasswordTeacher}
                    >
                      <CgProfile style={{ fontSize: "20" }} /> เปลี่ยนรหัสผ่าน
                    </NavDropdown.Item>
                  ) : role === "admin" ? (
                    <NavDropdown.Item
                      className="upload-image"
                      onClick={handleShowChangePasswordAdmin}
                    >
                      <CgProfile style={{ fontSize: "20" }} /> เปลี่ยนรหัสผ่าน
                    </NavDropdown.Item>
                  ) : (
                    ""
                  )}

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout} className="usernav">
                    <FiLogOut style={{ fontSize: "20" }} /> ออกจากระบบ
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
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
            <ChangePassword
              student={use}
              setStudent={setUse}
              show={showChangePassword}
              handleClose={handleClose}
            />
            <ChangePasswordTeahcer
              teacher={use}
              setTeacher={setUse}
              show={showChangePasswordTeacher}
              handleClose={handleClose}
            />

            <ChangePaswordAdmin
              admin={use}
              setAdmin={setUse}
              show={showChangePasswordAdmin}
              handleClose={handleClose}
            />
          </Container>
        </Navbar>
      ) : (
        ""
      )}

      <div style={{ marginBottom: "20vh" }}></div>
    </div>
  );
}

// <div>
//   <UploadProfileModal
//     handleClose={handleClose}
//     show={show}
//     image={image}
//     setImage={setImage}
//     user={user}
//     setPreviewImage={setPreviewImage}
//     previewImage={previewImage}
//     setTest={setTest}
//     setShow={setShow}
//     test={test}
//   />
//   {role ? (
//     <Navbar className="nav-color " expand="xxl" fixed="top">
//       <Container fluid>
//         <Navbar.Brand className="navbar-brand">
//           <Link className="navlink d-flex flex-row " to="/">
//             <Image
//               src={logo}
//               className="d-inline-block align-top icon"
//               style={{ marginLeft: "70px" }}
//               alt="Logo"
//             />
//           </Link>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />

//         <Navbar.Collapse id="navbarScroll" className="  ">
//           <div className="content-nav">
//             {role === "student" ? (
//               <div>
//                 <Nav
//                   navbarScroll
//                   style={{ maxHeight: "100px" }}
//                   className="ms-auto justify-content-end"
//                 >
//                   {userMenu.map((item, index) => (
//                     <Navbar.Text>
//                       <Link
//                         className="navlink d-flex flex-row "
//                         to={item.path}
//                       >
//                         <ul className="navbar-nav">
//                           <li className="nav-item" key={index}>
//                             {item.name}
//                           </li>
//                         </ul>
//                       </Link>
//                     </Navbar.Text>
//                   ))}
//                 </Nav>
//               </div>
//             ) : role === "admin" ? (
//               <div>
//                 <Nav className="me-auto justify-content-end">
//                   {adminMenu.map((item, index) => (
//                     <div className=" d-flex flex-row">
//                       <Navbar.Text>
//                         <Link
//                           className="navlink d-flex flex-row "
//                           to={item.path}
//                         >
//                           <ul className="navbar-nav">
//                             <li className="nav-item" key={index}>
//                               {item.name}
//                             </li>
//                           </ul>
//                         </Link>
//                       </Navbar.Text>
//                       <br></br>
//                     </div>
//                   ))}
//                   <Navbar.Text className="d-flex flex-row">
//                     <NavDropdown
//                       className="profile-nav mt-2 ms-3 "
//                       title={"Master Data"}
//                     >
//                       <NavDropdown.Item className="masterData">
//                         <Link to={"/admin/manage-student"}>
//                           Student Management
//                         </Link>
//                       </NavDropdown.Item>

//                       <NavDropdown.Item className="masterData">
//                         <Link to={"/admin/manage-company"}>
//                           Company Management
//                         </Link>
//                       </NavDropdown.Item>

//                       <NavDropdown.Item className="masterData">
//                         <Link to={"/admin/manage-teacher"}>
//                           Teacher Management
//                         </Link>
//                       </NavDropdown.Item>

//                       <NavDropdown.Item className="masterData">
//                         <Link to={"/admin/manage-branch"}>
//                           Branch Management
//                         </Link>
//                       </NavDropdown.Item>

//                       <NavDropdown.Item className="masterData">
//                         <Link to={"/admin/manage-faculty"}>
//                           Faculty Management
//                         </Link>
//                       </NavDropdown.Item>
//                     </NavDropdown>
//                   </Navbar.Text>
//                 </Nav>
//               </div>
//             ) : (
//               ""
//             )}
//           </div>

//           <NavDropdown
//             className="mt-3 me-5 profile-nav "
//             title={
//               role === "student" ? (
//                 <div>
//                   <Image
//                     width={"35px"}
//                     height={"35px"}
//                     roundedCircle
//                     src={
//                       test ? getImageUrl(test) : "/asset/img/noAvatar.jpg"
//                     }
//                     style={{
//                       boxShadow:
//                         "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
//                     }}
//                     className="me-2"
//                   />
//                   นักศึกษา {user?.firstname} {user?.lastname}
//                 </div>
//               ) : role === "teacher" ? (
//                 <div>
//                   อาจารย์ {user?.firstname} {user?.lastname}
//                 </div>
//               ) : role === "company" ? (
//                 <div>บริษัท {user?.companyName}</div>
//               ) : role === "admin" ? (
//                 <div>
//                   แอดมิน {user?.firstname} {user?.lastname}
//                 </div>
//               ) : (
//                 ""
//               )
//             }
//             id="nav-dropdown"
//           >
//             {role === "student" ? (
//               <NavDropdown.Item onClick={handleShow} className="usernav">
//                 <CgProfile style={{ fontSize: "20" }} /> อัพโหลดรูป Profile
//               </NavDropdown.Item>
//             ) : (
//               ""
//             )}

//             <NavDropdown.Divider />
//             <NavDropdown.Item onClick={logout} className="usernav">
//               <FiLogOut style={{ fontSize: "20" }} /> ออกจากระบบ
//             </NavDropdown.Item>
//           </NavDropdown>

//           {/* <Button variant="danger" className='justify-content-end signout' onClick={logout}>
//                         ออกจากระบบ
//                     </Button> */}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   ) : (
//     ""
//   )}

//   <div style={{ marginBottom: "40vh" }}></div>
// </div>

export default TestNav;
