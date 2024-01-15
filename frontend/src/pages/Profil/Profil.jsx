import { Navigate, useLoaderData, useParams } from "react-router-dom";
import "./Profil.scss";
import Soldat from "../../assets/avatars/Soldat.png";

function Profil() {
  const profils = useLoaderData();
  const token = localStorage.getItem("token");
  const data = JSON.parse(localStorage.getItem("user"));

  const id = useParams();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (parseInt(id.id, 10) !== data.id) {
    return <Navigate to="/login" replace />;
  }
  const artPhoto = (nbr) => {
    return profils.art.filter((el) => {
      return el.user_id === nbr;
    });
  };
  const a = id.id;
  const b = parseInt(a, 10);

  const userArt = artPhoto(b);

  return (
    <div className="profil-page">
      <div className="profil-top">
        <img src={Soldat} alt="avatar" />
      </div>
      <div key={profils.user.id} className="profile-user">
        <h1>Pseudo {profils.user.name}</h1>
        <p>Description {profils.user.description}</p>
        <p>Ton score ! :{profils.user.score}</p>
        <p>voici t'es sublicime photo! {profils.art[0].image}</p>
        {userArt.map((item) => {
          return (
            <div key={item.id} className="item">
              <h1>{item.image}</h1>
              <p>{item.id}</p>
            </div>
          );
        })}
      </div>
    </div>
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
