// Fetch de l'api Location IQ pour trouver les coordonnées d'une adresse rentré par l'utilisateur
// le fetch est passé au bouton du textarea type adresse
const fetchPositionStack = async (setAddresses, valueAddress) => {
  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search?key=${
        import.meta.env.VITE_LOCATION_IQ_TOKEN
      }&format=json&q=${valueAddress}`
    );
    if (!response.ok) {
      throw new Error(
        `La requête a échoué avec le statut : ${response.status}`
      );
    }
    const dataAddress = await response.json();
    setAddresses(dataAddress);
  } catch (err) {
    console.error("Error:", err.message);
  }
};

export default fetchPositionStack;
