/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import Login from '../pages/login/Login'
import {
    BrowserRouter,
    Route,
    Routes
  } from "react-router-dom";
import Hero from '../component/hero/Hero';
import Registration from '../pages/registration/Registration';
const BaseRouting = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Hero/>}/>
    <Route path="/login" element={<Login />} />
    <Route path="/registration" element={<Registration/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default BaseRouting