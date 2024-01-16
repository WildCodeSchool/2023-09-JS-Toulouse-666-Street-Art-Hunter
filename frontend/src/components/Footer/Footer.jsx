import React from "react";
import { Link } from "react-router-dom";

import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer-container">
      <p>© 2024</p>
      <Link to="/legals">Mentions légales</Link>
    </footer>
  );
}

export default Footer;
