import React from "react";
import "./navbar.css";
import logo from "../../assets/chitkara.jpg";
import { Link } from "react-router-dom";

export default function AuthNavbar() {
  return (
    <nav className="navbar auth-navbar">
      <div className="nav-left">
        <img src={logo} alt="logo" className="navbar-logo" />
        <span className="navbar-title">Chitkara Diaries</span>
      </div>

      <ul className="nav-links auth-links">
        <Link to="/">Back to Home</Link>
      </ul>
    </nav>
  );
}
