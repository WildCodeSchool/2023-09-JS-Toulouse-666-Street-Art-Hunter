import React from "react";
import {
  Navigate,
  useLoaderData,
  //   useParams,
  //   useNavigate,
} from "react-router-dom";
import "./PannelAdministrateur.scss";
import LinkAdmin from "../../components/LinkAdmin/LinkAdmin";
import ArtworkPannel from "../../components/ArtworkPannel/ArtworkPannel";

function PannelAdministrateur() {
  const profils = useLoaderData();

  if (profils.admin.is_admin !== 1) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="pannel-administrateur-page">
      <div className="title">Statistiques</div>
      <div className="map-admin">
        Nombres d'utilisateurs : {profils.users[0].numberOfUser} <br />
        Nombres d'oeuvres : {profils.artworks[0].numberOfUser}
        <br />
        Nombres d'oeuvres pas validé :{" "}
        {profils.artworksNoValidate[0].numberOfArtwork}
        <br />
        Nombres d'artists : {profils.artists[0].numberOfUser}
      </div>

      <p className="title">Œuvres à validées</p>
      <ArtworkPannel dataMap={profils.ArtworksToAdd} />

      <p className="title">Œuvres ajoutées</p>
      <ArtworkPannel dataMap={profils.ArtworksToMissing} />

      <p className="title">Œuvres disparues</p>
      <ArtworkPannel dataMap={profils.PhotoNoValidate} />

      <div className="pannel-link">
        <LinkAdmin
          lien="/map"
          textLink="Liste Utilisateurs"
          nameClass="link-admin b"
        />
        <LinkAdmin
          lien="/map"
          textLink="Liste Œuvres"
          nameClass="link-admin g"
        />
        <LinkAdmin
          lien="/map"
          textLink="Listes Artistes"
          nameClass="link-admin y"
        />
        <LinkAdmin
          lien="/map"
          textLink="Listes Articles"
          nameClass="link-admin v"
        />
        <LinkAdmin
          lien="/map"
          textLink="Créer Artistes"
          nameClass="link-admin r"
        />
        <LinkAdmin
          lien="/map"
          textLink="Créer Articles"
          nameClass="link-admin p"
        />
        <LinkAdmin
          lien="/map"
          textLink="Liste Utilisateurs Banni"
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
