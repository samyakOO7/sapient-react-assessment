import React from "react";
import PropTypes from "prop-types";
import "./Header.style.css";

const Header = ({ title }) => (
  <header className="header-container" role="banner">
  <h1 className="header-text">{title}</h1>
</header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired 
};

export default Header;
