import {
  Navigate,
  useLoaderData,
  useParams,
  useNavigate,
} from "react-router-dom";

import "./ProfilAdmin.scss";
import { useState } from "react";
import Crayon from "../../assets/icons/pixel-crayon.avif";
import Trophy from "../../assets/icons/Trophy.png";
import Tools from "../../assets/icons/tools.svg";
import Admin from "../../assets/icons/adminLogo.png";
import Previous from "../../assets/icons/previous.svg";
import TextBlue from "../../components/TextBlue-R/TextBlue";
import Title from "../../components/TitleRed-R/Title";

function ProfilAdmin() {
  const profils = useLoaderData();
  const token = localStorage.getItem("token");
  const data = JSON.parse(localStorage.getItem("user"));

  const { id } = useParams();
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (parseInt(id, 10) !== data.id) {
    return <Navigate to="/login" replace />;
  }

  const artPhoto = (nbr) => {
    return profils.art.filter((el) => {
      return el.user_id === nbr;
    });
  };
  const userId = id;
  const photoId = parseInt(userId, 10);
  const userArt = artPhoto(photoId);
  const validatedArt = userArt.filter((el) => {
    return el.is_validated === 1;
  });
  const pendingArt = userArt.filter((el) => {
    return el.is_validated === 0;
  });
  const navigate = useNavigate();
  const handleClickAdmin = () => {
    window.scrollTo(0, 0);
    navigate(`/admin/pannel-administrateur/${id}`);
  };

  const handleClickOption = () => {
    window.scrollTo(0, 0);
    navigate(`/profil/${id}/option`);
  };

  const [isModaleOpen, setModaleOpen] = useState(false);
  const handleClickreturn = () => {
    setModaleOpen(false);
    window.scrollTo(0, 0);
    navigate(`/admin/profil/${id}`);
  };

  const toggleModale = () => {
    setModaleOpen(!isModaleOpen);
  };

  let ModaleButton;
  if (!isModaleOpen) {
    ModaleButton = "avatar-modal-close";
  } else {
    ModaleButton = "avatar-modal-open";
  }

  const [idAvatar, setIdAvatar] = useState("");

  const changeAvatar = async () => {
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
      is_banned: user.is_banned,
      selected_avatar: idAvatar,
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
        handleClickreturn();
      }
      throw new Error("cant fetch user");
    } catch (error) {
      console.error(error);
      return true;
    }
  };
  const handleClickChangeAvatar = () => {
    const userIdToChange = id;
    changeAvatar(userIdToChange);
  };

  return (
    <div className="main-container-profil-admin">
      <div className={ModaleButton}>
        <div className="profil-modal-title">Avatar</div>
        <div className="profil-map-div-block">
          {profils.img.map((item) => {
            return (
              <div key={item.id} className="map-div-avatar">
                <button
                  className="modale-validate"
                  type="button"
                  onClick={() => setIdAvatar(item.img_url)}
                >
                  <img
                    className="avatar-img"
                    src={item.img_url}
                    alt={item.id}
                  />
                </button>
              </div>
            );
          })}
        </div>
        <div className="block-button-validate-img">
          <img
            className="avatar-img-selectioned"
            src={idAvatar}
            alt="Clique sur un dessin!!"
          />
          <div className="block-button-photo">
            <button
              className="button-validate"
              type="button"
              onClick={handleClickChangeAvatar}
            >
              Validé
            </button>
            <button
              className="button-back"
              type="button"
              onClick={toggleModale}
            >
              Retour
            </button>
          </div>
        </div>
      </div>
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
        <h1>Admin</h1>
      </div>

      <div className="profil-admin-page">
        <div className="profil-top">
          <div className="profile-block-avatar">
            <button
              className="avatar-button"
              type="button"
              onClick={toggleModale}
            >
              <img className="img-modal" src={Crayon} alt="un petit crayon" />
            </button>
            <img
              className="avatar"
              src={profils.user.selected_avatar}
              alt="avatar"
            />
          </div>
          <button
            className="option-btn"
            type="button"
            onClick={handleClickOption}
          >
            <img src={Tools} alt="option" />
          </button>
        </div>
        <div key={profils.user.id} className="profil-user">
          <div className="topic">
            <TextBlue text={profils && profils.user.name} />
            <p className="resume"> {profils.user.description}</p>
          </div>
          <div className="score-block">
            <img className="trophy" src={Trophy} alt="trophy" />
            <p className="score">
              {profils.user.score}
              <span> pts</span>
            </p>
          </div>
        </div>
      </div>
      <div className="admin-block">
        <img className="admin-img" src={Admin} alt="icon admin" />
        <button type="button" className="admin-text" onClick={handleClickAdmin}>
          Pannel Administrateur
        </button>
        <img className="admin-img" src={Admin} alt="icon admin" />
      </div>
      <div className="artwork">
        <Title title="Tableau de chasse" />
        <div className="map-artwork">
          {validatedArt && validatedArt.length > 0 ? (
            validatedArt.map((el) => {
              return (
                <button
                  type="button"
                  key={el.id}
                  className="item"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/details-artwork/${el.id}`);
                  }}
                >
                  <img className="link-img" src={el.image} alt="street art" />
                </button>
              );
            })
          ) : (
            <p>Votre tableau de chasse est vide</p>
          )}
        </div>
        <Title title="Tableau de chasse" />
        <div className="map-artwork">
          {pendingArt && pendingArt.length > 0 ? (
            pendingArt.map((el) => {
              return (
                <button
                  type="button"
                  key={el.id}
                  className="item"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/details-artwork/${el.id}`);
                  }}
                >
                  <img className="link-img" src={el.image} alt="street art" />
                </button>
              );
            })
          ) : (
            <p>Vous n'avez aucune oeuvre en cours de validation</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilAdmin;

export const profilLoaderAdmin = async (req) => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const { id } = req.params;
  const response = await fetch(`${apiURL}/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await response.json();

  const responseArt = await fetch(`${apiURL}/api/photos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const art = await responseArt.json();

  const responseImg = await fetch(`${apiURL}/api/avatars`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const img = await responseImg.json();

  if (!response.ok) {
    throw new Error(JSON.stringify({ message: "Could not fetch profiles." }), {
      status: 500,
    });
  }

  const resp = { user, art, img };

  return resp;
};
