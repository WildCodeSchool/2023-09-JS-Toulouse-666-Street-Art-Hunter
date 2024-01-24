import React from "react";
import PropTypes from "prop-types";
import "./Title.scss";

function Title({ title }) {
  return (
    <div className="title-main-container">
      <h2 className="title">{title}</h2>
    </div>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
