import { Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import PropTypes from "prop-types";

import gpsPoint from "../../assets/icons/GPS_point.svg";
import "./GeolocationMarker.scss";

function GeolocationMarker({ location }) {
  const { lat, lng } = location.coordinates;
  const map = useMapEvents({
    locationfound() {
      map.flyTo([lat, lng], map.getZoom());
    },
  });

  const handleFindLocationClick = () => {
    map.locate();
  };

  const userPosition = new Icon({
    iconUrl: gpsPoint,
    iconSize: [60, 60],
  });

  return (
    <>
      {location.loaded && (
        <Marker position={[lat, lng]} icon={userPosition}>
          <Popup>Vous etes ici</Popup>
        </Marker>
      )}
      <button
        className="locate-button"
        type="button"
        onClick={handleFindLocationClick}
      >
        <img src={gpsPoint} alt="reposition de l'utilisateur" />
      </button>
    </>
  );
}

GeolocationMarker.propTypes = {
  location: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    coordinates: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default GeolocationMarker;
