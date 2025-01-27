import React from "react";
import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom";

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from "./components/Navbar.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar/>
    <App />
    </BrowserRouter>,

)
