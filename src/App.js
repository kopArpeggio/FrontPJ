import "./App.css";
import {
  Routes,
  Route,
  redirect,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import Login from "./pages/LoginForm";
import Error_role from "./pages/Error_role";
import User from "./pages/User";
import Admin from "./pages/Admin/Admin";
import PrivateRouteUser from "./pages/PrivateRouteUser";
import PrivateRouteAdmin from "./pages/PrivateRouteAdmin";
import ApplePage from "./pages/ApplePage";
import Regform from "./pages/User/Regform";
import Status from "./pages/Status";
import Fromtech from "./pages/Fromtech";
import TestNav from "./components/TestNav";
import Uploadfile from "./pages/User/Uploadfile";
import Actionform from "./pages/Actionform";
import "../node_modules/react-bootstrap-submenu/dist/index.css";
import Userinfo from "./pages/User/Userinfo";
import Jobdesc from "./pages/User/Jobdesc";
import LoginForm from "./pages/LoginForm";

function App() {
  const isAuthorized = localStorage.getItem("token");

  return (
    <div className="App">
      <Routes>
        {!isAuthorized ? (
          <Route exact path="/" element={<LoginForm />} />
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
          <Route path="/testform" element={<Regform />} />

          <Route element={<PrivateRouteUser />}>
            <Route element={<User />} path='/user' />
          </Route>
          <Route element={<PrivateRouteAdmin />}>
            <Route element={<Admin />} path='/admin' />
          </Route> */}
      </Routes>
    </div>
  );
}

export default App;
