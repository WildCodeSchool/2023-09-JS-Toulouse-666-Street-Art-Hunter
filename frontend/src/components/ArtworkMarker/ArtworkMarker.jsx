import { DivIcon, Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useLoaderData, useNavigate } from "react-router-dom";

import "./ArtworkMarker.scss";

/** Import icons */
import artToFind from "../../assets/icons/art_to_find.png";
import artFound from "../../assets/icons/art_found.png";

function ArtworkMarker() {
  const navigate = useNavigate();
  const { artworks, userPhotos } = useLoaderData();

  /** Set marker icon */
  const found = new Icon({
    iconUrl: artFound,
    iconSize: [65, 65],
  });

  const notFound = new Icon({
    iconUrl: artToFind,
    iconSize: [65, 65],
  });
  /** Set marker cluster */
  const clusters = (cluster) => {
    return new DivIcon({
      html: `<div class="marker-cluster">${cluster.getChildCount()}</div>`,
    });
  };

  const userPhotoId = userPhotos.map((photo) => photo.artwork_id);

  return (
    <MarkerClusterGroup chunkedLoading iconCreateFunction={clusters}>
      {artworks.map((artwork) => {
        return (
          <Marker
            key={artwork.id}
            position={[artwork.longitude, artwork.latitude]}
            icon={userPhotoId.includes(artwork.id) ? found : notFound}
          >
            {userPhotoId.includes(artwork.id) ? (
              <Popup>
                <img src={artwork.image} alt={artwork.description} />
                <button
                  type="button"
                  onClick={() => navigate(`/details-artwork/${artwork.id}`)}
                >
                  Details
                </button>
              </Popup>
            ) : (
              <Popup>
                <button
                  type="button"
                  onClick={() => navigate(`/details-artwork/${artwork.id}`)}
                >
                  Trouve moi !
                </button>
              </Popup>
            )}
          </Marker>
        );
      })}
    </MarkerClusterGroup>
  );
}

export default ArtworkMarker;

export const markerArtworkLoader = async () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  try {
    const dataArtwork = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/artworks`
    );

    const allArtwork = await dataArtwork.json();
    const artworks = allArtwork.filter(
      (artwork) => artwork.is_validate === 1 && artwork.is_archived === 0
    );

    if (token && user) {
      const { id } = JSON.parse(user);
      const photoByUser = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/photos/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userPhotos = await photoByUser.json();

      return { artworks, userPhotos };
    }

    return { artworks };
  } catch (error) {
    throw Error(error);
  }
};
