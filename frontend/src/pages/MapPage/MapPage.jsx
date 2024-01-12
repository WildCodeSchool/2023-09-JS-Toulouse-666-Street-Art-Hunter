import React from "react";
import { useNavigate } from "react-router-dom";

import Map from "../../components/Map/Map";
import "./MapPage.scss";
import photoLogo from "../../assets/icons/pink_camera.png";

function MapPage() {
  /** Import de la fonstion navigate */
  const navigate = useNavigate();

  /** A changer pour la page d'ajout d'oeuvre */
  const handleRedirect = () => {
    return navigate("/");
  };

  return (
    <div className="map-page">
      <Map />
      <button type="button" onClick={handleRedirect}>
        <img className="photo-logo" src={photoLogo} alt="logo de la camera" />
      </button>
    </div>
  );
}

export default MapPage;
