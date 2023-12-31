import React from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom";
function Nav(props) {
  return (
    <div>
      <div className="topnav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </div>
  );
}

export default Nav;
