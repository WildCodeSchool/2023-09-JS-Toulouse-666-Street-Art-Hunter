import { useState } from "react";
import "./FormCloudinary.scss";
// Formulaire pour l'upload de photo dans cloudinary, puis dans la base de données
function FormCloudinary() {
  const [previewSource, setPreviewSource] = useState();
  const [fileName, setFileName] = useState("");

  // Récupère l'URL du fichier image puis le stock dans previewSource
  const previewFile = (file) => {
    const reader = new FileReader();
    console.info(reader);
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
    console.info(file);
  };
  console.info(fileName);

  // Post l'url du fichier image, ainsi que les autres champs de la table photo sur cloudinary puis sur la database
  const uploadImage = async (base64EncodedImage) => {
    // Penser à mettre à jour les valeurs de l'objet objectToPost !!
    // une fois qu'on aura défini user_id et artwork_id
    const objectToPost = {
      image: base64EncodedImage,
      is_validated: 0,
      user_id: 1,
      artwork_id: 1,
    };

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
        method: "POST",
        body: JSON.stringify({ objectToPost }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Se déclenche au submit du formulaire et passe à uploadImage l'URL base64 de l'image
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  return (
    <div className="main-container-form-cloudinary">
      <h1>Trouver ? </h1>
      <div className="preview-container">
        {previewSource && (
          <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
        )}
      </div>
      <form className="form-container" onSubmit={handleSubmitFile}>
        <label className="input-container" htmlFor="image">
          <span className="label-title">Choisir fichier</span>
          <span className="file-name">{fileName && fileName}</span>
          <input
            id="image"
            type="file"
            name="image"
            onChange={handleFileInputChange}
          />
        </label>
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
            <span className="btn-span">valider</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormCloudinary;
