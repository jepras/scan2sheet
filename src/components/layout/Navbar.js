import React from "react";

const Navbar = toggleSheetModal => {
  console.log(toggleSheetModal);
  return (
    <div>
      <nav
        className="navbar is-transparent is-fixed-top"
        role="navigation"
        aria-label="main navigation"
        style={{ opacity: 0.8 }}
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            Scan2sheet
          </a>

          <a className="navbar-item" href="/">
            Item
          </a>
          <a className="navbar-item" href="/">
            Item2
          </a>
          <button
            type="submit"
            className="navbar-item"
            onClick={toggleSheetModal}
          >
            Set up pricelist
          </button>
        </div>

        <div className="navbar-menu" />
      </nav>
    </div>
  );
};

export default Navbar;
