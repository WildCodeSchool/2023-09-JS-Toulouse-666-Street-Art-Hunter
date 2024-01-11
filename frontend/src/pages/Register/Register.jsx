import React from "react";
import { Form, redirect } from "react-router-dom";
import Input from "../../components/Input-R/Input";
import "./Register.scss";

function Register() {
  return (
    <div className="register-page">
      <div className="register-input">
        <h1 className="register-title">inscription</h1>
        <Form className="form" method="post" action="/register" replace>
          <Input
            className="input"
            labelName="name"
            type="name"
            labelText="Joueur"
            maxLength="14"
          />
          <Input
            className="input"
            labelName="email"
            type="email"
            labelText="email"
            maxLength="45"
          />
          <Input
            className="input"
            labelName="password"
            type="password"
            labelText="Mot de passe"
            maxLength="255"
          />
          <Input
            className="input"
            labelName="passwordConfirme"
            type="password"
            labelText="Confirmation mdp"
            maxLength="255"
          />

          <button className="continue" type="submit">
            CONTINUE
          </button>
        </Form>
      </div>
    </div>
  );
}
export default Register;

export const enrolment = async ({ request }) => {
  const form = await request.formData();

  const data = Object.fromEntries(form);

  const formData = {
    ...data,
    description:
      "Explorateur urbain en quête d'art de rue. Je capture l'essence de la street, je partage ici mes trouvailles colorées.",
    score: 0,
    is_admin: 0,
    is_banned: 0,
    selected_avatar: 0,
    border: "#000000",
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (data.password !== data.passwordconfirme) {
      throw new Error(
        "Le mot de passe ou l'adresse e-mail que vous avez entré est incorrect. Veuillez vérifier vos informations et réessayer. Assurez-vous que votre adresse e-mail est correctement saisie et que le mot de passe respecte les critères requis."
      );
    }

    if (!response.ok) {
      throw new Error("cant fetch user");
    }
    return redirect("/");
  } catch (error) {
    console.error(error);
    return redirect("/register");
  }
};