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
  verifyToken,
  verifyAdmin,
} = require("./middlewares/authentication");

router.get("/artworks", artworkControllers.browse);
router.get("/artworks/:id", artworkControllers.read);
router.get("/avatars", avatarImageControllers.browse);
router.get("/avatars/:id", avatarImageControllers.read);
router.post("/users", hashPassword, validateUser, userControllers.add);
router.post(
  "/users/login",
  userControllers.readByEmailAndPassToNext,
  verifyPassword
);
router.get("/articles", articleControllers.browse);
router.get("/articles/:id", articleControllers.read);
router.get("/artists", artistControllers.browse);
router.get("/artists/:id", artistControllers.read);
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);

router.get("/photos", photoControllers.browse);
router.get("/photos/:id", photoControllers.read);
router.get("/artworks/publishers/:id", artworkControllers.readArtworkAndUser);

// --------------------------- Mur d'authentification ---------------------------
router.use(verifyToken);

router.put("/users/:id", userControllers.edit);
router.post("/artworks", validateArtwork, artworkControllers.add);
router.put("/artworks/:id", validateArtwork, artworkControllers.edit);
router.post("/photos", validatePhoto, photoControllers.add);
router.put("/photos/:id", validatePhoto, photoControllers.edit);
router.get("/photos/users/:id", photoControllers.readByUser);
router.post("/artworks/upload", artworkControllers.uploadCloud);

// Route for CLOUDINARY
router.post("/upload", photoControllers.uploadCloud);
router.get("/images", photoControllers.getImagesFromCloud);

// --------------------------- Mur d'authentification Admin ---------------------------
router.use(verifyAdmin);

router.get("/pannel-administrateur/users", userControllers.count);
router.get("/pannel-administrateur/artworks", artworkControllers.count);
router.get(
  "/pannel-administrateur/artworks-no-validate",
  artworkControllers.countNoValidate
);
router.get(
  "/pannel-administrateur/photo-no-validate",
  photoControllers.readValidatePhoto
);
router.get(
  "/pannel-administrateur/artworks-to-validate",
  artworkControllers.readToAdd
);
router.get(
  "/pannel-administrateur/artworks-to-missing",
  artworkControllers.readToMissing
);

router.get("/pannel-administrateur/artists", artistControllers.count);

// Route for ARTWORKS
router.delete("/artworks/:id", artworkControllers.destroy);

router.post("/avatars", validateAvatarImage, avatarImageControllers.add);
router.put("/avatars/:id", validateAvatarImage, avatarImageControllers.edit);
router.delete("/avatars/:id", avatarImageControllers.destroy);

// Route for PHOTOS

router.get("/photos", photoControllers.browse);
router.get("/photos/:id", photoControllers.read);
router.post("/photos", validatePhoto, photoControllers.add);
router.put("/photos/:id", validatePhoto, photoControllers.edit);
router.delete("/photos/:id", photoControllers.destroy);
router.get("/photos/users/:id", photoControllers.readByUser);

// Route for CLOUDINARY
router.post("/upload", photoControllers.uploadCloud);
router.get("/images", photoControllers.getImagesFromCloud);

// Route for CLOUDINARY
router.post("/artworks/upload", artworkControllers.uploadCloud);

// Route for USERS

router.delete("/users/:id", userControllers.destroy);

// Route for ARTICLES
router.post("/articles", validateArticle, articleControllers.add);
router.put("/articles/:id", validateArticle, articleControllers.edit);
router.delete("/articles/:id", articleControllers.destroy);

// Route for ARTISTE
router.post("/artists", validateArtist, artistControllers.add);
router.put("/artists/:id", validateArtist, artistControllers.edit);
router.delete("/artists/:id", artistControllers.destroy);

/* ************************************************************************* */

module.exports = router;
