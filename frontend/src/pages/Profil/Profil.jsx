import {
  Navigate,
  useLoaderData,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

import "./Profil.scss";

import Trophy from "../../assets/icons/Trophy.png";
import Tools from "../../assets/icons/tools.svg";
import Previous from "../../assets/icons/previous.svg";
import Title from "../../components/TitleRed-R/Title";
import TextBlue from "../../components/TextBlue-R/TextBlue";

function Profil() {
  const profils = useLoaderData();
  const token = localStorage.getItem("token");

  const { id } = useParams();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (profils.user.is_admin === 1) {
    return <Navigate to={`/admin/profil/${id}`} replace />;
  }
  const artPhoto = (nbr) => {
    return profils.art.filter((el) => {
      return el.user_id === nbr;
    });
  };
  const userId = id;
  const photoId = parseInt(userId, 10);
  const userArt = artPhoto(photoId);
  const navigate = useNavigate();
  const handleClickOption = () => {
    navigate(`/profil/${id}/option`);
  };

  const [isModaleOpen, setModaleOpen] = useState(false);
  const handleClickreturn = () => {
    setModaleOpen(false);
    navigate(`/profil/${id}`);
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

  const changeAvatar = async (params) => {
    const apiURL = import.meta.env.VITE_BACKEND_URL;
    const datau = JSON.parse(localStorage.getItem("user"));
    const ida = params;

    if (datau.id !== parseInt(ida, 10)) {
      navigate("/");
    } else {
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
    }
    return true;
  };
  const handleClickChangeAvatar = () => {
    const userIdToChange = id;
    changeAvatar(userIdToChange);
  };
  return (
    <>
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
        <button
          className="button-validate"
          type="button"
          onClick={handleClickChangeAvatar}
        >
          Validé
        </button>
        <button
          className="button-validate"
          type="button"
          onClick={toggleModale}
        >
          retour
        </button>
      </div>

      <div className="main-container-profil-user">
        <div className="section-title">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={Previous} alt="button previous" />
          </button>

          <h1>Profile</h1>
        </div>
        <div className="profil-page">
          <div className="profil-top">
            <div className="profile-block-avatar">
              <button
                type="button"
                className="avatar-button"
                onClick={toggleModale}
              >
                x
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
              <TextBlue text={profils.user.name} />
              <p className="resume"> {profils.user.description}</p>
            </div>
            <div className="score-block">
              <img className="trophy" src={Trophy} alt="trophy" />
              <p className="score">{profils.user.score} pts</p>
            </div>
          </div>
        </div>
        <div className="artwork-gallery">
          <Title title="Tableau de chasse" />
          <div className="map-artwork">
            {userArt && userArt.length > 0 ? (
              userArt.map((el) => {
                return (
                  <div key={el.id} className="item">
                    <img className="link-img" src={el.image} alt="street art" />
                  </div>
                );
              })
            ) : (
              <p>Votre tableau de chasse est vide</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profil;

export const profilLoader = async (req) => {
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
