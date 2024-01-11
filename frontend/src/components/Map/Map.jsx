import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon as DivIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import useGeolocation from "../CustomHook/useGeolocation";

/** Import style */
import "./Map.scss";
import "leaflet/dist/leaflet.css";

/** Import icons */
import artToFind from "../../assets/icons/art_to_find.png";
import artFound from "../../assets/icons/art_found.png";
import gpsPoint from "../../assets/icons/GPS_point.svg";

function Map() {
  /** Get user location */
  const location = useGeolocation();

  /** Change character in zoom feature to match font */
  const zoom = document.getElementsByClassName("leaflet-control-zoom-out")[0];
  if (zoom) {
    zoom.firstChild.textContent = "-";
  }

  /** Set marker icon */
  const found = new Icon({
    iconUrl: artFound,
    iconSize: [65, 65],
  });

  const notFound = new Icon({
    iconUrl: artToFind,
    iconSize: [65, 65],
  });

  const userPosition = new Icon({
    iconUrl: gpsPoint,
    iconSize: [60, 60],
  });

  /**
   * marker a changer avec l'api
   */

  const markers = [
    {
      position: [43.59621926141113, 1.4552880970502133],
      icon: notFound,
      popup: "A chasser",
      find: false,
    },
    {
      position: [43.59621926141113, 1.4552880970502133],
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

  /** Set map */
  const map = {
    account: import.meta.env.VITE_MAP_ACCOUNT,
    style: import.meta.env.VITE_MAP_STYLE_ID,
    key: import.meta.env.VITE_MAP_KEY,
  };

  /** Render map with user location and without it */

  return location.loaded ? (
    <MapContainer
      center={[location.coordinates.lat, location.coordinates.lng]}
      zoom={15}
      minZoom={0}
      maxZoom={20}
    >
      <TileLayer
        attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={`https://api.mapbox.com/styles/v1/${map.account}/${map.style}/tiles/256/{z}/{x}/{y}@2x?access_token=${map.key}`}
        maxNativeZoom={20}
        minZoom={0}
        maxZoom={20}
      />
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
              <Popup>FIND ME !!!</Popup>
            )}
          </Marker>
        ))}
      </MarkerClusterGroup>
      {location.loaded && (
        <Marker position={location.coordinates} icon={userPosition}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  ) : (
    <MapContainer
      center={[43.5960115, 1.4550435]}
      zoom={15}
      minZoom={0}
      maxZoom={20}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${map.account}/${map.style}/tiles/256/{z}/{x}/{y}@2x?access_token=${map.key}`}
        maxNativeZoom={20}
        minZoom={0}
        maxZoom={20}
      />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={clusters}>
        {markers.map((marker) => (
          <Marker
            key={marker.popup}
            position={marker.position}
            icon={marker.find === true ? found : notFound}
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
    </MapContainer>
  );
}

export default Map;
