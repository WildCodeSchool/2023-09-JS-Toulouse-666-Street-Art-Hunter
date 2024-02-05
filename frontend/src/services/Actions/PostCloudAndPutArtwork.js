const postCloudAndPutArtwork = async (
  base64EncodedImage,
  valueLongitude,
  valueLatitude,
  valueAddress,
  valueDesc,
  currentFormattedDate,
  askArchive,
  isArchive,
  isValidate,
  artworkId
) => {
  const dataArtwork = {
    image: base64EncodedImage,
    longitude: valueLongitude,
    latitude: valueLatitude,
    adress: valueAddress,
    description: valueDesc,
    date_published: currentFormattedDate,
    ask_to_archived: askArchive,
    is_archived: isArchive,
    is_validate: isValidate,
    id: artworkId,
  };
  console.info(dataArtwork);

  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/artworks/uploadModify/${artworkId}`,
      {
        method: "PUT",
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

    console.info("Artwork uploaded successfully!");
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export default postCloudAndPutArtwork;
