import "./App.scss";
import NavHeader from "./components/Navigation/NavHeader";
import React, { useEffect, useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import { Audio } from "react-loader-spinner";
import _ from "lodash";
import { UserContext } from "./context/UserContext";
import { Scrollbars } from "react-custom-scrollbars";
function App() {
  const { user } = useContext(UserContext);
  const [scrollHeight, setScrollHeight] = useState();
  useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight);
  }, [user]);
  return (
    <Scrollbars autoHide style={{ height: scrollHeight }}>
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
            <AppRoutes />
            <ToastContainer
              position="top-right"
              autoClose={3000}
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
    </Scrollbars>
  );
}

export default App;
