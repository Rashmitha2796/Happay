import React from "react";
import { Link } from "react-router-dom";
const Navbar = (props) => {
  const { cartValue, onCartClick } = props;
  return (
    <div className="navbar">
      <nav className="nav">
        <div className="logoBtn">
          <Link to="/">
            <img
              src="https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/blue_logo.svg"
              alt="logo"
            />
            <p>
              <span>Happay</span>
            </p>
          </Link>
          <div className="shopping-icon mobile-shopping">
            <Link to="/cart" onClick={onCartClick}>
              <i className="fas fa-shopping-cart"></i> <span>{cartValue}</span>
            </Link>
          </div>
        </div>
        <Link to="/cart" onClick={onCartClick}>
          <div className="shopping-icon">
            <i className="fas fa-shopping-cart"></i> <span>{cartValue}</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
