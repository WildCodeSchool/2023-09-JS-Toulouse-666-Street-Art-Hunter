const {
  userData,
  photoData,
  artworkData,
  artistData,
  avatarImageData,
  avatarUserData,
} = require("./seedItem");
// Load environment variables from .env file
require("dotenv").config();

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop

    /* ************************************************************************* */

    // Generating Seed Data

    const userQueryPromises = userData.map((user) => {
      return database.query(
        `INSERT INTO user (name, description, email, hashed_password, score, is_admin, is_banned, selected_avatar, border) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user.name,
          user.description,
          user.email,
          user.hashed_password,
          user.score,
          user.is_admin,
          user.is_banned,
          user.selected_avatar,
          user.border,
        ]
      );
    });

    const artistQueryPromises = artistData.map((artist) => {
      return database.query(
        `INSERT INTO artist (name, description, image) VALUES (?, ?, ?)`,
        [artist.name, artist.description, artist.image]
      );
    });

    const avatarImageQueryPromises = avatarImageData.map((avatarImage) => {
      return database.query(
        `INSERT INTO avatar_image (name, objective, img_url) VALUES (?, ?, ?)`,
        [avatarImage.name, avatarImage.objective, avatarImage.img_url]
      );
    });

    /* ************************************************************************* */

    // ALL
    const allPromises = [
      ...userQueryPromises,
      ...artistQueryPromises,
      ...avatarImageQueryPromises,
    ];

    await Promise.all(allPromises);

    // ARTWORK
    const artworkQueryPromises = artworkData.map((artwork) => {
      return database.query(
        `INSERT INTO artwork (image, longitude, latitude, adress, description, date_published, ask_to_archived, is_archived, is_validate, publisher_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          artwork.image,
          artwork.longitude,
          artwork.latitude,
          artwork.adress,
          artwork.description,
          artwork.date_published,
          artwork.ask_to_archived,
          artwork.is_archived,
          artwork.is_validate,
          artwork.publisher_id,
        ]
      );
    });
    await Promise.all(artworkQueryPromises);

    // PHOTO
    const photoQueryPromises = photoData.map((photo) => {
      return database.query(
        `INSERT INTO photo (image, is_validated, user_id, artwork_id) VALUES (?, ?, ?, ?)`,
        [photo.image, photo.is_validated, photo.user_id, photo.artwork_id]
      );
    });
    await Promise.all(photoQueryPromises);

    // AVATAR USER
    const avatarUserQueryPromises = avatarUserData.map((avatarUser) => {
      return database.query(
        `INSERT INTO avatar_user (user_id, avatar_image_id) VALUES (?, ?)`,
        [avatarUser.user_id, avatarUser.avatar_image_id]
      );
    });
    await Promise.all(avatarUserQueryPromises);

    // Wait for all the insertion queries to complete
    // await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
