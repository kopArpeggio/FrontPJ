import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Error_role() {
  const navigate = useNavigate();

  useEffect(() => {
    alert("Path ที่คุณเลือกไม่ถูกต้อง หรือ User Type ของคุณไม่มีในระบบ");
    navigate("/");
  });

  return (
    <div>
      <h1>Path ที่คุณเลือกไม่มีอยู่</h1>
    </div>
  );
}
