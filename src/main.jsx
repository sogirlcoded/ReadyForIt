import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { useState } from 'react'
import React from 'react';
import './App.css'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
