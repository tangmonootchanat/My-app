import React from 'react'
import {
  BrowserRouter as Router, Routes, Route, Navigate, Outlet
} from 'react-router-dom';
import Register from '../view/Register';
import Login from '../view/Login';
import Resetpassword from '../view/Resetpassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Resetpassword' element={<Resetpassword />}/>
      </Routes>
    </Router>
  )
}

export default App