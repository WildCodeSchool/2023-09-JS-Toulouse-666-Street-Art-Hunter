import PropTypes from "prop-types";
import "./InputTextarea.scss";

function InputTextarea({
  labelName,
  type,
  labelText,
  maxLength,
  height,
  width,
  value,
  setValue,
}) {
  // Permet de bloquer l'input si le nombre de caractères tapés dépasse la limite.
  const handleClick = (e) => {
    if (e.target.value.length <= maxLength) {
      setValue(e.target.value);
    }
  };

  return (
    <label className="label-container" htmlFor={labelName}>
      <span className="label-title">{labelText}</span>
      <textarea
        className="input-container"
        type={type}
        name={labelName}
        value={value}
        onChange={handleClick}
        style={{ height, width }}
      />
    </label>
  );
}

InputTextarea.defaultProps = {
  height: "auto",
  width: "auto",
  value: "",
  setValue: () => {},
};

export default InputTextarea;

InputTextarea.propTypes = {
  labelName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  maxLength: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
};
