import React from "react";
import "./AboutUs.scss";
import AstroBoy from "../../assets/avatars/astro-boy.png";
import Dino from "../../assets/avatars/dino.png";
import Soldat from "../../assets/avatars/Soldat.png";
import Linkedin from "../../assets/icons/linkedin-pixel.png";
import Github from "../../assets/icons/github-pixel.png";

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
            Adrien, le virtuose du développement web, manie les langages comme
            un chef d'orchestre dirige son ensemble. Avec une agilité
            exceptionnelle sur le clavier, il transforme des lignes de code en
            symphonies digitales. En dehors du monde binaire, Adrien se plonge
            dans la création de musique électronique qui, tout comme ses
            algorithmes, transcende les frontières.
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
            Tristan, le magicien de l'intelligence artificielle, jongle avec les
            algorithmes comme s'il s'agissait d'un tour de magie bien orchestré.
            En provenance de la Ville Lumière, il capture les moments éphémères
            avec son appareil photo tout en faisant des randonnées dans le monde
            infini de la technologie. Tristan apporte une touche de magie à
            chaque ligne de code.
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
            Théo, l'architecte des applications mobiles, érige des structures
            numériques avec une ingéniosité qui défie la gravité. Originaire de
            Marseille, il peint avec des pixels plutôt qu'avec des pinceaux,
            créant des œuvres d'art interactives. En dehors du royaume digital,
            Théo consacre son énergie à des projets caritatifs, apportant une
            dose d'humanité à son monde technologique.
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
