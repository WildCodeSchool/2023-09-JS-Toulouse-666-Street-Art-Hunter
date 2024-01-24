import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

function Button({ name, onClick, textBtn }) {
  return (
    <div className="button-main-container">
      <button className="button" type="button" name={name} onClick={onClick}>
        <span className="button-span">{textBtn}</span>
      </button>
    </div>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  textBtn: PropTypes.string.isRequired,
};

export default Button;
