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
<<<<<<< HEAD
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/resetPassword' element={<Resetpassword />} />
=======
      <Route path='/Registers' element={<Register />} />
      <Route path='/Resetpassword' element={<Resetpassword />} />
>>>>>>> 16252669a65e8effa737b46798de6ca2d1069b43
      </Routes>
    </Router>
  )
}

export default App