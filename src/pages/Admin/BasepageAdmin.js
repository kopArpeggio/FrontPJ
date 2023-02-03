import React from "react";
import {
  Route,
  Routes,
  Navigate,
  useOutletContext,
  Outlet,
} from "react-router-dom";
import TestNav from "../../components/TestNav";
import ApplePage from "../ApplePage";
import Admin from "./Admin";

function BasepageAdmin() {
  const { hiuser, hirole } = useOutletContext();

  return (
    <div>
      <TestNav user={hiuser} role={hirole} />
      <Outlet />
    </div>
  );
}

export default BasepageAdmin;
