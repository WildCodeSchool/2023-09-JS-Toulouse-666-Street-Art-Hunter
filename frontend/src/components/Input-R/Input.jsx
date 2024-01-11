import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Input.scss";

function Input({ labelName, type, labelText, maxLength }) {
  const [value, setValue] = useState("");

  // Permet de bloquer l'input si le nombre de caractères tapés dépasse la limite.
  const handleClick = (e) => {
    if (e.target.value.length <= maxLength) {
      setValue(e.target.value);
    }
  };

  return (
    <label className="label-composent-css" htmlFor={labelName.toLowerCase()}>
      {labelText}
      <br />
      <input
        className="input-composent-css"
        type={type}
        name={labelName.toLowerCase()}
        value={value}
        onChange={handleClick}
      />
    </label>
  );
}

export default Input;

Input.propTypes = {
  labelName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  maxLength: PropTypes.string.isRequired,
};
