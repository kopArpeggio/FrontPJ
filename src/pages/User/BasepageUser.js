import React, { useEffect } from "react";
import { Container, Toast } from "react-bootstrap";
import { useOutletContext, Outlet } from "react-router-dom";
import TestNav from "../../components/TestNav";

function BasepageUser() {
  const { hiuser, hirole } = useOutletContext();

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
