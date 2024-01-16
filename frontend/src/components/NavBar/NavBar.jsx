import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import "./NavBar.scss";

import burgerLogo from "../../assets/icons/burger-logo.svg";
import profileLogo from "../../assets/icons/profile-logo.svg";
import ProfileModal from "../ProfileModal/ProfileModal";
import BurgerModal from "../BurgerModal/BurgerModal";

function NavBar({ isOpen, setIsOpen }) {
  const [modalIsConnected, setModalIsConnected] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleBurger = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    return navigate("/login");
  };

  const handleProfile = () => {
    setModalIsConnected(!modalIsConnected);
  };

  return (
    <>
      <header className="navbar-container">
        <button className="burger" type="button" onClick={handleBurger}>
          <img src={burgerLogo} alt="burger logo" />
        </button>

        <li>
          <Link to="/map">CARTE</Link>
          <Link to="/leaderboard">CLASSEMENT</Link>
          <Link to="/article">ARTICLES</Link>
          <Link to="/artist">ARTISTES</Link>
          <Link to="/rules">REGLES</Link>
          <Link to="/about">CREATEURS</Link>
        </li>
        <button
          className="profile"
          type="button"
          onClick={token ? handleProfile : handleLogin}
        >
          <img src={profileLogo} alt="profile logo" />
        </button>
      </header>
      <BurgerModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleBurger={handleBurger}
      />
      <ProfileModal
        setModalIsConnected={setModalIsConnected}
        modalIsConnected={modalIsConnected}
      />
    </>
  );
}

NavBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default NavBar;
