import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Input.scss";

function Input({ labelName, type, labelText }) {
  const [value, setValue] = useState("");

  const handleClick = (e) => {
    setValue(e.target.value);
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
};
