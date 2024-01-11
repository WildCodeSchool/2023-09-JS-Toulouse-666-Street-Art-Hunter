import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  if (token) {
    return (
      <div>
        <h1>Hello</h1>
        <div className="Validate-v">V</div>
        <button type="submit" onClick={handleClick}>
          Connexion
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Hello</h1>
      <div className="Validate-x">X</div>
      <button type="submit" onClick={handleClick}>
        Connexion
      </button>
    </div>
  );
}

export default App;
