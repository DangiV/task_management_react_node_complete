import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../component/Login'
import Task from '../component/Task'
import Register from '../component/Register'
import PrivateRoute from './PrivateRoute'
import GuestRoute from './GuestRoute'

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<GuestRoute> <Login /> </GuestRoute>} />
        <Route path='/register' element={<Register />} />
        <Route path='/task' element={<PrivateRoute> <Task /> </PrivateRoute>} />
      </Routes>
    </>
  )
}

export default Routing
