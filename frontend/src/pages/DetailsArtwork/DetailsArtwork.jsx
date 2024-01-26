import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./DetailsArtwork.scss";
import GeolocIcon from "../../assets/icons/geoloc-icon.png";
import AstroBoy from "../../assets/avatars/astro-boy.png";
import Title from "../../components/TitleRed-R/Title";
import Button from "../../components/Button-R/Button";

function DetailsArtwork() {
  const dataArtworkById = useLoaderData();
  console.info(dataArtworkById);

  const navigate = useNavigate();
  // A remplacer par l'artiste actuel
  const currentArtist = "Miss Van";

  const currentAddress = dataArtworkById.adress;

  const currentDate = dataArtworkById.date_published;

  const dateNoHour = currentDate.split("T")[0];
  const dateSplitted = dateNoHour.split("-");
  const normalDate = `${dateSplitted[2]}/${dateSplitted[1]}/${dateSplitted[0]}`;

  const currentImage = dataArtworkById.image;

  const currentDescription = dataArtworkById.description;

  const currentUser = JSON.parse(localStorage.getItem("user"));
  // A remplacer l'utilisateur actuel

  return (
    <div className="main-container-details-artwork">
      {/* Pensez à rajouter des artistes si besoin  */}
      <div className="artist-container">
        <Title title="Artiste:" />
        <p className="artist-name">{currentArtist}</p>
      </div>
      <div className="preview-main">
        <div className="preview-container">
          <img className="preview-image" src={currentImage} alt="artwork" />
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
        <p className="current-date">Le {normalDate}</p>
      </div>

      <div className="description-container">
        <Title title="Description:" />
        <p className="description-text">{currentDescription}</p>
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

export const dataArtwork = async (req) => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { id } = req.params;
  const response = await fetch(`${apiUrl}/api/artworks/${id}`);

  const data = await response.json();
  console.info(data);
  return data;
};
