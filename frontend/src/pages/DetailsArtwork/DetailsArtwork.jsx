import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import "./DetailsArtwork.scss";
import GeolocIcon from "../../assets/icons/geoloc-icon.png";
import AstroBoy from "../../assets/avatars/astro-boy.png";
import Title from "../../components/TitleRed-R/Title";
import Button from "../../components/Button-R/Button";
import Previous from "../../assets/icons/previous.svg";

function DetailsArtwork() {
  // ********************* STATE *********************
  const dataArtworkById = useLoaderData();
  const [modalMissing, setModalMissing] = useState(false);
  const { id } = useParams();

  // ********************* LOGIQUE *********************
  const { data, idPhotos } = dataArtworkById;

  const navigate = useNavigate();

  const currentAddress = data.adress;

  const currentDate = data.date_published;

  const dateNoHour = currentDate.split("T")[0];
  const dateSplitted = dateNoHour.split("-");
  const normalDate = `${dateSplitted[2]}/${dateSplitted[1]}/${dateSplitted[0]}`;

  const currentImage = data.image;

  const currentDescription = data.description;

  const publisherUser = data.name;

  const dateSplitHour = (e) => {
    const dateSplit = e.split("T")[0];
    const hour = e.split("T")[1];
    const hourSplited = hour.split("Z")[0];
    return `${dateSplit} ${hourSplited}`;
  };

  const handleNavigate = () => {
    window.scrollTo(0, 0);
    navigate("/map");
  };

  const handleFind = () => {
    window.scrollTo(0, 0);
    navigate(`/add-existing-artwork/${id}`);
  };

  const handleMissing = async () => {
    const newArtwork = {
      image: data.image,
      longitude: data.longitude,
      latitude: data.latitude,
      adress: data.adress,
      description: data.description,
      date_published: dateSplitHour(data.date_published),
      ask_to_archived: 1,
      is_archived: data.is_archived,
      is_validate: data.is_validate,
      publisher_id: data.publisher_id,
      artist_id: data.artist_id,
    };

    try {
      const responseArtwork = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/artworks/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newArtwork),
        }
      );
      if (!responseArtwork.ok) {
        throw new Error("Failed to update artwork");
      }
      navigate("/map");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    setModalMissing(true);
  };

  // ********************* RENDER *********************
  return (
    <div className="main-container-details-artwork">
      <div className="section-title">
        <button
          type="button"
          onClick={() => {
            window.scrollTo(0, 0);
            navigate(-1);
          }}
        >
          <img src={Previous} alt="button previous" />
        </button>
        <h1>Details</h1>
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
        <button type="button" className="section-icon" onClick={handleNavigate}>
          <img
            className="address-image"
            src={GeolocIcon}
            alt="geolocalition icon"
          />
        </button>
      </div>

      <div className="published-container">
        <Title title="Publie par:" />
        <div className="user-container">
          <img src={AstroBoy} alt="user-avatar" />
          <p className="user-name">
            {publisherUser &&
              publisherUser.charAt(0).toUpperCase() + publisherUser.slice(1)}
          </p>
        </div>
        <p className="current-date">Le {normalDate}</p>
      </div>

      <div className="description-container">
        <Title title="Description:" />
        <p className="description-text">{currentDescription}</p>
      </div>

      <div className="btn-container">
        {idPhotos && idPhotos.includes(data.id) === false && (
          <Button name="submit" textBtn="Trouvée ?" onClick={handleFind} />
        )}
        <Button name="submit" textBtn="Disparue ?" onClick={handleClick} />
      </div>
      <div
        className={`modal-refuse modal ${modalMissing ? "modal-slide" : ""}`}
      >
        <p>Etes vous sur(e) ?</p>
        <div>
          <button
            type="button"
            onClick={handleMissing}
            className="validate-button"
          >
            Oui
          </button>
          <button
            type="button"
            onClick={() => setModalMissing(false)}
            className="refuse-button"
          >
            Non
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsArtwork;

export const dataArtwork = async (req) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  try {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const { id } = req.params;
    const response = await fetch(`${apiUrl}/api/artworks/publishers/${id}`);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    if (token && user) {
      const { id: userId } = JSON.parse(user);
      const photoByUser = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/photos/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userPhotos = await photoByUser.json();

      const idPhotos = userPhotos.map((el) => {
        return el.artwork_id;
      });

      return { data, idPhotos };
    }

    return { data };
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    throw error;
  }
};
