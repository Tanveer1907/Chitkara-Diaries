import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/chitkara.jpg"; // put image in src/assets/

export default function MainNavbar() {
  return (
   <div className="navbar">
  <div className="nav-left">
    <img src={logo} alt="logo" className="navbar-logo" />
    <h1 className="navbar-title">Chitkara Diaries</h1>
  </div>

  <div className="nav-links">
    <Link to="/">Home</Link>
    <Link to="/journal">Journal</Link>
    <Link to="/voting">Voting</Link>
    <Link to="/clubs">Clubs</Link>
    <Link to="/contact">Contact</Link>
    <Link to="/auth">Login</Link>
  </div>
</div>



  );
}
