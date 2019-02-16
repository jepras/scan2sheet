import React from "react";
import { Link } from "react-router-dom";

/* Need to change links to conditional rendering based on users sheets */
/* Need to add conditional based on logged in/out */
/* Header needs to be a container component for rendering all the sheets related to user */

const Header = () => {
  return (
    <div>
      <nav
        className="navbar is-transparent is-fixed-top is-primary"
        role="navigation"
        aria-label="main navigation"
        style={{ opacity: 0.8, backgroundColor: "#00d1b2" }}
      >
        <div className="navbar-brand is-vcentered">
          <Link to="/" className="navbar-item">
            Scan2sheet
          </Link>

          <Link
            to="/pricelist/Danzafe"
            className="navbar-item"
            type="link"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Danzafe
          </Link>
          <Link
            to="/app"
            className="navbar-item"
            type="link"
            style={{ fontWeight: "bold", color: "black" }}
          >
            App
          </Link>
        </div>
        <div className="navbar-end">
          <a type="submit" className="navbar-item" href="/">
            Set up pricelist
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
