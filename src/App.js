import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';


function App() {
  
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>        
          <Route path='/' element= {<Home/>}></Route>
          <Route path= "/about" element={<About/>}></Route>
          <Route path= "/adduser" element={<AddUser/>}></Route>
          <Route path= "/editUser/:id" element={<EditUser/>}></Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
