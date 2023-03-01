import React, { useState, useEffect, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const PrivateRouteUser = () => {
  const api = "http://localhost:3001/api/";
  const [hirole, setRole] = useState("");
  const [hiuser, setUser] = useState([]);

  const navigate = useNavigate();
  async function getUser() {
    try {
      await axios.get(`${api}`).then(function (res) {
        setUser(res.data.data.student);
        setRole(res.data.data.Role);
      });
    } catch (error) {
      console.error(error);
    }
  }

  const leave = () => {
    Swal.fire({
      title: "Error!",
      text: "หน้านี้ไม่มีอยู่",
      icon: "error",
      confirmButtonText: "OK",
      showLoaderOnConfirm: true,
    }).then(() => {
      navigate(-1);
    });
  };
  const isLogin = localStorage.getItem("token");

  useEffect(() => {
    if (!isLogin) {
      leave();
    }
    getUser();
  }, []);

  return hirole === "student" ? (
    <Outlet context={{ hiuser, hirole }} />
  ) : (
    // leave()
    navigate(-1)
  );
};

export default PrivateRouteUser;
