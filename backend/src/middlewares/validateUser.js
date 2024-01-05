const validateUser = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const {
    name,
    description,
    email,
    password,
    score,
    is_admin: isAdmin,
    is_banned: isBanned,
    selected_avatar: selectedAvatar,
    border,
  } = req.body;
  const errors = [];
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

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
  } else if (description.length >= 255) {
    errors.push({
      field: "description",
      message:
        "Oups ! Vous avez dépassé la limite de caractères autorisée pour ce champ. Veuillez réduire le nombre de caractères à 255 ou moins et réessayer.",
    });
  }
  if (!emailRegex.test(email)) {
    errors.push({
      field: "email",
      message:
        "Veuillez entrer une adresse e-mail valide. L'adresse e-mail doit suivre le format nom@example.com.",
    });
  } else if (email.length >= 45) {
    errors.push({
      field: "email",
      message:
        "Oups ! Vous avez dépassé la limite de caractères autorisée pour ce champ. Veuillez réduire le nombre de caractères à 45 ou moins et réessayer.",
    });
  }
  if (password == null) {
    errors.push({
      field: "password",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  } else if (password.length >= 30) {
    errors.push({
      field: "password",
      message:
        "Oups ! Vous avez dépassé la limite de caractères autorisée pour ce champ. Veuillez réduire le nombre de caractères à 30 ou moins et réessayer.",
    });
  }
  if (score == null) {
    errors.push({
      field: "score",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  }
  if (isAdmin == null) {
    errors.push({
      field: "is_admin",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  }
  if (isBanned == null) {
    errors.push({
      field: "is_banned",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  }
  if (selectedAvatar == null) {
    errors.push({
      field: "selected_avatar",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  }
  if (border == null) {
    errors.push({
      field: "border",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  } else if (border.length >= 7) {
    errors.push({
      field: "border",
      message:
        "Oups ! Vous avez dépassé la limite de caractères autorisée pour ce champ. Veuillez réduire le nombre de caractères à 7 ou moins et réessayer.",
    });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = validateUser;
