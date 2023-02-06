import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

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
  useEffect(() => {
    getUser();
  }, []);

  return hirole === "student" ? (
    <Outlet context={{ hiuser, hirole }} />
  ) : (
    navigate(-1)
  );
};

export default PrivateRouteUser;
