import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.scss";

import Purple from "../../../../backend/public/assets/spray/spray-purple.png";
import BombSpray from "../../../../backend/public/assets/icons/bomb-spray-green.svg";
import Logo from "../../../../backend/public/assets/spray/logo.png";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page-main-container">
      <div className="logo-container">
        <img className="logo" src={Logo} alt="logo" />
        <img className="spray-violet" src={Purple} alt="spray violet" />
      </div>
      <div className="links-container">
        <div className="links-block">
          <img src={BombSpray} alt="Bombe spray" />
          <Link to="/map" className="links">
            Start
          </Link>
        </div>
        <div className="links-block">
          <img src={BombSpray} alt="Bombe spray" />
          <Link
            to="/rules"
            className="links"
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/rules");
            }}
          >
            Options
          </Link>
        </div>
      </div>
      <div className="copyright-container-main">
        <p>©2023 Wild Code School</p>
      </div>
    </div>
  );
}

export default LandingPage;
