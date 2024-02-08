import React, { useState } from "react";
import "./AdminUserModify.scss";
import { Form, Link, redirect, useParams } from "react-router-dom";
import Input from "../../components/Input-R/Input";
import InputTextarea from "../../components/InputTextarea/InputTextarea";

function AdminUserModify() {
  const { id } = useParams();
  const [isAdminOpen, setAdminOpen] = useState(false);
  const [valueDescription, setValueDescription] = useState("");

  const toggleAdmin = () => {
    setAdminOpen(!isAdminOpen);
  };

  let AdminButton;
  if (!isAdminOpen) {
    AdminButton = "red";
  } else {
    AdminButton = "blue";
  }
  let AdminValue;
  if (!isAdminOpen) {
    AdminValue = 0;
  } else {
    AdminValue = 1;
  }

  return (
    <div className="profil-option-input-option">
      <h1 className="input-option-title">Modifie l'utilisateur</h1>
      <Form
        className="form"
        method="put"
        action={`/admin/pannel-administrateur/users/option/${id}`}
        replace
      >
        <Input
          className="input"
          labelName="name"
          type="name"
          value="adrien"
          labelText="Pseudo :"
          maxLength="14"
        />
        <InputTextarea
          className="input"
          labelName="description"
          type="description"
          labelText="Description :"
          maxLength="255"
          height="150px"
          value={valueDescription}
          setValue={setValueDescription}
        />
        <Input
          className="input"
          labelName="score"
          type="score"
          labelText="Score :"
          maxLength="10"
        />

        <label className="label-container" htmlFor="Admin">
          <span className="label-title">Admin</span>

          <input
            className="input-container-invisi"
            type="is_admin"
            name="is_admin"
            value={AdminValue}
          />
          <div className="button-admin">
            <button className={AdminButton} type="button" onClick={toggleAdmin}>
              x
            </button>
          </div>
        </label>

        <button className="continue" type="submit">
          Valider
        </button>
      </Form>
      <Link
        className="option-button"
        to={`/admin/pannel-administrateur/users/${id}`}
      >
        Retour
      </Link>
    </div>
  );
}

export default AdminUserModify;

export const adminModify = async ({ params, request }) => {
  const form = await request.formData();
  const token = localStorage.getItem("token");
  const data = Object.fromEntries(form);
  const { id } = params;

  const apiURL = import.meta.env.VITE_BACKEND_URL;

  const responseU = await fetch(`${apiURL}/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await responseU.json();

  const formData = {
    ...data,
    email: user.email,
    is_banned: user.is_banned,
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

    if (!response.ok) {
      throw new Error("cant fetch user");
    }
    return redirect(`/admin/pannel-administrateur/users/${id}`);
  } catch (error) {
    console.error(error);
    return true;
  }
};
