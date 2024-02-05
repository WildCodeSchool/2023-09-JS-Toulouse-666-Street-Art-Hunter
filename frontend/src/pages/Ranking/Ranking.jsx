import React, { useEffect, useState } from "react";
import "./Ranking.scss";
import { useNavigate } from "react-router-dom";

import Previous from "../../assets/icons/previous.svg";

function Ranking() {
  // ********************* STATE *********************
  const [userData, setUserData] = useState();
  const [userDataByScore, setUserDataByScore] = useState();
  const [othersPlayers, setOthersPlayers] = useState();
  const navigate = useNavigate();
  // ********************* LOGIQUE *********************
  const fetchUserData = async () => {
    const apiURL = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await fetch(`${apiURL}/api/users`);
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Récupère toutes la data de la table user
  useEffect(() => {
    fetchUserData();
  }, []);

  // Récupère les utilisateurs triés par score
  useEffect(() => {
    if (userData) {
      const sortUsersByScore = [...userData].sort(
        (a, b) => parseInt(b.score, 10) - parseInt(a.score, 10)
      );
      setUserDataByScore(sortUsersByScore);
    }
  }, [userData]);

  // Récupère les autres utilisateurs (sauf les 3 premiers)
  useEffect(() => {
    if (userDataByScore) {
      setOthersPlayers(userDataByScore.slice(3));
    }
  }, [userDataByScore]);

  // Récupérer l'utilisateur actuel
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Récupère l'index de l'utilisateur actuel pour indiquer son classement
  const indexCurrentUser = () => {
    if (userDataByScore && currentUser) {
      const index = userDataByScore.findIndex(
        (el) => el.name === currentUser.name
      );
      return index + 1;
    }
    return null;
  };

  // ********************* RENDER *********************
  return (
    <div className="ranking-main-container">
      <div className="section-title">
        <button
          type="button"
          onClick={() => {
            window.scrollTo(0, 0);
            navigate(-1);
          }}
        >
          <img src={Previous} alt="button previous" />
        </button>
        <h1>Classement</h1>
      </div>

      <div className="score-container">
        <div className="score-tiers-list">
          <div className="first-player">
            <p id="rank">1er</p>
            {userDataByScore && (
              <>
                <img
                  className="avatar-img"
                  src={userDataByScore[0].selected_avatar}
                  alt="avatar"
                />
                <button
                  className="name-player"
                  type="button"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/profil/${userDataByScore[0].id}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      window.scrollTo(0, 0);
                      navigate(`/profil/${userDataByScore[0].id}`);
                    }
                  }}
                >
                  {userDataByScore[0].name}
                </button>
                <p className="score-player">{userDataByScore[0].score} pts</p>
              </>
            )}
          </div>
          <div className="second-player">
            <p id="rank">2e</p>
            {userDataByScore && (
              <>
                <img
                  className="avatar-img"
                  src={userDataByScore[1].selected_avatar}
                  alt="avatar"
                />
                <button
                  className="name-player"
                  type="button"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/profil/${userDataByScore[1].id}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      window.scrollTo(0, 0);
                      navigate(`/profil/${userDataByScore[0].id}`);
                    }
                  }}
                >
                  {userDataByScore[1].name}
                </button>
                <p className="score-player">{userDataByScore[1].score} pts</p>
              </>
            )}
          </div>
          <div className="third-player">
            <p id="rank">3e</p>
            {userDataByScore && (
              <>
                <img
                  className="avatar-img"
                  src={userDataByScore[2].selected_avatar}
                  alt="avatar"
                />
                <button
                  className="name-player"
                  type="button"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/profil/${userDataByScore[2].id}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      window.scrollTo(0, 0);
                      navigate(`/profil/${userDataByScore[0].id}`);
                    }
                  }}
                >
                  {userDataByScore[2].name}
                </button>
                <p className="score-player">{userDataByScore[2].score} pts</p>
              </>
            )}
          </div>
        </div>

        <div className="score-others-players">
          {othersPlayers &&
            othersPlayers.map((el, index) => (
              <div className="other-player" key={el.id}>
                <p id="rank-other">{index + 4}e</p>
                <button
                  id="name-other"
                  type="button"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/profil/${el.id}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      window.scrollTo(0, 0);
                      navigate(`/profil/${userDataByScore[0].id}`);
                    }
                  }}
                >
                  {el.name}
                </button>
                <p id="score-other">{el.score}pts</p>
              </div>
            ))}
        </div>

        <div className="score-current-user">
          {currentUser && (
            <>
              <img
                className="avatar-img-current"
                src={currentUser.selected_avatar}
                alt="avatar"
              />
              {userDataByScore && <p>{indexCurrentUser()}e</p>}
              <button
                className="name-player-current"
                type="button"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/profil/${currentUser.id}`);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    window.scrollTo(0, 0);
                    navigate(`/profil/${userDataByScore[0].id}`);
                  }
                }}
              >
                {currentUser.name}
              </button>
              <p className="score-player-current">{currentUser.score} pts</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ranking;
