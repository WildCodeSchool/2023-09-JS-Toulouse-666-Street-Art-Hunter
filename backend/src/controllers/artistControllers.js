// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all artists from the database
    const artists = await tables.artist.readAll();

    // Respond with the artists in JSON format
    res.json(artists);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific artist from the database based on the provided ID
    const artist = await tables.artist.read(req.params.id);

    // If the artist is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the artist in JSON format
    if (artist == null) {
      res.sendStatus(404);
    } else {
      res.json(artist);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  try {
    // Fetch all artists from the database
    const artists = await tables.artist.update(req.params.id, req.body);

    if (artists.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the artist data from the request body
  const artist = req.body;

  try {
    // Insert the artist into the database
    const insertId = await tables.artist.create(artist);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted artist
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Fetch all artists from the database
    const artists = await tables.artist.delete(req.params.id);
    if (artists.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
