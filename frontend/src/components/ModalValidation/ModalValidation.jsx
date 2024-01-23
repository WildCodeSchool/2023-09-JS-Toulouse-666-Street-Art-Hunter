import React from "react";
import PropTypes from "prop-types";
import "./ModalValidation.scss";
import Feux from "../../assets/icons/feux-1.png";
import Feux2 from "../../assets/icons/feux-2.png";

function ModalValidation({ setShowModal, text1, text2 }) {
  const handleModalReverse = () => {
    setShowModal(false);
  };

  return (
    <div
      className="modal-main-container"
      onClick={handleModalReverse}
      onKeyDown={(e) => e.key === "Enter" && handleModalReverse()} // Ajout d'une gestion du clavier pour la touche "Enter"
      role="button" // Ajout d'un rôle pour indiquer que c'est un élément interactif
      tabIndex="0" // Ajout de l'attribut tabIndex pour le rendre focusable
    >
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
    </div>
  );
}

ModalValidation.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
};

export default ModalValidation;
