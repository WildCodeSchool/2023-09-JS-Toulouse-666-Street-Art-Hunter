import React from "react";
import "./AboutUs.scss";
import AstroBoy from "../../../../backend/public/assets/avatars/astro-boy.png";
import Dino from "../../../../backend/public/assets/avatars/dino.png";
import Soldat from "../../../../backend/public/assets/avatars/Soldat.png";
import Linkedin from "../../../../backend/public/assets/icons/linkedin-pixel.png";
import Github from "../../../../backend/public/assets/icons/github-pixel.png";

function AboutUs() {
  return (
    <div className="about-us-main-container">
      <div className="adrien">
        <div className="header">
          <img className="adrien-avatar" src={Soldat} alt="soldier" />
          <div className="adrien-title-container">
            <h2 className="adrien-title">Adrien</h2>
          </div>
        </div>
        <div className="adrien-description">
          <p>
            Un développeur polyvalent spécialisé dans la création d'applications
            web. Avec une expertise à la fois en développement front-end et
            back-end, Adrien est votre partenaire idéal pour transformer vos
            idées en réalité numérique.
            <br />
            <br />
            Sa maîtrise des langages de programmation et des technologies les
            plus récentes lui permet de concevoir des interfaces utilisateur
            intuitives et des architectures robustes qui répondent à vos besoins
            spécifiques. Toujours à l'écoute de vos exigences, Adrien s'engage à
            fournir des solutions efficaces et personnalisées pour chaque
            projet.
          </p>
        </div>
        <div className="network">
          <a
            className="link-img"
            href="https://www.linkedin.com/in/adrien-manente-780336299/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Linkedin} alt="linkedin logo" />
          </a>
          <a
            className="link-img"
            href="https://github.com/Adri-bis"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Github} alt="github logo" />
          </a>
        </div>
      </div>

      <div className="tristan">
        <div className="header">
          <img className="tristan-avatar" src={AstroBoy} alt="astro-boy" />
          <div className="tristan-title-container">
            <h2 className="tristan-title">Tristan</h2>
          </div>
        </div>
        <div className="tristan-description">
          <p>
            Découvrez Tristan, un professionnel du développement logiciel doté
            d'un esprit logique aiguisé. Spécialisé dans la création
            d'algorithmes performants, Tristan excelle dans la résolution
            méthodique de problèmes complexes. Sa capacité à penser de manière
            analytique et à concevoir des solutions élégantes en fait un atout
            précieux.
            <br />
            <br />
            Avec Tristan à la barre, vos projets bénéficieront d'une approche
            sobre et pragmatique, garantissant des résultats efficaces.
          </p>
        </div>
        <div className="network">
          <a
            className="link-img"
            href="https://www.linkedin.com/in/tristan-delmas/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Linkedin} alt="linkedin logo" />
          </a>
          <a
            className="link-img"
            href="https://github.com/Delmastan"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Github} alt="github logo" />
          </a>
        </div>
      </div>

      <div className="theo">
        <div className="header">
          <img className="theo-avatar" src={Dino} alt="dino" />
          <div className="theo-title-container">
            <h2 className="theo-title">Theo</h2>
          </div>
        </div>
        <div className="theo-description">
          <p>
            Un professionnel du front-end qui excelle particulièrement dans le
            design. Son talent se manifeste dans la création d'interfaces
            visuelles attrayantes et fonctionnelles. Théo a une sensibilité
            esthétique prononcée, apportant une touche visuelle élégante à
            chaque projet.
            <br />
            <br /> En plus de son expertise dans le style, il n'hésite pas à
            relever des défis techniques pour intégrer des fonctionnalités
            complexes. Avec Théo à vos côtés, vous pouvez vous attendre à une
            expérience utilisateur soignée et des fonctionnalités bien pensées.
          </p>
        </div>
        <div className="network">
          <a
            className="link-img"
            href="https://www.linkedin.com/in/th%C3%A9o-napoly-1943a183/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Linkedin} alt="linkedin logo" />
          </a>
          <a
            className="link-img"
            href="https://github.com/theonapoly"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Github} alt="github logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
