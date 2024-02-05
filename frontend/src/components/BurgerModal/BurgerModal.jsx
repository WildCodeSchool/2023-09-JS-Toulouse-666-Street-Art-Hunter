import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import pinkSplatter from "../../assets/images/pink-splatter.svg";
import tealSplatter from "../../assets/images/teal-splatter.svg";
import greenSplatter from "../../assets/images/green-splatter.svg";
import LogoSimple from "../../assets/icons/logo-simple.svg";
import "./BurgerModal.scss";

function BurgerModal({ isOpen, handleBurger }) {
  const navigate = useNavigate();
  return (
    <div className={`overlay-container ${isOpen ? "profile-modal-slide" : ""}`}>
      <div className="logo-container">
        <button className="burger" type="button" onClick={handleBurger}>
          <img src={LogoSimple} alt="burger logo" />
        </button>
      </div>
      <li className="links-container">
        <Link to="/map" onClick={handleBurger}>
          Carte
        </Link>
        <Link
          to="/ranking"
          onClick={() => {
            navigate("/ranking");
            handleBurger();
          }}
        >
          Classement
        </Link>

        <Link
          to="/rules"
          onClick={() => {
            navigate("/rules");
            handleBurger();
          }}
        >
          Règles
        </Link>

        <Link
          to="/about-us"
          onClick={() => {
            navigate("/about-us");
            handleBurger();
          }}
        >
          Créateurs
        </Link>
        <Link
          to="/legals"
          onClick={() => {
            navigate("/legals");
            handleBurger();
          }}
        >
          Mentions
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
