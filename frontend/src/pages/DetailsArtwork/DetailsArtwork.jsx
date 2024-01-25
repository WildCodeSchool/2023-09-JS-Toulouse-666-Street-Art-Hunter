import React from "react";
import { useNavigate } from "react-router-dom";
import getCurrentFormattedDate from "../../services/utils";
import "./DetailsArtwork.scss";
import GeolocIcon from "../../assets/icons/geoloc-icon.png";
import AstroBoy from "../../assets/avatars/astro-boy.png";
import Title from "../../components/TitleRed-R/Title";
import Button from "../../components/Button-R/Button";

function DetailsArtwork() {
  const navigate = useNavigate();
  // A remplacer par l'artiste actuel
  const currentArtist = "Miss Van";
  // A remplacer par l'adresse de l'oeuvre
  const currentAddress = "10 rue Saint-Anne, 3100 Toulouse";
  // A remplacer le bon format de date
  const currentDate = getCurrentFormattedDate();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  // A remplacer l'utilisateur actuel

  return (
    <div className="main-container-details-artwork">
      <div className="artist-container">
        <Title title="Artiste:" />
        <p className="artist-name">{currentArtist}</p>
      </div>
      <div className="preview-main">
        <div className="preview-container">
          <img className="preview-image" src="" alt="artwork" />
        </div>
      </div>

      <div className="address-container">
        <div className="section-text">
          <Title title="Adresse:" />
          <p className="address-text">{currentAddress}</p>
        </div>
        <div className="section-icon">
          <img
            className="address-image"
            src={GeolocIcon}
            alt="geolocalition icon"
          />
        </div>
      </div>

      <div className="published-container">
        <Title title="Publié par:" />
        <div className="user-container">
          <img src={AstroBoy} alt="user-avatar" />
          <p className="user-name">
            {currentUser.name &&
              currentUser.name.charAt(0).toUpperCase() +
                currentUser.name.slice(1)}
          </p>
        </div>
        <p className="current-date">Le {currentDate}</p>
      </div>

      <div className="description-container">
        <Title title="Description:" />
        <p className="description-text">
          Sur un mur délabré, un graffiti intrigant dépeint une femme
          désarticulée tenant un bâton de berger. Sa silhouette déformée semble
          flotter, capturant une dualité entre la fragilité et la force. Les
          couleurs vibrantes contrastent avec l'obscurité de la ruelle, créant
          une scène mystérieuse et envoûtante.
        </p>
      </div>

      <div className="btn-container">
        <Button
          name="submit"
          textBtn="Trouver ?"
          onClick={() => navigate("/add-existing-artwork")}
        />
        <Button
          name="submit"
          textBtn="Disparu ?"
          onClick={() => navigate("/artwork-missing")}
        />
      </div>
    </div>
  );
}

export default DetailsArtwork;
