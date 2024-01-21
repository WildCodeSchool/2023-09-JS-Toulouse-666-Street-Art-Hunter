const postDataArtwork = async (dataArtwork) => {
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/artworks`, {
      method: "POST",
      body: JSON.stringify({ dataArtwork }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
  }
};

export default postDataArtwork;
