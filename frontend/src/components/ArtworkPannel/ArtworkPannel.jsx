import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function ArtworkPannel({ dataMap, pageName }) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    return navigate(`/admin/${pageName}/${id}`);
  };
  return (
    <div className="tableau">
      {dataMap.map((item) => {
        return (
          <button
            className="map-tableau"
            type="button"
            key={item.id}
            onClick={() => handleClick(item.id)}
          >
            <div className="div-img">
              <img className="link-img" src={item.image} alt="street art" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
ArtworkPannel.propTypes = {
  dataMap: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
};
export default ArtworkPannel;
