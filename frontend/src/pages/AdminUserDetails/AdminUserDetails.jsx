import React, { useState } from "react";
import "./AdminUserDetails.scss";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import LinkAdmin from "../../components/LinkAdmin/LinkAdmin";
import Trophy from "../../assets/icons/Trophy.png";

function AdminUserDetails() {
  const userP = useLoaderData();
  const navigate = useNavigate();
  const { id } = useParams();
  const artPhoto = (nbr) => {
    return userP.art.filter((el) => {
      return el.user_id === nbr;
    });
  };
  const userId = id;
  const photoId = parseInt(userId, 10);
  const userArt = artPhoto(photoId);

  const deleteUser = async () => {
    const apiURL = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem("token");

    try {
      const responseUser = await fetch(`${apiURL}/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (responseUser.ok) {
        navigate("/admin/pannel-administrateur/users");
      } else {
        console.error("Échec de la suppression de l'utilisateur.");
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la suppression de l'utilisateur :",
        error
      );
    }
  };

  const banUser = async () => {
    const token = localStorage.getItem("token");
    const apiURL = import.meta.env.VITE_BACKEND_URL;

    const responseU = await fetch(`${apiURL}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await responseU.json();

    const formData = {
      name: user.name,
      description: user.description,
      email: user.email,
      score: user.score,
      is_admin: user.is_admin,
      is_banned: 1,
      selected_avatar: user.selected_avatar,
      border: user.border,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        navigate("/admin/pannel-administrateur/users");
      }
      throw new Error("cant fetch user");
    } catch (error) {
      console.error(error);
      return true;
    }
  };

  const handleClickDelet = () => {
    const userIdToDelete = id;
    deleteUser(userIdToDelete);
  };
  const handleClickBan = () => {
    const userIdToBan = id;
    banUser(userIdToBan);
  };
  const [isModaleOpen, setModaleOpen] = useState(false);

  const toggleModale = () => {
    setModaleOpen(!isModaleOpen);
  };

  let ModaleButton;
  if (isModaleOpen) {
    ModaleButton = "modal-delete";
  } else {
    ModaleButton = "modal-open";
  }

  const [isModaleBanOpen, setModaleBanOpen] = useState(false);
  const toggleModaleBan = () => {
    setModaleBanOpen(!isModaleBanOpen);
  };

  let ModaleBanButton;
  if (isModaleBanOpen) {
    ModaleBanButton = "modal-delete";
  } else {
    ModaleBanButton = "modal-open";
  }

  return (
    <>
      <div className="admin-user-details-block">
        <div className={ModaleButton}>
          <div className="modale-delete-texte">
            <div className="modale-title">Etes vous sur?</div>
            <button
              className="modale-validate"
              type="button"
              onClick={handleClickDelet}
            >
              <div className="button-validate">Validé</div>
            </button>
            <button
              onClick={toggleModale}
              className="modale-return"
              type="button"
            >
              <div className="button-return">Retour</div>
            </button>
          </div>
        </div>
        <div className={ModaleBanButton}>
          <div className="modale-delete-texte">
            <div className="modale-title">Etes vous sur?</div>
            <button
              className="modale-validate"
              type="button"
              onClick={handleClickBan}
            >
              <div className="button-validate">Validé</div>
            </button>
            <button
              onClick={toggleModaleBan}
              className="modale-return"
              type="button"
            >
              <div className="button-return">Retour</div>
            </button>
          </div>
        </div>
        <div className="admin-user-detail-block-link">
          <LinkAdmin
            lien={`/admin/pannel-administrateur/users/option/${id}`}
            textLink="Modifier"
            nameClass="link-admin b"
          />

          <button
            onClick={toggleModaleBan}
            type="button"
            className="button-admin-ban"
          >
            Bannir
          </button>
          <button
            onClick={toggleModale}
            type="button"
            className="button-admin-delete"
          >
            Supprimer
          </button>
        </div>

        <div className="admin-user-info">
          <div className="admin-img">
            <img
              className="link-img"
              src={userP.user.selected_avatar}
              alt="icon users"
            />
            <div className="admin-name">{userP.user.name}</div>
          </div>

          <div className="admin-resume">{userP.user.description}</div>
          <div className="admin-resume-score">
            <img className="admin-trophy" src={Trophy} alt="trophy" />
            <div className="admin-score">{userP.user.score}</div>
          </div>
        </div>
      </div>
      <div className="artwork">
        <p className="title">Tableau de chasse</p>
        <div className="map-artwork">
          {userArt.map((item) => {
            return (
              <div key={item.id} className="item">
                <img className="link-img" src={item.image} alt="street art" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminUserDetails;

export const userDetails = async (req) => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const { id } = req.params;
  const responseUser = await fetch(`${apiURL}/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await responseUser.json();
  const responseArt = await fetch(`${apiURL}/api/photos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const art = await responseArt.json();

  return { user, art };
};
