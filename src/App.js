import "./App.css";

import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

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
import Error_role from "./pages/Error_role";
import BasepageUser from "./pages/User/BasepageUser";
import Regform from "./pages/User/Regform";
import Uploadfile from "./pages/User/Uploadfile";
import Userinfo from "./pages/User/Userinfo";
import Jobdescription from "./pages/User/jobDescription";
import Lab from "./components/Lab";
import CompanyManagement from "./pages/Admin/CompanyManagement";
import TeacherManagement from "./pages/Admin/TeacherManagement";
import FacultyManagement from "./pages/Admin/FacultyManagement";
import BranchManagement from "./pages/Admin/BranchManagement";
import PrivateRouteTeacher from "./pages/Private/PrivateRouteTeacher";
import StudentListTeacher from "./pages/Teacher/StudentListTeacher";
import BasepageTeacher from "./pages/Teacher/BasepagesTeacher";
import PrivateRouteCompany from "./pages/Private/PrivateRouteCompany";
import BasePageCompany from "./pages/Company/BasepageCompany";
import StudentListCompany from "./pages/Company/StudentListCompany";

function App() {
  const isAuthorized = localStorage.getItem("token");

  setupAxios(axios);

  return (
    <div className="App">
      <BrowserRouter>
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
          <Route path="/lab" element={<Lab />} />

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
              <Route element={<Admin />} path="manage-student" />
              <Route element={<CompanyManagement />} path="manage-company" />
              <Route element={<TeacherManagement />} path="manage-teacher" />
              <Route element={<FacultyManagement />} path="manage-faculty" />
              <Route element={<BranchManagement />} path="manage-branch" />
            </Route>
          </Route>
          <Route element={<PrivateRouteTeacher />}>
            <Route element={<BasepageTeacher />} path="/teacher">
              <Route element={<StudentListTeacher />} path="student-list" />
            </Route>
          </Route>
          <Route element={<PrivateRouteCompany />}>
            <Route element={<BasePageCompany />} path="/company">
              <Route element={<StudentListCompany />} path="student-list" />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

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
