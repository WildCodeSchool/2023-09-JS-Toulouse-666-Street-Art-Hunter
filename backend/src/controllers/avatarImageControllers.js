const tables = require("../tables");

// ------------------ Méthode GET ------------------
const browse = async (req, res, next) => {
  try {
    const response = await tables.avatar_image.readAll();
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// ------------------ Méthode GET BY ID ------------------
const read = async (req, res, next) => {
  try {
    const response = await tables.avatar_image.read(req.params.id);
    if (response == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// ------------------ Méthode POST ------------------
const add = async (req, res, next) => {
  try {
    const insertId = await tables.avatar_image.create(req.body);
    console.info(req.body);
    res.status(201).json({ insertId });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// ------------------ Méthode PUT ------------------
const edit = async (req, res, next) => {
  try {
    const response = await tables.avatar_image.update(req.params.id, req.body);
    if (response.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.status(204).json(response);
    }
  } catch (err) {
    next(err);
  }
};

// ------------------ Méthode DELETE ------------------
const destroy = async (req, res, next) => {
  try {
    const response = await tables.avatar_image.delete(req.params.id);
    if (response.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, read, add, edit, destroy };
