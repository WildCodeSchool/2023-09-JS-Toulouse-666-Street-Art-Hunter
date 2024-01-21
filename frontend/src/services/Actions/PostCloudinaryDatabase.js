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
  // console.log(base64EncodedImage);

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

export default uploadImage;
