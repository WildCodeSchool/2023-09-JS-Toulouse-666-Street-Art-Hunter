const validateUser = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const {
    name,
    email,
    hashed_password: hashedPassword,
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
  if (hashedPassword == null) {
    errors.push({
      field: "hashed_password",
      message:
        "Attention ! Ce champ est obligatoire. Veuillez le remplir pour poursuivre",
    });
  } else if (hashedPassword.length >= 255) {
    errors.push({
      field: "hashed_password",
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
  } else if (border.length >= 10) {
    errors.push({
      field: "border",
      message:
        "Oups ! Vous avez dépassé la limite de caractères autorisée pour ce champ. Veuillez réduire le nombre de caractères à 10 ou moins et réessayer.",
    });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = validateUser;
