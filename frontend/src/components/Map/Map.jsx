import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon as DivIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import useGeolocation from "../CustomHook/useGeolocation";

import "./Map.scss";
import "leaflet/dist/leaflet.css";

function Map() {
  const location = useGeolocation();

  const findIcon = new Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [25, 41],
  });

  const defaultIcon = new Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    iconSize: [25, 41],
  });

  const markers = [
    {
      position: [43.59621926141113, 1.4552880970502133],
      icon: defaultIcon,
      popup: "A chasser",
      find: false,
    },
    {
      position: [43.59621926141113, 1.4552880970502133],
      icon: findIcon,
      popup: "Description de l'oeuvre",
      find: true,
    },
  ];

  const userPosition = new Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    iconSize: [25, 41],
  });

  const clusters = (cluster) => {
    return new DivIcon({
      html: `<div class="marker-cluster">${cluster.getChildCount()}</div>`,
    });
  };

  return (
    <MapContainer center={[43.59621926141113, 1.4552880970502133]} zoom={17}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={clusters}>
        {markers.map((marker) => (
          <Marker
            key={marker.popup}
            position={marker.position}
            icon={marker.find === true ? findIcon : defaultIcon}
          >
            <Popup>
              <img
                src="https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/edito_paragraphes/public/thumbnails/image/visiter_toulouse_street_art_maye_monde.jpg?itok=LEpf1fNj"
                alt="Street art de Maye et Mondé"
              />
              <button type="button">Click Me</button>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      {location.loaded && (
        <Marker position={location.coordinates} icon={userPosition}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Map;
