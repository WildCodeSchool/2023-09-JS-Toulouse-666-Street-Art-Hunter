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
    // Generating Seed Data

    const insertUser = async (index) => {
      if (index < userData.length) {
        const user = userData[index];
        await database.query(
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
        await insertUser(index + 1);
      }
    };

    const insertArtist = async (index) => {
      if (index < artistData.length) {
        const artist = artistData[index];
        await database.query(
          `INSERT INTO artist (name, description, image) VALUES (?, ?, ?)`,
          [artist.name, artist.description, artist.image]
        );
        await insertArtist(index + 1);
      }
    };

    const insertAvatarImage = async (index) => {
      if (index < avatarImageData.length) {
        const avatarImage = avatarImageData[index];
        await database.query(
          `INSERT INTO avatar_image (name, objective, img_url) VALUES (?, ?, ?)`,
          [avatarImage.name, avatarImage.objective, avatarImage.img_url]
        );
        await insertAvatarImage(index + 1);
      }
    };

    const insertArtwork = async (index) => {
      if (index < artworkData.length) {
        const artwork = artworkData[index];
        await database.query(
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
        await insertArtwork(index + 1);
      }
    };

    const insertPhoto = async (index) => {
      if (index < photoData.length) {
        const photo = photoData[index];
        await database.query(
          `INSERT INTO photo (image, is_validated, user_id, artwork_id) VALUES (?, ?, ?, ?)`,
          [photo.image, photo.is_validated, photo.user_id, photo.artwork_id]
        );
        await insertPhoto(index + 1);
      }
    };

    const insertAvatarUser = async (index) => {
      if (index < avatarUserData.length) {
        const avatarUser = avatarUserData[index];
        await database.query(
          `INSERT INTO avatar_user (user_id, avatar_image_id) VALUES (?, ?)`,
          [avatarUser.user_id, avatarUser.avatar_image_id]
        );
        await insertAvatarUser(index + 1);
      }
    };

    // Start the insertion process
    await insertUser(0);
    await insertArtist(0);
    await insertAvatarImage(0);
    await insertArtwork(0);
    await insertPhoto(0);
    await insertAvatarUser(0);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
