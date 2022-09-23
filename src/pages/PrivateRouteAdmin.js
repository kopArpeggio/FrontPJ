import React from 'react'
import { Outlet, useNavigate, Navigate } from 'react-router-dom'

const PrivateRouteAdmin = () => {
    const navigate = useNavigate()
    const get_role = localStorage.getItem('role')
    const role = ('role: ', JSON.parse(get_role))

    const test = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate(-1)
    }

    return  role.role === 'Admin' ? <Outlet /> : test ;

    
};

export default PrivateRouteAdmin