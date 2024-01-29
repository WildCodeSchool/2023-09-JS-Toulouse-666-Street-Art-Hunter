import React, { useEffect, useState } from "react";
import "./Ranking.scss";

function Ranking() {
  // ********************* STATE *********************
  const [userData, setUserData] = useState();
  const [userDataByScore, setUserDataByScore] = useState();
  const [othersPlayers, setOthersPlayers] = useState();

  // ********************* LOGIQUE *********************
  const userScoreLoader = async () => {
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
    userScoreLoader();
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
  const currentUserString = localStorage.getItem("user");
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

  // Récupère l'index de l'utilisateur actuel pour indiquer son classement
  const indexCurrentUser = () => {
    if (userDataByScore && currentUser) {
      const index = userDataByScore.findIndex((el) => el.id === currentUser.id);
      return index;
    }
    return null;
  };

  // ********************* RENDER *********************
  return (
    <div className="ranking-main-container">
      <h1 className="main-title">Classement</h1>

      <div className="score-container">
        <div className="score-tiers-list">
          <div className="first-player">
            <p>1er</p>
            {userDataByScore && (
              <>
                <img
                  className="avatar-img"
                  src={userDataByScore[0].selected_avatar}
                  alt="avatar"
                />
                <p className="name-player">{userDataByScore[0].name}</p>
                <p className="score-player">{userDataByScore[0].score} pts</p>
              </>
            )}
          </div>
          <div className="first-player">
            <p>2e</p>
            {userDataByScore && (
              <>
                <img
                  className="avatar-img"
                  src={userDataByScore[1].selected_avatar}
                  alt="avatar"
                />
                <p className="name-player">{userDataByScore[1].name}</p>
                <p className="score-player">{userDataByScore[1].score} pts</p>
              </>
            )}
          </div>
          <div className="first-player">
            <p>3e</p>
            {userDataByScore && (
              <>
                <img
                  className="avatar-img"
                  src={userDataByScore[2].selected_avatar}
                  alt="avatar"
                />
                <p className="name-player">{userDataByScore[2].name}</p>
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
                <p id="name-other">{el.name}</p>
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
              {userDataByScore && <p>{indexCurrentUser() + 1}e</p>}
              <p className="name-player-current">{currentUser.name}</p>
              <p className="score-player-current">{currentUser.score} pts</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ranking;
