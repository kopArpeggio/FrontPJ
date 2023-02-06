import React, { useEffect } from "react";
import { useNavigate, useOutletContext, Outlet } from "react-router-dom";
import TestNav from "../../components/TestNav";

function BasepageAdmin() {
  const { hiuser, hirole } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/admin/dashboard");
  }, []);

  return (
    <div>
      <TestNav user={hiuser} role={hirole} />
      <Outlet />
    </div>
  );
}

export default BasepageAdmin;
