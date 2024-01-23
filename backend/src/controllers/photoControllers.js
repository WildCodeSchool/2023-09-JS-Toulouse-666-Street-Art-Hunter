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
    const photos = await tables.photo.readAll();

    res.json(photos);
  } catch (err) {
    next(err);
  }
};

// ------------------ Méthode GET BY ID ------------------
const read = async (req, res, next) => {
  try {
    const photo = await tables.photo.read(req.params.id);
    if (photo == null) {
      res.sendStatus(404);
    } else {
      res.json(photo);
    }
  } catch (err) {
    next(err);
  }
};

// ------------------ Méthode PUT ------------------
const edit = async (req, res, next) => {
  try {
    const photos = await tables.photo.update(req.params.id, req.body);

    if (photos.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

// ------------------ Méthode POST ------------------
const add = async (req, res, next) => {
  const photo = req.body;

  try {
    const insertId = await tables.photo.create(photo);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// ------------------ Méthode DELETE ------------------
const destroy = async (req, res, next) => {
  try {
    const photos = await tables.photo.delete(req.params.id);
    if (photos.affectedRows === 0) {
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
    // objectToPost = url image en base 64
    const { objectToPost } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(
      objectToPost.image,
      {
        upload_presets: "wwh5pcwo",
      }
    );
    delete objectToPost.image;
    const updatedObject = { ...objectToPost, image: uploadResponse.secure_url };

    console.info("updatedObject", updatedObject);
    console.info("uploadResponse", uploadResponse);

    // Post on database Photo
    const response = await tables.photo.create(updatedObject);
    console.info(response);
    res.json({ response, msg: "POST URL CLOUDINARY SUR TABLE PHOTO" });
  } catch (error) {
    console.error(error);
  }
};

// ------------------ Méthode GET URL for CLOUDINARY ------------------
const getImagesFromCloud = async (req, res) => {
  try {
    const { ressource } = await cloudinary.search
      .expression("folder:dev_setups")
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();
    const publicIds = ressource.map((file) => file.public_id);
    res.send(publicIds);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  uploadCloud,
  getImagesFromCloud,
};
