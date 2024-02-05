import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./LinkAdmin.scss";

function LinkAdmin({ lien, textLink, nameClass }) {
  return (
    <Link to={lien} className={nameClass} onClick={() => window.scrollTo(0, 0)}>
      {textLink}
    </Link>
  );
}

LinkAdmin.propTypes = {
  lien: PropTypes.string.isRequired,
  textLink: PropTypes.string.isRequired,
  nameClass: PropTypes.string.isRequired,
};

export default LinkAdmin;
