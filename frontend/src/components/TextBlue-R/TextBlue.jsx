import PropTypes from "prop-types";
import "./TextBlue.scss";

function TextBlue({ text }) {
  return <h2 className="title-blue-container">{text}</h2>;
}

TextBlue.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextBlue;
