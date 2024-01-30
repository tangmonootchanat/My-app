import React from 'react'
import {
  BrowserRouter as Router, Routes, Route, Navigate, Outlet
} from 'react-router-dom';
import Register from '../view/Register';
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