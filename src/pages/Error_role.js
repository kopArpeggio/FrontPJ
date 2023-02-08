import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Error_role() {
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      title: "Error!",
      text: "หน้านี้ไม่มีอยู่",
      icon: "error",
      confirmButtonText: "Cool",
    }).then((result) => {
      navigate("/");
    });
  });
}
