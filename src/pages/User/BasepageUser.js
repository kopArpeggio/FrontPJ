import React, { useEffect } from "react";
import { useNavigate, useOutletContext, Outlet } from "react-router-dom";
import TestNav from "../../components/TestNav";

function BasepageUser() {
  const { hiuser, hirole } = useOutletContext();
  const navigate = useNavigate();
  console.log(hiuser, hirole);
  return (
    <div>
     
      <Outlet />
    </div>
  );
}

export default BasepageUser;
