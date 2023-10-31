import "./App.scss";
// import Nav from "./components/Navigation/Nav";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <Route path="/register" element={<Register />} />
        <Route path="*">404 not found</Route>

        {/* Same as */}
        {/* <ToastContainer /> */}
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
