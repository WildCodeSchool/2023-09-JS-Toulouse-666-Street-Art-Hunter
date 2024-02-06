import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Input.scss";

function Input({ labelName, type, labelText, maxLength, height }) {
  const [value, setValue] = useState("");

  // Permet de bloquer l'input si le nombre de caractères tapés dépasse la limite.
  const handleClick = (e) => {
    if (e.target.value.length <= maxLength) {
      setValue(e.target.value);
    }
  };

  return (
    <label className="input-main-container" htmlFor={labelName}>
      <span className="label-title">{labelText}</span>
      <input
        className="input-value"
        type={type}
        name={labelName}
        value={value}
        onChange={handleClick}
        style={{ inputHeight: height }}
      />
    </label>
  );
}

Input.defaultProps = {
  height: "auto",
};

export default Input;

Input.propTypes = {
  labelName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  maxLength: PropTypes.string.isRequired,
  height: PropTypes.string,
};
