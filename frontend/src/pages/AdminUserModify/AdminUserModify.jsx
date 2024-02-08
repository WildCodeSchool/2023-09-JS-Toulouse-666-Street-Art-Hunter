import React, { useState } from "react";
import "./AdminUserModify.scss";
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useParams,
} from "react-router-dom";
import Input from "../../components/Input-R/Input";
import InputTextarea from "../../components/InputTextarea/InputTextarea";

function AdminUserModify() {
  const { id } = useParams();
  const [isAdminOpen, setAdminOpen] = useState(false);
  const users = useLoaderData();
  const user = users.find((el) => +el.id === +id);
  const [valueDescription, setValueDescription] = useState(user.description);
  const [valueName, setValueName] = useState(user.name);
  const [valueScore, setValueScore] = useState(user.score);

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
          labelText="Pseudo :"
          maxLength="14"
          value={valueName}
          setValue={setValueName}
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
          value={valueScore}
          setValue={setValueScore}
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
  const { id } = params;
  const form = await request.formData();
  const token = localStorage.getItem("token");
  const data = Object.fromEntries(form);

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

export const adminModifyUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const apiURL = import.meta.env.VITE_BACKEND_URL;

    const responseU = await fetch(`${apiURL}/api/users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const users = await responseU.json();
    return users;
  } catch (error) {
    return console.error(error);
  }
};
