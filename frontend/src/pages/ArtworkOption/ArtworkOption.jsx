import React, { useState, useEffect } from "react";
import "./ArtworkOption.scss";
import { useParams, useNavigate } from "react-router-dom";
import InputTextarea from "../../components/InputTextarea/InputTextarea";
import fetchPositionStack from "../../services/Loaders/FetchApiLocation";
import postCloudAndPutArtwork from "../../services/Actions/PostCloudAndPutArtwork";
import getCurrentFormattedDate from "../../services/utils";

function ArtworkOption() {
  // ********************* STATE *********************
  const navigate = useNavigate();
  const { id } = useParams();

  const [dataArtwork, setDataArtwork] = useState();
  const [previewSource, setPreviewSource] = useState(dataArtwork?.image);
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [valueLongitude, setValueLongitude] = useState(dataArtwork?.longitude);
  const [valueLatitude, setValueLatitude] = useState(dataArtwork?.longitude);
  const [addresses, setAddresses] = useState([]); //
  const [valueAddress, setValueAddress] = useState(dataArtwork?.adress);
  const [valueDesc, setValueDesc] = useState(dataArtwork?.description);
  const [artworkId, setArtworkId] = useState(dataArtwork?.id);
  const [valueAskArchive, setValueAskArchive] = useState(
    dataArtwork?.ask_to_archived
  );
  const [valueIsArchive, setValueIsArchive] = useState(
    dataArtwork?.is_archived
  );
  const [valueIsValidate, setValueIsValidate] = useState(
    dataArtwork?.is_validate
  );
  const [toggleBtn, setToggleBtn] = useState("off");

  // ********************* LOGIQUE *********************
  // Récupère la data de la table artwork par l'id pour inititliser les states à la valeur de l'oeuvre que l'on veut modifier
  const fetchdataArtwork = async () => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await fetch(`${apiUrl}/api/artworks/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      setDataArtwork(data);
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
      throw error;
    }
  };

  // Met à jour les states si le fetch est réussi et règle le problème asynchronicité
  useEffect(() => {
    if (dataArtwork) {
      setPreviewSource(dataArtwork.image);
      setValueLongitude(dataArtwork.longitude);
      setValueLatitude(dataArtwork.latitude);
      setArtworkId(dataArtwork.id);
      setValueAddress(dataArtwork.adress);
      setValueDesc(dataArtwork.description);
      setValueAskArchive(dataArtwork.ask_to_archived);
      setValueIsArchive(dataArtwork.is_archived);
      setValueIsValidate(dataArtwork.is_validate);
      setArtworkId(dataArtwork.id);
    }
  }, [dataArtwork]);

  useEffect(() => {
    fetchdataArtwork();
  }, []);

  //   -----------------------------------------
  // Permet de récupérer le "result" donc l'url en base 64 de l'image
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // Déclenche previewFile et cible le fichier
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  // Fonction Fetch location IQ (voir dossier /services/Loaders)
  const onChangeAddress = (e) => {
    const response = e.target.textContent;
    setValueAddress(response);
    if (valueAddress) {
      setAddresses([]);
    }
  };

  // Date d'aujourd'hui (voir utils.js)
  const currentFormattedDate = getCurrentFormattedDate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Déclenche la fonction "postCloudAndPutArtwork"
  const handleSubmitArtwork = (e) => {
    e.preventDefault();
    if (!dataArtwork) {
      console.error("Les champs ne sont pas remplis");
      return;
    }
    postCloudAndPutArtwork(
      previewSource,
      valueLongitude,
      valueLatitude,
      valueAddress,
      valueDesc,
      currentFormattedDate,
      valueAskArchive,
      valueIsArchive,
      valueIsValidate,
      artworkId,
      user.id
    );
  };

  // ********************* RENDER *********************
  return (
    dataArtwork && (
      <div className="artwork-option-main-container">
        <div className="main-title">
          <h1>Modifie l'oeuvre</h1>
        </div>

        <div className="preview-container">
          {previewSource ? (
            <img src={previewSource} alt="chosen" style={{ height: "340px" }} />
          ) : (
            <p>Pas d'image</p>
          )}
        </div>

        <form className="form-modify" onSubmit={handleSubmitArtwork}>
          <div className="input input-image">
            <input type="file" name="image" onChange={handleFileInputChange} />
          </div>

          <div className="address-input">
            <InputTextarea
              labelName="input"
              type="search"
              labelText="Adresse:"
              maxLength="100"
              height="90px"
              width="100%"
              value={valueAddress}
              setValue={setValueAddress}
            />
            <button
              className="btn-search"
              type="button"
              onClick={() => {
                fetchPositionStack(setAddresses, valueAddress);
                setToggleBtn("on");
              }}
            >
              Rechercher
            </button>

            <div className={`btn-addresses-${toggleBtn}`}>
              {addresses &&
                addresses.map((el) => (
                  <button
                    type="button"
                    key={el.place_id}
                    onClick={(e) => {
                      onChangeAddress(e);
                      setCoordinates({ lat: el.lat, lon: el.lon });
                      setToggleBtn("off");
                    }}
                  >
                    {el.display_name}
                  </button>
                ))}
            </div>
          </div>

          <label className="label label-latitude" htmlFor="latitude">
            <span>Latitude:</span>
            <input
              className="input-field"
              type="text"
              value={valueLatitude}
              name="latitude"
              onChange={(e) =>
                setCoordinates({ ...coordinates, lat: e.target.value })
              }
            />
          </label>

          <label className="label label-longitude" htmlFor="longitude">
            <span>Longitude:</span>
            <input
              className="input-field"
              type="text"
              value={valueLongitude}
              name="longitude"
              onChange={(e) =>
                setCoordinates({ ...coordinates, lon: e.target.value })
              }
            />
          </label>

          <label className="label label-description" htmlFor="description">
            <span>Description:</span>
            <textarea
              className="input-field"
              name="description"
              onChange={(e) => setValueDesc(e.target.value)}
              value={valueDesc}
            />
          </label>

          <label
            className="label label-ask-to-archived"
            htmlFor="ask_to_archived"
          >
            <span>Demande d'archivage:</span>
            <input
              className="input-field"
              name="ask_to_archived"
              onChange={(e) => setValueAskArchive(e.target.value)}
              value={valueAskArchive}
            />
          </label>

          <label className="label label-is-archive" htmlFor="is_archived">
            <span>Est-ce archivé ?</span>
            <input
              className="input-field"
              name="is_archived"
              onChange={(e) => setValueIsArchive(e.target.value)}
              value={valueIsArchive}
            />
          </label>

          <label className="label label-is-validate" htmlFor="is_validate">
            <span>Est-ce validé ?</span>
            <input
              className="input-field"
              name="is_validate"
              onChange={(e) => setValueIsValidate(e.target.value)}
              value={valueIsValidate}
            />
          </label>

          <button
            className="btn-form"
            type="submit"
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/admin/admin-artworks");
            }}
          >
            Valider
          </button>
        </form>

        <button
          className="btn-form"
          type="button"
          onClick={() => {
            window.scrollTo(0, 0);
            navigate(-1);
          }}
        >
          Retour
        </button>
      </div>
    )
  );
}

export default ArtworkOption;
