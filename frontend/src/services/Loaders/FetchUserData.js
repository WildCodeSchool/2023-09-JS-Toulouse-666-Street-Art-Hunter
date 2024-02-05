const fetchUserData = async (setUserData) => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await fetch(`${apiUrl}/api/users`);
    if (!response.ok) {
      throw new Error("Impossible de récupérer la donnée");
    }

    const data = await response.json();
    setUserData(data);
  } catch (error) {
    console.error(error);
  }
};

export default fetchUserData;
