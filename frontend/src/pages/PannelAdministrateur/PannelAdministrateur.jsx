import React from "react";
import { Navigate, useLoaderData } from "react-router-dom";
import "./PannelAdministrateur.scss";
import LinkAdmin from "../../components/LinkAdmin/LinkAdmin";
import ArtworkPannel from "../../components/ArtworkPannel/ArtworkPannel";
import Thors from "../../assets/photos/Thors.png";
import Title from "../../components/TitleRed-R/Title";

function PannelAdministrateur() {
  const profils = useLoaderData();

  if (profils.admin.is_admin !== 1) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="pannel-administrateur-page">
      <div className="pannel-stats">
        <img
          className="img-admin"
          src={Thors}
          alt="Beautiful street art of Thors"
        />
        <div className="arrays">
          <Title title="Statistiques" />
          <div className="map-admin">
            <p>
              {" "}
              Utilisateurs: <span>{profils.users[0].numberOfUser}</span>
            </p>
            <p>
              Oeuvres: <span>{profils.artworks[0].numberOfUser}</span>
            </p>
            <p>
              {" "}
              Oeuvres non-validés:
              <span>{profils.artworksNoValidate[0].numberOfArtwork}</span>
            </p>
            <p>
              {" "}
              Artistes: <span>{profils.artists[0].numberOfUser}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="arrays">
        <Title title="Photos à valider :" />
        <ArtworkPannel
          dataMap={profils.PhotoNoValidate}
          pageName="validate-photo"
        />
      </div>
      <div className="arrays">
        <Title title="Oeuvres ajoutées :" />
        <ArtworkPannel
          dataMap={profils.ArtworksToAdd}
          pageName="validate-artwork"
        />
      </div>
      <div className="arrays">
        <Title title="Oeuvres disparues :" />
        <ArtworkPannel
          dataMap={profils.ArtworksToMissing}
          pageName="admin-missing-artwork"
        />
      </div>

      <div className="pannel-link">
        <LinkAdmin
          lien="/admin/pannel-administrateur/users"
          textLink="Liste Utilisateurs"
          nameClass="link-admin b"
        />
        <LinkAdmin
          lien="/admin/admin-artworks"
          textLink="Liste Œuvres"
          nameClass="link-admin g"
        />
        <LinkAdmin
          lien="/map"
          textLink="Liste Artistes"
          nameClass="link-admin y"
        />

        <LinkAdmin
          lien="/map"
          textLink="Créer Artistes"
          nameClass="link-admin r"
        />

        <LinkAdmin
          lien="/map"
          textLink="Liste Utilisateurs Bannis"
          nameClass="link-admin black"
        />
      </div>
    </div>
  );
}

export default PannelAdministrateur;

export const profilPannelAdmin = async (req) => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const { id } = req.params;
  const responseAdmin = await fetch(`${apiURL}/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const admin = await responseAdmin.json();

  const responseUsers = await fetch(
    `${apiURL}/api/pannel-administrateur/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const users = await responseUsers.json();

  const responseArtworks = await fetch(
    `${apiURL}/api/pannel-administrateur/artworks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const artworks = await responseArtworks.json();

  const responseNoArtworks = await fetch(
    `${apiURL}/api/pannel-administrateur/artworks-no-validate`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const artworksNoValidate = await responseNoArtworks.json();

  const responseArtists = await fetch(
    `${apiURL}/api/pannel-administrateur/artists`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const artists = await responseArtists.json();

  const responseArtworksToAdd = await fetch(
    `${apiURL}/api/pannel-administrateur/artworks-to-validate`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const ArtworksToAdd = await responseArtworksToAdd.json();

  const responseArtworksToMissing = await fetch(
    `${apiURL}/api/pannel-administrateur/artworks-to-missing`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const ArtworksToMissing = await responseArtworksToMissing.json();

  const responsePhotoNoValidate = await fetch(
    `${apiURL}/api/pannel-administrateur/photo-no-validate`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const PhotoNoValidate = await responsePhotoNoValidate.json();

  if (!responseAdmin.ok) {
    throw new Error(JSON.stringify({ message: "Could not fetch profiles." }), {
      status: 500,
    });
  }

  const resp = {
    admin,
    users,
    artists,
    artworks,
    artworksNoValidate,
    ArtworksToAdd,
    ArtworksToMissing,
    PhotoNoValidate,
  };

  return resp;
};
