import {
  Navigate,
  useLoaderData,
  useParams,
  useNavigate,
} from "react-router-dom";

import "./ProfilAdmin.scss";
import { useState } from "react";
import Trophy from "../../assets/icons/Trophy.png";
import Option from "../../assets/icons/Icon_option.png";
import Admin from "../../assets/icons/adminLogo.png";

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
  const navigate = useNavigate();
  const handleClickOption = () => {
    navigate(`/profil/${id}/option`);
  };
  const handleClickAdmin = () => {
    navigate(`/admin/pannel-administrateur/${id}`);
  };
  const [isModaleOpen, setModaleOpen] = useState(false);
  const handleClickreturn = () => {
    setModaleOpen(false);
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
  // console.log(profils.img);

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
      </div>
      <div className="profil-admin-page">
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
            className="profil-button"
            type="button"
            onClick={handleClickOption}
          >
            <img className="option" src={Option} alt="option" />
          </button>
        </div>
        <div key={profils.user.id} className="profil-user">
          <div className="topic">
            <h1 className="pseudo">{profils.user.name}</h1>
            <p className="resume"> {profils.user.description}</p>
          </div>
          <div className="score-block">
            <img className="trophy" src={Trophy} alt="trophy" />
            <p className="score">{profils.user.score} pts</p>
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
