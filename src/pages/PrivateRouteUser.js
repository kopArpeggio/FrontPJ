import React from 'react'
import { Outlet, useNavigate ,Navigate} from 'react-router-dom'

const PrivateRouteUser = () => {
  const get_role = localStorage.getItem('role')
  const role = ('role: ', JSON.parse(get_role))
  const navigate = useNavigate();
  const test = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate(-1)
  }

  return role.role === 'User' ? <Outlet /> :test;
};

export default PrivateRouteUser