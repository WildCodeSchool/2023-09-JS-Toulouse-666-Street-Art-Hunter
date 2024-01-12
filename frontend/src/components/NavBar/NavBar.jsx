import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./NavBar.scss";

import burgerLogo from "../../assets/icons/burger-logo.svg";
import profileLogo from "../../assets/icons/profile-logo.svg";
import pinkSplatter from "../../assets/images/pink-splatter.svg";
import tealSplatter from "../../assets/images/teal-splatter.svg";
import greenSplatter from "../../assets/images/green-splatter.svg";

function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleBurger = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    return navigate("/login");
  };

  const handleProfile = () => {
    return navigate("/profile");
  };

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <button className="burger" type="button" onClick={handleBurger}>
          <img src={burgerLogo} alt="burger logo" />
        </button>
        <li>
          <Link to="/map">Carte</Link>
          <Link to="/leaderboard">Classement</Link>
          <Link to="/article">Articles</Link>
          <Link to="/artist">Artistes</Link>
          <Link to="/rules">Regles</Link>
        </li>
        <button
          className="profile"
          type="button"
          onClick={token ? handleProfile : handleLogin}
        >
          <img src={profileLogo} alt="profile logo" />
        </button>
      </nav>
      {isOpen && (
        <div className="overlay-container">
          <button className="burger" type="button" onClick={handleBurger}>
            <img src={burgerLogo} alt="burger logo" />
          </button>
          <li>
            <Link to="/map">Carte</Link>
            <Link to="/leaderboard">Classement</Link>
            <Link to="/article">Articles</Link>
            <Link to="/artist">Artistes</Link>
            <Link to="/rules">Regles</Link>
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
      )}
    </header>
  );
}

export default NavBar;
