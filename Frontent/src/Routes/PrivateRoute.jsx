import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const UserToken = JSON.parse(localStorage.getItem("userToken"));
    return UserToken ? children : <Navigate to='/' />
}

export default PrivateRoute