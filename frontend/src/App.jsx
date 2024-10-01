import React from 'react'
import { useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Navbar from './components/Navbar'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Land from './pages/Land'
import CreatePet from './pages/CreatePet'
import Pet from './pages/Pet'

const App = () => {
  return (
    <main className = "bg-slate-300/20">
      <Router>
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/signup" element = {<SignUp />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/createpet" element = {<CreatePet />} />
          <Route path = "/pet" element = {<Pet />} />
          <Route path = "/land" element = {<Land />} />
        </Routes>
      </Router>
    </main>
  )
}
export default App
