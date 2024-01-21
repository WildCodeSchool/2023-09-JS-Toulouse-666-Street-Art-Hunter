import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./RootLayout.scss";

function RootLayout() {
  const location = useLocation();

  return (
    <div className="root-layout-main-container">
      {location.pathname !== "/" && (
        <header className="header">
          <div className="links">
            <Link to="/">Accueil</Link>
            <Link to="/map">Carte</Link>
            <Link to="/register">Inscription</Link>
            <Link to="/login">Connexion</Link>
            <Link to="/add-existing-artwork">Ajouter-oeuvre</Link>
            <Link to="/add-non-existing-artwork">
              Ajouter-oeuvre-non-existante
            </Link>
            <Link to="/artwork-missing">Oeuvre-disparue</Link>
          </div>
        </header>
      )}
      <Outlet />
    </div>
  );
}

export default RootLayout;
