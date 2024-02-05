const postCloudAndArtwork = async (
  base64EncodedImage,
  coordinates,
  valueAddress,
  valueDesc,
  currentFormattedDate,
  setShowModal,
  setLoadingModal
) => {
  const dataArtwork = {
    image: base64EncodedImage,
    longitude: coordinates.lon,
    latitude: coordinates.lat,
    adress: valueAddress,
    description: valueDesc,
    date_published: currentFormattedDate,
    ask_to_archived: 0,
    is_archived: 0,
    is_validate: 0,
  };
  console.info(dataArtwork);

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/artworks/upload`,
      {
        method: "POST",
        body: JSON.stringify({ dataArtwork }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json(); // Try to parse the response body
      throw new Error(
        `Failed to upload artwork. Server responded with ${response.status}. ${
          errorData.message || ""
        }`
      );
    }
    if (response.status === 200) {
      setShowModal(true);
      setLoadingModal(false);
    }
    console.info("Artwork uploaded successfully!");
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export default postCloudAndArtwork;
