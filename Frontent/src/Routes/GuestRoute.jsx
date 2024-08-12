import React from 'react'
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
    const UserToken = JSON.parse(localStorage.getItem("userToken"));
    return UserToken ? <Navigate to='/task' /> : children
}

export default GuestRoute