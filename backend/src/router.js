const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Définir vos routes API ici
/* ************************************************************************* */

// Importer les modules :
const validateArtist = require("./middlewares/validateArtist");
const validatePhoto = require("./middlewares/validatePhoto");
const validateArticle = require("./middlewares/validateArticle");
const validateArtwork = require("./middlewares/validateArtwork");
const validateAvatarImage = require("./middlewares/validateAvatarImage");
const validateUser = require("./middlewares/validateUser");
const artworkControllers = require("./controllers/artworkControllers");
const avatarImageControllers = require("./controllers/avatarImageControllers");
const userControllers = require("./controllers/userControllers");
const articleControllers = require("./controllers/articleControllers");
const photoControllers = require("./controllers/photoControllers");
const artistControllers = require("./controllers/artistControllers");
const {
  hashPassword,
  verifyPassword,
  //   verifyToken,
} = require("./middlewares/authentication");

// Route for ARTWORKS
router.get("/artworks", artworkControllers.browse);
router.get("/artworks/:id", artworkControllers.read);
router.post("/artworks", validateArtwork, artworkControllers.add);
router.put("/artworks/:id", validateArtwork, artworkControllers.edit);
router.delete("/artworks/:id", artworkControllers.destroy);

// Route for AVATAR_IMAGE
router.get("/avatars", avatarImageControllers.browse);
router.get("/avatars/:id", avatarImageControllers.read);
router.post("/avatars", validateAvatarImage, avatarImageControllers.add);
router.put("/avatars/:id", validateAvatarImage, avatarImageControllers.edit);
router.delete("/avatars/:id", avatarImageControllers.destroy);

// Route for PHOTOS
router.get("/photos", photoControllers.browse);
router.get("/photos/:id", photoControllers.read);
router.post("/photos", validatePhoto, photoControllers.add);
router.put("/photos/:id", validatePhoto, photoControllers.edit);
router.delete("/photos/:id", photoControllers.destroy);

// Route for USERS
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/users", hashPassword, validateUser, userControllers.add);
router.put("/users/:id", validateUser, userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

// Route for ARTICLES
router.get("/articles", articleControllers.browse);
router.get("/articles/:id", articleControllers.read);
router.post("/articles", validateArticle, articleControllers.add);
router.post(
  "/users/login",
  userControllers.readByEmailAndPassToNext,
  verifyPassword
);
router.put("/articles/:id", validateArticle, articleControllers.edit);
router.delete("/articles/:id", articleControllers.destroy);

// Route for ARTISTE
router.get("/artists", artistControllers.browse);
router.get("/artists/:id", artistControllers.read);
router.post("/artists", validateArtist, artistControllers.add);
router.put("/artists/:id", validateArtist, artistControllers.edit);
router.delete("/artists/:id", artistControllers.destroy);

/* ************************************************************************* */

module.exports = router;
