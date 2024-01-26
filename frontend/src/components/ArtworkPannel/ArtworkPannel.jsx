import React from "react";
import PropTypes from "prop-types";

function ArtworkPannel({ dataMap }) {
  return (
    <div className="tableau">
      {dataMap.map((item) => {
        return (
          <div key={item.id} className="map-tableau">
            <div className="div-img">
              <img className="link-img" src={item.image} alt="street art" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
ArtworkPannel.propTypes = {
  dataMap: PropTypes.string.isRequired,
};
export default ArtworkPannel;
