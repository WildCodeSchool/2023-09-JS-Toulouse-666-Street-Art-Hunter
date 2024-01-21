const fetchUrlPhotos = async (setDataUrl) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/photos`
    );
    if (response.ok) {
      const data = await response.json();
      setDataUrl(data);
    }
  } catch (error) {
    console.error(error);
  }
};

fetchUrlPhotos();

export default fetchUrlPhotos;
