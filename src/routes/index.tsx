import React from 'react'
import {
  BrowserRouter as Router, Routes, Route, Navigate, Outlet
} from 'react-router-dom';
import Register from '../view/Register';
import Login from '../view/Login';
// import ForgetPassword from '../view/ForgetPassword';
import Resetpassword from '../view/Resetpassword';
import Showdata from '../view/Showdata';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        {/* <Route path='/ForgetPassword' element={<ForgetPassword />} /> */}
        <Route path='/Resetpassword/:Id' element={<Resetpassword />} />
        <Route path='/Showdata' element={<Showdata/>}/>
      </Routes>
    </Router>
  )
}

export default App