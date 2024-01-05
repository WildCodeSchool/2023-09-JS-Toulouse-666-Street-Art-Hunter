const validateArticle = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { title, description, is_archived: isArchived } = req.body;
  const errors = [];

  if (title == null) {
    errors.push({
      field: "title",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  } else if (title.length >= 50) {
    errors.push({
      field: "title",
      message:
        "Oups ! Vous avez dépassé la limite de caractères autorisée pour ce champ. Veuillez réduire le nombre de caractères à 50 ou moins et réessayer.",
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
  if (isArchived == null) {
    errors.push({
      field: "is_archived",
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

module.exports = validateArticle;
