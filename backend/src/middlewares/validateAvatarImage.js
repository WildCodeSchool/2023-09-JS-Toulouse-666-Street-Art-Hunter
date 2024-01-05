const validateAvatarImage = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { name, objective, img_url: imgUrl } = req.body;
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
  if (objective == null) {
    errors.push({
      field: "objective",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  } else if (objective.length >= 300) {
    errors.push({
      field: "objective",
      message:
        "Oups ! Vous avez dépassé la limite de caractères autorisée pour ce champ. Veuillez réduire le nombre de caractères à 300 ou moins et réessayer.",
    });
  }
  if (imgUrl == null) {
    errors.push({
      field: "img_url",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = validateAvatarImage;
