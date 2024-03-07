import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { signinApi } from './redux/api.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiProvider api = {signinApi}>
    <App />
    </ApiProvider>
  </React.StrictMode>,
)
