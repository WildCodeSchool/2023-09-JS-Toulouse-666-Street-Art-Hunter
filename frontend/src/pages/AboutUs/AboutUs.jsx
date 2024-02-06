import React from "react";
import "./AboutUs.scss";
import AstroBoy from "../../assets/avatars/astro-boy.png";
import Dino from "../../assets/avatars/dino.png";
import Soldat from "../../assets/avatars/Soldat.png";

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
            symphonies digitales. En dehors du monde binaire, Adrien s'immerge
            dans le monde du sport, où, tel un athlète de l'informatique, il
            repousse les limites et transcende les frontières.
          </p>
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
            En provenance de la Ville Rose, il capture les moments éphémères
            avec son appareil photo tout en faisant des randonnées dans le monde
            infini de la technologie. Tristan apporte une touche de magie à
            chaque ligne de code.
          </p>
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
            Paris, il peint avec des pixels plutôt qu'avec des pinceaux, créant
            des œuvres d'art interactives. En dehors du royaume digital, Théo
            consacre son énergie à des projets caritatifs, apportant une dose
            d'humanité à son monde technologique.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
