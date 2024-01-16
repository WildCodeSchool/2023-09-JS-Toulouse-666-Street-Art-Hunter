import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import pinkSplatter from "../../assets/images/pink-splatter.svg";
import tealSplatter from "../../assets/images/teal-splatter.svg";
import greenSplatter from "../../assets/images/green-splatter.svg";
import burgerLogo from "../../assets/icons/burger-logo.svg";
import "./BurgerModal.scss";

function BurgerModal({ isOpen, handleBurger }) {
  return (
    <div className={`overlay-container ${isOpen ? "profile-modal-slide" : ""}`}>
      <div className="logo-container">
        <button className="burger" type="button" onClick={handleBurger}>
          <img src={burgerLogo} alt="burger logo" />
        </button>
      </div>
      <li>
        <Link to="/map" onClick={handleBurger}>
          CARTE
        </Link>
        <Link to="/leaderboard" onClick={handleBurger}>
          CLASSEMENT
        </Link>
        <Link to="/article" onClick={handleBurger}>
          ARTICLES
        </Link>
        <Link to="/artist" onClick={handleBurger}>
          ARTISTES
        </Link>
        <Link to="/rules" onClick={handleBurger}>
          REGLES
        </Link>
        <Link to="/about" onClick={handleBurger}>
          CREATEURS
        </Link>
      </li>
      <img
        className="splatter teal-splatter"
        src={tealSplatter}
        alt="teal splatter"
      />
      <img
        className="splatter pink-splatter"
        src={pinkSplatter}
        alt="pink splatter"
      />
      <img
        className="splatter green-splatter"
        src={greenSplatter}
        alt="green splatter"
      />
    </div>
  );
}

BurgerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleBurger: PropTypes.func.isRequired,
};

export default BurgerModal;
