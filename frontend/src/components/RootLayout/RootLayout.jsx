import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./RootLayout.scss";

function RootLayout() {
  return (
    <div className="root-layout-main-container">
      <header className="header">
        <div className="links">
          <Link to="/">Accueil</Link>
          <Link to="/map">Carte</Link>
          <Link to="/register">Inscription</Link>
          <Link to="/login">Connexion</Link>
          <Link to="/add-existing-artwork">Ajouter-oeuvre</Link>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default RootLayout;
