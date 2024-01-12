import { DivIcon, Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import "./ArtworkMarker.scss";

/** Import icons */
import artToFind from "../../assets/icons/art_to_find.png";
import artFound from "../../assets/icons/art_found.png";

function ArtworkMarker() {
  /** Set marker icon */
  const found = new Icon({
    iconUrl: artFound,
    iconSize: [65, 65],
  });

  const notFound = new Icon({
    iconUrl: artToFind,
    iconSize: [65, 65],
  });

  /** Set marker */
  const markers = [
    {
      position: [43.59658957848975, 1.4515414498524917],
      icon: notFound,
      popup: "A chasser",
      find: false,
    },
    {
      position: [43.596226827237466, 1.4511449128802183],
      icon: found,
      popup: "Description de l'oeuvre",
      find: true,
    },
  ];

  /** Set marker cluster */
  const clusters = (cluster) => {
    return new DivIcon({
      html: `<div class="marker-cluster">${cluster.getChildCount()}</div>`,
    });
  };

  return (
    <MarkerClusterGroup chunkedLoading iconCreateFunction={clusters}>
      {markers.map((marker) => (
        <Marker
          key={marker.popup}
          position={marker.position}
          icon={marker.find === true ? found : notFound}
        >
          {marker.find === true ? (
            <Popup>
              <img
                src="https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/edito_paragraphes/public/thumbnails/image/visiter_toulouse_street_art_maye_monde.jpg?itok=LEpf1fNj"
                alt="Street art de Maye et Mondé"
              />
              <button type="button">Details</button>
            </Popup>
          ) : (
            <Popup>Trouve moi !!!</Popup>
          )}
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
}

export default ArtworkMarker;
