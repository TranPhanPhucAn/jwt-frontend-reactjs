import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import React from "react";
function App() {
  return (
    <div className="app-container">
      {/* <Nav /> */}
      <Routes>
        <Route path="/news" />
        <Route path="/about">about</Route>
        <Route path="/contact">contact</Route>
        <Route path="/login" element={<Login />} />
        <Route path="/">home</Route>
        <Route path="*">404 not found</Route>
      </Routes>
    </div>
  );
}

export default App;
