import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const PrivateRouteCompany = () => {
  const api = `${process.env.REACT_APP_UPLOAD_HOST}/${process.env.REACT_APP_API_PATH}/`
  const [hirole, setRole] = useState("");
  const [hiuser, setUser] = useState([]);

  const navigate = useNavigate();

  async function getUser() {
    try {
      await axios.get(`${api}`).then(function (res) {
        setUser(res.data.data.workplace);
        setRole(res.data.data.Role);
      });
    } catch (error) {
      console.error(error);
    }
  }
  const isLogin = localStorage.getItem("token");

  const leave = () => {
    Swal.fire({
      title: "Error!",
      text: "หน้านี้ไม่มีอยู่",
      icon: "error",
      confirmButtonText: "OK",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      navigate(-1);
    });
  };

  useEffect(() => {
    if (!isLogin) {
      leave();
    }
    getUser();
  }, []);

  return hirole === "company" ? (
    <Outlet context={{ hiuser, hirole }} />
  ) : (
    // leave()
    navigate(-1)
  );
};

export default PrivateRouteCompany;
