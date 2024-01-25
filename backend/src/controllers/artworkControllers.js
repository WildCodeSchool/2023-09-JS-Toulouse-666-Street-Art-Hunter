const tables = require("../tables");
const { cloudinary } = require("../services/cloudinary");
require("dotenv").config();

// Variables d'environnement pour Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  upload_presets: process.env.CLOUDINARY_UPLOAD_PRESETS,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ------------------ Méthode GET ------------------
const browse = async (req, res, next) => {
  try {
    const response = await tables.artwork.readAll();
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const count = async (req, res, next) => {
  try {
    const artworks = await tables.artwork.countAll();
    res.status(200).json(artworks);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const countNoValidate = async (req, res, next) => {
  try {
    const artworks = await tables.artwork.countArtworkNoValidate();
    res.status(200).json(artworks);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const readToAdd = async (req, res, next) => {
  try {
    const artworks = await tables.artwork.readAllToAdd();
    res.status(200).json(artworks);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const readToMissing = async (req, res, next) => {
  try {
    const artworks = await tables.artwork.readAllToMissing();
    res.status(200).json(artworks);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// ------------------ Méthode GET BY ID ------------------
const read = async (req, res, next) => {
  try {
    const response = await tables.artwork.read(req.params.id);
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
    const insertId = await tables.artwork.create(req.body);
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
    const response = await tables.artwork.update(req.params.id, req.body);
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
    const response = await tables.artwork.delete(req.params.id);
    if (response.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

// ------------------ Méthode POST for CLOUDINARY ------------------
const uploadCloud = async (req, res) => {
  // Post on Cloudinary
  try {
    const { dataArtwork } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(dataArtwork.image, {
      upload_presets: "wwh5pcwo",
    });

    delete dataArtwork.image;
    const updatedObject = { ...dataArtwork, image: uploadResponse.secure_url };

    console.info("updatedObject", updatedObject);
    console.info("uploadResponse", uploadResponse);

    // Post on database artwork
    const response = await tables.artwork.create(updatedObject);
    console.info(response);
    res.json({ response, msg: "ARTWORKKKKK" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  browse,
  read,
  add,
  edit,
  destroy,
  uploadCloud,
  count,
  countNoValidate,
  readToAdd,
  readToMissing,
};
