import React from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/TitleRed-R/Title";
import "./Rules.scss";
import Previous from "../../assets/icons/previous.svg";

function Rules() {
  const navigate = useNavigate();
  return (
    <div className="rules-main-container">
      <div className="section-title">
        <button
          type="button"
          onClick={() => {
            window.scrollTo(0, 0);
            navigate(-1);
          }}
        >
          <img src={Previous} alt="button previous" />
        </button>
        <h1>Regles</h1>
      </div>
      <div className="section-container">
        <div className="section-1">
          <Title title="Votre mission" />
          <p className="text-section-1">
            Explore la ville de Toulouse à la recherche d'œuvres de street art
            créées par des artistes talentueux. Lorsque tu déniches une œuvre,
            prends-en une photo et ajoute-la à ta collection pour accumuler des
            points.
          </p>
        </div>
        <div className="section-2">
          <Title title="Attention" />
          <ul className="list-section-2">
            <li>Ne te met pas en danger pour prendre une photo.</li>
            <li>Utilise un seul compte par joueur.</li>
          </ul>
        </div>
        <div className="section-3">
          <Title title="FAQ" />
          <div className="text-1-section-3">
            <p className="question-1-section-3">
              <span> Où je peux trouver les oeuvres ? </span>
            </p>
            <p>Regarde autour de toi ! Et visite ta ville. </p>
          </div>
          <div className="text-2-section-3">
            <p className="question-2-section-3">
              <span>
                {" "}
                Comment modifier mon pseudo, ma description ou mon email ?
              </span>
            </p>
            <p>
              Accède à ton profil. Tu devrais repérer un logo en forme de roue
              dentée. En cliquant dessus, tu pourras effectuer les modifications
              que tu désires.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rules;
