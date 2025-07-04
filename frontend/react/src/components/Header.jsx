import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/dashboard">Digitlysign-PDF</Link>
      <div>
        <Link className="btn btn-outline-light me-2" to="/Register">register</Link>
        <Link className="btn btn-outline-danger" to="/login">Login</Link>
      </div>
    </div>
  </nav>
);

export default Header;
