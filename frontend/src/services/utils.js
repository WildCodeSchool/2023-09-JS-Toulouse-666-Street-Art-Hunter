// Fonction pour récupérer la date du jour
function getCurrentFormattedDate() {
  const daysOfWeek = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];
  const dayOfMonth = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
}

export default getCurrentFormattedDate;
