const validateArtwork = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const {
    image,
    longitude,
    latitude,
    adress,
    description,
    date_published: datePublished,
    ask_to_archived: askToArchived,
    is_archived: isArchived,
    is_validate: isValidate,
  } = req.body;
  const errors = [];

  if (image == null) {
    errors.push({
      field: "image",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  }

  if (longitude == null) {
    errors.push({
      field: "longitude",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  } else if (longitude.length >= 30) {
    errors.push({
      field: "longitude",
      message:
        "Oups ! Vous avez dépassé la limite de caractères autorisée pour ce champ. Veuillez réduire le nombre de caractères à 30 ou moins et réessayer.",
    });
  }
  if (latitude == null) {
    errors.push({
      field: "latitude",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  } else if (latitude.length >= 30) {
    errors.push({
      field: "latitude",
      message:
        "Oups ! Vous avez dépassé la limite de caractères autorisée pour ce champ. Veuillez réduire le nombre de caractères à 30 ou moins et réessayer.",
    });
  }
  if (adress == null) {
    errors.push({
      field: "adress",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  } else if (adress.length >= 10000) {
    errors.push({
      field: "adress",
      message:
        "Oups ! Vous avez dépassé la limite de caractères autorisée pour ce champ. Veuillez réduire le nombre de caractères à 100 ou moins et réessayer.",
    });
  }
  if (description) {
    if (description.length >= 500) {
      errors.push({
        field: "description",
        message:
          "Oups ! Vous avez dépassé la limite de caractères autorisée pour ce champ. Veuillez réduire le nombre de caractères à 500 ou moins et réessayer.",
      });
    }
  }
  if (datePublished == null) {
    errors.push({
      field: "date_published",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  }
  if (askToArchived == null) {
    errors.push({
      field: "ask_to_archived",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  }
  if (isArchived == null) {
    errors.push({
      field: "is_archived",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  }
  if (isValidate == null) {
    errors.push({
      field: "is_validate",
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

module.exports = validateArtwork;
