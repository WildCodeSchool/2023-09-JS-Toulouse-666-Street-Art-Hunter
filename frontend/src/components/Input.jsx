import React, { useState } from "react";
import PropTypes from "prop-types";

function Input({ labelName, type }) {
  const [value, setValue] = useState("");

  const handleClick = (e) => {
    setValue(e.target.value);
  };

  return (
    <label htmlFor={labelName.toLowerCase()}>
      {labelName}
      <br />
      <input
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
};
