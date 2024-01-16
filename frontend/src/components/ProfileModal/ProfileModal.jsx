import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import closeLogo from "../../assets/icons/close-logo.svg";
import "./ProfileModal.scss";

function ProfileModal({ modalIsConnected, setModalIsConnected }) {
  const navigate = useNavigate();
  const handleDisconnect = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setModalIsConnected(!modalIsConnected);
    return navigate("/login");
  };

  return (
    <div
      className={`profile-modal-container ${
        modalIsConnected ? "slide-in" : ""
      }`}
    >
      <div>
        <Link to="/profile">Profile</Link>
        <button type="button" onClick={handleDisconnect}>
          Deconnexion
        </button>
      </div>
      <button
        type="button"
        onClick={() => setModalIsConnected(!modalIsConnected)}
      >
        <img src={closeLogo} alt="X logo" />
      </button>
    </div>
  );
}

ProfileModal.propTypes = {
  modalIsConnected: PropTypes.bool.isRequired,
  setModalIsConnected: PropTypes.func.isRequired,
};

export default ProfileModal;
