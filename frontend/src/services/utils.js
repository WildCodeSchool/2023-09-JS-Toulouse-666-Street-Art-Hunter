function getCurrentFormattedDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Les mois vont de 0 à 11, donc on ajoute 1
  const dayOfMonth = today.getDate().toString().padStart(2, "0"); // Assure que le jour a toujours deux chiffres

  return `${year}-${month}-${dayOfMonth}`;
}

export default getCurrentFormattedDate;
