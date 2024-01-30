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
      <Route path='/' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App