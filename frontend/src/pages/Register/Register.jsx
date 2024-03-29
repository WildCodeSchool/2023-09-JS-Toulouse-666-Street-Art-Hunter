import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import Input from "../../components/Input-R/Input";
import "./Register.scss";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <div className="register-page">
      <div className="register-input">
        <div className="register-hero">
          <h1 className="register-title">inscription</h1>
        </div>
        <Form
          className="register-form"
          method="post"
          action="/register"
          replace
        >
          <Input
            className="name"
            labelName="name"
            type="name"
            labelText="Pseudo:"
            maxLength="14"
            value={name}
            setValue={setName}
          />
          <Input
            className="password"
            labelName="password"
            type="password"
            labelText="mot de passe:"
            maxLength="255"
            value={password}
            setValue={setPassword}
          />
          <Input
            className="email"
            labelName="email"
            type="email"
            labelText="Adresse mail:"
            maxLength="45"
            value={email}
            setValue={setEmail}
          />
          <Input
            className="confirm-password"
            labelName="passwordConfirm"
            type="password"
            labelText="confirmation mdp:"
            maxLength="255"
            value={passwordConfirm}
            setValue={setPasswordConfirm}
          />

          <div className="btn-container">
            <button type="submit" name="submit">
              <span className="btn-span">continue</span>
            </button>
          </div>
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
    selected_avatar:
      "https://res.cloudinary.com/dikhzx4qt/image/upload/v1706104115/Avatar/17_mlwsjn.jpg",
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

    if (data.password !== data.passwordConfirm) {
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
