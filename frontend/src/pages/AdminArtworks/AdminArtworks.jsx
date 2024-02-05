import React, { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import "./AdminArtworks.scss";

import askToArchived from "../../assets/icons/ask_to_archived.png";
import archived from "../../assets/icons/archived.png";
import validate from "../../assets/icons/validate.png";
import Previous from "../../assets/icons/previous.svg";

function AdminArtworks() {
  const [value, setValue] = useState("");
  const artworks = useLoaderData();
  const navigate = useNavigate();

  const date = (e) => {
    const dateNoHour = e.split("T")[0];
    const dateSplited = dateNoHour.split("-");
    const normalDate = `${dateSplited[2]}/${dateSplited[1]}/${dateSplited[0]}`;
    return normalDate;
  };

  const filteredArtworks = artworks.filter((artwork) => {
    if (value !== "") {
      const lowercaseValue = value.toLowerCase();
      const lowercaseAddress = artwork.adress.toLowerCase();
      const filtered = lowercaseAddress.includes(lowercaseValue);
      return filtered;
    }
    return artworks;
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleArtworkClick = (id) => {
    navigate(`/admin/admin-details-artwork/${id}`);
  };

  return (
    <div className="admin-artworks-container">
      <div className="section-title">
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={Previous} alt="button previous" />
        </button>
        <h1>Admin</h1>
      </div>
      <label
        className="label-container admin-artworks-label"
        htmlFor="input-artwork"
      >
        <span className="label-title">Adresse :</span>
        <input
          className="input-container"
          type="input"
          name="input-artwork"
          value={value}
          onChange={handleChange}
        />
      </label>
      <div className="list-artworks">
        {filteredArtworks.map((artwork) => (
          <button
            className="one-artwork"
            type="button"
            key={artwork.id}
            onClick={() => handleArtworkClick(artwork.id)}
          >
            <img
              className="image-artwork"
              src={artwork.image}
              alt={artwork.description}
            />
            <div>
              <p>{artwork.adress}</p>
              <p>{date(artwork.date_published)}</p>
              <div>
                <img
                  src={askToArchived}
                  alt="ask to archived icon"
                  className={
                    artwork.ask_to_archived === 0 ? "transparent-icon" : ""
                  }
                />
                <img
                  src={archived}
                  alt="archived icon"
                  className={
                    artwork.is_archived === 0 ? "transparent-icon" : ""
                  }
                />
                <img
                  src={validate}
                  alt="validate icon"
                  className={
                    artwork.is_validate === 0 ? "transparent-icon" : ""
                  }
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminArtworks;

export const adminArtworksLoader = async () => {
  try {
    const dataArtwork = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/artworks`
    );

    const artworks = await dataArtwork.json();

    return artworks;
  } catch (error) {
    throw Error(error);
  }
};
