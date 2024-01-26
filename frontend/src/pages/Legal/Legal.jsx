import React from "react";
import "./Legal.scss";
import Title from "../../components/TitleRed-R/Title";

function Legals() {
  return (
    <div className="legal-container">
      <h1>Politique de confidentialite</h1>
      <div>
        <h3>Date d’entrée en Vigueur le 14 décembre 2023</h3>
        <p>
          Merci d'utiliser STREET ART HUNTER ! Cette politique de
          confidentialité décrit comment nous collectons, utilisons et
          partageons vos informations lorsque vous utilisez notre application.
          En utilisant Street Art Hunter, vous consentez à la collecte et à
          l'utilisation de vos informations comme décrit dans cette politique.
        </p>
      </div>
      <div>
        <Title title="Informations collectees" />
        <div>
          <h3>Données Personnelles</h3>
          <p>
            Lorsque vous utilisez Street Art Hunter, nous pouvons collecter les
            informations suivantes :
          </p>
          <p>
            Informations d'Identification : Nous pouvons collecter des
            informations telles que votre nom d'utilisateur, votre adresse
            e-mail, et d'autres informations similaires que vous fournissez lors
            de la création d'un compte.
          </p>
          <p>
            Données de Géolocalisation : Pour vous fournir des fonctionnalités
            de géolocalisation, nous collectons et stockons des données de
            localisation, y compris les coordonnées géographiques de votre
            appareil.
          </p>
          <p>
            Contenu Généré par l'Utilisateur : Les photos et les informations
            que vous soumettez en utilisant l'application, y compris les œuvres
            de street art que vous photographiez et partagez.
          </p>
        </div>
        <div>
          <h3>Utilisation des informations</h3>
          <p>Nous utilisons les informations collectées pour :</p>
          <p>Fournir, maintenir et améliorer notre application.</p>
          <p>
            Vous permettre d'utiliser les fonctionnalités de l'application,
            telles que la géolocalisation et le partage de photos.
          </p>
          <p>
            Gérer votre compte et répondre à vos questions et préoccupations.
          </p>
        </div>
        <div>
          <h3>Partage des informations</h3>
          <p>
            Nous ne partageons pas vos informations personnelles avec des tiers,
            sauf dans les cas suivants :
          </p>
          <p>
            Validation des Photos : Les administrateurs peuvent avoir accès à
            vos photos pour confirmer qu'elles représentent correctement une
            œuvre de street art.
          </p>
          <p>
            Conformité Juridique : Nous pouvons partager vos informations si
            cela est nécessaire pour se conformer à une obligation légale ou
            pour protéger nos droits, notre propriété ou notre sécurité, ainsi
            que ceux de nos utilisateurs.
          </p>
        </div>
      </div>
      <div>
        <Title title="SECURITE" />
        <p>
          Nous prenons des mesures pour protéger vos informations, mais
          rappelez-vous qu'aucune méthode de transmission sur Internet, ou
          méthode de stockage électronique, n'est totalement sécurisée.
        </p>
      </div>
      <div>
        <Title title="Modifications de la Politique de Confidentialite" />
        <p>
          Nous pouvons mettre à jour cette politique de confidentialité de temps
          à autre. Nous vous informerons de toute modification importante par le
          biais de notre site web ou par d'autres moyens de communication.
        </p>
      </div>
      <div>
        <Title title="CONTACT" />
        <p>
          Si vous avez des questions concernant cette politique de
          confidentialité, veuillez nous contacter à [adresse e-mail de
          contact].
        </p>
      </div>
    </div>
  );
}

export default Legals;
