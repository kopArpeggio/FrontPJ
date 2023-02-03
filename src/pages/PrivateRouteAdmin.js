import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, } from "react-router-dom";

import axios from "axios";

const PrivateRouteAdmin = () => {
  const api = "http://localhost:3001/api/";
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  async function getUser() {
    try {
      await axios.get(`${api}`).then(function (res) {
        setRole(res.data.data.Role);
      });
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  const test = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate(-1);
  };

  return role === "teacher" ? <Outlet /> : navigate(-1);
};

export default PrivateRouteAdmin;
