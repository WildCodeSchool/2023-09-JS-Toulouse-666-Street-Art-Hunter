import React, { useState } from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import Input from "../../components/Input-R/Input";
import Boy from "../../assets/photos/boy.png";
import Girl from "../../assets/photos/girl.png";
import "./Loginpage.scss";

function Login() {
  // ********************* STATE *********************
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ********************* LOGIQUE *********************
  const handleClickRegister = () => {
    window.scrollTo(0, 0);
    navigate("/register");
  };

  // ********************* RENDER *********************
  return (
    <div className="login-page">
      <div className="input-block">
        <div className="image-container-boy">
          <img className="left-boy" src={Boy} alt="dessin jeune garçon" />
        </div>
        <div className="login-input">
          <h1 className="main-title">connection</h1>
          <Form className="login-form" method="post" action="/login" replace>
            <Input
              className="input"
              labelName="email"
              type="email"
              labelText="Adresse Mail:"
              maxLength="45"
              value={email}
              setValue={setEmail}
            />
            <Input
              className="input"
              labelName="password"
              type="password"
              labelText="Mot de passe:"
              maxLength="455"
              value={password}
              setValue={setPassword}
            />
            <div className="btn-container">
              <button type="submit" name="submit">
                <span className="btn-span">continue</span>
              </button>
            </div>
          </Form>
        </div>
        <div className="image-container-girl">
          <img className="right-girl" src={Girl} alt="dessin jeune fille" />
        </div>
      </div>

      <div className="login-text">
        <div className="text">Nouveau dans la jungle urbaine ?</div>
        <div className="btn-container">
          <button type="submit" name="submit" onClick={handleClickRegister}>
            <span className="btn-span">inscris-toi</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
// Fonction asynchrone pour gérer l'authentification
export const authenticate = async ({ request }) => {
  // Récupération des données du formulaire depuis la requête
  const form = await request.formData();

  // Conversion des données du formulaire en objet clé-valeur
  const formData = Object.fromEntries(form);

  try {
    // Envoi d'une requête POST au backend pour l'authentification
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
    // Vérification de la réponse HTTP
    if (!response.ok) {
      // En cas d'échec, une erreur est levée avec un message explicatif
      throw new Error(
        "Le mot de passe ou l'adresse e-mail que vous avez entré est incorrect. Veuillez vérifier vos informations et réessayer. Assurez-vous que votre adresse e-mail est correctement saisie et que le mot de passe respecte les critères requis."
      );
    }

    // Récupération des données JSON de la réponse
    const data = await response.json();

    // Stockage des informations de l'utilisateur et du token dans le localStorage
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  } catch (error) {
    console.error(error);
  }
  // Redirection de l'utilisateur vers la page d'accueil
  return redirect("/map");
};
