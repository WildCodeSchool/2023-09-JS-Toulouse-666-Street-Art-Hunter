import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import "./ValidatePhoto.scss";

import tealSplatter from "../../assets/images/teal-splatter.svg";
import pinkSplatter from "../../assets/images/pink-splatter.svg";
import greenSplatter from "../../assets/images/green-splatter.svg";

function ValidatePhoto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [modalValidate, setModalValidate] = useState(false);
  const [modalRefuse, setModalRefuse] = useState(false);
  const data = useLoaderData();
  const { artworksData, usersData } = data;
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/photos/publishers/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch photo");
        }
        const photoData = await response.json();
        setPhoto(photoData);
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();
  }, []);

  const handleValidate = async () => {
    const validateData = {
      image: photo.image,
      is_validated: 1,
      user_id: photo.user_id,
      artwork_id: photo.artwork_id,
    };

    const userOfPhoto = usersData.find((el) => el.id === photo.user_id);

    const validateUserData = {
      name: userOfPhoto.name,
      description: userOfPhoto.description,
      email: userOfPhoto.email,
      score: userOfPhoto.score + 100,
      is_admin: userOfPhoto.is_admin,
      is_banned: userOfPhoto.is_banned,
      selected_avatar: userOfPhoto.selected_avatar,
      border: userOfPhoto.border,
    };

    try {
      const responsePhoto = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/photos/${id}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(validateData),
        }
      );

      const responseUser = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${photo.user_id}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(validateUserData),
        }
      );
      navigate(`/admin/pannel-administrateur/${user.id}`);
      if (!responsePhoto.ok) {
        throw new Error("Failed to validate photo");
      }
      if (!responseUser.ok) {
        throw new Error("Failed to validate user");
      }
    } catch (error) {
      console.error("Error validating photo:", error);
    }
  };

  const handleRefuse = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/photos/${id}`,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/admin/pannel-administrateur/${user.id}`);
      if (!response.ok) {
        throw new Error("Failed to delete photo");
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  if (!photo) {
    return <div>Loading...</div>; // Render a loading indicator while fetching photo
  }

  const selectedArtwork = artworksData.find((el) => el.id === photo.artwork_id);

  return (
    <div className="validate-photo-container">
      <h3>Photo utilisateur</h3>
      <img className="image" src={photo.image} alt={photo.title} />
      <h3>Original</h3>
      <img className="image" src={selectedArtwork.image} alt={photo.title} />
      <h2>PUBLIE PAR</h2>
      <div className="avatar">
        <img
          src={photo.selected_avatar}
          alt={`Selected avatar of ${photo.name}`}
        />
        <p>{photo.name}</p>
      </div>
      <button
        type="button"
        className="validate-button"
        onClick={() => setModalValidate(true)}
      >
        Valider
      </button>
      <button
        type="button"
        className="refuse-button"
        onClick={() => setModalRefuse(true)}
      >
        Refuser
      </button>
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
  );
}

export default ValidatePhoto;

export const artworksLoader = async () => {
  try {
    const responseArtworks = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/artworks`
    );
    if (!responseArtworks.ok) {
      throw new Error("Failed to fetch artworks");
    }
    const artworksData = await responseArtworks.json();

    const responseUsers = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users`
    );
    if (!responseUsers.ok) {
      throw new Error("Failed to fetch users");
    }
    const usersData = await responseUsers.json();

    return { artworksData, usersData };
  } catch (error) {
    throw new Error(error);
  }
};
