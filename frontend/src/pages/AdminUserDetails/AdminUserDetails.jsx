import React, { useState } from "react";
import "./AdminUserDetails.scss";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import LinkAdmin from "../../components/LinkAdmin/LinkAdmin";
import Trophy from "../../assets/icons/Trophy.png";
import Title from "../../components/TitleRed-R/Title";

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
  const userArts = artPhoto(photoId);
  const userArt = userArts.filter((el) => {
    return el.is_validated === 1;
  });
  const userArtToValidate = userArts.filter((el) => {
    return el.is_validated === 0;
  });
  const { artworks } = userP;

  const userArtworks = artworks.filter((el) => {
    return el.publisher_id === +id;
  });

  const validateArtwork = userArtworks.filter((el) => {
    return el.is_validate === 1;
  });

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
        window.scrollTo(0, 0);
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
        window.scrollTo(0, 0);
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
    <div className="main-container-admin-user-details">
      <div className="admin-user-details-block">
        <div className={ModaleButton}>
          <div className="modale-delete-texte">
            <div className="modale-title">Etes vous sur?</div>
            <div className="div-modale-user">
              <button
                className="modale-validate"
                type="button"
                onClick={handleClickDelet}
              >
                Oui
              </button>
              <button
                onClick={toggleModale}
                className="modale-return"
                type="button"
              >
                Non
              </button>
            </div>
          </div>
        </div>
        <div className={ModaleBanButton}>
          <div className="modale-delete-texte">
            <div className="modale-title">Etes vous sur?</div>
            <div className="div-modale-user">
              <button
                className="modale-validate"
                type="button"
                onClick={handleClickBan}
              >
                Oui
              </button>
              <button
                onClick={toggleModaleBan}
                className="modale-return"
                type="button"
              >
                Non
              </button>
            </div>
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
        <Title title="Tableau de chasse" />
        <div className="map-artwork">
          {userArt && userArt.length > 0 ? (
            userArt.map((el) => {
              return (
                <button
                  type="button"
                  key={el.id}
                  className="item"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/details-artwork/${el.artwork_id}`);
                  }}
                >
                  <img className="link-img" src={el.image} alt="street art" />
                </button>
              );
            })
          ) : (
            <p>Son tableau de chasse est vide</p>
          )}
        </div>
      </div>
      <div className="artwork">
        <Title title="Photo en attente" />
        <div className="map-artwork">
          {userArtToValidate && userArtToValidate.length > 0 ? (
            userArtToValidate.map((el) => {
              return (
                <button
                  type="button"
                  key={el.id}
                  className="item"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/details-artwork/${el.artwork_id}`);
                  }}
                >
                  <img className="link-img" src={el.image} alt="street art" />
                </button>
              );
            })
          ) : (
            <p>Il n'a aucune photo en cours de validation</p>
          )}
        </div>
      </div>
      <div className="artwork">
        <Title title="Oeuvre découverte" />
        <div className="map-artwork">
          {validateArtwork && validateArtwork.length > 0 ? (
            validateArtwork.map((el) => {
              return (
                <button
                  type="button"
                  key={el.id}
                  className="item"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/details-artwork/${el.artwork_id}`);
                  }}
                >
                  <img className="link-img" src={el.image} alt="street art" />
                </button>
              );
            })
          ) : (
            <p>Il n'a trouvé aucune nouvelle oeuvre</p>
          )}
        </div>
      </div>
    </div>
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
  const reponseArtworks = await fetch(`${apiURL}/api/artworks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const artworks = await reponseArtworks.json();

  return { user, art, artworks };
};
