import { Link, useNavigate, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
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
    <button
      type="button"
      className={`profile-modal-container ${
        modalIsConnected ? "slide-in" : ""
      }`}
      onClick={() => setModalIsConnected(!modalIsConnected)}
    >
      <div>
        {data && <Link to={`/profil/${id}`}>Profile</Link>}
        <button type="button" onClick={handleDisconnect}>
          Déconnexion
        </button>
      </div>
    </button>
  );
}

ProfileModal.propTypes = {
  modalIsConnected: PropTypes.bool.isRequired,
  setModalIsConnected: PropTypes.func.isRequired,
};

export default ProfileModal;
