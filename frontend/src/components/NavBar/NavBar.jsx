import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import fetchUserData from "../../services/Loaders/FetchUserData";

import "./NavBar.scss";

import burgerLogo from "../../../../backend/public/assets/icons/burger-logo.svg";
import LogoProfileUser from "../../../../backend/public/assets/icons/profile-user.svg";
import LogoProfileAdmin from "../../../../backend/public/assets/icons/profile-admin.svg";
import ProfileModal from "../ProfileModal/ProfileModal";
import BurgerModal from "../BurgerModal/BurgerModal";

function NavBar({ isOpen, setIsOpen }) {
  const [modalIsConnected, setModalIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState();
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

  // Vérifier si la personne connecté est admin ou simple utilisateur pour changer le logo
  const user = localStorage.getItem("user");
  const userParse = JSON.parse(user);

  const [userData, setUserData] = useState();

  useEffect(() => {
    fetchUserData(setUserData, userData);
  }, []);

  useEffect(() => {
    if (userParse) {
      const currentUser =
        userData && userData.find((el) => el.id === userParse.id);
      const admin = currentUser && currentUser.is_admin === 1;
      setIsAdmin(admin); // Mettez à jour l'état ici au lieu de le faire dans le rendu
    }
  }, [userParse, userData]);

  return (
    <>
      <header className="navbar-container">
        <button className="burger" type="button" onClick={handleBurger}>
          <img src={burgerLogo} alt="burger logo" />
        </button>

        <li>
          <Link to="/map">CARTE</Link>
          <Link to="/ranking">CLASSEMENT</Link>
          <Link to="/rules">REGLES</Link>
          <Link to="/about-us">CREATEURS</Link>
        </li>
        {isAdmin ? (
          <button
            className="profile"
            type="button"
            onClick={token ? handleProfile : handleLogin}
          >
            <img src={LogoProfileAdmin} alt="profile logo" />
          </button>
        ) : (
          <button
            className="profile"
            type="button"
            onClick={token ? handleProfile : handleLogin}
          >
            <img src={LogoProfileUser} alt="profile logo" />
          </button>
        )}
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
