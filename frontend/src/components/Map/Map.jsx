import { MapContainer, TileLayer } from "react-leaflet";
import GeolocationMarker from "../GeolocationMarker/GeolocationMarker";
import useGeolocation from "../CustomHook/useGeolocation";

/** Import style */
import "./Map.scss";
import "leaflet/dist/leaflet.css";
import ArtworkMarker from "../ArtworkMarker/ArtworkMarker";

function Map() {
  /** Get user location */
  const location = useGeolocation();

  /** Change character in zoom feature to match font */
  const zoom = document.getElementsByClassName("leaflet-control-zoom-out")[0];
  if (zoom) {
    zoom.firstChild.textContent = "-";
  }

  /** Set map */
  const map = {
    account: import.meta.env.VITE_MAP_ACCOUNT,
    style: import.meta.env.VITE_MAP_STYLE_ID,
    key: import.meta.env.VITE_MAP_KEY,
  };

  /** Render map with user location and without it */

  return (
    <MapContainer
      center={
        location.loaded && location.coordinates !== undefined
          ? [location.coordinates.lat, location.coordinates.lng]
          : [43.603274149517546, 1.442146329051954]
      }
      zoom={15}
      minZoom={12}
      maxZoom={20}
    >
      <TileLayer
        attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={`https://api.mapbox.com/styles/v1/${map.account}/${map.style}/tiles/256/{z}/{x}/{y}@2x?access_token=${map.key}`}
        maxNativeZoom={20}
        minZoom={12}
        maxZoom={20}
      />
      <ArtworkMarker />
      {location.loaded && location.coordinates !== undefined && (
        <GeolocationMarker location={location} />
      )}
    </MapContainer>
  );
}

export default Map;
