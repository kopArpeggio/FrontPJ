import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import User from "./pages/User/User";
import Admin from "./pages/Admin/Admin";
import PrivateRouteUser from "./pages/Private/PrivateRouteUser";
import PrivateRouteAdmin from "./pages/Private/PrivateRouteAdmin";
import ApplePage from "./pages/ApplePage";
import "../node_modules/react-bootstrap-submenu/dist/index.css";
import LoginForm from "./pages/LoginForm";
import axios from "axios";
import { setupAxios } from "./axios";
import BasepageAdmin from "./pages/Admin/BasepageAdmin";
import { useEffect, useState } from "react";
import Error_role from "./pages/Error_role";
import BasepageUser from "./pages/User/BasepageUser";
import Regform from "./pages/User/Regform";
import Uploadfile from "./pages/User/Uploadfile";
import Userinfo from "./pages/User/Userinfo";
import Jobdescription from "./pages/User/jobDescription";
import { Container } from "react-bootstrap";

function App() {
  const isAuthorized = localStorage.getItem("token");

  setupAxios(axios);

  return (
    <div className="App">
      <Routes>
        {!isAuthorized ? (
          <Route path="/" element={<LoginForm />} />
        ) : (
          <Route
            path="/apple"
            element={<Navigate to="/apple" replace={true} />}
          />
        )}

        {!isAuthorized ? (
          <Route path="/" element={<Navigate to="/" replace={true} />} />
        ) : (
          <Route exact path="/" element={<ApplePage />} />
        )}
        {/* <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/apple" element={<ApplePage />} />
          <Route path="*" element={<Error_role />} />
          <Route path="/testnav" element={<TestNav />} />
          <Route path="/testupload" element={<Uploadfile />} />
          <Route path="/checkstatus" element={<Status />} />
          <Route path="/action" element={<Actionform />} />
          <Route path="/tech" element={<Fromtech />} />

          <Route path="/jobdesc" element={<Jobdesc />} />
          <Route path="/userinfo" element={<Userinfo />} />
          <Route path="/testpdf" element={<ApplePage />} />
          <Route path="/testform" element={<Regform />} /> */}
        {/* <Route index element={<LoginForm />} /> */}
        <Route path="*" element={<Error_role />} />

        <Route element={<PrivateRouteUser />}>
          <Route element={<BasepageUser />} path="/user">
            <Route element={<User />} path="dashboard" />
            <Route element={<Userinfo />} path="user-info" />
            <Route element={<Jobdescription />} path="user-job-description" />
            <Route element={<Regform />} path="register" />
            <Route element={<Uploadfile />} path="upload" />
          </Route>
        </Route>
        <Route element={<PrivateRouteAdmin />}>
          <Route element={<BasepageAdmin />} path="/admin">
            <Route element={<Admin />} path="dashboard" />
          </Route>
        </Route>
      </Routes>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default App;
