import React from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// import axios from "axios";
import { registerNewUser } from "../../services/userService";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objectCheckInput, setObjectCheckInput] = useState(defaultValidInput);
  let navigate = useNavigate();
  let handleLogin = () => {
    navigate("/login");
  };
  useEffect(() => {}, []);
  const isValidInputs = () => {
    setObjectCheckInput(defaultValidInput);
    if (!email) {
      toast.error("Email is required!");
      setObjectCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      setObjectCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!phone) {
      toast.error("Phone is required!");
      setObjectCheckInput({ ...defaultValidInput, isValidphone: false });
      return false;
    }
    if (!password) {
      toast.error("Password is required!");
      setObjectCheckInput({ ...defaultValidInput, isValidphone: false });
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Your password is not the same");
      setObjectCheckInput({
        ...defaultValidInput,
        isValidConfirmPassword: false,
      });

      return false;
    }
    return true;
  };
  let handleRegister = async () => {
    let check = isValidInputs();
    if (check === true) {
      let response = await registerNewUser(email, phone, username, password);
      let serverData = response.data;
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        navigate("/login");
      } else {
        toast.error(serverData.EM);
      }
    }
  };
  return (
    <div className="register-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">JWT</div>
            <div className="detail">Learning SERN all things</div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">JWT</div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className={
                  objectCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email or phone number"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone number:</label>
              <input
                type="text"
                className={
                  objectCheckInput.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>User name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="User name"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className={
                  objectCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Re-enter password :</label>
              <input
                type="password"
                className={
                  objectCheckInput.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Register
            </button>
            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already've an account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
