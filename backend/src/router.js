const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const photoControllers = require("./controllers/photoControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);
router.get("/photos", photoControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);
router.get("/photos/:id", photoControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);
router.post("/photos", photoControllers.add);

// Route to modifie a item
router.put("/photos/:id", photoControllers.edit);

// Route to destroy a item
router.delete("/photos/:id", photoControllers.destroy);

/* ************************************************************************* */

module.exports = router;
