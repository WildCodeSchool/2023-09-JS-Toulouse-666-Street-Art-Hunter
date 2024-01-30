import { Link, useNavigate, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import closeLogo from "../../assets/icons/close-logo.svg";
import "./ProfileModal.scss";

function ProfileModal({ modalIsConnected, setModalIsConnected }) {
  const navigate = useNavigate();

  const handleDisconnect = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setModalIsConnected(false); // Mise à jour pour fermer la modalité
    return navigate("/login");
  };

  const data = JSON.parse(localStorage.getItem("user"));
  if (!data) {
    return <Navigate to="/login" replace />;
  }

  const { id } = data;

  return (
    <div
      className={`profile-modal-container ${
        modalIsConnected ? "slide-in" : ""
      }`}
    >
      <div>
        <Link to={`/profil/${id}`}>Profile</Link>
        <button type="button" onClick={handleDisconnect}>
          Déconnexion
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
