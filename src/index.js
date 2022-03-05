import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import './8px-grid.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/samsung-kepzes">
      <Routes>
        <Route exact path="/" element={<App />}/>
        <Route exact path=":id" element={<App />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
