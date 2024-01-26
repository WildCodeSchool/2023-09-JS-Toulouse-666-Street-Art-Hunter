import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./AdminUsers.scss";

function AdminUsers() {
  const navigate = useNavigate();
  const profils = useLoaderData();

  const handleClickCard = (id) => {
    navigate(`/admin/pannel-administrateur/users/${id}`);
  };

  return (
    <div className="admin-users">
      <div className="admin-title">utilisateurs</div>
      <div className="admin-table">Listes des utilisateurs</div>
      <div className="div-users">
        {profils.users.map((item) => {
          return (
            <div key={item.id} className="map-div-users">
              <button
                type="button"
                className="div-fiche-perso"
                onClick={() => {
                  handleClickCard(item.id);
                }}
              >
                <img
                  className="link-img"
                  src={item.selected_avatar}
                  alt="icon users"
                />
                <div>{item.name}</div>
                <div className="score">
                  <div>{item.score}</div>
                  <div>POINT</div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminUsers;

export const adminUsers = async () => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const responseUsers = await fetch(`${apiURL}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const users = await responseUsers.json();

  if (!responseUsers.ok) {
    throw new Error(JSON.stringify({ message: "Could not fetch profiles." }), {
      status: 500,
    });
  }

  const resp = {
    users,
  };

  return resp;
};
