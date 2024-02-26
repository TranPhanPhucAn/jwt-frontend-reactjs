import React, { useEffect, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";
const Login = (props) => {
  let navigate = useNavigate();
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  let handleOnClickNewAccount = () => {
    navigate("/register");
  };
  let handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!valueLogin) {
      setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
      toast.error("Please enter your email or phone number");
      return;
    }
    if (!password) {
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      toast.error("Please enter your password");
      return;
    }
    let response = await loginUser(valueLogin, password);
    if (response && +response.EC === 0) {
      //success
      let data = {
        isAuthenticated: true,
        token: "fake token",
      };
      sessionStorage.setItem("account", JSON.stringify(data));
      navigate("/users");
      window.location.reload();
    }
    if (response && +response.EC !== 0) {
      toast.error(response.EM);
    }
  };
  const handlePressEnter = (event) => {
    if (event.keyCode === 13 && event.key === "Enter") {
      handleLogin();
    }
  };
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      navigate("/");
    }
  }, []);
  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">JWT</div>
            <div className="detail">Learning SERN all things</div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">JWT</div>
            <input
              type="text"
              className={
                objValidInput.isValidValueLogin
                  ? "form-control"
                  : "is-invalid form-control"
              }
              placeholder="Email or phone number"
              value={valueLogin}
              onChange={(event) => {
                setValueLogin(event.target.value);
              }}
            />
            <input
              type="password"
              className={
                objValidInput.isValidPassword
                  ? "form-control"
                  : "is-invalid form-control"
              }
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onKeyDown={(event) => handlePressEnter(event)}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
            <span className="text-center">
              <a className="forgot-password" href="#">
                Foget your password
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleOnClickNewAccount()}
              >
                Create a new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
