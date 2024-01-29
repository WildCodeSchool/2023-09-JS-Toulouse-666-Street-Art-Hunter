import React from "react";
import { Link } from "react-router-dom";

import "./Footer.scss";

function Footer() {
  // ********************* LOGIQUE *********************
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };
  // ********************* RENDER *********************
  return (
    <footer className="footer-container">
      <p>© 2024</p>
      <Link to="/legals" onClick={handleLinkClick}>
        Mentions légales
      </Link>
    </footer>
  );
}

export default Footer;
