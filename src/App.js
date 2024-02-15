import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Users from "./components/ManageUsers/Users";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import _ from "lodash";
function App() {
  const [account, setAccount] = useState({});
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      console.log("check: ", JSON.parse(session));
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <>
      <div className="app-header">
        <Nav />
      </div>
      <div className="app-container">
        {/* {console.log("alo: ", account)} */}
        {/* {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />} */}
        {/* <Nav /> */}
        <AppRoutes />
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
    </>
  );
}

export default App;
