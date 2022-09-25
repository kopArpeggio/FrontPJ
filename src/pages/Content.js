import React from 'react'
import '../App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './LoginForm';
import Error_role from './Error_role';
import User from './User';
import Admin from './Admin/Admin';
import PrivateRouteUser from './PrivateRouteUser';
import PrivateRouteAdmin from './PrivateRouteAdmin';
import ApplePage from './ApplePage';
import Regform from './User/Regform';
import Status from './Status';

function Content() {
    return (
        <div className="App">

            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/apple" element={<ApplePage />} />
                    <Route path="*" element={<Error_role />} />

                    <Route path="/testform" element={<Regform />} />
                    <Route path="/checkstatus" element={<Status />} />
                    


                    <Route element={<PrivateRouteUser />}>
                        <Route element={<User />} path='/user' />
                    </Route>
                    <Route element={<PrivateRouteAdmin />}>
                        <Route element={<Admin />} path='/admin' />
                    </Route>

                    {/* {role === 'Admin' ?
          <Route path="/home" element={<Admin/>}
           />
          :
          <Route path="/home" element={<User/>} />
          } */}

                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default Content