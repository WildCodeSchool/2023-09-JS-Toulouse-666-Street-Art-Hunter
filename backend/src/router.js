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
const photoControllers = require("./controllers/photoControllers");

router.get("/photos", photoControllers.browse);
router.get("/photos/:id", photoControllers.read);
router.post("/photos", photoControllers.add);
router.put("/photos/:id", photoControllers.edit);
router.delete("/photos/:id", photoControllers.destroy);

const artistControllers = require("./controllers/artistControllers");

router.get("/artists", artistControllers.browse);
router.get("/artists/:id", artistControllers.read);
router.post("/artists", artistControllers.add);
router.put("/artists/:id", artistControllers.edit);
router.delete("/artists/:id", artistControllers.destroy);

// Importer les modules :
const artworkControllers = require("./controllers/artworkControllers");
const avatarImageControllers = require("./controllers/avatarImageControllers");
const userControllers = require("./controllers/userControllers");

// Route for artworks
router.get("/artworks", artworkControllers.browse);
router.get("/artworks/:id", artworkControllers.read);
router.post("/artworks", artworkControllers.add);
router.put("/artworks/:id", artworkControllers.edit);
router.delete("/artworks/:id", artworkControllers.destroy);

// Route for avatar_image
router.get("/avatars", avatarImageControllers.browse);
router.get("/avatars/:id", avatarImageControllers.read);
router.post("/avatars", avatarImageControllers.add);
router.put("/avatars/:id", avatarImageControllers.edit);
router.delete("/avatars/:id", avatarImageControllers.destroy);

// Route for users
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/users", userControllers.add);
router.put("/users/:id", userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

/* ************************************************************************* */

module.exports = router;
