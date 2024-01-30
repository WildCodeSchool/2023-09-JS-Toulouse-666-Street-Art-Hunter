import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ValidateArtwork.scss";

import tealSplatter from "../../assets/images/teal-splatter.svg";
import pinkSplatter from "../../assets/images/pink-splatter.svg";
import greenSplatter from "../../assets/images/green-splatter.svg";

function ValidateArtwork() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [modalValidate, setModalValidate] = useState(false);
  const [modalRefuse, setModalRefuse] = useState(false);
  const [publisher, setPublisher] = useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const date = (e) => {
    const dateNoHour = e.split("T")[0];
    const dateSplited = dateNoHour.split("-");
    const normalDate = `${dateSplited[2]}/${dateSplited[1]}/${dateSplited[0]}`;
    return normalDate;
  };

  const dateSplitHour = (e) => {
    const dateSplit = e.split("T")[0];
    const hour = e.split("T")[1];
    const hourSplited = hour.split("Z")[0];
    return `${dateSplit} ${hourSplited}`;
  };

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/artworks/publishers/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch artwork");
        }
        const artworkData = await response.json();
        setArtwork(artworkData);

        const responseUsers = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${
            artworkData.publisher_id
          }`
        );

        if (!responseUsers.ok) {
          throw new Error("Failed to fetch users");
        }
        const usersData = await responseUsers.json();
        setPublisher(usersData);
      } catch (error) {
        console.error("Error fetching artwork:", error);
      }
    };

    fetchArtwork();
  }, []);

  const handleValidate = async () => {
    const validateDataArtwork = {
      image: artwork.image,
      longitude: artwork.longitude,
      latitude: artwork.latitude,
      adress: artwork.adress,
      description: artwork.description,
      date_published: dateSplitHour(artwork.date_published),
      ask_to_archived: artwork.ask_to_archived,
      is_archived: artwork.is_archived,
      is_validate: 1,
      publisher_id: artwork.publisher_id,
    };

    const validateUserData = {
      name: publisher.name,
      description: publisher.description,
      email: publisher.email,
      score: publisher.score + 300,
      is_admin: publisher.is_admin,
      is_banned: publisher.is_banned,
      selected_avatar: publisher.selected_avatar,
      border: publisher.border,
    };

    try {
      const responseArtwork = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/artworks/${id}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(validateDataArtwork),
        }
      );

      const responseUser = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${publisher.id}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(validateUserData),
        }
      );
      if (!responseArtwork.ok) {
        throw new Error("Failed to validate artwork");
      }
      if (!responseUser.ok) {
        throw new Error("Failed to update user");
      }
      navigate(`/admin/pannel-administrateur/${user.id}`);
    } catch (error) {
      console.error("Error validating artwork:", error);
    }
  };

  const handleRefuse = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/artworks/${id}`,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete photo");
      }
      navigate(`/admin/pannel-administrateur/${user.id}`);
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  return publisher && artwork ? (
    <div className="validate-artwork-container">
      <img
        src={artwork.image}
        alt={`artwork published ${publisher.name}`}
        className="image"
      />
      <div className="content-container">
        <h2>Publie par</h2>
        <div className="avatar">
          <img
            src={publisher.selected_avatar}
            alt={`${publisher.name} avatar`}
          />
          <p>{publisher.name}</p>
        </div>
        <h2>Adresse</h2>
        <p>{artwork.adress}</p>
        <p>Le {date(artwork.date_published)}</p>
        <h2>Description</h2>
        <p>{artwork.description}</p>
        <button
          type="button"
          onClick={() => setModalValidate(true)}
          className="validate-button"
        >
          Valider
        </button>
        <button
          type="button"
          onClick={() => setModalRefuse(true)}
          className="refuse-button"
        >
          Refuser
        </button>
      </div>

      <div
        className={`modal-validate modal ${modalValidate ? "modal-slide" : ""}`}
      >
        <p>Etes vous sur(e) ?</p>
        <div>
          <button
            type="button"
            onClick={handleValidate}
            className="validate-button"
          >
            Oui
          </button>
          <button
            type="button"
            onClick={() => setModalValidate(false)}
            className="refuse-button"
          >
            Non
          </button>
          <img
            className="splatter teal-splatter"
            src={tealSplatter}
            alt="teal splatter"
          />
          <img
            className="splatter pink-splatter"
            src={pinkSplatter}
            alt="pink splatter"
          />
          <img
            className="splatter green-splatter"
            src={greenSplatter}
            alt="green splatter"
          />
        </div>
      </div>
      <div className={`modal-refuse modal ${modalRefuse ? "modal-slide" : ""}`}>
        <p>Etes vous sur(e) ?</p>
        <div>
          <button
            type="button"
            onClick={handleRefuse}
            className="validate-button"
          >
            Oui
          </button>
          <button
            type="button"
            onClick={() => setModalRefuse(false)}
            className="refuse-button"
          >
            Non
          </button>
          <img
            className="splatter teal-splatter"
            src={tealSplatter}
            alt="teal splatter"
          />
          <img
            className="splatter pink-splatter"
            src={pinkSplatter}
            alt="pink splatter"
          />
          <img
            className="splatter green-splatter"
            src={greenSplatter}
            alt="green splatter"
          />
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default ValidateArtwork;
