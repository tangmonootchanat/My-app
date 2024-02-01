import React from 'react'
import {
  BrowserRouter as Router, Routes, Route, Navigate, Outlet
} from 'react-router-dom';
import Register from '../view/Register';
import Showdata from '../view/Showdata';
import Login from '../view/Login';
import Resetpassword from '../view/Resetpassword';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Register />} />
      <Route path='/Showdata' element={<Showdata/>}/>
      </Routes>
    </Router>
  )
}

export default App