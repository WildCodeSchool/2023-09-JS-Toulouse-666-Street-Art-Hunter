import {
  Navigate,
  useLoaderData,
  useParams,
  useNavigate,
} from "react-router-dom";

import "./Profil.scss";

import Soldat from "../../assets/avatars/Soldat.png";
import Trophy from "../../assets/icons/Trophy.png";
import Option from "../../assets/icons/Icon_option.png";

function Profil() {
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

  return (
    <>
      <div className="profil-page">
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

  if (!response.ok) {
    throw new Error(JSON.stringify({ message: "Could not fetch profiles." }), {
      status: 500,
    });
  }

  const resp = { user, art };

  return resp;
};
