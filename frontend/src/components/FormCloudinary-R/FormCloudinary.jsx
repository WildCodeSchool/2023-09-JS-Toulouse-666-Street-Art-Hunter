import { useState } from "react";
// Formulaire pour l'upload de photo dans cloudinary, puis dans la base de données
function FormCloudinary() {
  const [previewSource, setPreviewSource] = useState();

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
    console.info(file);
  };

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
    <div>
      <form onSubmit={handleSubmitFile}>
        <div>
          <input type="file" name="image" onChange={handleFileInputChange} />
          <button type="submit" name="submit">
            Uploader
          </button>
        </div>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
}

export default FormCloudinary;
