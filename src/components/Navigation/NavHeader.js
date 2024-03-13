import React, { useState, useEffect, useContext } from "react";
import "./Nav.scss";
import {
  Link,
  NavLink,
  matchRoutes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";
function NavHeader(props) {
  const { user, logoutContext } = useContext(UserContext);
  let navigate = useNavigate();

  const [isShow, setIsShow] = useState(true);
  const location = useLocation();
  // useEffect(() => {
  //   if (location.pathname === "/login") {
  //     setIsShow(false);
  //   }
  // }, []);
  const handleLogout = async () => {
    let data = await logoutUser();
    localStorage.removeItem("jwt");
    logoutContext();
    if (data && +data.EC === 0) {
      navigate("/login");
    } else {
      toast.error(data.EM);
    }
  };
  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <div className="nav-header">
        {/* {isShow === true && ( */}
        {/* <div className="topnav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/project">Project</NavLink>
          <NavLink to="/about">About</NavLink>
        </div> */}
        {/* )} */}
        <Navbar expand="lg" className="bg-body-tertiary" bg="header">
          <Container>
            <Navbar.Brand href="#home">JWT</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/users" className="nav-link">
                  Users
                </NavLink>
                <NavLink to="/roles" className="nav-link">
                  Roles
                </NavLink>
                <NavLink to="/project" className="nav-link">
                  Project
                </NavLink>
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
              </Nav>
              <Nav>
                {user && user.isAuthenticated === true ? (
                  <>
                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                      <NavDropdown.Item>Change password</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <span onClick={() => handleLogout()}>Log out</span>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item className="nav-link">
                      Welcome {user.account.username}!
                    </Nav.Item>
                  </>
                ) : (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  } else {
    return <></>;
  }
}

export default NavHeader;
