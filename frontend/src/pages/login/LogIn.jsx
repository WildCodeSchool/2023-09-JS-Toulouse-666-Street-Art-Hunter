import React from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import PeintBomb from "../../assets/Peint-login.png";
import "./LogIn.scss";

function Login() {
  const navigate = useNavigate();
  const handleclique = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="login-page">
      <div className="login-input">
        <h1 className="login-title">CONNECTE-TOI</h1>
        <Form className="form" method="post" action="/login" replace>
          <Input
            className="input"
            labelName="email"
            type="email"
            labelText="Adresse Mail"
          />
          <Input
            className="input"
            labelName="password"
            type="password"
            labelText="Mot de passe"
          />
          <button className="continue" type="submit">
            CONTINUE
          </button>
        </Form>
      </div>
      <div className="logout-page">
        <button type="submit" onClick={handleclique}>
          LogOut
        </button>
      </div>
      <div className="login-text">
        <img src={PeintBomb} alt="BOmbe de peinture" />
        <div className="text">Nouveau dans la jungle urbaine?</div>
        <button className="inscription" type="submit">
          INSCRITS-TOI
        </button>
      </div>
    </div>
  );
}

export default Login;

export const authenticate = async ({ request }) => {
  const form = await request.formData();

  const formData = Object.fromEntries(form);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Le mot de passe ou l'adresse e-mail que vous avez entré est incorrect. Veuillez vérifier vos informations et réessayer. Assurez-vous que votre adresse e-mail est correctement saisie et que le mot de passe respecte les critères requis."
      );
    }

    const data = await response.json();

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  } catch (error) {
    console.error(error);
  }

  return redirect("/");
};
