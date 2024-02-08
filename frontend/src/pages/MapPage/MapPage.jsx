import React from "react";
import { useNavigate } from "react-router-dom";

import Map from "../../components/Map/Map";
import "./MapPage.scss";
import photoLogo from "../../assets/icons/pink_camera.png";

function MapPage() {
  /** Import de la fonstion navigate */
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="map-page">
      <Map />
      {token && (
        <button
          type="button"
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/add-non-existing-artwork");
          }}
        >
          <img className="photo-logo" src={photoLogo} alt="logo de la camera" />
        </button>
      )}
    </div>
  );
}

export default MapPage;
