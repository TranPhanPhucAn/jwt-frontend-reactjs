import "./App.scss";
import NavHeader from "./components/Navigation/NavHeader";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Users from "./components/ManageUsers/Users";
import React, { useEffect, useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import { Audio } from "react-loader-spinner";
import _ from "lodash";
import { UserContext } from "./context/UserContext";

function App() {
  // const [account, setAccount] = useState({});
  // useEffect(() => {
  //   let session = sessionStorage.getItem("account");
  //   if (session) {
  //     console.log("check: ", JSON.parse(session));
  //     setAccount(JSON.parse(session));
  //   }
  // }, []);
  const { user } = useContext(UserContext);
  // console.log("check user:", user);
  return (
    <>
      {user && user.isLoading ? (
        <div className="loading-container">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="#1877f2"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
          <div>Loading data</div>
        </div>
      ) : (
        <>
          <div className="app-header">
            <NavHeader />
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
      )}
    </>
  );
}

export default App;
