import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useOutletContext, Outlet } from "react-router-dom";
import TestNav from "../../components/TestNav";

function BasepageUser() {
  const { hiuser, hirole } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {}, []);
  return (
    <div>
      <TestNav user={hiuser} role={hirole} />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default BasepageUser;
