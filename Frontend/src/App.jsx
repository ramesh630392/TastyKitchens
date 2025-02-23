import { useState } from 'react'
import Navbar from './assets/Navbar/Navbar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './assets/Home/Home';
import { Login } from './assets/Login/Login';
import  EachRestaurant  from './assets/EachRestaurant/EachRestaurant';
import { Cart } from './assets/Cart/Cart';
import { NotFound } from './assets/NotFound/NotFound';

function App() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path = '/login' element={<Login/>} />
          <Route exact path='/' element={<Home/>} />
          <Route exact path = {"/restaurant/:id"} element={<EachRestaurant/>} />
          <Route exact path = "/cart" element={<Cart/>}/>
          <Route path = "*" element = {<NotFound/>}/>
        </Routes>
      </Router>
      </div>
  );
};

export default App
