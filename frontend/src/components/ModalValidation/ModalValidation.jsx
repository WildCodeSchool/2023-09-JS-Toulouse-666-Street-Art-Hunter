import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./ModalValidation.scss";
import Feux from "../../assets/icons/feux-1.png";
import Feux2 from "../../assets/icons/feux-2.png";

function ModalValidation({ setShowModal, loadingModal, text1, text2 }) {
  const navigate = useNavigate();
  const handleModalReverse = () => {
    setShowModal(false);
    window.scrollTo(0, 0);
    navigate("/map");
  };

  return (
    <div
      className="modal-main-container"
      onClick={handleModalReverse}
      onKeyDown={(e) => e.key === "Enter" && handleModalReverse()}
      role="button"
      tabIndex="0"
    >
      {loadingModal ? (
        <div className="gif-unicorn">
          <iframe
            title="Unicorn GIF"
            src="https://gifer.com/embed/XDZW"
            width="300"
            height="500"
            className="giphy-embed"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="modal-section">
          <div className="modal-text">
            <p>{text1}</p>
            <div>
              <img className="modal-img" src={Feux} alt="feux d'artifice" />
              <img className="modal-img" src={Feux2} alt="feux d'artifice" />
            </div>
            <p>{text2}</p>
          </div>
        </div>
      )}
    </div>
  );
}

ModalValidation.propTypes = {
  loadingModal: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
};

export default ModalValidation;
