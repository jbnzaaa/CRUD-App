// react library
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// components
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Users from "./views/Users";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import DeleteUser from "./components/DeleteUser";
// css file
import "./styles/main.css"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/users/create" element={<AddUser/>}/>
        <Route path="/users/:id/edit" element={<EditUser/>}/>
        <Route path="/users/:id/delete" element={<DeleteUser/>}/>
      </Routes>
    </Router>
  )
}

export default App

// functionalities:
// - directories '/' and '/users'
// - opening modal based on directories and user id