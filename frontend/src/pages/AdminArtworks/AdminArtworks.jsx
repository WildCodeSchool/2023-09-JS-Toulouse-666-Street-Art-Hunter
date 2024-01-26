import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./AdminArtworks.scss";

import askToArchived from "../../assets/icons/ask_to_archived.png";
import archived from "../../assets/icons/archived.png";
import validate from "../../assets/icons/validate.png";

function AdminArtworks() {
  const [value, setValue] = useState("");
  const artworks = useLoaderData();

  const date = (e) => {
    const dateNoHour = e.split("T")[0];
    const dateSplited = dateNoHour.split("-");
    const normalDate = `${dateSplited[2]}/${dateSplited[1]}/${dateSplited[0]}`;
    return normalDate;
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="admin-artworks-container">
      <h1>OEuvres</h1>
      <label className="label-container" htmlFor="input-artwork">
        <span className="label-title">LISTE DES OEUVRES</span>
        <input
          className="input-container"
          type="input"
          name="input-artwork"
          value={value}
          onChange={handleChange}
        />
      </label>
      <div className="list-artworks">
        {artworks.map((artwork) => (
          <div className="one-artwork" key={artwork.id}>
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
                    artwork.ask_to_archived === 0 && "transparent-icon"
                  }
                />
                <img
                  src={archived}
                  alt="archived icon"
                  className={artwork.is_archived === 0 && "transparent-icon"}
                />
                <img
                  src={validate}
                  alt="validate icon"
                  className={artwork.is_validate === 0 && "transparent-icon"}
                />
              </div>
            </div>
          </div>
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
