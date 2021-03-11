import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">
          UWCC - Beta
        </Link>
        <Link className="navbar-brand" to="/plan">
          Coure planing
        </Link>
        <Link className="navbar-brand" to="/about">
          About
        </Link>
      </nav>
    );
  }
}

export default NavBar;
