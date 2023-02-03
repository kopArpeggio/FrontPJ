import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import axios from "axios";
import TestNav from "../components/TestNav";

const PrivateRouteAdmin = () => {
  const api = "http://localhost:3001/api/";
  const [hirole, setRole] = useState("");
  const [hiuser, setUser] = useState([]);

  const navigate = useNavigate();
  async function getUser() {
    try {
      await axios.get(`${api}`).then(function (res) {
        setUser(res.data.data.teacher);
        setRole(res.data.data.Role);
      });
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return hirole === "teacher" ? (
    <Outlet context={{ hiuser, hirole }} />
  ) : (
    navigate(-1)
  );
};

export default PrivateRouteAdmin;
