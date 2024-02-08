const postCloudAndPhoto = async (
  base64EncodedImage,
  setShowModal,
  setLoadingModal,
  userId,
  paramsArtwork
) => {
  const objectToPost = {
    image: base64EncodedImage,
    is_validated: 0,
    user_id: userId,
    artwork_id: paramsArtwork,
  };

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
      {
        method: "POST",
        body: JSON.stringify({ objectToPost }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erreur de téléversement sur Cloudinary : ${response.status}`
      );
    }

    if (response.status === 200) {
      setShowModal(true);
      setLoadingModal(false);
    }
  } catch (error) {
    console.error("Erreur lors du téléversement sur Cloudinary:", error);

    throw error;
  }
};

export default postCloudAndPhoto;
