const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Définir vos routes API ici
/* ************************************************************************* */

// Importer le module artworkControllers pour gérer les opérations liées aux œuvres d'art
const artworkControllers = require("./controllers/artworkControllers");

// Route for artworks
router.get("/artworks", artworkControllers.browse);
router.get("/artworks/:id", artworkControllers.read);
router.post("/artworks", artworkControllers.add);
router.put("/artworks/:id", artworkControllers.edit);
router.delete("/artworks/:id", artworkControllers.destroy);

module.exports = router;
