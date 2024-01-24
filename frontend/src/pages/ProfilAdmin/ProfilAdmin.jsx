import {
  Navigate,
  useLoaderData,
  useParams,
  useNavigate,
} from "react-router-dom";

import "./ProfilAdmin.scss";

import Soldat from "../../assets/avatars/Soldat.png";
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
    navigate(`/profil/admin/${id}/option`);
  };
  const handleClickAdmin = () => {
    navigate(`/map`);
  };
  return (
    <>
      <div className="profil-admin-page">
        <div className="profil-top">
          <img className="avatar" src={Soldat} alt="avatar" />

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
        <div className="admin-block">
          <img className="admin-img" src={Admin} alt="icon admin" />
          <button
            type="button"
            className="admin-text"
            onClick={handleClickAdmin}
          >
            Pannel Administrateur
          </button>
          <img className="admin-img" src={Admin} alt="icon admin" />
        </div>
      </div>
      <div className="artwork">
        <p className="title">Tableau de chasse</p>
        {userArt.map((item) => {
          return (
            <div key={item.id} className="item">
              <h1 className="link-img">{item.image}</h1>
              <p>{item.id}</p>
            </div>
          );
        })}
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

  if (!response.ok) {
    throw new Error(JSON.stringify({ message: "Could not fetch profiles." }), {
      status: 500,
    });
  }

  const resp = { user, art };

  return resp;
};
