import { useState } from "react";
import PropTypes from "prop-types";
import "./FormCloudinary.scss";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import InputTextarea from "../InputTextarea/InputTextarea";
import fetchPositionStack from "../../services/Loaders/FetchApiLocation";
import getCurrentFormattedDate from "../../services/utils";
import postCloudAndPhoto from "../../services/Actions/PostCloudAndPhoto";
import postCloudAndArtwork from "../../services/Actions/PostCloudAndArtwork";

import Graffeur from "../../assets/images/graffeur.svg";
import Nuage from "../../assets/icons/nuage.png";
import LogoUploader from "../../assets/images/logo-uploader.svg";
import Previous from "../../assets/icons/previous.svg";

import ModalValidation from "../ModalValidation/ModalValidation";

function FormCloudinary({ title, button, nonExisting, missing, validated }) {
  // ******************* STATE *******************
  const [previewSource, setPreviewSource] = useState();
  const [fileName, setFileName] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal
  const [loadingModal, setLoadingModal] = useState(false); // Modal
  const [addresses, setAddresses] = useState([]);
  const [valueAddress, setValueAddress] = useState(null);
  const [valueDesc, setValueDesc] = useState();
  const [coordinates, setCoordinates] = useState();
  const [toggleBtn, setToggleBtn] = useState("off");
  const navigate = useNavigate();

  // ******************* LOGIQUE *******************

  // Récupérer l'utilisateur connecté (localStorage) pour l'afficher
  const user = JSON.parse(localStorage.getItem("user"));

  // Récupère l'URL du fichier image puis le stock dans previewSource
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  // Se déclenche à la sélection d'un fichier image, puis appelle previewFile
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setFileName(file.name);
  };

  // Date d'aujourd'hui (voir utils.js)
  const currentFormattedDate = getCurrentFormattedDate();

  // ---------- Fonctions POST de l'image de l'utilisateur sur cloudinary, puis en base de donnée (voir dossier /services/Actions) ----------
  // Se déclenche au submit du formulaire et passe à postCloudinaryDatabase l'URL base64 de l'image
  const handleSubmitPhoto = (e) => {
    e.preventDefault();
    if (!previewSource || Object.keys(previewSource).length === 0) {
      console.error("Aucune source d'image à traiter.");
      return;
    }
    setLoadingModal(true);
    postCloudAndPhoto(previewSource, setShowModal, setLoadingModal);
  };

  const handleSubmitArtwork = (e) => {
    e.preventDefault();
    if (!previewSource || Object.keys(previewSource).length === 0) {
      console.error("Aucune source d'image à traiter.");
      return;
    }
    setLoadingModal(true);
    postCloudAndArtwork(
      previewSource,
      coordinates,
      valueAddress,
      valueDesc,
      currentFormattedDate,
      setShowModal,
      setLoadingModal,
      user.id
    );
  };
  //-------------------------------------------------------------

  // Fonction Fetch location IQ (voir dossier /services/Loaders)
  const onChangeAddress = (e) => {
    const response = e.target.textContent;
    setValueAddress(response);
    if (valueAddress) {
      setAddresses([]);
    }
  };

  // ******************* RENDER *******************
  return (
    <div className="main-container-form-cloudinary">
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

        <h1>{title}</h1>
      </div>
      <div className="preview-container">
        {previewSource ? (
          <img src={previewSource} alt="chosen" style={{ height: "340px" }} />
        ) : (
          <img className="logo-uploader" src={LogoUploader} alt="graffeur" />
        )}
      </div>
      <form
        className="form-container"
        onSubmit={nonExisting ? handleSubmitArtwork : handleSubmitPhoto}
      >
        <label className="input-container-file" htmlFor="image">
          <span className="label-title">Choisir fichier</span>
          <p className="file-name">{fileName && fileName}</p>
          <input
            id="image"
            type="file"
            name="image"
            onChange={handleFileInputChange}
          />
        </label>

        {nonExisting && (
          <>
            <div className="address-input">
              <InputTextarea
                labelName="input"
                type="search"
                labelText="Adresse:"
                maxLength="100"
                height="70px"
                value={valueAddress}
                setValue={setValueAddress}
              />
              <button
                type="button"
                style={{ color: "white" }}
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
            <div className="graff-rabite">
              <img src={Graffeur} alt="graffeur lapin" />
            </div>

            <div className="publication-container">
              <h2>Publié par</h2>
              <div className="user-container">
                <img src={Nuage} alt="avatar" />
                <h3>{user.name}</h3>
              </div>
              <p>Le {currentFormattedDate}</p>
            </div>

            <InputTextarea
              labelName="input"
              type="input"
              labelText="Description:"
              maxLength="100"
              height="150px"
              value={valueDesc}
              setValue={setValueDesc}
            />
          </>
        )}

        <div className="text-autorisation">
          <h2>Autorisation*</h2>
          <p>
            <span>Je confirme être l’auteur de</span>{" "}
            <span>la photo et j’autorise son</span>{" "}
            <span>exploitation sur le site</span>{" "}
            <span>STREET ART HUNTER.</span>
          </p>
        </div>
        <div className="btn-container">
          <button type="submit" name="submit">
            <span className="btn-span">{button}</span>
          </button>
        </div>
      </form>

      <div>
        {missing &&
          (showModal || loadingModal) &&
          createPortal(
            <ModalValidation
              setShowModal={setShowModal}
              loadingModal={loadingModal}
              text1="merci de nous en informer"
              text2="attente de validation"
            />,
            document.body
          )}
      </div>

      <div>
        {validated &&
          (showModal || loadingModal) &&
          createPortal(
            <ModalValidation
              setShowModal={setShowModal}
              loadingModal={loadingModal}
              text1="wouah super découverte"
              text2="attente de validation"
            />,
            document.body
          )}
      </div>
    </div>
  );
}

FormCloudinary.propTypes = {
  title: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  nonExisting: PropTypes.bool.isRequired,
  missing: PropTypes.bool.isRequired,
  validated: PropTypes.bool.isRequired,
};

export default FormCloudinary;
