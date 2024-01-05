const validatePhoto = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const {
    image,
    is_validated: isValidate,
    user_id: userId,
    artwork_id: artworkId,
  } = req.body;
  const errors = [];

  if (image == null) {
    errors.push({
      field: "image",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  }
  if (isValidate == null) {
    errors.push({
      field: "is_validated",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  }
  if (userId == null) {
    errors.push({
      field: "user_id",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  }
  if (artworkId == null) {
    errors.push({
      field: "artwork_id",
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

module.exports = validatePhoto;
