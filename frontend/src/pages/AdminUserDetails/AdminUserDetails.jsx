import React from "react";
import "./AdminUserDetails.scss";
import { useLoaderData } from "react-router-dom";
import LinkAdmin from "../../components/LinkAdmin/LinkAdmin";

function AdminUserDetails() {
  const user = useLoaderData();

  return (
    <div>
      <LinkAdmin lien="/map" textLink="Modifier" nameClass="link-admin b" />
      <LinkAdmin lien="/map" textLink="Bannir" nameClass="link-admin y" />
      <LinkAdmin lien="/map" textLink="Supprimer" nameClass="link-admin r" />
      <div>
        <img className="link-img" src={user.selected_avatar} alt="icon users" />
        <div>{user.name}</div>
        <div>{user.description}</div>
        <div>{user.score}</div>
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
  return user;
};
