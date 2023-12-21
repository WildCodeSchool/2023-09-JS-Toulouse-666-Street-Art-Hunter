const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Définir vos routes API ici
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

// Route to modifie a item

// Route to destroy a item

/* ************************************************************************* */

// Importer les modules :
const artworkControllers = require("./controllers/artworkControllers");
const avatarImageControllers = require("./controllers/avatarImageControllers");
const userControllers = require("./controllers/userControllers");
const articleControllers = require("./controllers/articleControllers");
const photoControllers = require("./controllers/photoControllers");

// Route for ARTWORKS
router.get("/artworks", artworkControllers.browse);
router.get("/artworks/:id", artworkControllers.read);
router.post("/artworks", artworkControllers.add);
router.put("/artworks/:id", artworkControllers.edit);
router.delete("/artworks/:id", artworkControllers.destroy);

// Route for AVATAR_IMAGE
router.get("/avatars", avatarImageControllers.browse);
router.get("/avatars/:id", avatarImageControllers.read);
router.post("/avatars", avatarImageControllers.add);
router.put("/avatars/:id", avatarImageControllers.edit);
router.delete("/avatars/:id", avatarImageControllers.destroy);

// Route for PHOTOS
router.get("/photos", photoControllers.browse);
router.get("/photos/:id", photoControllers.read);
router.post("/photos", photoControllers.add);
router.put("/photos/:id", photoControllers.edit);
router.delete("/photos/:id", photoControllers.destroy);

// Route for USERS
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/users", userControllers.add);
router.put("/users/:id", userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

// Route for ARTICLES
router.get("/articles", articleControllers.browse);
router.get("/articles/:id", articleControllers.read);
router.post("/articles", articleControllers.add);
router.put("/articles/:id", articleControllers.edit);
router.delete("/articles/:id", articleControllers.destroy);

/* ************************************************************************* */

module.exports = router;
