import { useState } from "react";
import {
  Form,
  useParams,
  redirect,
  Navigate,
  Link,
  useLoaderData,
} from "react-router-dom";
import Input from "../../components/Input-R/Input";
import "./ProfilOption.scss";
import InputTextarea from "../../components/InputTextarea/InputTextarea";

function ProfilOption() {
  // ********************* STATE *********************
  const data = useLoaderData();
  const [description, setDescription] = useState(data.description);
  const [name, setName] = useState(data.name);

  // ********************* LOGIQUE *********************
  const { id } = useParams();

  if (parseInt(id, 10) !== data.id) {
    return <Navigate to="/login" replace />;
  }

  // ********************* RENDER *********************
  return (
    <div className="profil-option-input-option">
      <h1 className="input-option-title">Modifie tes données!</h1>
      <Form
        className="form"
        method="put"
        action={`/profil/${id}/option`}
        replace
      >
        <Input
          className="input"
          labelName="name"
          type="name"
          value={name}
          setValue={setName}
          labelText="Pseudo :"
          maxLength="14"
        />
        <InputTextarea
          className="input"
          labelName="description"
          type="description"
          labelText="Description :"
          maxLength="255"
          value={description}
          setValue={setDescription}
        />

        <button className="continue" type="submit">
          Validé
        </button>
      </Form>
      <Link className="option-button" to={`/profil/${id}`}>
        Retour
      </Link>
    </div>
  );
}

export default ProfilOption;

export const option = async ({ request }) => {
  const form = await request.formData();
  const dataU = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const data = Object.fromEntries(form);

  const { id } = dataU;

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
    score: user.score,
    is_admin: user.is_admin,
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
    return redirect(`/profil/${id}`);
  } catch (error) {
    console.error(error);
    return true;
  }
};

export const userLoader = async () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${currentUser.id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const user = await response.json();
    return user;
  } catch (error) {
    return console.error(error);
  }
};
