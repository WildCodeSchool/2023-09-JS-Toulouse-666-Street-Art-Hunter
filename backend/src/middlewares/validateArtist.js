const validateArtist = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { name, description } = req.body;
  const errors = [];

  if (name == null) {
    errors.push({
      field: "name",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  } else if (name.length >= 45) {
    errors.push({
      field: "name",
      message:
        "Oups ! Vous avez dépassé la limite de caractères autorisée pour ce champ. Veuillez réduire le nombre de caractères à 45 ou moins et réessayer.",
    });
  }
  if (description == null) {
    errors.push({
      field: "description",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  } else if (description.length >= 5000) {
    errors.push({
      field: "description",
      message:
        "Oups ! Vous avez dépassé la limite de caractères autorisée pour ce champ. Veuillez réduire le nombre de caractères à 5000 ou moins et réessayer.",
    });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = validateArtist;
