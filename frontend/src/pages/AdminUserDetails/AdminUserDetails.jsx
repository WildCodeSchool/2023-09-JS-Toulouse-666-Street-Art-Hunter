import React from "react";
import "./AdminUserDetails.scss";
import { useLoaderData, useParams } from "react-router-dom";
import LinkAdmin from "../../components/LinkAdmin/LinkAdmin";
import Trophy from "../../assets/icons/Trophy.png";

function AdminUserDetails() {
  const userP = useLoaderData();
  const { id } = useParams();
  const artPhoto = (nbr) => {
    return userP.art.filter((el) => {
      return el.user_id === nbr;
    });
  };
  const userId = id;
  const photoId = parseInt(userId, 10);
  const userArt = artPhoto(photoId);

  return (
    <>
      <div className="admin-user-details-block">
        <div className="admin-user-detail-block-link">
          <LinkAdmin lien="/map" textLink="Modifier" nameClass="link-admin b" />
          <LinkAdmin lien="/map" textLink="Bannir" nameClass="link-admin y" />
          <LinkAdmin
            lien="/map"
            textLink="Supprimer"
            nameClass="link-admin r"
          />
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
