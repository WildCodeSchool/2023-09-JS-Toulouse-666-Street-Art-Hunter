import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/map");
  };

  return (
    <div>
      <h1>Hello</h1>
      <button type="button" onClick={handleButtonClick}>
        Map
      </button>
    </div>
  );
}

export default App;
