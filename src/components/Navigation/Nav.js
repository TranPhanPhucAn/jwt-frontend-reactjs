import React, { useState, useEffect } from "react";
import "./Nav.scss";
import { NavLink, matchRoutes, useLocation } from "react-router-dom";

function Nav(props) {
  const [isShow, setIsShow] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login") {
      setIsShow(false);
    }
  }, []);
  return (
    <div>
      {isShow === true && (
        <div className="topnav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/project">Project</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      )}
    </div>
  );
}

export default Nav;
